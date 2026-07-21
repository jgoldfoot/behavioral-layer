#!/usr/bin/env node
/**
 * Post-build sanity checks on emitted HTML (run after `npx quartz build`).
 *
 * Exists because of a real incident: machine-readable publish dates silently
 * fell back to build time in CI (identical article:published_time on every
 * page), and og:image:type emitted a malformed "image/.webp" MIME type. The
 * human-readable dates were fine; the machine-readable ones were fabricated.
 * On a site whose brand is auditable provenance, emitted metadata is part of
 * the contract, so it gets checked like content does.
 *
 * Checks:
 *   (a) article:published_time values are not all identical across notes, and
 *       none is within 10 minutes of now (the build-time fingerprint)
 *   (b) every og:image:type is a well-formed image MIME (no "image/.")
 *   (c) the Google site-verification meta tag is present on the homepage
 *
 * Run: `node scripts/check-emitted.mjs`  ->  exit 0 clean, exit 1 on any error.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs"
import { join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = resolve(fileURLToPath(import.meta.url), "..", "..")
const PUBLIC = join(ROOT, "public")

if (!existsSync(PUBLIC)) {
  console.error("check-emitted: public/ does not exist; run `npx quartz build` first.")
  process.exit(1)
}

const htmlFiles = []
;(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith(".html")) htmlFiles.push(p)
  }
})(PUBLIC)

const errors = []
const published = new Map() // iso -> count
const now = Date.now()

for (const f of htmlFiles) {
  const html = readFileSync(f, "utf8")
  const pub = html.match(/article:published_time" content="([^"]+)"/)
  if (pub) {
    published.set(pub[1], (published.get(pub[1]) ?? 0) + 1)
    const t = Date.parse(pub[1])
    if (!Number.isNaN(t) && Math.abs(now - t) < 10 * 60 * 1000) {
      errors.push(`${f}: article:published_time equals build time (${pub[1]})`)
    }
  }
  for (const m of html.matchAll(/og:image:type" content="([^"]+)"/g)) {
    if (!/^image\/[a-z0-9+-]+$/.test(m[1])) {
      errors.push(`${f}: malformed og:image:type "${m[1]}"`)
    }
  }
}

if (published.size === 1 && [...published.values()][0] > 3) {
  errors.push(
    `all ${[...published.values()][0]} notes share one article:published_time (${[...published.keys()][0]}): dates are not coming from frontmatter`,
  )
}

const home = join(PUBLIC, "index.html")
if (existsSync(home) && !readFileSync(home, "utf8").includes("google-site-verification")) {
  errors.push("homepage is missing the google-site-verification meta tag (Search Console will unverify)")
}

if (errors.length) {
  console.error(`\nEmitted-HTML check FAILED with ${errors.length} problem(s):\n`)
  for (const e of errors.slice(0, 20)) console.error("  - " + e)
  process.exit(1)
}
console.log(
  `Emitted-HTML check passed: ${htmlFiles.length} page(s), ${published.size} distinct publish date(s), MIME types well-formed, verification tag present.`,
)
