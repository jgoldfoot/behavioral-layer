---
title: Claude Opus 4.8 System Card
url: https://www.anthropic.com/claude-opus-4-8-system-card
type: model
section: models
audience: both
source_tier: 1
credit: [Anthropic]
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [system-card, model-behavior, safety, evaluation, transparency]
---

A frontier model's system card, read the way this site reads everything: not for its capability scores, but for what it documents about how the model behaves and where it fails.

## Why it matters

A system card is where a lab writes down a model's behavior in public, including the parts that did not improve. Read for capability, it is a scoreboard. Read for behavior, it is the closest thing you get to a frontier model's behavioral contract: what it refuses, how it handles sensitive domains, where its safety holds and where it slips.

This particular card is a clean example because it documents regressions honestly alongside the gains. The model is reported as more willing to acknowledge opposing views in contested discussions, which is a behavioral improvement. It is also reported as having a tendency toward over-elaborate refusals, and as being somewhat less robust to prompt injection in some agentic settings than its predecessor, with safeguards described as closing that gap in practice. A lab telling you where its own model behaves worse is the signal worth reading for.

It belongs in this collection because it shows the behavioral layer being documented at the source. The same failure modes the rest of these notes describe in the abstract, prompt injection and sycophancy and refusal calibration, show up here as named, tested properties of a shipping model.

## Builder read

Read the system card before you build on the model, and read it for behavior. The capability numbers tell you what the model can do. The safety, alignment, and agentic-safety sections tell you how it will act in the situations that actually break products: refusals, sensitive topics, adversarial input, tool use.

Two habits pay off. Look for the documented regressions, not just the headline gains, because those are the behaviors you will have to design around, and a card that admits them is doing you a favor. And map the card's findings onto your own controls: if the model is noted as injection-vulnerable in agentic settings, that is a direct instruction to strengthen your enforcement layer rather than assume the model handles it.

System cards have also become the place labs report tests for specific failure modes like sycophancy and evaluation awareness, so the card doubles as a checklist of behaviors worth testing in your own system.

## Exec read

A frontier model now ships with a public account of its own behavior, including its weaknesses, and that document is a procurement input, not just a research artifact. The presence and the candor of a system card is a signal about how seriously a vendor takes the behavioral layer.

The deployment implication is that "we use a top model" is not a behavioral guarantee. The same card that reports strong capability can report that the model over-refuses, or that its resistance to manipulation regressed in agentic use. Knowing which behaviors are documented as weak is the difference between an informed deployment and a surprised one.

## Caveats

A system card is version-specific. Everything in it describes a particular model release, and the specific findings are superseded with each new version. The durable skill is reading a card for behavior; the specific facts are not durable.

It is the lab's own account, produced by the organization with an interest in the model's reception. It is unusually transparent as these documents go, but it is self-reported, and independent evaluation still matters.

Documented behavior is intended behavior under test conditions, which is not a guarantee of behavior in your deployment. Treat the card as the best available description, not as a warranty.

## Source

Primary: [Claude Opus 4.8 System Card](https://www.anthropic.com/claude-opus-4-8-system-card) (Anthropic, May 2026).

## Related

- [[openai-model-spec|OpenAI Model Spec]] - the stated standard; a system card is the evaluation companion
- [[sycophancy|Sycophancy]] - a behavioral failure mode system cards now test for
- [[prompt-injection|Prompt Injection]] - a vulnerability this card reports in its own model
- [[behavioral-contracts|Behavioral Contracts]] - what a system card documents, read as behavior
