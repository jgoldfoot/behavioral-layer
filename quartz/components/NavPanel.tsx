import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/navpanel.inline"
import styles from "./styles/navPanel.scss"
import { concatenateResources } from "../util/resources"
import { simplifySlug } from "../util/path"

// The left panel as a choice of wayfinding modality: the traditional outline
// (Explorer) or the map (the galaxy renderer scoped to the open note's
// neighborhood), one tab apart, with a grab-and-drag splitter deciding how much
// room the map deserves. Desktop instrument: on mobile the outline stands alone.
export default ((outline: QuartzComponent) => {
  const Outline = outline

  const NavPanel: QuartzComponent = (props: QuartzComponentProps) => {
    const from = props.fileData.slug ? simplifySlug(props.fileData.slug) : ""
    return (
      <div class="nav-panel">
        <div class="nav-panel-tabs" role="tablist" aria-label="Navigation mode">
          <button class="nav-tab" data-tab="outline" role="tab">
            Outline
          </button>
          <button class="nav-tab" data-tab="map" role="tab">
            Map
          </button>
        </div>
        <div class="nav-panel-outline" data-pane="outline">
          <Outline {...props} />
        </div>
        <div class="nav-panel-map" data-pane="map">
          <canvas
            class="nav-panel-canvas"
            aria-label="3D neighborhood map of the open note"
          ></canvas>
          <div class="nav-panel-foot">
            the open note's neighborhood ·{" "}
            <a href={`/graph?from=${encodeURIComponent(from)}`}>Full map ↗</a>
          </div>
        </div>
        <div
          class="nav-splitter"
          role="separator"
          aria-label="Drag to resize the navigation panel"
          title="Drag to resize"
        ></div>
      </div>
    )
  }

  NavPanel.css = concatenateResources(styles, outline.css)
  NavPanel.afterDOMLoaded = concatenateResources(script, outline.afterDOMLoaded)
  NavPanel.beforeDOMLoaded = outline.beforeDOMLoaded
  return NavPanel
}) satisfies QuartzComponentConstructor<QuartzComponent>
