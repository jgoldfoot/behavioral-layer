---
title: SWE-bench
url: https://arxiv.org/abs/2310.06770
type: benchmark
section: evaluate
audience: both
source_tier: 1
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
superseded_by:
tags:
  - benchmark
  - agents
  - code
  - evaluation
---

> [!note] Format exemplar
> This note exists to exercise the resource template, the CI guardrails, and the build.
> It is a format reference, not editorial canon.

SWE-bench is a benchmark that tests whether a language-model agent can resolve a real
software issue by producing a code patch that passes the project's own test suite.

## Why it matters

Most model benchmarks score a single answer. SWE-bench scores behavior over a whole task:
the agent has to read an issue, locate the relevant code across a real repository, edit it,
and survive the project's existing tests. That makes it a proxy for the things the
behavioral layer cares about (multi-step execution, tool use, and verification against
ground truth) rather than for raw question-answering. Because the pass criterion is "the
maintainers' own tests go green," it is hard to game with fluent-but-wrong output.

## Builder read

Each task instance pairs a real issue from an open-source repository with the hidden test
patch that originally closed it. The agent sees the codebase and the issue text, and must
emit a patch; the harness applies the patch and runs the tests. Scoring is effectively
pass@1 on whether the tests pass.

- Expect low absolute scores and slow movement. Localization (finding *where* to edit) is
  often harder than the edit itself.
- Watch for partial fixes and regressions: a patch can satisfy the issue while breaking
  another test, which counts as a failure.
- Know which split a number refers to. There is a smaller curated subset ("Lite") and a
  human-validated 500-task subset ("Verified") whose tasks were filtered for being
  well-specified and solvable. Scores are not comparable across splits or across harnesses.

## Exec read

Treat SWE-bench as one of the more credible "can this agent close a real engineering
ticket" signals, but read every claim with two questions: which split, and which harness.
A headline percentage is meaningless without them. The benchmark is also contamination-
aware by construction (the test patches are hidden), which makes it more trustworthy than
benchmarks whose answers may sit in training data, though contamination risk is never zero.

## Caveats

- Passing the tests is not the same as a correct, safe, or maintainable patch.
- The task distribution skews toward a handful of mature Python projects, so it is not
  representative of all software work.
- Different evaluation harnesses report differently, so cross-vendor comparisons are
  fragile. The "Verified" subset exists precisely because some original tasks were noisy
  or underspecified.

## Source

- Primary: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?" (arXiv
  2310.06770), <https://arxiv.org/abs/2310.06770>
- Official site and leaderboard: <https://www.swebench.com>
- Reference implementation: <https://github.com/princeton-nlp/SWE-bench>

## Related

- [[langgraph]] -- a framework you might harness an agent with before pointing it at a
  benchmark like this.
- [[evaluate/index|Evaluate]] -- the rest of the measurement section.
- [[behavior/index|Behavior]] -- the behaviors this benchmark indirectly stresses.
