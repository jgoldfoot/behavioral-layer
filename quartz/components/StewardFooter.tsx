import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

// A quiet, persistent provenance line shown on every page: names the steward and links to
// the About / colophon page. Reuses the default footer stylesheet to match existing styling.
export default (() => {
  const StewardFooter: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    // Copyright covers the site's original writing and synthesis; cited sources remain
    // their authors'. Year is stamped at build time.
    const year = new Date().getFullYear()
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          {cfg.pageTitle} · curated by Joel Goldfoot ·{" "}
          <a href="/about">How this site is made</a>
        </p>
        <p class="copyright" style={{ marginTop: "0.4rem", fontSize: "0.85em", opacity: 0.7 }}>
          © {year} Joel Goldfoot
        </p>
      </footer>
    )
  }

  StewardFooter.css = style
  return StewardFooter
}) satisfies QuartzComponentConstructor
