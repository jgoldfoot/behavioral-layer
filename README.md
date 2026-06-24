# The Behavioral Layer

A public, version-controlled knowledge base on the behavioral, trust, and experience layer
of agentic products: the layer above raw model capability that decides whether an agent is
something a person can actually rely on. It covers behavioral contracts, guardrails,
escalation, failure and repair, confidence and disclosure, and trust scaffolding, and reads
every framework, eval, model, and paper through that lens for two audiences at once
(builders and execs).

Accuracy is the brand. The governing standard for all content is
**[EDITORIAL.md](./EDITORIAL.md)**.

This is Stage 1: the vault scaffold, the note format, the editorial contract, the CI
guardrails, the publish config, and two exemplar notes. There is no research, scraping, or
drafting automation yet, by design.

## One repo, two things

This repository is simultaneously:

1. **An Obsidian vault.** Open the repository folder in Obsidian and author notes in
   `content/`. Wikilinks, backlinks, tags, the dashboard, and templates all work in Obsidian.
2. **A website.** [Quartz v4](https://quartz.jzhao.xyz) builds `content/` into a static site
   with wikilinks, backlinks, a graph view, and full-text search. The site title is
   "The Behavioral Layer".

The same Markdown files are the source of truth for both. You write in Obsidian; Quartz
publishes. Nothing outside `content/` is published (so `_templates/`, scripts, and config
stay private to the repo).

## Layout

```
content/            the vault and the published site (Markdown notes)
  behavior/         the thesis core: contracts, guardrails, escalation, repair, trust
  evaluate/         evals, benchmarks, observability, red-teaming
  build/            agent frameworks, orchestration, memory, tool use, harnesses
  models/           frontier models read through the agent-behavior lens
  research/         papers, where the synthesis is the value
  signal/           dated "what shipped / what changed" entries
  briefings/        the exec lens; weekly digest
  index.md          site home
  dashboard.md      Dataview views (freshness, audience, lifecycle)
_templates/         Templater note templates (resource.md); not published
scripts/            CI guardrail scripts (content linter, denylist check)
.editorial/         forbidden-term guardrail config (real list is never committed)
.github/workflows/  CI (runs the guardrails and the build on every PR and push to main)
quartz.config.ts    site configuration (title, plugins)
quartz.layout.ts    page layout (search, graph, backlinks, explorer)
EDITORIAL.md        the content behavioral contract: the governing standard
```

## Run it locally

Requires Node 22+ and npm 10.9+.

```bash
npm install            # once
npm run serve          # build + local preview at http://localhost:8080
npm run build          # one-off static build into public/
```

`npm run serve` hot-reloads as you edit `content/`.

## Add a note

1. In Obsidian, create a note from the **resource** template (`_templates/resource.md`)
   inside the right section folder under `content/`. The template fills the frontmatter
   schema and the body sections (summary, Why it matters, Builder read, Exec read, Caveats,
   Source, Related).
2. Fill in a `url` to a primary source. **This is required:** CI fails without it.
3. Write both the **Builder read** and the **Exec read**. Both are required.
4. Keep the house style: no em-dashes (use `--`, parentheses, or a colon), and name only
   public frameworks, models, papers, and tools.
5. Run the guardrails before you push:

   ```bash
   npm run lint           # content linter + denylist check
   ```

   The linter checks: every resource note has a `url`; required frontmatter fields exist and
   use valid enum values; dates are valid; the dual-audience sections are present; no
   em-dashes; and every internal link and wikilink resolves. CI runs the same checks plus a
   forbidden-term denylist and the site build. See [EDITORIAL.md](./EDITORIAL.md) for the
   full, numbered rules and [.editorial/README.md](./.editorial/README.md) for the denylist.

## Before launch (owner checklist)

- Set `baseUrl` in `quartz.config.ts` to the real published domain.
- Decide on analytics (currently off) in `quartz.config.ts`.
- Add the `EDITORIAL_DENYLIST` GitHub Actions secret if you want the forbidden-term guardrail
  active in CI (see [.editorial/README.md](./.editorial/README.md)).
- Enable branch protection on `main` requiring the CI job to pass.

## Credits

Built on [Quartz v4](https://github.com/jackyzha0/quartz) (MIT), which ships in this repo and
is covered by `LICENSE.txt`.
