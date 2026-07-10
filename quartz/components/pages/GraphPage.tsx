import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
// @ts-ignore
import script from "../scripts/graphpage.inline"
import styles from "../styles/graphPage.scss"

// The /graph destination page: the corpus as a map (2D, theme-aware) or a galaxy
// (3D, dark-only), one toggle apart. Shareable URL; esc or the close button
// returns to the page you came from; ?from=<slug> draws the you-are-here ring.
export default (() => {
  const GraphPage: QuartzComponent = (_props: QuartzComponentProps) => {
    return (
      <div id="bl-graph-page">
        <div class="bl-graph-head">
          <span class="bl-graph-title">
            <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
              <rect x="2" y="2.5" width="16" height="3.6" rx="1.8" class="layer-bar-outer" />
              <rect x="2" y="8.2" width="16" height="3.6" rx="1.8" class="layer-bar-mid" />
              <rect x="2" y="13.9" width="16" height="3.6" rx="1.8" class="layer-bar-outer" />
            </svg>
            Site graph
          </span>
          <div class="bl-graph-seg" role="tablist" aria-label="Graph view">
            <button data-view="map" role="tab">
              Map
            </button>
            <button data-view="galaxy" role="tab">
              Galaxy
            </button>
          </div>
          <span class="bl-graph-count" id="bl-graph-count"></span>
          <div class="bl-graph-spacer"></div>
          <input
            id="bl-graph-q"
            type="text"
            placeholder="Find a note"
            aria-label="Find a note in the map"
          />
          <span class="bl-graph-esc">esc</span>
          <button id="bl-graph-close" aria-label="Back to the page you came from" title="Back">
            ✕
          </button>
        </div>
        <div
          class="bl-graph-legend"
          id="bl-graph-legend"
          role="group"
          aria-label="Filter by section"
        ></div>
        <div class="bl-graph-canvas-wrap">
          <canvas id="bl-graph-canvas" aria-label="Map of every note on the site"></canvas>
        </div>
        <div class="bl-graph-help">
          node size = how linked a note is · ◉ = where you came from · galaxy: click a star to fly
          to it, click it again to open it, click the void to fly home
        </div>
      </div>
    )
  }

  GraphPage.css = styles
  GraphPage.afterDOMLoaded = script
  return GraphPage
}) satisfies QuartzComponentConstructor
