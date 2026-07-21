import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import styles from "./styles/provenance.scss"
import { classNames } from "../util/lang"

// The provenance strip: each note's CI-enforced frontmatter (type, primary source,
// verification date, credit) rendered as visible receipts under the title.
// Resource notes show their tier-1 source link; concept notes claim authorship.
// Structural pages (indexes, about, home) render nothing.

const fmtDate = (v: unknown): string | null => {
  if (!v) return null
  if (v instanceof Date && !isNaN(v.getTime())) return v.toISOString().slice(0, 10)
  const s = String(v).trim()
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : null
}

export default (() => {
  const Provenance: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>
    const slug = fileData.slug ?? ""
    const structural =
      ["index", "structural", "home"].includes(String(fm.noteType ?? "")) ||
      slug === "index" ||
      slug.endsWith("/index")
    const type = fm.type ? String(fm.type) : null
    if (structural || !type) return null

    const isConcept = type === "concept"
    const credit = Array.isArray(fm.credit)
      ? (fm.credit as unknown[]).map(String).join(", ")
      : fm.credit
        ? String(fm.credit)
        : null
    const verified = fmtDate(fm.last_verified)
    const url = fm.url ? String(fm.url) : null
    const tier = String(fm.source_tier ?? "")

    return (
      <div class={classNames(displayClass, "provenance")}>
        <span class="chip chip-kind">{type}</span>
        {isConcept ? (
          <span class="chip">Original synthesis</span>
        ) : url ? (
          <a
            class="chip chip-src"
            href={url}
            target="_blank"
            rel="noopener"
            title="Tier 1 means the primary artifact itself (the paper, model card, changelog, or repo) rather than secondhand coverage. It is a provenance tier, not a peer-review judgment."
          >
            {tier === "1" ? "Tier-1 primary source" : "Primary source"} ↗
          </a>
        ) : null}
        {verified && (
          <span class="chip">
            <span class="tick">✓</span> Verified <span class="dt">{verified}</span>
          </span>
        )}
        {credit && <span class="chip">{isConcept ? credit : `Credit: ${credit}`}</span>}
      </div>
    )
  }

  Provenance.css = styles
  return Provenance
}) satisfies QuartzComponentConstructor
