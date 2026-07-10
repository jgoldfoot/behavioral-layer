import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import DarkmodeConstructor from "./Darkmode"
import styles from "./styles/siteHeader.scss"
import { concatenateResources } from "../util/resources"
import { classNames } from "../util/lang"

const Darkmode = DarkmodeConstructor()

// The site-level top bar: the layer mark (three bars, the middle one the accent:
// capability below, trust above, the behavioral layer between), the wordmark, and
// a short ranked nav (Briefings, Map, About, RSS) plus the theme toggle.
export default (() => {
  const SiteHeader: QuartzComponent = (props: QuartzComponentProps) => {
    return (
      <div class={classNames(props.displayClass, "site-header")}>
        <a href="/" class="site-header-brand">
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <rect x="2" y="2.5" width="16" height="3.6" rx="1.8" class="layer-bar-outer" />
            <rect x="2" y="8.2" width="16" height="3.6" rx="1.8" class="layer-bar-mid" />
            <rect x="2" y="13.9" width="16" height="3.6" rx="1.8" class="layer-bar-outer" />
          </svg>
          <span>{props.cfg.pageTitle}</span>
        </a>
        <nav class="site-header-nav" aria-label="Site">
          <a href="/briefings/">Briefings</a>
          <a href="/graph">Map</a>
          <a href="/about">About</a>
          <a href="/index.xml">RSS</a>
          <Darkmode {...props} />
        </nav>
      </div>
    )
  }

  SiteHeader.css = concatenateResources(styles, Darkmode.css)
  SiteHeader.beforeDOMLoaded = Darkmode.beforeDOMLoaded
  return SiteHeader
}) satisfies QuartzComponentConstructor
