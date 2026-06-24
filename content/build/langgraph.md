---
title: LangGraph
url: https://github.com/langchain-ai/langgraph
type: framework
section: build
audience: builder
source_tier: 1
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
superseded_by:
tags:
  - framework
  - orchestration
  - agents
  - human-in-the-loop
---

> [!note] Format exemplar
> This note exists to exercise the resource template, the CI guardrails, and the build.
> It is a format reference, not editorial canon.

LangGraph is an open-source framework for building stateful agents as explicit graphs of
steps, with durable execution and built-in points for a human to intervene.

## Why it matters

The behavioral layer needs control points: places where an agent pauses, discloses what it
is about to do, and waits for approval or correction. LangGraph makes those points
first-class. By modeling an agent as a graph with persisted state, it can checkpoint after
each step, pause at a defined interrupt, surface the pending action to a person, and resume
(or be redirected) from exactly where it stopped. That is the machinery behind escalation,
human-in-the-loop approval, and recovery, expressed as architecture rather than as ad hoc
prompt instructions.

## Builder read

You define nodes (units of work) and edges (control flow, including conditional and cyclic
flow) over a shared, typed state object.

- Persistence is the core primitive: a checkpointer saves state after each step, which
  gives you durable execution, resumability after a crash, and the ability to inspect or
  rewind state ("time travel").
- Interrupts let you halt before a sensitive action (a tool call, an external write) and
  require explicit human sign-off before continuing. This is the cleanest place to wire in
  a trust scaffold like a confirmation or a preview.
- It is deliberately low-level. You get fine-grained control over the loop instead of a
  one-line "agent" abstraction, which is the right trade when behavior must be auditable.
- Available for more than one runtime ecosystem, with the same graph-and-state model.

## Exec read

The reason to care at the decision layer: this is the kind of substrate that turns
"the agent did something we did not authorize" into "the agent paused and asked." Durable
state plus mandatory interrupts are governance levers (approval gates, audit trails,
safe recovery) rather than just developer conveniences. The trade is that this control is
something your team has to design and own; the framework provides the mechanism, not the
policy.

## Caveats

- It gives you the means for human-in-the-loop and recovery, but the behavioral contract
  still has to be designed: where to interrupt, what to disclose, what to log.
- Low-level control means more to build and maintain than a high-level agent wrapper.
- Specific APIs evolve; verify capability and naming against the current docs before
  relying on details here.

## Source

- Primary: official repository, <https://github.com/langchain-ai/langgraph>
- Documentation: <https://langchain-ai.github.io/langgraph/>

## Related

- [[swe-bench]] -- once you have harnessed an agent, this is one way to measure it.
- [[build/index|Build]] -- the rest of the mechanisms section.
- [[behavior/index|Behavior]] -- the escalation and trust-scaffolding behaviors this
  framework makes implementable.
