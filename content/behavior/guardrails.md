---
title: Guardrails
type: concept
section: behavior
audience: both
source_tier: original
credit: [Joel Goldfoot]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [guardrails, enforcement, behavior, architecture, security]
---

Guardrails are the enforcement half of a behavioral contract. The contract says what must hold; the rails are the components that make it hold; and the central design question is which checks get to be code.

## Patches or architecture

Most guardrails are archaeology. Each one marks an incident: the day the agent said the wrong thing, the week it leaked the wrong field, and a rule was bolted on where the damage happened. Rails accreted this way scale like a pile of patches, which is to say they do not, and they encode no theory of the system's behavior beyond "not that again."

The alternative is rails derived from a specification. [[behavioral-contracts|Behavioral Contracts]] makes the case that behavior should be specified before it is tuned; guardrails are what the specification compiles down to. Same components, entirely different provenance, and the provenance is what determines whether the hundredth rail makes the system more coherent or less.

## The judge is not the judged

A guardrail should be a separate component from the thing it guards. [[llama-guard|Llama Guard]] made the pattern legible: a narrow, swappable enforcement layer with its own version, its own evaluation, and its own owner, wrapped around a general model. [[nemo-guardrails|NeMo Guardrails]] pushes the same idea further into the runtime: rules that are user-defined, interpretable, and independent of the underlying model, so the rails survive a model swap. The behavioral layer outlives the model layer. That independence is not a convenience; it is the property that makes behavior an asset instead of a side effect.

Which checks belong in deterministic code versus model judgment is [[specification-is-enforcement|Specification Is Enforcement]]'s argument, and this note will not restate it beyond the conclusion: the deterministic share is the share you can guarantee.

## Input, output, action

Placement is the second axis. Input rails stop the bad ask. Output rails stop the bad answer. Action rails stop the bad deed: tool allowlists, approval gates, sandboxes, spend limits, the action-space constraints [[practices-for-governing-agentic-ai-systems|OpenAI's agentic governance practices]] describe.

For agents, the action rails are the ones that matter most. A chatbot that gets fooled says something regrettable. An agent that gets fooled does something regrettable, with your credentials. [[prompt-injection|Prompt injection]] plus capability equals action risk, and no amount of input filtering fully closes it, because the attack arrives inside the data the agent is supposed to read.

## The rails get attacked

An enforcement layer inherits the threat model of the thing it guards. A model-judged rail is itself a model, and it can be fooled the same way. So the rails are not just tested; they are probed, by adversaries first if you skip your turn ([[red-teaming|Red Teaming]]). And when a deterministic rail and the model disagree, the rail wins by design. If there is an override path, it belongs to a human with a name and the authority to own the consequence. It is never the model.

## What rails cannot do

Guardrails catch violations. They do not produce escalation, disclosure, or repair; a system can be fully railed and still behave in a way nobody would trust. Whether the rails hold is measurable ([[st-webagentbench|ST-WebAgentBench]], [[tau-bench]]), and the score is worth having. But the rails are the floor of the contract, not the contract. The rest of the behavioral layer is everything the floor cannot supply.

## Related

- [[specification-is-enforcement|Specification Is Enforcement]] - which clauses get to be code
- [[llama-guard|Llama Guard]] - the judge-is-not-the-judged pattern as a component
- [[nemo-guardrails|NeMo Guardrails]] - programmable, model-agnostic rails at runtime
- [[prompt-injection|Prompt Injection]] - the attack the action rails exist for
- [[failure-and-repair|Failure and Repair]] - the half of behavior rails cannot supply
