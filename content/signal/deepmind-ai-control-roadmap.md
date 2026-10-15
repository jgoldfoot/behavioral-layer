---
title: DeepMind's AI Control Roadmap Treats Agents as Insider Threats
url: https://deepmind.google/blog/securing-the-future-of-ai-agents/
type: news
section: signal
audience: both
source_tier: 1
credit: [Google DeepMind]
date_added: 2026-07-13
last_verified: 2026-10-15
status: live
tags: [ai-control, agent-security, insider-threat, monitoring, governance]
---

On 2026-06-18 Google DeepMind published an AI Control Roadmap that secures internal systems by treating an untrusted agent the way a company treats a potentially rogue employee who already has access.

## Builder read

The roadmap "treats untrusted AI agents as potential 'insider threats'" and layers system-level control on top of alignment, so the system holds even when the model is "imperfectly aligned." It maps safeguards to two capability axes: Detection tiers D1 to D4, scaled by "the model's detection evasion capability" (early tiers watch visible reasoning; higher tiers must handle a model that hides its reasoning), and Prevention and Response tiers R1 to R3, scaled by "the model's attack execution capability." The response escalates with risk: "For low-risk and reversible actions, we can rely on reviewing transcripts with a delay," while "For particularly high-risk actions, such as major cyber attacks, we must shift to real-time prevention, blocking harmful actions before they can be executed." Trusted AI systems act as supervisors monitoring agent behavior, and coverage, recall, and response time are the tracked metrics.

## Exec read

This is the deployment half of agent safety, and it is a governance stance, not a model score. Read through the insider-threat framing, the useful question shifts from whether the agent is aligned to what it can do before anyone notices, and whether anyone can intervene in time. Sorting controls into detection and response tiers keyed to what the model can actually do turns trust in the agent into a graded, auditable policy: low-risk actions get after-the-fact review, high-risk actions get blocked in real time. It is the same specify-then-enforce discipline the behavioral layer runs on, applied to an agent operating inside your own systems.

## Source

Primary: [Securing internal systems against increasingly capable and imperfectly aligned AI](https://deepmind.google/blog/securing-the-future-of-ai-agents/) (Google DeepMind, June 18, 2026; Four Flynn and Rohin Shah).

## Related

- [[escalation|Escalation]]
- [[guardrails|Guardrails]]
- [[trust-scaffolding|Trust scaffolding]]
