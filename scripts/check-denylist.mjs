#!/usr/bin/env node
/**
 * Forbidden-term guardrail for The Behavioral Layer (EDITORIAL.md clause 4.4).
 *
 * This is a load-bearing stub. The term list is intentionally NOT stored in the
 * repository. It is read from two sources, unioned:
 *   - local runs:  .editorial/denylist.local.txt   (gitignored, may be absent/empty)
 *   - CI runs:     the EDITORIAL_DENYLIST environment variable, supplied from the
 *                  GitHub Actions secret of the same name
 *
 * Each source is a list of terms, one per line (local file) or newline/comma
 * separated (env). Blank lines and lines starting with `#` are ignored. Matching
 * is case-insensitive substring matching over every note in content/.
 *
 * With no terms configured the check passes (this is expected until the owner
 * supplies a list). Run: `node scripts/check-denylist.mjs`.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs"
import { join, relative, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = resolve(fileURLToPath(import.meta.url), "..", "..")
const CONTENT = join(ROOT, "content")
const LOCAL_LIST = join(ROOT, ".editorial", "denylist.local.txt")

function parseTerms(text) {
  return text
    .split(/[\r\n,]+/)
    .map((t) => t.trim())
    .filter((t) => t !== "" && !t.startsWith("#"))
}

const terms = new Set()
if (existsSync(LOCAL_LIST)) {
  for (const t of parseTerms(readFileSync(LOCAL_LIST, "utf8"))) terms.add(t)
}
if (process.env.EDITORIAL_DENYLIST) {
  for (const t of parseTerms(process.env.EDITORIAL_DENYLIST)) terms.add(t)
}

if (terms.size === 0) {
  console.log(
    "Denylist guardrail: no terms configured " +
      "(no .editorial/denylist.local.txt and no EDITORIAL_DENYLIST secret). Passing.",
  )
  process.exit(0)
}

function walk(dir) {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (e.isFile() && e.name.endsWith(".md")) out.push(p)
  }
  return out
}

const lowerTerms = [...terms].map((t) => ({ term: t, needle: t.toLowerCase() }))
const hits = []
for (const file of walk(CONTENT)) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/)
  lines.forEach((line, i) => {
    const hay = line.toLowerCase()
    for (const { term, needle } of lowerTerms) {
      if (hay.includes(needle)) {
        hits.push(`${relative(ROOT, file)}:${i + 1}  forbidden term: "${term}"`)
      }
    }
  })
}

if (hits.length) {
  console.error(`\nDenylist guardrail FAILED with ${hits.length} hit(s):\n`)
  for (const h of hits) console.error("  - " + h)
  console.error(`\nChecked against ${terms.size} configured term(s).\n`)
  process.exit(1)
}
console.log(
  `Denylist guardrail passed: 0 hits across content/ for ${terms.size} configured term(s).`,
)
