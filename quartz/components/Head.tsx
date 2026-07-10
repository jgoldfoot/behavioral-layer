import { i18n } from "../i18n"
import { FullSlug, getFileExtension, joinSegments, pathToRoot, simplifySlug } from "../util/path"
import { CSSResourceToStyleElement, JSResourceToScriptElement } from "../util/resources"
import { googleFontHref, googleFontSubsetHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { unescapeHTML } from "../util/escape"
import { CustomOgImagesEmitterName } from "../plugins/emitters/ogImage"
export default (() => {
  const Head: QuartzComponent = ({
    cfg,
    fileData,
    externalResources,
    ctx,
  }: QuartzComponentProps) => {
    const titleSuffix = cfg.pageTitleSuffix ?? ""
    const rawTitle = fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
    // Append the site name to inner-page titles, but not to the home page (whose title is
    // already the site name) to avoid "The Behavioral Layer · The Behavioral Layer".
    const title = rawTitle === cfg.pageTitle ? rawTitle : rawTitle + titleSuffix
    const description =
      fileData.frontmatter?.socialDescription ??
      fileData.frontmatter?.description ??
      unescapeHTML(fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description)

    const { css, js, additionalHead } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)
    const iconPath = joinSegments(baseDir, "static/icon.png")

    // Url of current page
    const socialUrl =
      fileData.slug === "404" ? url.toString() : joinSegments(url.toString(), fileData.slug!)

    const usesCustomOgImage = ctx.cfg.plugins.emitters.some(
      (e) => e.name === CustomOgImagesEmitterName,
    )
    const ogImageDefaultPath = `https://${cfg.baseUrl}/static/og-image.png`

    // Structured data (JSON-LD), one consolidated @graph on every page:
    // a WebSite and its steward (Person + authored Book), plus an Article entity on
    // note pages (pages that carry a note `type` in frontmatter).
    const siteUrl = `https://${cfg.baseUrl ?? "behaviorlayer.ai"}`
    const personId = "https://goldfoot.com/#person"
    const websiteId = `${siteUrl}/#website`
    // Clean canonical URL (trailing "index" trimmed) for <link rel="canonical"> and JSON-LD.
    const canonicalSlug = fileData.slug === "404" ? "/" : simplifySlug(fileData.slug!)
    const canonicalUrl = canonicalSlug === "/" ? `${siteUrl}/` : `${siteUrl}/${canonicalSlug}`
    const isNote = Boolean(fileData.frontmatter?.type)
    const created = fileData.dates?.created
    const modified = fileData.dates?.modified
    const tags: string[] = (fileData.frontmatter?.tags as string[] | undefined) ?? []
    const jsonLdGraph: Record<string, unknown>[] = [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: cfg.pageTitle,
        url: siteUrl,
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "Joel Goldfoot",
        jobTitle: "Product Design & Research Executive",
        sameAs: [
          "https://orcid.org/0009-0007-1843-2089",
          "https://www.linkedin.com/in/goldfoot",
          "https://blog.goldfoot.com",
          "https://bimodal.design",
          "https://www.amazon.com/dp/B0FQ33T8P3",
        ],
      },
      {
        "@type": "Book",
        "@id": "https://goldfoot.com/#book-how-to-lead-design",
        name: "How to Lead Design in the AI Era",
        isbn: "979-8263047221",
        author: { "@id": personId },
      },
    ]
    if (isNote) {
      const section = canonicalSlug.split("/")[0]
      jsonLdGraph.push({
        "@type": "TechArticle",
        "@id": `${canonicalUrl}#article`,
        headline: fileData.frontmatter?.title ?? rawTitle,
        description,
        url: canonicalUrl,
        isPartOf: { "@id": websiteId },
        // Author is the field E-E-A-T and AI-engine attribution actually read.
        author: { "@id": personId },
        publisher: { "@id": personId },
        editor: { "@id": personId },
        ...(section ? { articleSection: section } : {}),
        ...(tags.length ? { keywords: tags.join(", ") } : {}),
        ...(created ? { datePublished: new Date(created).toISOString() } : {}),
        ...(modified ? { dateModified: new Date(modified).toISOString() } : {}),
      })
    }
    // Breadcrumb trail mirroring the visible breadcrumbs: Home > Section > Page.
    if (canonicalSlug !== "/") {
      const parts = canonicalSlug.replace(/\/$/, "").split("/")
      const items: Record<string, unknown>[] = [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      ]
      if (parts.length === 2) {
        items.push({
          "@type": "ListItem",
          position: 2,
          name: parts[0].charAt(0).toUpperCase() + parts[0].slice(1),
          item: `${siteUrl}/${parts[0]}/`,
        })
      }
      items.push({ "@type": "ListItem", position: items.length + 1, name: rawTitle })
      jsonLdGraph.push({
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumbs`,
        itemListElement: items,
      })
    }
    const jsonLd = { "@context": "https://schema.org", "@graph": jsonLdGraph }

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href={googleFontHref(cfg.theme)} />
            {cfg.theme.typography.title && (
              <link rel="stylesheet" href={googleFontSubsetHref(cfg.theme, cfg.pageTitle)} />
            )}
          </>
        )}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="og:site_name" content={cfg.pageTitle}></meta>
        <meta property="og:title" content={title} />
        <meta property="og:type" content={isNote ? "article" : "website"} />
        {isNote && created && (
          <meta property="article:published_time" content={new Date(created).toISOString()} />
        )}
        {isNote && modified && (
          <meta property="article:modified_time" content={new Date(modified).toISOString()} />
        )}
        {isNote && <meta property="article:author" content="Joel Goldfoot" />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image:alt" content={description} />

        {!usesCustomOgImage && (
          <>
            <meta property="og:image" content={ogImageDefaultPath} />
            <meta property="og:image:url" content={ogImageDefaultPath} />
            <meta name="twitter:image" content={ogImageDefaultPath} />
            <meta
              property="og:image:type"
              content={`image/${getFileExtension(ogImageDefaultPath) ?? "png"}`}
            />
          </>
        )}

        {cfg.baseUrl && (
          <>
            <meta property="twitter:domain" content={cfg.baseUrl}></meta>
            <meta property="og:url" content={socialUrl}></meta>
            <meta property="twitter:url" content={socialUrl}></meta>
          </>
        )}

        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {css.map((resource) => CSSResourceToStyleElement(resource, true))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
        {additionalHead.map((resource) => {
          if (typeof resource === "function") {
            return resource(fileData)
          } else {
            return resource
          }
        })}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
