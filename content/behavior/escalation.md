---
title: Escalation
type: concept
section: behavior
audience: both
source_tier: original
credit: [Joel Goldfoot]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [escalation, behavior, handoff, thresholds, trust]
---

Escalation is the contract clause most teams write last and need first: the specified moment an agent stops acting on its own and hands control to a human, with enough context that the human can actually take it.

## Escalation is not the agent failing

Most teams treat escalation as a failure state, the thing that happens when the agent breaks. That framing is why it goes unspecified. The reframe: escalation is the agent following its contract. An agent that never hands off is not a strong agent. It is an unspecified one, acting past the edge of its authority because nobody wrote down where that edge is.

[[failure-and-repair|Failure and Repair]] covers escalation as a failure response, the move a system makes when it knows it is wrong. This note is about the broader case: an agent can be entirely correct and still be out of its depth. The request is in policy but above its clearance. The action is doable but irreversible. Escalation in normal operation is not recovery. It is jurisdiction.

## A threshold needs a signal

Every escalation clause is a threshold decision, and a threshold is only as good as the signal it reads. There are two families. Some triggers are deterministic: an action class, a spend limit, a scope boundary crossed. Those are code, per [[specification-is-enforcement|Specification Is Enforcement]], and they should never depend on the model's mood. The rest need a judgment signal, and the most useful one is calibrated confidence: models can largely predict whether they know an answer before committing to one ([[language-models-know-what-they-know|Language Models (Mostly) Know What They Know]]). Below the line, the contract says hand off instead of act.

## Early beats late, and the costs are not symmetric

Early escalation means surfacing the concern before acting: asking the purpose of a request up front, the behavior Anthropic now documents as an alignment improvement in [[claude-sonnet-5-agentic-safety|Claude Sonnet 5]]. Late escalation means stopping after the damage. Early costs friction. Late costs trust, and often irreversibly. That asymmetry is the whole design argument for starting agents at the least autonomy the task needs ([[building-effective-agents|Building Effective Agents]]) rather than the most the model can handle.

Over-escalation is a real failure too. An agent that hands everything back is a search box with extra steps, and over-refusal is the model-scale version of the same mistake. The threshold is a designed value, owned by someone ([[who-owns-the-behavior|Who Owns the Behavior]]), not a vibe.

## The handoff is a package, not a dump

What gets surfaced at escalation matters as much as the escalation itself. A raw transcript is not a handoff. The receiving human needs the state, what was attempted, why the agent stopped, and what it is uncertain about: the legibility duty that [[practices-for-governing-agentic-ai-systems|OpenAI's agentic governance practices]] name directly. And the interrupt points have to be designed in, the way [[langgraph|LangGraph]] treats them as first-class primitives. An agent that cannot be stopped mid-flight can only escalate between actions, which may be after the one that mattered.

## Escalation is a score, not a penalty

The field is starting to measure this correctly: [[st-webagentbench|ST-WebAgentBench]] scores deferral and consent-seeking as success, not task failure. That is the right ledger. An escalation is not the system admitting weakness. It is the system knowing the shape of its own authority, which is the thing you most need it to know.

## Related

- [[behavioral-contracts|Behavioral Contracts]] - where the escalation clause lives
- [[failure-and-repair|Failure and Repair]] - escalation as one of the failure behaviors
- [[confidence-and-disclosure|Confidence and Disclosure]] - the signal the threshold reads
- [[st-webagentbench|ST-WebAgentBench]] - measuring deferral as correct behavior
