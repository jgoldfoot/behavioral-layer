---
title: "ReAct: Synergizing Reasoning and Acting in Language Models"
url: https://arxiv.org/abs/2210.03629
type: paper
section: research
audience: both
source_tier: 1
credit: [Yao et al. (Princeton, Google Brain)]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [agents, reasoning, tool-use, interpretability, prompting]
---

ReAct is the 2022 paper behind the modern agent loop: prompt a model to interleave reasoning with actions and it plans better, grounds itself in external sources, and leaves a trajectory a human can actually follow.

## Builder read

Before ReAct, reasoning (chain-of-thought) and acting (plan generation) were studied separately. The paper's move is to have the model "generate both reasoning traces and task-specific actions in an interleaved manner," and the division of labor it describes is still the cleanest statement of why agents work: "reasoning traces help the model induce, track, and update action plans as well as handle exceptions, while actions allow it to interface with external sources, such as knowledge bases or environments, to gather additional information." On question answering and fact verification, this "overcomes issues of hallucination and error propagation prevalent in chain-of-thought reasoning by interacting with a simple Wikipedia API." On two interactive decision-making benchmarks (ALFWorld and WebShop), it beat imitation and reinforcement learning baselines by 34% and 10% absolute success rate with only one or two in-context examples.

Two things to take away. First, the think-act-observe loop you are building on (in whatever framework) is this paper; when an agent misbehaves, the failure usually lives in one of the two halves ReAct names: reasoning that lost track of the plan, or actions that never grounded the reasoning in reality. Second, the interleaved trace is your primary observability surface. Log it, retain it, and evaluate against it: it is the artifact that lets you compare what the agent was specified to do with what it actually did.

## Exec read

The authors claim not just better task performance but "improved human interpretability and trustworthiness over methods without reasoning or acting components," and that framing is why this paper belongs in a behavioral evidence base and not just a capabilities one: the same loop that makes agents useful also makes their behavior inspectable, because the agent narrates its reasoning between actions. The caution is that the trace is evidence, not a guarantee. The deception literature that followed (see Related) works by reading exactly these traces and finding models reasoning about deceiving their overseers. Treat the ReAct trace as an audit artifact your organization keeps and reviews, not as a transparency promise that lets you skip oversight.

## Source

Primary: [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629) (Yao, Zhao, Yu, Du, Shafran, Narasimhan, Cao; Princeton and Google Research Brain Team, October 2022).

## Related

- [[building-effective-agents|Building Effective Agents]] - the production-era playbook built on this loop
- [[in-context-scheming|Frontier Models are Capable of In-context Scheming]] - what reading agent reasoning traces can reveal
- [[tau-bench]] - measuring whether agent behavior holds up under repeated trials
