---
title: WebArena
url: https://arxiv.org/abs/2307.13854
type: benchmark
section: evaluate
audience: both
source_tier: 1
credit: [Zhou et al. (Carnegie Mellon University)]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [web-agents, benchmark, agents, evaluation, long-horizon]
---

A reproducible environment of fully functional websites where autonomous agents attempt the long-horizon tasks humans actually do online, with the original best agent succeeding 14.41% of the time against a human baseline of 78.24%.

## Builder read

WebArena's core move was realism you can rerun. Instead of simplified synthetic pages, it provides "fully functional websites from four common domains: e-commerce, social forum discussions, collaborative software development, and content management", enriched with tools and external knowledge bases to support human-like task solving. The benchmark tasks are "diverse, long-horizon, and designed to emulate tasks that humans routinely perform on the internet", and they are graded by "evaluating the functional correctness of task completions": did the order actually get placed, the post actually get made. That is the grading standard worth copying into your own web-agent evaluation, because it scores outcomes in the environment rather than plausible-sounding action traces. The environment is self-hostable and resettable, so results are comparable across runs and across teams; code, data, and environments are public at webarena.dev.

For a builder, this is the end-to-end test: multi-step navigation, state held across many pages, and no partial credit for getting most of the way there. The paper's own baselines integrated techniques like reasoning before acting, and still failed most tasks.

## Exec read

The published gap is the point: "our best GPT-4-based agent only achieves an end-to-end task success rate of 14.41%, significantly lower than the human performance of 78.24%." Those numbers come from 2023-2024 models and have risen substantially since, but the behavioral lesson holds. Agents demo well on short, curated flows and degrade on the long-horizon tasks real work is made of, and the only honest measurement is functional correctness in a realistic environment. When a web-automation pitch reaches your desk, WebArena is the reason to ask for end-to-end success rates on realistic tasks rather than component accuracy or a recorded demo, and to plan for the failure handling that the gap between demo and measured behavior implies.

## Source

Primary: [WebArena: A Realistic Web Environment for Building Autonomous Agents](https://arxiv.org/abs/2307.13854) (Zhou et al., Carnegie Mellon University; submitted July 2023, last revised April 2024).

## Related

- [[osworld|OSWorld]] - the same realism-and-execution-grading philosophy extended to full operating systems
- [[st-webagentbench|ST-WebAgentBench]] - adds safety and policy-compliance measurement to web-agent evaluation
- [[tau-bench]] - tests whether an agent behaves consistently across repeated attempts
