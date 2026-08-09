#!/usr/bin/env node
/**
 * Reverification staleness check.
 *
 * Exists because of a real finding: as of 2026-08-09, every note in content/
 * had last_verified equal to date_added. Zero reverifications had ever been
 * performed in the site's history, while EDITORIAL clause 2.3 promised a
 * 30-day reverification window and the About page described a maintenance
 * loop to readers. The loop existed only as an unexecuted Obsidian query on
 * the maintainer's laptop. That is a promise enforced by nothing.
 *
 * This check does not pretend the 30-day window is being met. It enforces a
 * hard ceiling that cannot be missed silently, and it prints the backlog
 * against the clause 2.3 target on every run so the gap stays visible instead
 * of invisible. The weekly run owns clearing it, oldest first.
 *
 * Two thresholds, deliberately different:
 *   TARGET_DAYS (30)  = clause 2.3's window. Reported, never fails a build.
 *   CEILING_DAYS (90) = the hard floor under the promise. Fails CI.
 *
 * Runnable standalone (`node scripts/check-staleness.mjs`) and imported by
 * lint-content.mjs so the existing CI invocation covers it.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs"
import { join, relative, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"

const TARGET_DAYS = 30
const CEILING_DAYS = 90

function walk(dir) {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (e.isFile() && e.name.endsWith(".md")) out.push(p)
  }
  return out
}

export function checkStaleness(root, today = new Date()) {
  const errors = []
  const content = join(root, "content")
  if (!existsSync(content)) return errors

  const aged = []
  for (const file of walk(content)) {
    const text = readFileSync(file, "utf8")
    const lv = text.match(/^last_verified:\s*["']?(\d{4}-\d{2}-\d{2})/m)
    if (!lv) continue
    const days = Math.floor((today.getTime() - Date.parse(lv[1])) / 86400000)
    if (Number.isNaN(days)) continue
    aged.push({ file: relative(root, file).split(sep).join("/"), days, date: lv[1] })
  }
  if (aged.length === 0) return errors

  aged.sort((a, b) => b.days - a.days)
  const overCeiling = aged.filter((n) => n.days > CEILING_DAYS)
  const overTarget = aged.filter((n) => n.days > TARGET_DAYS)

  // Visible backlog on every run, pass or fail. Silence is how this failed before.
  console.log(
    `Reverification backlog: ${overTarget.length}/${aged.length} note(s) past the ` +
      `${TARGET_DAYS}-day clause 2.3 target; oldest is ${aged[0].days}d (${aged[0].file}). ` +
      `Hard ceiling ${CEILING_DAYS}d.`,
  )

  if (overCeiling.length) {
    errors.push(
      `staleness: ${overCeiling.length} note(s) past the ${CEILING_DAYS}-day hard ceiling. ` +
        `Reverify against the primary source and bump last_verified (add "## Since publication" ` +
        `if the source moved): ` +
        overCeiling
          .slice(0, 5)
          .map((n) => `${n.file} (${n.days}d)`)
          .join(", ") +
        (overCeiling.length > 5 ? `, +${overCeiling.length - 5} more` : ""),
    )
  }
  return errors
}

// standalone runner (realpath both sides: Node realpaths module URLs, and on
// macOS temp/symlinked paths a lexical compare silently skips the runner)
import { realpathSync } from "node:fs"
const self = realpathSync(fileURLToPath(import.meta.url))
const invoked = process.argv[1] ? (() => { try { return realpathSync(resolve(process.argv[1])) } catch { return "" } })() : ""
if (invoked === self) {
  const errors = checkStaleness(resolve(self, "..", ".."))
  if (errors.length) {
    console.error(`\nStaleness check FAILED:\n`)
    for (const e of errors) console.error("  - " + e)
    process.exit(1)
  }
  console.log("Staleness check passed: no note past the hard ceiling.")
}
