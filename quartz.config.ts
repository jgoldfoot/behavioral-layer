import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The Behavioral Layer",
    pageTitleSuffix: " · The Behavioral Layer",
    enableSPA: true,
    enablePopovers: true,
    // No third-party analytics until the owner opts in. See README.
    analytics: null,
    locale: "en-US",
    // Used for the sitemap, RSS feed, and OG images.
    baseUrl: "behaviorlayer.ai",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      // Brand match with bimodal.design: Inter + Fira Code, emerald-green accent.
      typography: {
        header: "Inter",
        body: "Inter",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#e5e7eb",
          gray: "#9ca3af",
          darkgray: "#3a3f4b",
          dark: "#1f2937",
          secondary: "#059669",
          tertiary: "#42b883",
          highlight: "rgba(58, 63, 75, 0.06)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#1a1a1a",
          lightgray: "#333333",
          gray: "#525a66",
          darkgray: "#d1d5db",
          dark: "#f5f5f4",
          secondary: "#34d399",
          tertiary: "#42d392",
          highlight: "rgba(235, 235, 245, 0.06)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest", openLinksInNewTab: true }),
      // Cap auto-derived meta descriptions near the SERP display limit.
      Plugin.Description({ maxDescriptionLength: 165 }),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // The /graph destination page: full corpus map (2D) + galaxy (3D).
      Plugin.GraphPage(),
      // GEO: the full corpus as one markdown document at /llms-full.txt.
      Plugin.LlmsFullTxt(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
