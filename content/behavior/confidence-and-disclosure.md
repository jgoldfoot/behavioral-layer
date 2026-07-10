---
title: Confidence and Disclosure
type: concept
section: behavior
audience: both
source_tier: original
credit: [Joel Goldfoot]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [confidence, disclosure, calibration, provenance, trust]
---

A trustworthy agent is not the one that is always right. It is the one whose stated confidence tracks how often it is right, and that tells the truth about what it did and why.

## Calibration is the load-bearing wall

A confidence statement only communicates if it correlates with accuracy. Otherwise it is decoration. The encouraging evidence is that the signal exists: larger models are reasonably well calibrated on whether their own answers are true, and can largely predict whether they know an answer before producing it ([[language-models-know-what-they-know|Language Models (Mostly) Know What They Know]]). The signal can even be surfaced in words rather than logits: models can be trained to state calibrated confidence in plain language ([Lin et al., 2022](https://arxiv.org/abs/2205.14334)), which matters because plain language is what a user actually receives.

So the raw material for honest confidence exists. Whether it reaches the user is a design decision, which makes it a contract clause.

## A hedge on everything is a hedge on nothing

The lazy version of disclosure is the uniform disclaimer: "I might be wrong" stapled to every answer. That is not honesty. It is noise. A warning that always fires carries zero information, and the user learns to read past it in a day.

The contract should specify when uncertainty gets voiced and in what form: below this threshold, say so; above it, do not perform doubt you do not have. The hedge has to be earned by the number underneath it. That is what makes it mean something on the day it appears.

## The mirror failure

Overclaiming has a twin: capitulating. [[sycophancy|Sycophancy]] is false confidence in the user's direction, agreement substituted for correction, and it corrupts the same channel. A disclosure clause that only polices overconfidence has covered half the failure surface. The full clause covers both: do not claim certainty you lack, and do not surrender certainty you have because the user pushed.

## Disclosure is provenance, not just probability

Confidence is one number. Disclosure is the fuller duty: what the agent did, what it consulted, what it acted on, and why, legible to the person accountable for it. [[practices-for-governing-agentic-ai-systems|OpenAI's agentic governance practices]] name this legibility, and a system card ([[claude-opus-4-8-system-card|Claude Opus 4.8]], [[gpt-5-system-card|GPT-5]]) is the same duty performed at lab scale.

The division of labor with [[trust-scaffolding|Trust Scaffolding]] is deliberate: that note owns the surfaces that carry the information, this one owns what the information must be. And a surprising share of it is deterministic. "Always state the data source." "Always disclose when acting below the confidence threshold." Those have triggers and checks. They are code, per [[specification-is-enforcement|Specification Is Enforcement]], not vibes.

## Trust the signal where it has been tested

The caveat that keeps this honest: calibration degrades off-distribution, exactly where the stakes are highest. High-consequence disclosure cannot rest on self-report alone; it gets paired with external checks. And whether stated behavior matches actual behavior is now itself measured: labs score their models against their own published specs ([[openai-model-spec-evals|Model Spec Evals]]). That is the standard to hold an agent to. Not perfection: an honest ledger.

## Related

- [[escalation|Escalation]] - the action taken when the confidence signal crosses the line
- [[language-models-know-what-they-know|Language Models (Mostly) Know What They Know]] - the evidence the signal exists
- [[sycophancy|Sycophancy]] - the mirror-image failure of the same channel
- [[openai-model-spec|OpenAI Model Spec]] - a published standard for stated behavior
