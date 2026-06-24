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

// ---- build link-resolution index -------------------------------------------
const relNoExt = new Set() // "evaluate/swe-bench", "behavior/index", ...
const slugs = new Set() // basenames: "swe-bench", "index", ...
const toPosix = (p) => p.split(sep).join("/")
for (const f of files) {
  const rel = toPosix(relative(CONTENT, f)).replace(/\.md$/, "")
  relNoExt.add(rel)
  slugs.add(basename(rel))
}

function resolvesInternal(target, fromFileRel) {
  let t = target.split("#")[0].split("|")[0].trim()
  if (t === "") return true // pure same-page anchor
  return (
    relNoExt.has(t) ||
    relNoExt.has(`${t}/index`) ||
    slugs.has(basename(t)) ||
    relNoExt.has(toPosix(join(dirname(fromFileRel), t)))
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
    ? p.replace(/^\//, "")
    : toPosix(join(fromDir, p))
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
    // url is required for resource notes; optional for concept notes.
    const required = isConcept ? REQUIRED_BASE : [...REQUIRED_BASE, "url"]
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
      if (!resolvesInternal(m[1], rel)) {
        err(file, `broken wikilink: [[${m[1]}]]`, ln)
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
