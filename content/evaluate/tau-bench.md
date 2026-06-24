---
title: tau-bench
url: https://arxiv.org/abs/2406.12045
type: benchmark
section: evaluate
audience: both
source_tier: 1
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [evaluation, reliability, agents, rule-following, benchmark, behavioral-contracts]
---

A benchmark that measures whether a tool-using agent behaves the same way across repeated attempts at the same task, not just whether it can succeed once.

## Why it matters

Most agent benchmarks ask one question: can the agent do the task. tau-bench asks a harder and more honest one: can it do the same task reliably, every time, the way a real user-facing system has to.

It introduces a metric called pass^k, the fraction of k independent attempts at the same task that all succeed. Run the task once and an agent can look capable. Run it eight times and watch whether it holds. The finding is why this benchmark belongs in any serious conversation about the behavioral layer: the best function-calling agent tested resolves over 60% of retail tasks on a single attempt, but its pass^8 falls to roughly 25%. The same system that looks like a 60% performer is, measured for consistency, closer to one in four.

That is the behavioral-layer thesis stated as a number. Capability is not reliability. A demo proves capability. Trust requires reliability, and reliability is what collapses when you measure it honestly.

## Builder read

Measure pass^k, not single-attempt success. The one-shot rate is the number that makes a demo land and a production system disappoint. If your agent touches real users, what matters is whether it does the right thing on the hundredth identical request, not the first.

What tau-bench tests is worth copying into how you evaluate your own system: following the rules in a domain policy document, holding information across a long multi-turn conversation, and communicating the right things back to the user. It scores by comparing the final database state against the annotated goal state, which grades on whether the task was actually accomplished rather than on how the agent worded its reply.

The successor, tau2-bench, extends this to a dual-control setting where both the agent and the user can change a shared environment, which is closer to how real support interactions actually behave.

## Exec read

The gap between how an agent demos and how it behaves in production has a measurable shape. A system that succeeds most of the time on a single attempt can still fail to handle the same issue consistently across many customers. In the published results, single-attempt success above 60% corresponded to roughly a one-in-four chance of getting the same task right across eight tries.

That is the distance between a system that impresses in a pilot and one that can be trusted on the floor. Reliability degrades as repetition increases, and repetition is exactly what a deployed agent faces. The benchmark makes visible a cost that capability scores hide.

## Caveats

The published numbers are tied to specific models and two customer-service domains, and they age quickly as models improve. The durable contribution is the metric, not any single leaderboard score. Later scores will be higher; the shape of the reliability gap is the lasting point.

pass^k does not replace single-attempt benchmarks, it complements them. It measures consistency, a different property than raw capability, and a serious system needs both measured.

It is one team's benchmark, built around customer-service workflows. The construct is broadly instructive but not a universal standard for every kind of agent.

## Source

Primary: [tau-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains](https://arxiv.org/abs/2406.12045) (Yao et al., 2024).

Results summary from the authors: [Benchmarking AI agents](https://sierra.ai/blog/benchmarking-ai-agents).

Successor with a dual-control environment: [tau2-bench](https://arxiv.org/abs/2506.07982), repo at [github.com/sierra-research/tau2-bench](https://github.com/sierra-research/tau2-bench).

## Related

- [[openai-model-spec|OpenAI Model Spec]] - the standard that says how the system should behave
- [[constitutional-ai|Constitutional AI]] - training behavior in; tau-bench measures whether it held
- [[behavioral-contracts|Behavioral Contracts]] - the rules an agent is measured against, living as an explicit artifact
