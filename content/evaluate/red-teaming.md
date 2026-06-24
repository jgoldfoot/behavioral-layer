---
title: Red Teaming
url: https://arxiv.org/abs/2209.07858
type: paper
section: evaluate
audience: both
source_tier: 1
credit: [Ganguli et al. (Anthropic)]
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [evaluation, red-teaming, adversarial, safety, behavior]
---

The practice of attacking your own system on purpose, to find the behavioral failures before someone else does. This is the foundational study of doing it methodically.

## Why it matters

Benchmarks tell you how a system behaves on the cases you thought to test. Red teaming is for the cases you did not: the deliberate attempt to make the system misbehave, by people whose job is to break it.

The contribution of this work is treating that attempt as something you can do systematically rather than ad hoc. It frames red teaming as a way to discover, measure, and reduce harmful outputs at once, and it does so at scale, releasing a large dataset of adversarial attacks and clustering them into the kinds of harm that actually surface. One finding is worth carrying: models trained with human feedback got harder to break as they got larger, while other model types did not improve, which says robustness is a property you build, not one you get for free with scale.

It belongs in the evaluation section because it is the half of evaluation that benchmarks miss. A behavioral contract is a set of claims about what the system will and will not do. Red teaming is how you find out which of those claims survive contact with someone trying to violate them.

## Builder read

Test your system the way an adversary would, not just the way a user would. A satisfied-path test suite confirms the behavior you designed. Red teaming surfaces the behavior you did not, which is where the failures that matter actually live: the jailbreak, the edge case, the input that peels off a refusal.

Treat it as a measurement, not a one-time event. The value is in doing it repeatedly, clustering what you find into themes, and tracking whether a given class of attack gets easier or harder as you change the system. That turns red teaming from a vibe check into a metric you can move.

The honest scoping note: red teaming finds failures, it does not certify their absence. A successful round is good news about your coverage. A clean round is not proof of safety, only proof that this round did not find the hole.

## Exec read

A system's behavioral guarantees are only as good as the effort spent trying to break them. Red teaming is the discipline of funding that effort deliberately, and the absence of it means a deployed system's failure modes will be discovered by users or attackers instead of by the team that shipped it.

It also reframes robustness as something built rather than assumed. Stronger models do not automatically resist misuse better unless they were trained to, so "we use a capable model" is not a substitute for having tried, hard and repeatedly, to make that model behave badly.

## Caveats

This is foundational, early work on the methodology, and red teaming has grown since into automated and agent-specific techniques. The principles hold; the specific methods and numbers are a starting point, not the current frontier.

Red teaming is bounded by the imagination and incentives of the red team. It finds the failures someone thought to look for, which is why it complements, rather than replaces, structured benchmarks and runtime monitoring.

A finding of harm is actionable; an absence of findings is not a guarantee. Read a clean result as the floor of your knowledge, not the ceiling of your safety.

## Source

Primary: [Red Teaming Language Models to Reduce Harms: Methods, Scaling Behaviors, and Lessons Learned](https://arxiv.org/abs/2209.07858) (Ganguli et al., Anthropic, 2022).

## Related

- [[prompt-injection|Prompt Injection]] - a primary class of attack red teaming hunts for
- [[claude-opus-4-8-system-card|Claude Opus 4.8 System Card]] - where a lab reports its red-teaming results
- [[behavioral-contracts|Behavioral Contracts]] - the claims red teaming tries to falsify
- [[tau-bench]] - the structured measurement red teaming complements
