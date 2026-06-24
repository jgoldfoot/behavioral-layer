# .editorial/ -- forbidden-term guardrail

This directory configures the denylist guardrail (EDITORIAL.md clause 4.4), enforced by
`scripts/check-denylist.mjs` and run in CI. The guardrail fails the build if any forbidden
term appears in `content/`. It becomes load-bearing once drafting agents are added; for now
it exists and reads from the sources below.

## The term list is never committed

The actual forbidden terms (company names, product names, employer, clients, anything that
must never appear) are deliberately kept OUT of version control. The check reads them from
two sources and takes the union:

1. **Local runs** -- `.editorial/denylist.local.txt`, one term per line. This file is
   gitignored (see the repository `.gitignore`) and starts empty or absent. Create it
   locally if you want the guardrail to run on your machine.

2. **CI runs** -- the `EDITORIAL_DENYLIST` GitHub Actions secret, newline- or
   comma-separated. Set it in the repository settings:
   Settings > Secrets and variables > Actions > New repository secret.

Blank lines and lines starting with `#` are ignored in both sources. Matching is
case-insensitive substring matching.

## With no list configured

The check passes and prints that no terms are configured. That is the expected state for a
fresh clone. Do not add real names to this repository to "test" it: add them to your local
`denylist.local.txt`, which git ignores.

## Files here

- `README.md` -- this file (tracked).
- `denylist.example.txt` -- a names-free example showing the file format (tracked).
- `denylist.local.txt` -- your real, untracked list (gitignored; create it yourself).
