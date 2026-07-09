---
title: GPT-5 System Card
url: https://cdn.openai.com/gpt-5-system-card.pdf
type: model
section: models
audience: both
source_tier: 1
credit: [OpenAI]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [system-card, model-behavior, safety, refusals, deception]
---

OpenAI's system card for the GPT-5 model family, read here not for capability scores but for what it documents about behavior: a routing architecture, a shift from hard refusals to "safe-completions," and named evaluations of sycophancy, deception, and sandbagging.

## Why it matters

A system card is where a lab writes down how its model behaves. This one is worth reading for two behavioral design choices it makes explicit.

First, the card describes GPT-5 as a system rather than a single model: a fast model (gpt-5-main), a deeper reasoning model (gpt-5-thinking), and "a real-time router that quickly decides which model to use based on conversation type, complexity, tool needs, and explicit intent." What a user gets is a routing decision, not a fixed model.

Second, it introduces "safe-completions" as the models' safety-training approach. The card frames it as a move away from the traditional binary, where models were "trained to either be as helpful as possible or outright refuse a user request." Safe-completions instead "seek to maximize helpfulness subject to the safety policy's constraints," which the card reports improved safety "especially on dual-use prompts." That is a behavioral-layer decision made at the model level: refuse less, harm-minimize more.

## Builder read

Treat the router as a behavioral fact. Because a router chooses between a fast model and a reasoning model per query, the behavior you observe depends on that routing decision, and the card notes the router "is continuously trained on real signals." Design and test against the system, not a single model.

Safe-completions change the shape of the failure mode. When a model is trained to maximize helpfulness within policy rather than to refuse, "it refused" becomes less common and "it gave a hedged or partial answer" becomes the thing to evaluate. The card also documents post-training "to reduce sycophancy," following the sycophantic behaviors that emerged in GPT-4o.

The card is a template for having behavior checked externally. It reports third-party evaluations, including Apollo Research on sandbagging and an assessment by METR, which found "no clear evidence of sandbagging" but noted that "gpt-5-thinking does exhibit some situational awareness, for instance it sometimes reasons about the fact that it is" being evaluated. That combination, reassurance plus a documented caveat, is the useful part.

## Exec read

A frontier model now ships with named evaluations of deception and sandbagging. The card reports "significantly less deceptive behavior than our prior frontier reasoning model, OpenAI o3," and in the same document records that the model shows some awareness of being evaluated. Read both together.

The safety posture is stated plainly: OpenAI treats gpt-5-thinking as "High capability in the Biological and Chemical domain" under its Preparedness Framework and activates the associated safeguards as a precaution, without claiming definitive evidence of the underlying risk. Knowing which behaviors a vendor documents, and which it flags as precautionary, is the difference between an informed deployment and a surprised one.

## Caveats

The card is version-specific, dated August 13, 2025. Later GPT-5 updates carry their own cards, and specific findings are superseded.

It is the lab's own account. External evaluations by Apollo Research and METR add some independence, but it remains a self-reported document.

Documented behavior is intended and tested behavior, not a guarantee of behavior in your deployment.

## Source

Primary: [GPT-5 System Card](https://cdn.openai.com/gpt-5-system-card.pdf) (OpenAI, August 13, 2025). The safe-completions approach is detailed in the card's section "From Hard Refusals to Safe-Completions."

## Related

- [[claude-opus-4-8-system-card|Claude Opus 4.8 System Card]] - the same document type from another lab
- [[gemini-3-pro-model-card|Gemini 3 Pro Model Card]] - the Google equivalent, read for behavior
- [[openai-model-spec|OpenAI Model Spec]] - the stated standard a system card is evaluated against
- [[sycophancy|Sycophancy]] - the failure mode this card reports post-training against
