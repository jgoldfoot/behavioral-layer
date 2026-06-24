<%*
/*
 * Resource note template for The Behavioral Layer.
 * Templater-compatible: the <% %> expressions resolve when you create a note
 * from this template (Templater > "Insert template" / "Create new note from template").
 *
 * Point Templater's template folder at "_templates" so this file is offered.
 *
 * Governing standard: EDITORIAL.md (repository root). Key rules this template encodes:
 *   - `url` is REQUIRED and must point to a primary source. CI fails without it.
 *   - Every claim traces to a tier-1 primary source.
 *   - Dual audience: fill BOTH "Builder read" and "Exec read".
 *   - House style: no em-dashes. Use double hyphens, parentheses, or colons.
 *   - No named companies, products, employers, or clients in the prose.
 */
-%>
---
title: <% tp.file.title %>
url:              # REQUIRED primary source. CI fails if missing.
type:             # model | tool | framework | paper | repo | benchmark | post | news
section:          # behavior | evaluate | build | models | research | signal | briefings
audience:         # builder | exec | both
source_tier:      # 1 | 2 | 3
date_added: <% tp.date.now("YYYY-MM-DD") %>
last_verified: <% tp.date.now("YYYY-MM-DD") %>
status: live      # live | deprecated | superseded
superseded_by:    # optional [[wikilink]], required when status is "superseded"
tags: []
---

One-sentence summary of what it is.

## Why it matters

Why this belongs on the behavioral layer: what it changes about how an agent behaves,
signals, or recovers.

## Builder read

What this means if you are building. Be concrete: mechanisms, defaults, failure modes.

## Exec read

What this means if you are deciding. Risk, reliability, trust, and the "so what".

## Caveats

Limits, contested claims, what this does not cover, and what would change the read.

## Source

Primary source (the link in `url`), plus any corroborating primary sources. Cite the real
title and URL faithfully.

## Related

- [[some-adjacent-note]]
