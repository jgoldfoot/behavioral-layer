#!/usr/bin/env node
/**
 * README drift check.
 *
 * Exists because of a real incident: the README described "Stage 1... two
 * exemplar notes... no automation yet, by design" while the commit history
 * around it was the automation's own output. Prose truth cannot be machine-
 * checked, but the structural claims can, and the prose gets a staleness
 * clock (the same discipline EDITORIAL clause 2.3 applies to notes).
 *
 * Checks:
 *   (a) every path named in the "## Layout" block exists
 *   (b) every documented-worthy top-level directory is mentioned somewhere
 *       in the README (catches "new directory added, README silent")
 *   (c) every relative markdown link in the README resolves
 *   (d) every `npm run X` the README mentions exists in package.json
 *   (e) the site's baseUrl (quartz.config.ts) appears in the README
 *   (f) a `<!-- readme-verified: YYYY-MM-DD -->` stamp exists and is at most
 *       90 days old: a human re-reads the README against reality and bumps
 *       the stamp, or CI fails
 *
 * Runnable standalone (`node scripts/check-readme.mjs`) and imported by
 * lint-content.mjs so the existing CI invocation covers it.
 */
import { readFileSync, readdirSync, existsSync, realpathSync } from "node:fs"
import { join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const MAX_STAMP_AGE_DAYS = 90
// Top-level entries that never need README mention.
const IGNORE_DIRS = new Set([
  ".git",
  "node_modules",
  "public",
  ".quartz-cache",
  "prof",
  "docs",
  ".obsidian",
])

export function checkReadme(root) {
  const errors = []
  const readmePath = join(root, "README.md")
  if (!existsSync(readmePath)) return [`README.md: missing entirely`]
  const readme = readFileSync(readmePath, "utf8")

  // (a) Layout block paths exist. Entries at indent 0 are repo-root paths;
  // entries at indent 1-3 nest under the last indent-0 directory; deeper
  // indentation is wrapped description text, not a path.
  const layoutMatch = readme.match(/## Layout\s*```([\s\S]*?)```/)
  if (!layoutMatch) {
    errors.push(`README.md: no "## Layout" fenced block found`)
  } else {
    let parent = ""
    for (const line of layoutMatch[1].split("\n")) {
      const indent = line.match(/^ */)[0].length
      const token = line.trim().split(/\s+/)[0]
      if (!token || token.startsWith("#") || indent > 3) continue
      let p
      if (indent === 0) {
        p = token.replace(/\/$/, "")
        parent = token.endsWith("/") ? p : ""
      } else {
        if (!parent) continue
        p = join(parent, token.replace(/\/$/, ""))
      }
      if (!existsSync(join(root, p))) {
        errors.push(`README.md: Layout names "${token}" but ${p} does not exist`)
      }
    }
  }

  // (b) top-level directories are mentioned somewhere
  for (const e of readdirSync(root, { withFileTypes: true })) {
    if (!e.isDirectory() || IGNORE_DIRS.has(e.name)) continue
    const name = e.name === ".claude" ? ".claude/skills" : e.name
    if (!readme.includes(name)) {
      errors.push(
        `README.md: top-level directory "${e.name}" exists but is never mentioned (drift?)`,
      )
    }
  }

  // (c) relative markdown links resolve
  for (const m of readme.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = m[1].trim()
    if (/^(https?:|mailto:|#)/i.test(target)) continue
    const p = target.replace(/^\.\//, "").split("#")[0]
    if (p && !existsSync(join(root, p))) {
      errors.push(`README.md: link target "${target}" does not exist`)
    }
  }

  // (d) npm scripts mentioned exist
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"))
  for (const m of readme.matchAll(/npm run ([a-z0-9:_-]+)/gi)) {
    if (!(m[1] in (pkg.scripts ?? {}))) {
      errors.push(`README.md: mentions "npm run ${m[1]}" but package.json has no such script`)
    }
  }

  // (e) baseUrl appears
  const cfg = readFileSync(join(root, "quartz.config.ts"), "utf8")
  const base = cfg.match(/baseUrl:\s*"([^"]+)"/)?.[1]
  if (base && !readme.includes(base)) {
    errors.push(`README.md: site baseUrl "${base}" never appears (is the live-site claim current?)`)
  }

  // (f) freshness stamp
  const stamp = readme.match(/<!--\s*readme-verified:\s*(\d{4}-\d{2}-\d{2})\s*-->/)
  if (!stamp) {
    errors.push(
      `README.md: missing "<!-- readme-verified: YYYY-MM-DD -->" stamp. Re-read the README against reality, then add the stamp with today's date.`,
    )
  } else {
    const age = (Date.now() - Date.parse(stamp[1])) / 86400000
    if (Number.isNaN(age)) {
      errors.push(`README.md: readme-verified stamp "${stamp[1]}" is not a valid date`)
    } else if (age > MAX_STAMP_AGE_DAYS) {
      errors.push(
        `README.md: readme-verified stamp (${stamp[1]}) is ${Math.floor(age)} days old (max ${MAX_STAMP_AGE_DAYS}). Re-read the README against reality, fix any drift, then bump the stamp.`,
      )
    }
  }

  return errors
}

// standalone runner (realpath both sides: Node realpaths module URLs, and on
// macOS temp/symlinked paths a lexical compare silently skips the runner)
const self = realpathSync(fileURLToPath(import.meta.url))
const invoked = process.argv[1] ? (() => { try { return realpathSync(resolve(process.argv[1])) } catch { return "" } })() : ""
if (invoked === self) {
  const root = resolve(self, "..", "..")
  const errors = checkReadme(root)
  if (errors.length) {
    console.error(`\nREADME check FAILED with ${errors.length} problem(s):\n`)
    for (const e of errors) console.error("  - " + e)
    process.exit(1)
  }
  console.log("README check passed: structure matches the repo, freshness stamp current.")
}
