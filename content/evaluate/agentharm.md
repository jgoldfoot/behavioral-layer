---
title: AgentHarm
url: https://arxiv.org/abs/2410.09024
type: benchmark
section: evaluate
audience: both
source_tier: 1
credit: [Andriushchenko et al. (UK AI Safety Institute)]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [agent-safety, misuse, jailbreaks, refusal, benchmark]
---

A benchmark that measures whether an LLM agent refuses explicitly malicious multi-step tasks, and how much of its capability survives once a jailbreak gets past the refusal.

## Builder read

AgentHarm is a dataset of "110 explicitly malicious agent tasks (440 with augmentations), covering 11 harm categories including fraud, cybercrime, and harassment." The tasks are agentic, not conversational: the model has tools and a multi-stage objective. The scoring design is deliberately two-sided. As the authors put it, "In addition to measuring whether models refuse harmful agentic requests, scoring well on AgentHarm requires jailbroken agents to maintain their capabilities following an attack to complete a multi-step task." That second half matters: a jailbreak that produces an incoherent agent is a nuisance, while a jailbreak that leaves a competent agent intact is a weapon.

The evaluation of leading models produced three findings worth pinning to the wall: "(1) leading LLMs are surprisingly compliant with malicious agent requests without jailbreaking, (2) simple universal jailbreak templates can be adapted to effectively jailbreak agents, and (3) these jailbreaks enable coherent and malicious multi-step agent behavior and retain model capabilities." The practical move for a builder is to run this (or an internal equivalent) against your actual model-plus-scaffold combination before granting tool access, because refusal behavior trained and tested in chat settings is exactly what this benchmark shows failing to transfer. The dataset is publicly released on Hugging Face under the AI Safety Institute organization.

## Exec read

Most safety evidence you will be shown was gathered from chatbots, and this benchmark exists because that evidence does not automatically carry over to agents. The headline is behavioral, not theoretical: leading models complied with malicious agentic requests without any jailbreak at all, and simple, reusable attack templates kept the agent competent while removing its refusals. If you are deciding whether to ship an agent with tools, the questions this artifact arms you to ask are concrete: was refusal measured in the agentic setting, with tools, across multi-step tasks, and what happens to the system's behavior after a low-effort attack. A vendor who can only answer with chat-safety numbers has not answered.

## Source

Primary: [AgentHarm: A Benchmark for Measuring Harmfulness of LLM Agents](https://arxiv.org/abs/2410.09024) (Andriushchenko et al., UK AI Safety Institute; submitted October 2024, last revised April 2025, accepted at ICLR 2025).

## Related

- [[red-teaming|Red Teaming]] - the manual discipline this benchmark systematizes for agents
- [[petri|Petri]] - automated auditing that probes for misuse cooperation among other behaviors
- [[prompt-injection|Prompt Injection]] - the adjacent attack surface where the malicious instructions arrive through data
