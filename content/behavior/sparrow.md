---
title: Sparrow
url: https://arxiv.org/abs/2209.14375
type: paper
section: behavior
audience: both
source_tier: 1
credit: [Glaese et al. (DeepMind)]
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [rules, behavioral-contracts, dialogue, alignment, behavior]
---

An early, concrete demonstration that you can take "behave well" and break it into specific rules, then train and judge an agent against each one. It is the research ancestor of treating behavior as a specification.

## Why it matters

The hard part of governing behavior is that "be helpful and harmless" is not a thing you can train against directly. It is too vague to reward and too vague to check. This work's central move was to refuse that vagueness: break the requirement for good behavior into a set of explicit natural-language rules, and have human raters judge each rule separately rather than rating the response as a whole.

That decomposition is the idea worth carrying. It made the human judgments more targeted, it made the reward signal cleaner, and it produced an agent that violated its rules only a small fraction of the time even when humans actively tried to make it break them. The same agent also backed its factual claims with evidence, tying a behavioral rule about honesty to a mechanism that could be checked.

It belongs in the behavior section because it is the empirical precedent for the behavioral-contract idea. Before behavior was a contract, it was a list of rules an agent was trained to follow and tested against. This is that idea, demonstrated, years before the rest of the field caught up to treating behavior as something you specify clause by clause.

## Builder read

The transferable technique is decomposition. A monolithic notion of "good behavior" cannot be trained, measured, or debugged. The same notion broken into discrete, individually-checkable rules can be all three. When you can ask "did it follow this specific rule" instead of "was that a good response," you get signal you can actually act on, for training, for evaluation, and for finding which rule a system keeps breaking.

The other lesson is that following rules and being unbiased are different problems. The work was candid that an agent can learn to obey its stated rules and still exhibit distributional biases the rules did not name. Decomposition makes the behaviors you specified measurable. It does nothing for the behaviors you did not think to specify, which is a permanent caution for anyone writing a behavioral contract.

## Exec read

Good behavior, stated as a goal, is not actionable. The same goal, broken into specific rules an agent can be trained against and tested on one by one, becomes something an organization can actually build toward and verify. This work showed the decomposition is not just cleaner, it produces an agent measurably more resistant to being pushed off its rules.

The implication is that a credible behavioral standard is a list of specific, checkable commitments, not a paragraph of intentions. When a team describes how their system behaves, the useful question is whether they can name the individual rules and show the rate at which each one holds, because that is the difference between a specification and a hope.

## Caveats

This is a research system from an earlier generation, not a current product, and the specific model is well behind the frontier. The durable contribution is the method, rule decomposition with per-rule judgment, not the agent itself.

The paper is explicit that following the stated rules did not eliminate distributional bias. Specifying behavior covers what you specified, and the gaps in your rule set remain gaps in your system.

Per-rule human judgment is effective and expensive. It is a strong technique where the behavior matters enough to justify the labor, not a free default for every system.

## Source

Primary: [Improving Alignment of Dialogue Agents via Targeted Human Judgements](https://arxiv.org/abs/2209.14375) (Glaese et al., DeepMind, 2022).

## Related

- [[behavioral-contracts|Behavioral Contracts]] - the idea Sparrow's rule set anticipates
- [[specification-is-enforcement|Specification Is Enforcement]] - decomposition is the specification move, made concrete
- [[constitutional-ai|Constitutional AI]] - a parallel approach to training behavior against stated principles
- [[red-teaming|Red Teaming]] - the adversarial probing Sparrow's rules were tested against
