import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { FullPageLayout } from "../../cfg"
import { FullSlug } from "../../util/path"
import { sharedPageComponents } from "../../../quartz.layout"
import { GraphPage as GraphPageComponent } from "../../components"
import { defaultProcessedContent } from "../vfile"
import { write } from "./helpers"

// Emits the /graph destination page: the full corpus map (2D) and galaxy (3D).
// A real, shareable URL rather than a modal; follows the 404 emitter pattern.
export const GraphPage: QuartzEmitterPlugin = () => {
  const opts: FullPageLayout = {
    ...sharedPageComponents,
    pageBody: GraphPageComponent(),
    beforeBody: [],
    left: [],
    right: [],
  }

  const { head: Head, header, pageBody, footer: Footer } = opts
  const Body = BodyConstructor()

  return {
    name: "GraphPage",
    getQuartzComponents() {
      return [Head, ...header, Body, pageBody, Footer]
    },
    async *emit(ctx, _content, resources) {
      const cfg = ctx.cfg.configuration
      const slug = "graph" as FullSlug

      const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
      const path = url.pathname as FullSlug
      const title = "Site graph"
      const [tree, vfile] = defaultProcessedContent({
        slug,
        text: title,
        description: "A map of every note on the site, by section.",
        frontmatter: { title, tags: [] },
      })
      const externalResources = pageResources(path, resources)
      const componentData: QuartzComponentProps = {
        ctx,
        fileData: vfile.data,
        externalResources,
        cfg,
        children: [],
        tree,
        allFiles: [],
      }

      yield write({
        ctx,
        content: renderPage(cfg, slug, componentData, opts, externalResources),
        slug,
        ext: ".html",
      })
    },
    async *partialEmit() {},
  }
}
