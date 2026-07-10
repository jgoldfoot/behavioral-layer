---
title: Trust Scaffolding
type: concept
section: behavior
audience: both
source_tier: original
credit: [Joel Goldfoot]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [trust, scaffolding, previews, confirmation, undo, autonomy]
---

Trust in an agent is not granted. It is extended in increments, and the scaffolding (previews, confirmations, undo, transparency) is what makes each increment safe to extend and cheap to take back.

## Trust is a control loop, not a sentiment

Asking a user to trust an agent is asking them to delegate consequences. Nobody rational does that on reputation alone. They do it when they have mechanisms: a way to extend a little trust, verify what happened, and withdraw without paying for the exit. The scaffolding is those mechanisms, and building it is the direct descendant of the discipline this site keeps pointing at ([[the-behavioral-layer-is-the-new-ux|The Behavioral Layer Is the New UX]]). The pre-agentic baseline already existed: Microsoft's [Guidelines for Human-AI Interaction](https://www.microsoft.com/en-us/research/publication/guidelines-for-human-ai-interaction/) codified efficient dismissal, correction, and explanation back when AI was autocomplete. Agents raise the stakes; they do not change the physics.

## The four scaffolds

Preview converts an irreversible action into a reviewable one. The drafted email shown before send, the diff shown before apply: each moves the decision to the cheapest possible moment, before the consequence exists.

Confirmation must be proportional to consequence. Blanket confirmation is the alarm-fatigue mistake: it trains click-through and destroys the signal, so the one confirmation that mattered gets the same reflexive yes as the forty that did not. Reserve hard confirmation for consequential, hard-to-reverse actions, the approval-gating move [[practices-for-governing-agentic-ai-systems|OpenAI's agentic governance practices]] describe.

Undo is the deepest primitive in the stack. Reversibility changes the entire risk calculus of delegation: a wrong action you can unwind is an experiment, a wrong action you cannot is an incident. Where undo is impossible, preview and confirmation have to carry the full weight, which is exactly where they should be spent.

Transparency closes the loop. Here is what I did and why, visible state, an inspectable log. Without it the user cannot verify, and trust that cannot be verified cannot compound. What the agent must disclose is [[confidence-and-disclosure|Confidence and Disclosure]]'s territory; the surface that carries it is this note's.

## Scaffolding that comes down, railing that stays

The construction metaphor has a built-in question: scaffolding comes down when the building stands. Some of this should. Progressive autonomy means the envelope widens as the track record accumulates, starting from the least autonomy the task needs ([[building-effective-agents|Building Effective Agents]]), not the most the model can handle.

But the widening should be an explicit grant, made by the person holding the risk, informed by the record. Autonomy is granted, not accrued; an agent that silently promotes itself out of its confirmations has violated the contract, not fulfilled it. And the asymmetry is the design: slow to extend, instant to withdraw. One bad failure contracts the envelope automatically, because the failure moment is where the trust ledger actually moves ([[failure-and-repair|Failure and Repair]]). Some rails never come down at all. Nobody ever earns their way out of confirming a production delete.

## Clauses, not garnish

Every scaffold above maps to an enforceable clause with a trigger and a check. "Always preview before send." "Always confirm above this consequence class." Those are code, per [[specification-is-enforcement|Specification Is Enforcement]], and benchmarks now score consent-seeking as correct behavior rather than lost time ([[st-webagentbench|ST-WebAgentBench]]). That is the line between scaffolding and reassurance theater: theater is the same UI with no clause behind it. Users can tell. Eventually, so can auditors.

## Related

- [[behavioral-contracts|Behavioral Contracts]] - where the scaffold clauses live
- [[confidence-and-disclosure|Confidence and Disclosure]] - the content the transparency surfaces carry
- [[escalation|Escalation]] - the scaffold for the moment the agent should stop
- [[building-effective-agents|Building Effective Agents]] - start at the least autonomy the task needs
