import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  // The site-level top bar: layer mark + wordmark, ranked nav, theme toggle.
  header: [Component.SiteHeader()],
  afterBody: [],
  // Persistent steward / provenance line on every page, linking to /about.
  footer: Component.StewardFooter(),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    // Provenance strip: the note's CI-enforced frontmatter as visible receipts.
    Component.Provenance(),
    Component.TagList(),
  ],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
      ],
    }),
    // Outline | Map: the text tree and the neighborhood galaxy as peer
    // wayfinding modalities, with a drag splitter on the panel edge.
    Component.NavPanel(Component.Explorer()),
  ],
  // TOC and backlinks do the contextual work; the graph is an ambient thumbnail
  // whose expand icon leads to the /graph destination page.
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.Graph(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle()],
  left: [
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
      ],
    }),
    // Outline | Map: the text tree and the neighborhood galaxy as peer
    // wayfinding modalities, with a drag splitter on the panel edge.
    Component.NavPanel(Component.Explorer()),
  ],
  right: [],
}
