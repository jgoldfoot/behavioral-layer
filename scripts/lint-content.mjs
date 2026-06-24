#!/usr/bin/env node
/**
 * Content linter for The Behavioral Layer.
 *
 * Enforces the CI-marked clauses of EDITORIAL.md against every note in content/:
 *   (a) every resource note has a `url` pointing to a primary source        [clause 1.1]
 *   (b) required frontmatter present, valid enums, valid dates              [clause 7.1]
 *       - `superseded_by` required when status is "superseded"              [clause 5.2]
 *       - `## Builder read` and `## Exec read` sections both present        [clause 3.1]
 *   (c) every internal link / wikilink resolves to an existing note         [clause 7.3]
 *   (d) every internal wikilink targets a real filename via the piped form,
 *       not a bare title or alias                                          [clause 7.4]
 *   plus: no em-dashes anywhere                                             [clause 6.1]
 *
 * Structural pages (any index.md, dashboard.md, or a note whose frontmatter
 * sets noteType: index | structural | home) are exempt from the resource-note
 * frontmatter rules, but are still link-checked and em-dash-checked.
 *
 * No third-party dependencies beyond gray-matter (already a Quartz dependency).
 * Run: `node scripts/lint-content.mjs`  ->  exit 0 clean, exit 1 on any error.
 */
import { readdirSync, readFileSync } from "node:fs"
import { join, relative, dirname, basename, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"

const ROOT = resolve(fileURLToPath(import.meta.url), "..", "..")
const CONTENT = join(ROOT, "content")

const ENUMS = {
  type: ["model", "tool", "framework", "paper", "repo", "benchmark", "post", "news", "concept"],
  section: ["behavior", "evaluate", "build", "models", "research", "signal", "briefings"],
  audience: ["builder", "exec", "both"],
  source_tier: ["1", "2", "3", "original"],
  status: ["live", "deprecated", "superseded"],
}
// Required on every non-structural note. `url` is added on top of this for resource notes
// but is optional for concept notes (type: concept), which are original synthesis.
const REQUIRED_BASE = [
  "title",
  "type",
  "section",
  "audience",
  "source_tier",
  "date_added",
  "last_verified",
  "status",
]
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const EM_DASH_RE = /[—―]/ // em dash, horizontal bar

const errors = []
const err = (file, msg, line) =>
  errors.push(`${relative(ROOT, file)}${line ? `:${line}` : ""}  ${msg}`)

// ---- collect markdown files -------------------------------------------------
function walk(dir) {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (e.isFile() && e.name.endsWith(".md")) out.push(p)
  }
  return out
}
const files = walk(CONTENT)

// ---- build link-resolution index (mirrors Quartz slug + alias resolution) ---
// Quartz's sluggify (quartz/util/path.ts) is case-preserving: it replaces
// whitespace with "-", "&" with "-and-", "%" with "-percent", and strips "?"/"#".
// A note's `aliases` become reachable slugs via Quartz's AliasRedirects emitter,
// so a wikilink like [[Constitutional AI]] resolves to constitutional-ai.md only
// because that note declares the alias. We add alias slugs to the index too, and
// resolve case-sensitively, exactly as the built site does.
const sluggifySeg = (seg) =>
  seg
    .replace(/\s/g, "-")
    .replace(/&/g, "-and-")
    .replace(/%/g, "-percent")
    .replace(/\?/g, "")
    .replace(/#/g, "")
const sluggify = (p) => p.split("/").map(sluggifySeg).join("/")

const fileRel = new Set() // real-file full slugs only (no aliases)
const fileBase = new Set() // real-file last segments only (no aliases)
const relNoExt = new Set() // real files + aliases (alias-aware resolution)
const slugs = new Set() // last segment: real files + aliases
const aliasToFile = new Map() // alias slug -> the real filename that declares it
const toPosix = (p) => p.split(sep).join("/")
for (const f of files) {
  const rel = sluggify(toPosix(relative(CONTENT, f)).replace(/\.md$/, ""))
  fileRel.add(rel)
  fileBase.add(basename(rel))
  relNoExt.add(rel)
  slugs.add(basename(rel))
  // aliases extend the reachable slug set (Quartz AliasRedirects) so a link is not
  // "broken", but aliases are NOT real filenames -- the piped-link convention
  // (clause 7.4) requires links to target the filename, so we track them separately.
  try {
    const aliases = matter(readFileSync(f, "utf8")).data?.aliases
    const list = Array.isArray(aliases) ? aliases : aliases ? [aliases] : []
    for (const a of list) {
      const aslug = sluggify(toPosix(String(a)))
      relNoExt.add(aslug)
      slugs.add(basename(aslug))
      aliasToFile.set(aslug, basename(rel))
      aliasToFile.set(basename(aslug), basename(rel))
    }
  } catch {
    /* malformed frontmatter is reported in the per-file pass below */
  }
}

function resolvesInternal(target, fromFileRel) {
  let t = target.split("#")[0].split("|")[0].trim()
  if (t === "") return true // pure same-page anchor
  t = t.replace(/^\//, "")
  const ts = sluggify(t)
  return (
    relNoExt.has(ts) ||
    relNoExt.has(`${ts}/index`) ||
    slugs.has(basename(ts)) ||
    relNoExt.has(sluggify(toPosix(join(dirname(fromFileRel), t))))
  )
}

// A wikilink "targets a real filename" if it resolves against the real-file slug
// set, NOT only via an alias. The piped-link convention (clause 7.4) requires this.
function targetsRealFile(target, fromFileRel) {
  let t = target.split("#")[0].split("|")[0].trim()
  if (t === "") return true
  t = t.replace(/^\//, "")
  const ts = sluggify(t)
  return (
    fileRel.has(ts) ||
    fileRel.has(`${ts}/index`) ||
    fileBase.has(basename(ts)) ||
    fileRel.has(sluggify(toPosix(join(dirname(fromFileRel), t))))
  )
}

function resolvesMarkdown(url, fromFileRel) {
  let u = url.trim().split(/\s+/)[0] // drop any "title" after the URL
  u = u.replace(/^<|>$/g, "")
  if (/^(https?:|mailto:|tel:)/i.test(u)) return /^https?:\/\/\S+/i.test(u) || true
  if (u.startsWith("#")) return true
  let p = u.split("#")[0].replace(/\/$/, "").replace(/\.md$/, "")
  if (p === "") return true
  const fromDir = dirname(fromFileRel)
  const abs = p.startsWith("/")
    ? sluggify(p.replace(/^\//, ""))
    : sluggify(toPosix(join(fromDir, p)))
  return relNoExt.has(abs) || relNoExt.has(`${abs}/index`) || slugs.has(basename(abs))
}

// ---- per-file checks --------------------------------------------------------
for (const file of files) {
  const raw = readFileSync(file, "utf8")
  const rel = toPosix(relative(CONTENT, file))
  let parsed
  try {
    parsed = matter(raw)
  } catch (e) {
    err(file, `frontmatter does not parse as YAML: ${e.message}`)
    continue
  }
  const data = parsed.data || {}
  const body = parsed.content

  const isStructural =
    basename(file) === "index.md" ||
    rel === "dashboard.md" ||
    ["index", "structural", "home"].includes(String(data.noteType || ""))

  // ---- (b) note frontmatter (resource notes + concept notes) ---------------
  const isConcept = String(data.type) === "concept"
  if (!isStructural) {
    // url and credit are required for resource notes; both optional for concept notes.
    const required = isConcept ? REQUIRED_BASE : [...REQUIRED_BASE, "url", "credit"]
    for (const field of required) {
      const v = data[field]
      if (v === undefined || v === null || String(v).trim() === "") {
        err(file, `missing required frontmatter field: ${field}`)
      }
    }
    // (a) url, when present, must be well-formed
    if (data.url && !/^https?:\/\/\S+/i.test(String(data.url))) {
      err(file, `url must be an http(s) primary-source URL (got: ${data.url})`)
    }
    // enums
    for (const [field, allowed] of Object.entries(ENUMS)) {
      if (data[field] !== undefined && !allowed.includes(String(data[field]))) {
        err(file, `invalid ${field}: "${data[field]}" (allowed: ${allowed.join(", ")})`)
      }
    }
    // dates. YAML parses an unquoted `2026-06-24` into a Date object, which is the
    // idiomatic Obsidian/Dataview form, so accept both Date objects and strings.
    for (const field of ["date_added", "last_verified"]) {
      const v = data[field]
      if (v === undefined || v === null || String(v).trim() === "") continue
      let s
      if (v instanceof Date) {
        if (Number.isNaN(v.getTime())) {
          err(file, `invalid ${field}: unparseable date`)
          continue
        }
        s = v.toISOString().slice(0, 10) // normalize via UTC -> YYYY-MM-DD
      } else {
        s = String(v).trim()
      }
      if (!DATE_RE.test(s) || Number.isNaN(Date.parse(s))) {
        err(file, `invalid ${field}: "${v}" (expected valid YYYY-MM-DD)`)
      }
    }
    // tags must be a list if present
    if (data.tags !== undefined && data.tags !== null && !Array.isArray(data.tags)) {
      err(file, `tags must be a list (got: ${typeof data.tags})`)
    }
    // credit: a string or a list of strings. Required for resource notes (enforced by the
    // `required` set above); optional for concept notes. Validate shape when present.
    if (data.credit !== undefined && data.credit !== null) {
      const c = data.credit
      const wellFormed =
        typeof c === "string" || (Array.isArray(c) && c.every((x) => typeof x === "string"))
      if (!wellFormed) err(file, `credit must be a string or a list of strings`)
    }
    // superseded lifecycle
    if (String(data.status) === "superseded") {
      const sb = data.superseded_by
      if (!sb || String(sb).trim() === "") {
        err(file, `status is "superseded" but superseded_by is empty (clause 5.2)`)
      }
    }
    // dual-audience sections (resource notes only; concept notes use a free-form body)
    if (!isConcept) {
      if (!/^##\s+Builder read\s*$/m.test(body)) {
        err(file, `missing "## Builder read" section (clause 3.1)`)
      }
      if (!/^##\s+Exec read\s*$/m.test(body)) {
        err(file, `missing "## Exec read" section (clause 3.1)`)
      }
    }
  }

  // superseded_by wikilink (if present) must resolve
  if (data.superseded_by && String(data.superseded_by).trim() !== "") {
    const m = String(data.superseded_by).match(/\[\[([^\]]+)\]\]/)
    const target = m ? m[1] : String(data.superseded_by)
    if (!resolvesInternal(target, rel)) {
      err(file, `superseded_by points to a note that does not exist: ${target}`)
    }
  }

  // ---- em-dash + (c) link checks (line-aware, skipping code) ---------------
  const lines = raw.split(/\r?\n/)
  let inFence = false
  lines.forEach((line, i) => {
    const ln = i + 1
    if (EM_DASH_RE.test(line)) {
      err(file, `em-dash found -- use "--", parentheses, or a colon (clause 6.1)`, ln)
    }
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      return
    }
    if (inFence) return
    const text = line.replace(/`[^`]*`/g, "") // drop inline code spans
    // wikilinks: [[target]] and embeds ![[target]]
    for (const m of text.matchAll(/!?\[\[([^\]]+)\]\]/g)) {
      const link = m[1]
      if (!resolvesInternal(link, rel)) {
        err(file, `broken wikilink: [[${link}]]`, ln)
      } else if (!targetsRealFile(link, rel)) {
        // resolves, but only via an alias/title: enforce the piped-filename form.
        const targetPart = link.split("|")[0].split("#")[0].trim().replace(/^\//, "")
        const display = link.includes("|") ? link.slice(link.indexOf("|") + 1) : link
        const suggest =
          aliasToFile.get(sluggify(targetPart)) ||
          aliasToFile.get(basename(sluggify(targetPart))) ||
          "<filename>"
        err(
          file,
          `wikilink [[${link}]] targets a title/alias, not a real filename; ` +
            `use the piped form [[${suggest}|${display}]] (clause 7.4)`,
          ln,
        )
      }
    }
    // markdown links: [text](target)
    for (const m of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      if (!resolvesMarkdown(m[1], rel)) {
        err(file, `broken link: (${m[1]})`, ln)
      }
    }
  })
}

// ---- report -----------------------------------------------------------------
const schemaChecked = files.filter(
  (f) => basename(f) !== "index.md" && toPosix(relative(CONTENT, f)) !== "dashboard.md",
).length
if (errors.length) {
  console.error(`\nContent lint FAILED with ${errors.length} problem(s):\n`)
  for (const e of errors) console.error("  - " + e)
  console.error(
    `\nScanned ${files.length} note(s) in content/ (${schemaChecked} schema-checked note(s)).`,
  )
  console.error("See EDITORIAL.md for the governing rules.\n")
  process.exit(1)
}
console.log(
  `Content lint passed: ${files.length} note(s) in content/ ` +
    `(${schemaChecked} schema-checked note(s)), 0 problems.`,
)
