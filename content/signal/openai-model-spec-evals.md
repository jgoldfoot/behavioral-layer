---
title: OpenAI Introduces Model Spec Evals
url: https://alignment.openai.com/model-spec-evals/
type: news
section: signal
audience: both
source_tier: 1
credit: [OpenAI]
date_added: 2026-07-09
last_verified: 2026-10-15
status: live
tags: [model-spec, evaluation, compliance, behavior-measurement]
---

OpenAI released Model Spec Evals on 2026-03-25, an evaluation suite that measures how well a model actually follows its own stated behavior specification.

## Builder read

The suite is built so that "The dataset consists of 596 prompts dealing with 225 concrete focus areas, covering all policy sections in the Model Spec," scoring adherence across "personality, tone, and approach" as well as safety. It turns a behavior specification from a document into something with a measured pass rate: reported compliance runs from 72% (GPT-4o) to 89% (GPT-5 Thinking). The areas where OpenAI says it sees "opportunities to improve models' compliance with the Spec" are behavioral, not capability-based: "avoid overreaching and making decisions for the user," "present perspectives from any point on the opinion spectrum," and "avoid overstepping (e.g., doing more than the user asked for)."

## Exec read

A behavior spec you cannot measure is a wish. Publishing per-model compliance scores against a written specification is what makes "does the system behave as promised" auditable instead of aspirational, and the reported gaps (deciding things for the user, flattening viewpoints, over-delivering past the request) are exactly the trust-relevant behaviors that capability leaderboards do not see. It is the measurement half of the same discipline a behavioral contract starts.

## Source

Primary: [Introducing Model Spec Evals](https://alignment.openai.com/model-spec-evals/) (OpenAI Alignment, March 25, 2026).

Correction (2026-10-15): reverification found that four phrases earlier set in quotation marks here (the dataset description and the three named improvement areas) were paraphrases, not the source's wording. The source page had not changed. They now quote the source verbatim.

## Related

- [[openai-model-spec|OpenAI Model Spec]] - the specification these evals measure adherence to
- [[tau-bench|tau-bench]] - measuring whether specified behavior holds in agentic tasks
- [[behavioral-contracts|Behavioral Contracts]] - specification and measurement as two halves of one discipline
