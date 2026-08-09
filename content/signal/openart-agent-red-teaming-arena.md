---
title: OpenART Red-Teams Agents by Evolving the Environment Instead of the Prompt
url: https://arxiv.org/abs/2608.00677
type: paper
section: signal
audience: both
source_tier: 1
credit: [Chen et al. (Fudan University, Shanghai Artificial Intelligence Laboratory, XSafeAI)]
date_added: 2026-08-09
last_verified: 2026-08-09
status: live
tags: [red-teaming, evaluation, agent-harness, benchmark, stateful-environments, attack-surface]
---

A paper submitted to arXiv on 2026-08-01 introduces an agent red-teaming arena that holds the task and the safety constraints fixed and attacks only the environment state, and reports that which agent runtime you use accounts for a measurable share of safety outcomes beyond the underlying model.

## Why it matters

The site's running argument is that behavior is a property of the whole system, not of the model weights, and that the scaffolding around a model is doing more work than most evaluations attribute to it. This paper supplies a direct measurement of that claim from the adversarial side, and it does so with a design that isolates the variable: task objectives and safety contracts stay fixed while only the environment changes.

It also names a gap in how agent safety is currently measured. Existing benchmarks, the authors argue, "primarily evaluate short, static tasks, making it difficult to study cumulative risks in evolving environments." An agent that reads and writes shared state across a long workflow can be walked into an unsafe action by what has accumulated around it, and a short static probe will not find that. This is the environment-side counterpart to the memory-side finding in [[experience-composition-self-evolving-agents|the same fortnight's experience-composition paper]].

## Builder read

The scale claims are specific: OpenART constructs "over 10K validated stateful scenarios spanning 50 domains" drawn from more than 500K tools, MCPs, and skills, with tasks requiring a median of 97 tool calls. Those tasks are projected through target adapters onto 15 deployed agents, 5 foundation models, and 8 attack vectors, giving 75 agent-model configurations under one interface. The interface point is part of the argument: the authors note that "benchmark-specific interfaces hinder direct comparison across agent runtimes," which is why the adapter layer exists at all.

The attack policy, Evolutionary Markov Hypergraph Attack (EMHA), is black-box and does not update parameters. It performs "feedback-driven environment evolution by coordinating authorized state transitions over hypergraph paths." The word authorized is load-bearing: the attack never takes a forbidden action, it arranges permitted state changes so that the agent's own subsequent behavior becomes unsafe. Across all 75 configurations EMHA reaches a pooled strict attack success rate of 85.0%.

Two results are more interesting than the headline. First, the advantage of evolving the environment over evolving only the instruction grows with task complexity: the paper reports it rising from 1.8 to 2.7% on simple environments to 17.2 to 17.6% on the most complex ones. The authors read this as evidence that "environment evolution increasingly exposes safety failures as task complexity grows," which also means short-task benchmarks systematically understate the gap. Second, and most relevant to anyone choosing a framework, incorporating target-agent identity explains an additional 7.6% of attack-success variation beyond model and capability controls. The authors' own phrasing for what that implies is hedged, and worth keeping hedged: it suggests "that runtime implementation plays a significant role in agent safety."

## Exec read

The practical takeaway is that the agent framework is a safety-relevant procurement decision, not just an engineering convenience. Holding the model constant, this study finds the runtime accounts for a measurable share of whether an attack succeeds. If your organization evaluates models for safety but treats the harness as an implementation detail chosen by whoever built the service, you are leaving part of the outcome unmeasured.

The second takeaway is about what your existing evidence covers. Safety numbers you have been shown almost certainly come from short, self-contained tasks. This work reports that the gap between that setting and a long, stateful one widens as complexity rises, and the tasks here need a median of 97 tool calls. A vendor's benchmark result on a short task is not evidence about a multi-hour workflow with shared state, and this paper puts a number on the direction of that error.

Treat the 85.0% as what it is: an attack success rate produced by the authors' own attack policy inside their own arena, against configurations they selected. It measures the reach of EMHA in OpenART, not the probability that a deployed agent is compromised.

## Caveats

This is a v1 arXiv preprint and has not been peer reviewed. The arena, the attack, and the grading are all the same group's, so the headline attack success rate is self-evaluated, and the paper is a red-teaming contribution rather than a defense: no mitigation is validated. The 7.6% variance-explained figure is the paper's strongest claim for the site's thesis and also its most fragile, since it is an observational decomposition across configurations the authors chose, with the authors themselves stating only that runtime implementation "plays a significant role" rather than asserting a causal estimate. Scenario validation, task realism, and the strictness of the success criterion are internal to the arena and not independently checked. Two of the three affiliations are the same lab ecosystem, and the work was done in part during an internship there, so independent replication on this arena does not yet exist.

## Source

Primary: [OpenART: Scaling Agent Red Teaming via Open-Ended Environment Evolution](https://arxiv.org/abs/2608.00677), Yunhao Chen, Xin Wang, Yixu Wang, Yi Liu, Jie Li, Yan Teng, Xingjun Ma, Xia Hu, Yu-Gang Jiang (arXiv:2608.00677v1, submitted 2026-08-01). Affiliations and all figures quoted here are from the paper's first page; the more precise interval figures (1.8 to 2.7, 17.2 to 17.6, 7.6%) appear in the paper's own abstract and are narrower than the rounded values shown on the arXiv listing page.

## Related

- [[harness-evolution-evaluation|Automatic harness evolution fails to beat simple test-time scaling]] - the harness as a measured variable, from the capability side
- [[experience-composition-self-evolving-agents|Individually benign experiences compose into a jailbreak]] - the memory-side counterpart
- [[red-teaming|Red teaming]]
- [[agent-safety-benchmark-validity-audit|A validity audit finds agent-safety scores are not interchangeable]] - what an attack success rate does and does not license
- [[model-context-protocol|Model Context Protocol]] - the tool surface these scenarios draw on
- [[st-webagentbench|ST-WebAgentBench]]
