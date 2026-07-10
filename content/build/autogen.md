---
title: AutoGen
url: https://arxiv.org/abs/2308.08155
type: framework
section: build
audience: both
source_tier: 1
credit: [Wu et al. (Microsoft)]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [multi-agent, orchestration, conversation, framework, accountability]
---

AutoGen is "an open-source framework that allows developers to build LLM applications via multiple agents that can converse with each other to accomplish tasks," the paper that made conversation the unit of multi-agent orchestration.

## Builder read

The design bet is that agent coordination is a conversation problem. AutoGen agents are "customizable, conversable, and can operate in various modes that employ combinations of LLMs, human inputs, and tools," and developers can "flexibly define agent interaction behaviors." Notably, "both natural language and computer code can be used to program flexible conversation patterns": the choreography of who speaks when, who checks whom, and when a human is pulled in is itself a programmable artifact. That last part is the behavioral hook. Human input is a first-class agent mode, not an afterthought, so escalation can be wired into the pattern; and because the pattern is code, the checking relationships between agents (one drafts, another critiques, a third executes) are inspectable rather than emergent.

The trade-off to respect: once behavior is produced by a conversation among agents, no single agent's prompt is the contract anymore. The behavior you ship is a property of the ensemble, and testing has to happen at that level. Know the project's current status before adopting it: the official repository now states "AutoGen is now in maintenance mode. It will not receive new features or enhancements and is community managed going forward," and directs new users to Microsoft Agent Framework with a migration guide. The current codebase is layered, with a Core API implementing "message passing, event-driven agents, and local and distributed runtime" beneath the higher-level AgentChat API.

## Exec read

AutoGen is where the accountability question for multi-agent systems became concrete. When one agent instructs another and the pair produces an outcome, the responsibility does not sit in either model; it sits in the interaction pattern someone on your team wrote, which means that pattern needs an owner, a review, and an evaluation the same way any other behavioral contract does. The project's own arc carries a second lesson: a framework that defined the category in 2023 entered maintenance mode within a few years. Frameworks churn; if your trust story is "we use framework X," it expires with the framework. Anchor governance in contracts and evaluations that survive re-platforming, and treat any orchestration layer as replaceable plumbing underneath them.

## Source

Primary: [AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation](https://arxiv.org/abs/2308.08155) (Wu et al., Microsoft, 2023); status per [microsoft/autogen on GitHub](https://github.com/microsoft/autogen).

## Related

- [[building-effective-agents|Building Effective Agents]] - the case for simpler patterns before multi-agent ones
- [[behavioral-contracts|Behavioral Contracts]] - where accountability lands when agents talk to agents
- [[a2a-protocol|Agent2Agent (A2A) Protocol]] - specifying the same boundary across organizations
