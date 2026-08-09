#!/usr/bin/env node
/**
 * Briefings freshness check.
 *
 * Exists because of a real incident: between 2026-07-09 and 2026-08-09 the
 * weekly pipeline staged four briefing outlines (07-13 through 08-03) while
 * the newest published briefing stayed frozen at 07-09. The site promises a
 * weekly digest; it silently stopped shipping one, and nothing mechanical
 * noticed. Same discipline as check-readme.mjs: a cadence the site claims is
 * a claim, and claims get checked at every merge.
 *
 * Check: the newest staged outline (outlines/weekly-briefing-YYYY-MM-DD.md)
 * must not be more than MAX_LAG_DAYS newer than the newest published
 * briefing's date_added in content/briefings/. An outline is the pipeline
 * saying "a digest is due"; a published briefing is the digest shipping.
 * Fourteen days of lag is two missed cycles: from then on CI is red on every
 * merge until the pending [tier-c voice draft] briefing PR is merged.
 *
 * Runnable standalone (`node scripts/check-briefings.mjs`) and imported by
 * lint-content.mjs so the existing CI invocation covers it.
 */
import { readdirSync, readFileSync, existsSync, realpathSync } from "node:fs"
import { join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const MAX_LAG_DAYS = 14

export function checkBriefings(root) {
  const errors = []
  const outlinesDir = join(root, "outlines")
  const briefingsDir = join(root, "content", "briefings")

  // Newest staged outline, by the date in its filename.
  const outlineDates = existsSync(outlinesDir)
    ? readdirSync(outlinesDir)
        .map((f) => f.match(/^weekly-briefing-(\d{4}-\d{2}-\d{2})\.md$/)?.[1])
        .filter(Boolean)
        .sort()
    : []
  if (outlineDates.length === 0) return errors
  const newestOutline = outlineDates[outlineDates.length - 1]

  // Newest published briefing, by frontmatter date_added.
  const briefingDates = existsSync(briefingsDir)
    ? readdirSync(briefingsDir)
        .filter((f) => f.endsWith(".md") && f !== "index.md")
        .map((f) =>
          readFileSync(join(briefingsDir, f), "utf8").match(
            /^date_added:\s*["']?(\d{4}-\d{2}-\d{2})/m,
          )?.[1],
        )
        .filter(Boolean)
        .sort()
    : []
  if (briefingDates.length === 0) {
    errors.push(
      `briefings: outlines are staged (newest ${newestOutline}) but content/briefings/ has no published briefing with a date_added`,
    )
    return errors
  }
  const newestBriefing = briefingDates[briefingDates.length - 1]

  const lag = (Date.parse(newestOutline) - Date.parse(newestBriefing)) / 86400000
  if (lag > MAX_LAG_DAYS) {
    const unconverted = outlineDates.filter((d) => d > newestBriefing)
    errors.push(
      `briefings: stale by ${Math.floor(lag)} days (max ${MAX_LAG_DAYS}). ` +
        `Newest published briefing is dated ${newestBriefing}; unconverted outline(s): ` +
        `${unconverted.map((d) => `weekly-briefing-${d}`).join(", ")}. ` +
        `Merge the pending [tier-c voice draft] briefing PR (or publish a catch-up digest).`,
    )
  }
  return errors
}

// standalone runner (realpath both sides: Node realpaths module URLs, and on
// macOS temp/symlinked paths a lexical compare silently skips the runner)
const self = realpathSync(fileURLToPath(import.meta.url))
const invoked = process.argv[1] ? (() => { try { return realpathSync(resolve(process.argv[1])) } catch { return "" } })() : ""
if (invoked === self) {
  const root = resolve(self, "..", "..")
  const errors = checkBriefings(root)
  if (errors.length) {
    console.error(`\nBriefings freshness check FAILED:\n`)
    for (const e of errors) console.error("  - " + e)
    process.exit(1)
  }
  console.log("Briefings freshness check passed: no outline older than the cadence allows is unconverted.")
}
