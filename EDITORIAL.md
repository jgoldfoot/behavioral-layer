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

3.2 The builder read answers: what does this mean if you are building? Be concrete about
mechanisms, defaults, and failure modes.

3.3 The exec read answers: what does this mean if you are deciding? Speak to risk,
reliability, trust, and the decision at hand, in plain language.

3.4 The `audience` field (`builder` | `exec` | `both`) records the note's primary reader
for filtering. It does not excuse omitting either read; both reads are always present.

## 4. No named implementations

4.1 Notes discuss methods, never private implementations. Do NOT name companies, products,
employers, or clients in your prose.

4.2 In-scope subjects are public artifacts only: public frameworks, public models, public
papers, and public tools. These may be named, because they are the subject matter.

4.3 Never reference a private, internal, or client implementation, even obliquely, and even
if it would strengthen the point. If a claim can only be supported by something
non-public, it does not belong here.

4.4 A forbidden-term denylist (owner-supplied, never committed to the repository) is checked
in CI as a backstop for clause 4.1. **(CI)** See `.editorial/README.md`.

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

7.1 Required frontmatter fields, with valid values, on every resource note **(CI)**:

| Field           | Rule                                                                 |
| --------------- | -------------------------------------------------------------------- |
| `title`         | non-empty string                                                     |
| `url`           | required; must be an `http(s)` primary-source URL (clause 1.1)       |
| `type`          | one of: model, tool, framework, paper, repo, benchmark, post, news   |
| `section`       | one of: behavior, evaluate, build, models, research, signal, briefings |
| `audience`      | one of: builder, exec, both                                          |
| `source_tier`   | one of: 1, 2, 3                                                      |
| `date_added`    | valid `YYYY-MM-DD`                                                   |
| `last_verified` | valid `YYYY-MM-DD`                                                   |
| `status`        | one of: live, deprecated, superseded                                |
| `superseded_by` | optional `[[wikilink]]`; required when `status` is `superseded`     |
| `tags`          | a list (may be empty)                                               |

7.2 Body sections, in this order: one-sentence summary, `## Why it matters`,
`## Builder read`, `## Exec read`, `## Caveats`, `## Source`, `## Related`. Use
`_templates/resource.md` so this shape is automatic.

7.3 All internal links (markdown links and `[[wikilinks]]`) MUST resolve to an existing
note. **(CI)** Broken links fail the build.

## 8. What CI does not check

8.1 CI verifies structure, required fields, link integrity, the em-dash ban, and the
denylist. It cannot verify that a claim is *true* or that a source is genuinely tier-1.
That judgment is the author's, and it is the most important rule in this document.

## 9. Exemplars

9.1 Notes labeled "Format exemplar" exist to prove the template, the CI, and the build.
They are format references, not editorial canon. Do not cite them as authority.
