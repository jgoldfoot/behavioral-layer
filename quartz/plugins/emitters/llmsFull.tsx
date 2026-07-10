import { QuartzEmitterPlugin } from "../types"
import { FullSlug, simplifySlug } from "../../util/path"
import { write } from "./helpers"

// Emits /llms-full.txt: the entire published corpus as one markdown document,
// the GEO companion to /llms.txt. AI engines get every note, its provenance
// metadata, and its primary source in a single fetch. Notes only; structural
// pages (indexes, about, dashboard) are excluded.

const fmtDate = (v: unknown): string => {
  if (v instanceof Date && !isNaN(v.getTime())) return v.toISOString().slice(0, 10)
  const s = String(v ?? "").trim()
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : s
}

// file.data.text is the raw source; strip a leading frontmatter fence if present.
const stripFrontmatter = (t: string): string => {
  if (!t.startsWith("---")) return t
  const end = t.indexOf("\n---", 3)
  if (end === -1) return t
  return t.slice(end + 4).replace(/^[\r\n]+/, "")
}

export const LlmsFullTxt: QuartzEmitterPlugin = () => ({
  name: "LlmsFullTxt",
  getQuartzComponents() {
    return []
  },
  async *emit(ctx, content) {
    const cfg = ctx.cfg.configuration
    const base = cfg.baseUrl ?? "behaviorlayer.ai"
    const parts: string[] = [
      `# ${cfg.pageTitle} — full corpus`,
      ``,
      `> Every published note on https://${base} in one document. Notes are drafted from primary sources, mechanically checked against a public editorial contract (EDITORIAL.md), and reviewed by a human editor before publication. Each note lists its type, section, verification date, credit, and primary source. Directory: https://${base}/llms.txt`,
      ``,
    ]
    for (const [, file] of content) {
      const fm = (file.data.frontmatter ?? {}) as Record<string, unknown>
      if (!fm.type) continue
      const slug = simplifySlug(file.data.slug!)
      const credit = Array.isArray(fm.credit)
        ? (fm.credit as unknown[]).map(String).join(", ")
        : fm.credit
          ? String(fm.credit)
          : ""
      const meta = [
        `type: ${fm.type}`,
        fm.section ? `section: ${fm.section}` : "",
        fm.last_verified ? `verified: ${fmtDate(fm.last_verified)}` : "",
        credit ? `credit: ${credit}` : "",
        fm.url ? `primary source: ${fm.url}` : "",
      ]
        .filter(Boolean)
        .join(" | ")
      parts.push(
        `---`,
        ``,
        `## ${fm.title ?? slug}`,
        ``,
        `URL: https://${base}/${slug}`,
        meta,
        ``,
        stripFrontmatter(file.data.text ?? ""),
        ``,
      )
    }
    yield write({
      ctx,
      content: parts.join("\n"),
      slug: "llms-full" as FullSlug,
      ext: ".txt",
    })
  },
  async *partialEmit() {},
})
