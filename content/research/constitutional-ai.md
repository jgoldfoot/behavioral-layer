---
title: Constitutional AI
aliases:
  - Constitutional AI
url: https://arxiv.org/abs/2212.08073
type: paper
section: research
audience: both
source_tier: 1
credit: [Bai et al. (Anthropic)]
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [behavioral-contracts, alignment, model-behavior, governance, training]
---

A method for training a model's behavior from an explicit written set of principles instead of case-by-case human labels. The principles are the artifact. The training process is what enforces them.

## Why it matters

Constitutional AI is usually filed under AI safety. The more useful reading, for anyone thinking about the behavioral layer, is that it proved a behavioral standard can be a written document a system is trained to follow.

The method replaces piecemeal human labeling of good and bad outputs with a short list of explicit principles, the constitution, and trains the model to critique and revise its own responses against them. The behavior is not tuned in by hand and hoped for. It is specified in writing, then enforced by the training process.

That is the same idea the [[openai-model-spec|OpenAI Model Spec]] makes product-facing, approached from the training side. One states how a system should behave. This shows a way to make the model internalize it. Together they are the two halves of governing behavior on purpose: write it down, then build a mechanism that conforms to what you wrote.

## Builder read

The transferable pattern is principles-as-artifact. The constitution is a small, legible document that sits upstream of behavior and shapes it through a defined process, instead of living as scattered rules nobody can audit.

Two mechanics are worth understanding even if you never train a model. The system generates its own critiques and revisions against the principles, so the standard does the work at scale rather than a human labeling every case. And the result is a model that meets a hard request by explaining its objection instead of going evasive, because the principles told it to.

The lesson for builders who are not training models: the closer your behavioral rules get to an explicit, referenceable document, the more of your behavior becomes governable instead of emergent. The form of the artifact matters as much as its content.

## Exec read

Behavior can be governed by an explicit document, and the document can be small. The oversight here is a short list of principles, not a vast labeled dataset. The expensive part is the judgment about what the principles should be, not the volume of examples.

It also moved quickly from research into industry vocabulary. The idea that a model can be aligned to a written constitution is now a reference point others build on and argue with, which is what happens when a framing names something real.

## Caveats

The paper is about training a model's general harmlessness, not about governing a deployed agent's conduct at the application layer. The principle is portable. The specific method is not a drop-in for product behavior.

Principles alone do not guarantee good behavior. Critics have pointed out, fairly, that a list of high-level principles leaves the hard work in implementation and enforcement, where abstract values meet concrete cases. That gap is exactly where behavioral contracts at the application layer earn their keep.

It is one lab's method and values. Read it as an influential approach, not a settled standard.

## Source

Primary: [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073) (Anthropic, December 2022).

## Related

- [[openai-model-spec|OpenAI Model Spec]] - the same goal from the published-standard side
- [[behavioral-contracts|Behavioral Contracts]] - governing conduct at the application layer, where principles meet concrete cases
- [[tau-bench]] - measuring whether trained-in behavior holds under repeated trials
