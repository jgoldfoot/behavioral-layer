# The Behavioral Layer

A public, version-controlled knowledge base on the behavioral, trust, and experience layer
of agentic products: the layer above raw model capability that decides whether an agent is
something a person can actually rely on. It covers behavioral contracts, guardrails,
escalation, failure and repair, confidence and disclosure, and trust scaffolding, and reads
every framework, eval, model, and paper through that lens for two audiences at once
(builders and execs). Live at **[behaviorlayer.ai](https://behaviorlayer.ai)**.

Accuracy is the brand. The governing standard for all content is
**[EDITORIAL.md](./EDITORIAL.md)**.

## The site grows itself

Most notes here are produced by an agentic research pipeline operating under written
behavioral contracts (`.claude/skills/research-note/` and `.claude/skills/weekly-signal/`):
agents discover primary sources, read them, draft notes with verbatim-traced claims, run
the guardrails, and open a pull request. A scheduled weekly run keeps the Signal feed
current. The agents propose; they never merge their own proposals. Publication is tiered
(EDITORIAL section 11): verified Signal batches can auto-merge after a 48-hour human veto
window, while analysis and voice content always take the steward's merge, and CI re-runs
the guardrails on every PR independently. The full end-to-end process, including its
gates and its governance, is described on the site's
[About page](https://behaviorlayer.ai/about).

This repo is therefore an instance of the site's own thesis: an autonomous system governed
by a specified contract, enforced mechanically, and verified by a person.

## One repo, three things

This repository is simultaneously:

1. **An Obsidian vault.** Open the repository folder in Obsidian and author notes in
   `content/`. Wikilinks, backlinks, tags, the dashboard, and templates all work in Obsidian.
2. **A website.** [Quartz v4](https://quartz.jzhao.xyz) builds `content/` into a static site
   (wikilinks, backlinks, search, a full-corpus graph at `/graph`) deployed to GitHub Pages
   at behaviorlayer.ai on every merge to `main`.
3. **A research pipeline.** The skill contracts under `.claude/skills/` define how agents
   research, draft, verify, and propose; the git history is their audit trail.

The same Markdown files are the source of truth for the vault and the site. Nothing outside
`content/` is published (so `_templates/`, `outlines/`, scripts, and config stay private to
the repo).

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
  dashboard.md      Dataview maintenance views (Obsidian-only; not published)
_templates/         Templater note templates (resource.md); not published
outlines/           staged drafts for the steward's voice + the notability watch-list;
                    not published, not linted
.claude/skills/     the research agents' behavioral contracts (research-note, weekly-signal)
scripts/            guardrail scripts: content linter, denylist check (fails closed in
                    CI), emitted-metadata check, README drift check, reverification
                    staleness check, briefings freshness check
.editorial/         forbidden-term guardrail config (real list is never committed)
.github/workflows/  CI (runs the guardrails and the build on every PR and push to main)
quartz.config.ts    site configuration (title, plugins)
quartz.layout.ts    page layout (header, nav panel, graph, provenance)
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

## How notes get made

**The agent path (most notes).** Invoke `/research-note` with a topic or source (or let the
scheduled weekly run fire). The agent works under its contract: tier-1 primary sources
only, every claim fetched and verified verbatim, the notability bar (EDITORIAL 1.6) and
scope-words rule (6.4) applied, guardrails run locally, and the result proposed as a PR.
Nothing publishes until the steward merges.

**The manual path.** Create a note from `_templates/resource.md` in the right section
folder, fill in a `url` to a primary source (required: CI fails without it), write both
the Builder read and the Exec read (papers also require Why it matters and Caveats), keep
the house style (no em-dashes; piped wikilinks), and run the guardrails before pushing:

```bash
npm run lint           # content linter + denylist check
```

The linter checks frontmatter schema and enums, dates, the required body sections, link
integrity, and style; CI runs the same checks plus the forbidden-term denylist and the
site build, and a post-build check (`scripts/check-emitted.mjs`) verifies the emitted
machine-readable metadata (publish dates, MIME types, the search verification tag). See
[EDITORIAL.md](./EDITORIAL.md) for the full numbered rules and
[.editorial/README.md](./.editorial/README.md) for the denylist.

## Operational state

- **Live** at [behaviorlayer.ai](https://behaviorlayer.ai) (GitHub Pages, deployed by
  `.github/workflows/deploy.yml` on every merge to `main`; HTTPS enforced).
- **Cadence:** a scheduled weekly research run proposes Signal entries and a briefing
  draft each Monday. Publication is tiered (EDITORIAL section 11): signal batches that
  pass all gates plus an independent verification pass auto-merge after a 48-hour human
  veto window; research notes and voice content always take the steward's merge.
- **Guardrails active in CI**, including the `EDITORIAL_DENYLIST` secret.
- **Analytics: deliberately off** pending a decision on cookieless measurement; the site
  sets no tracking cookies.
- **Search:** property verified in Google Search Console; sitemap submitted. GEO surfaces
  (`llms.txt`, `llms-full.txt`) are generated on every build.

## Credits

Built on [Quartz v4](https://github.com/jackyzha0/quartz) (MIT), which ships in this repo and
is covered by `LICENSE.txt`.

<!-- readme-verified: 2026-08-09 -->
