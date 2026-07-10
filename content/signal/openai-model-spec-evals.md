---
title: OpenAI Introduces Model Spec Evals
url: https://alignment.openai.com/model-spec-evals/
type: news
section: signal
audience: both
source_tier: 1
credit: [OpenAI]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [model-spec, evaluation, compliance, behavior-measurement]
---

OpenAI released Model Spec Evals on 2026-03-25, an evaluation suite that measures how well a model actually follows its own stated behavior specification.

## Builder read

The suite tests "596 prompts across 225 focus areas covering all policy sections" of the Model Spec, scoring adherence across "personality, tone, and approach" as well as safety. It turns a behavior specification from a document into something with a measured pass rate: reported compliance runs from 72% (GPT-4o) to 89% (GPT-5 Thinking). The named weak spots are behavioral, not capability-based: "avoiding decisions the user should make," "presenting diverse viewpoints on opinions," and "resisting the urge to exceed user requests."

## Exec read

A behavior spec you cannot measure is a wish. Publishing per-model compliance scores against a written specification is what makes "does the system behave as promised" auditable instead of aspirational, and the reported gaps (deciding things for the user, flattening viewpoints, over-delivering past the request) are exactly the trust-relevant behaviors that capability leaderboards do not see. It is the measurement half of the same discipline a behavioral contract starts.

## Source

Primary: [Introducing Model Spec Evals](https://alignment.openai.com/model-spec-evals/) (OpenAI Alignment, March 25, 2026).

## Related

- [[openai-model-spec|OpenAI Model Spec]] - the specification these evals measure adherence to
- [[tau-bench|tau-bench]] - measuring whether specified behavior holds in agentic tasks
- [[behavioral-contracts|Behavioral Contracts]] - specification and measurement as two halves of one discipline
