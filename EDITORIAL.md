# EDITORIAL.md -- The Behavioral Layer

This is the content behavioral contract for The Behavioral Layer. It governs every note in
`content/`. It is written so that a human author, a reviewer, or a future drafting agent
can follow it without further context. Clauses are numbered and enforceable. Where a clause
is checked automatically, it is marked **(CI)**; a pull request that violates a CI clause
cannot merge.

Accuracy is the brand. When a rule here conflicts with making a point land, the rule wins.

## 1. Sourcing

1.1 Every published resource note MUST carry a `url` in its frontmatter pointing to a
primary source. **(CI)** A note without a `url` fails the build.

1.2 Every factual claim in a note MUST trace to a tier-1 primary source. Tier-1 sources
are: an official lab or project blog, an official changelog or release note, an arXiv
paper, an official repository, an official model or system card, or a peer-reviewed paper.

1.3 Source tiers, recorded in the `source_tier` field:
- `1` -- primary source as defined in 1.2.
- `2` -- reputable secondary source that is clearly reporting on a primary source
  (for example, a careful technical write-up that links the original).
- `3` -- weak or unverified source. A note may not rest its core claims on a tier-3
  source; downgrade the claim or find a primary source.
- `original` -- the note is the author's own synthesis (a concept note), not a report of an
  external source. Concept notes take this tier and carry no `url` (see section 10).

1.4 The `url` field MUST point to the single best primary source. Additional corroborating
primary sources belong in the `## Source` section.

1.5 Faithful citation always wins over the naming rule in clause 4. You MAY reproduce a
primary source's real title, authors, identifiers, and URL exactly, even when they contain
a company or product name. The naming rule governs your own prose, not the citation of a
source.

## 2. Freshness

2.1 Every resource note records `date_added` and `last_verified` as `YYYY-MM-DD`. **(CI)**
Both fields are required and must be valid dates.

2.2 `last_verified` means: on this date, a human re-opened the primary source and confirmed
the note's claims still hold. Update it only when you have actually re-checked.

2.3 A note whose `last_verified` is more than 30 days old is due for reverification. The
[[dashboard]] surfaces these oldest-first. Reverify, then either bump `last_verified`, or
change `status` (clause 5) if the source has moved on.

## 3. Dual audience

3.1 Every resource note MUST contain both a `## Builder read` and an `## Exec read`
section, in that order, and both MUST be substantive. **(CI checks the sections exist.)**
Concept notes are exempt from this clause (see section 10).

3.2 The builder read answers: what does this mean if you are building? Be concrete about
mechanisms, defaults, and failure modes.

3.3 The exec read answers: what does this mean if you are deciding? Speak to risk,
reliability, trust, and the decision at hand, in plain language.

3.4 The `audience` field (`builder` | `exec` | `both`) records the note's primary reader
for filtering. It does not excuse omitting either read; both reads are always present.

## 4. Naming and provenance

4.1 Public artifacts are named freely: models, tools, papers, frameworks, benchmarks, and
the organizations that publish them. They are the subject matter, so name them plainly.

4.2 Authors may write from their own professional experience, including work building a
product's behavioral contract, with internal product names removed. The lesson is in scope;
the proprietary label is not.

4.3 The following are excluded, and enforced by the denylist: internal product codenames;
any work, request, meeting, or example scoped to a specific named client; and one specific
prior client engagement, which is the strictest exclusion. When in doubt about a name from
your own work, leave it out.

4.4 A forbidden-term denylist enforces clause 4.3 in CI. **(CI)** The actual excluded terms
live ONLY in the untracked denylist (`.editorial/denylist.local.txt` locally, the
`EDITORIAL_DENYLIST` secret in CI). They are NEVER written into any tracked file, including
this one. See `.editorial/README.md`.

## 5. Lifecycle

5.1 `status` is one of `live`, `deprecated`, or `superseded`. **(CI checks the enum.)**

5.2 When `status` is `superseded`, the `superseded_by` field MUST contain a `[[wikilink]]`
to the note that replaces it. **(CI)**

5.3 Prefer superseding over deleting. A dead note with a forward pointer preserves the
trail; a deleted note breaks inbound links.

## 6. House style

6.1 No em-dashes anywhere. **(CI)** Use double hyphens ( -- ), parentheses, or colons
instead. This applies to the body and the frontmatter.

6.2 Prefer plain language over jargon. If a term is unavoidable, define it on first use.

6.3 One-sentence summary first: every resource note opens with a single sentence stating
what the thing is, before any heading.

## 7. Note structure (enforced shape)

7.1 Required frontmatter fields, with valid values, on every resource note and every
concept note **(CI)**:

| Field           | Rule                                                                 |
| --------------- | -------------------------------------------------------------------- |
| `title`         | non-empty string                                                     |
| `url`           | required (resource notes); optional for `type: concept`; if present must be an `http(s)` URL (clause 1.1) |
| `type`          | one of: model, tool, framework, paper, repo, benchmark, post, news, concept |
| `section`       | one of: behavior, evaluate, build, models, research, signal, briefings |
| `audience`      | one of: builder, exec, both                                          |
| `source_tier`   | one of: 1, 2, 3, original                                           |
| `date_added`    | valid `YYYY-MM-DD`                                                   |
| `last_verified` | valid `YYYY-MM-DD`                                                   |
| `status`        | one of: live, deprecated, superseded                                |
| `superseded_by` | optional `[[wikilink]]`; required when `status` is `superseded`     |
| `tags`          | a list (may be empty)                                               |

7.2 Resource-note body, in this order: one-sentence summary, `## Why it matters`,
`## Builder read`, `## Exec read`, `## Caveats`, `## Source`, `## Related`. Use
`_templates/resource.md` so this shape is automatic. Concept notes use a free-form body
(see section 10) but remain subject to house style (section 6) and link integrity (7.3).

7.3 All internal links (markdown links and `[[wikilinks]]`) MUST resolve to an existing
note. **(CI)** Broken links fail the build.

## 8. What CI does not check

8.1 CI verifies structure, required fields, link integrity, the em-dash ban, and the
denylist. It cannot verify that a claim is *true* or that a source is genuinely tier-1.
That judgment is the author's, and it is the most important rule in this document.

## 9. Exemplars

9.1 Notes labeled "Format exemplar" exist to prove the template, the CI, and the build.
They are format references, not editorial canon. Do not cite them as authority.

## 10. Note types

10.1 The library has two note types, set by the `type` field. Structural pages are a third,
non-note category (clause 10.4).

10.2 **Resource notes** point outward at a public artifact (a model, tool, paper, framework,
benchmark, repo, post, or news item). They REQUIRE a `url` to a primary source (clause 1.1)
and the dual-audience body (clause 3.1 and section 7.2).

10.3 **Concept notes** (`type: concept`) are original synthesis: the site's own thinking,
not a pointer to someone else's artifact. They take no `url`, carry `source_tier: original`,
and use a free-form body. They remain subject to every other rule: the required frontmatter
fields and valid enums and dates (section 7.1), the no-em-dash house style (section 6), and
link integrity (clause 7.3). Any factual claim inside a concept note still links to a
primary source inline.

10.4 **Structural pages** (any `index.md`, `dashboard.md`, or a note with
`noteType: index | structural | home`) are neither type. They are exempt from the
frontmatter schema, but are still link-checked and house-style-checked.
