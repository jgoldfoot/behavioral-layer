---
title: MemGPT
url: https://arxiv.org/abs/2310.08560
type: paper
section: build
audience: both
source_tier: 1
credit: [Packer et al. (UC Berkeley)]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [memory, context-management, long-horizon, agent-state, paper]
---

MemGPT treats an LLM's limited context window like an operating system's memory, using a tiered hierarchy and self-directed paging so an agent can hold and recall information across long tasks and repeated sessions.

## Why it matters

An agent that forgets is an agent that breaks its commitments, and the behavioral layer cannot specify continuity the architecture cannot deliver. MemGPT is the paper that framed agent memory as a managed system with explicit tiers rather than a context window to outgrow, and that frame is now everywhere agent state is designed.

## Builder read

MemGPT ("MemGPT: Towards LLMs as Operating Systems," Packer et al.) starts from a hard constraint: large language models "are constrained by limited context windows." Its answer is "virtual context management, a technique drawing inspiration from hierarchical memory systems in traditional operating systems." The system manages tiers, a fast main context (what fits in the window) versus slower external storage, and uses interrupt-driven control flow and function calls to move information between them itself, the way an operating system pages memory in and out. The agent decides what to keep resident and what to retrieve, rather than depending on a single fixed window.

## Exec read

Memory is a behavioral property, not only a capability. An agent that cannot reliably hold context across a long task, or return to a prior session, will drop commitments, repeat itself, and lose the thread, all of which a user experiences as unreliable. MemGPT's contribution is architectural: it frames memory as a managed system with an explicit hierarchy rather than as a bigger context window to buy. The paper demonstrates the approach on document analysis beyond the underlying model's context limit and on multi-session chat, where agents "remember, reflect, and evolve dynamically through long-term interactions with their users."

## Caveats

The 2023 evaluations cover two domains (document analysis and multi-session chat) on the models of that era; results are demonstrations of the architecture, not benchmarks of current memory systems.

Self-directed paging trades reliability for autonomy: the agent decides what to remember, so recall failures become agent errors rather than system guarantees. The paper does not measure how often that judgment fails at scale.

Context windows have grown enormously since; the tiered-memory frame has held up, but the specific pressure that motivated it has eased for many workloads.

## Source

Primary: [MemGPT: Towards LLMs as Operating Systems](https://arxiv.org/abs/2310.08560) (Packer, Wooders, Lin, Fang, Patil, Stoica, and Gonzalez, UC Berkeley).

## Related

- [[langgraph|LangGraph]] - durable, checkpointed state as a runtime feature
- [[behavioral-contracts|Behavioral Contracts]] - holding context across time as a behavioral commitment
- [[failure-and-repair|Failure and Repair]] - what an agent that forgets cannot do
