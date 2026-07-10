---
title: Dashboard
noteType: index
draft: true
tags:
  - dashboard
---

Operational views over the resource notes, kept as an Obsidian-only maintenance page and
excluded from the published site. These queries render in Obsidian with the **Dataview**
community plugin installed; without it they appear as code blocks. Each query selects
resource notes by the presence of a `url` field, so it works whether your Obsidian vault
root is the repository or the `content` folder.

## Needs reverification

Notes whose `last_verified` date is more than 30 days old, oldest first. Work this list
top-down to keep the freshness discipline (EDITORIAL clause on `last_verified`).

```dataview
TABLE last_verified AS "Last verified", section AS "Section", type AS "Type"
WHERE url AND last_verified AND (date(last_verified) < date(today) - dur(30 days))
SORT date(last_verified) ASC
```

## By audience

Every resource note grouped by its primary audience (builder / exec / both). Useful for
spotting whether the library is skewing toward one reader.

```dataview
TABLE WITHOUT ID audience AS "Audience", length(rows) AS "Count", rows.file.link AS "Notes"
WHERE url AND audience
GROUP BY audience
SORT audience ASC
```

## Deprecated or superseded

Notes whose `status` is not `live`, with the note that replaced them. Keep this list short:
either revive, redirect, or archive.

```dataview
TABLE status AS "Status", superseded_by AS "Superseded by", last_verified AS "Last verified"
WHERE url AND status != "live"
SORT status ASC
```
