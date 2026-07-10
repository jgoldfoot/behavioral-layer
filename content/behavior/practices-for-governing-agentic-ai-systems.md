---
title: Practices for Governing Agentic AI Systems
url: https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf
type: paper
section: behavior
audience: both
source_tier: 1
credit: [OpenAI]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [agentic-ai, governance, accountability, oversight, safety-practices]
---

OpenAI's white paper defining agentic AI systems and proposing seven baseline practices for keeping "agents' operations safe and accountable," written before the agent wave broke and still the cleanest checklist of what deploying one responsibly requires.

## Builder read

Start with the definition, because it is the useful kind: agenticness is "the degree to which a system can adaptably achieve complex goals in complex environments with limited direct supervision." A degree, not a category. The paper decomposes it into components like goal complexity and independent execution, which gives you a way to talk about how agentic your system is rather than whether it "is an agent."

The seven practices are the durable core: evaluating suitability for the task, constraining the action-space and requiring approval, setting agents' default behaviors, legibility of agent activity, automatic monitoring, attributability, and interruptibility and maintaining control. Read that list as a design review agenda for any agent you ship. Constrained action-space plus approval gates is where most real enforcement lives today; legibility and monitoring are your observability layer; and on the last item the paper is blunt: "Interruptibility (the ability to 'turn an agent off'), while crude, is a critical backstop for preventing an AI system from causing accidental or intentional harm."

Note what the paper does not claim. For each practice it enumerates open questions about operationalization rather than pretending the practice is solved. That honesty is a feature: the gaps it lists in 2023 are, to a large degree, still the gaps.

## Exec read

The paper's most consequential move is allocating responsibility across the agent life-cycle. It names three human parties (model developers, system deployers, and users) and argues for agreed baseline practices so that "when an agentic AI system causes harm, we can identify which parties deviated from these best practices in a way that failed to prevent the harm." That is an accountability framework, and it maps directly onto vendor contracts: when your deployed agent fails, which party was supposed to have prevented it, and can you show you held up your end?

The practices double as a due-diligence checklist. Before an agent deployment, you can ask in plain language: was suitability evaluated, what actions can it take without approval, can we read what it did, who is watching it, and who can shut it off. A team that cannot answer those is running an agent without the baseline this paper proposed years ago. The paper also flags indirect, society-scale impacts (adoption races, labor displacement, offense-defense shifts) that no single deployment decision addresses; worth knowing the frame exists, even if your remit is one system.

## Source

Primary: [Practices for Governing Agentic AI Systems (PDF)](https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf), OpenAI, December 2023 (Shavit, Agarwal, Brundage, Adler, et al.).

## Related

- [[behavioral-contracts|Behavioral Contracts]] - the practices here are what a contract for agent operations has to cover
- [[specification-is-enforcement|Specification Is Enforcement]] - why the action-space constraints, not the written policy, do the real work
- [[building-effective-agents|Building Effective Agents]] - the engineering companion: how to build the thing these practices govern
