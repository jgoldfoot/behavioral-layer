---
title: LangGraph
url: https://docs.langchain.com/oss/python/langgraph/durable-execution
type: framework
section: build
audience: both
source_tier: 1
credit: [LangChain]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [orchestration, framework, state, persistence, human-in-the-loop]
---

LangGraph is an agent orchestration framework whose persistence layer gives agents durable, resumable state and a place for human-in-the-loop control: two behavioral-layer requirements, recovery and oversight, built into the runtime.

## Builder read

LangGraph is "a framework for building agents and workflows." Its persistence layer has two parts. Checkpointers "persist a thread's graph state as checkpoints" and provide "short-term, thread-scoped memory"; stores "persist application-defined data outside the graph state" for "long-term, cross-thread memory." The documentation notes that "most applications can use both: a checkpointer tracks the current thread, and a store tracks durable information across threads." Because graph state is checkpointed step by step, a run can be paused and resumed rather than restarted, and the same checkpointing is what makes human-in-the-loop workflows possible.

## Exec read

Read LangGraph for what it moves into the runtime. Two behavioral-layer requirements that teams usually bolt on after an incident, recovery and human oversight, fall out of the persistence design here. Durable, checkpointed state means an interrupted or failed run can resume from where it stopped instead of starting over, which is failure and repair made cheap. The same checkpointing is what lets a human step in to inspect or approve before the agent continues, which is escalation made routine. When those properties live in the framework, they are defaults rather than heroics, and defaults are what actually ship.

## Source

Primary: [Persistence and durable execution](https://docs.langchain.com/oss/python/langgraph/durable-execution) (LangChain, LangGraph documentation).

## Related

- [[building-effective-agents|Building Effective Agents]] - patterns for the workflows an orchestrator like this runs
- [[memgpt|MemGPT]] - memory as a managed hierarchy, a complement to checkpointed state
- [[failure-and-repair|Failure and Repair]] - the behavior durable, resumable state enables
