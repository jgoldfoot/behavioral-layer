---
title: Gemini 3 Pro Model Card
url: https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Model-Card.pdf
type: model
section: models
audience: both
source_tier: 1
credit: [Google DeepMind]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [system-card, model-behavior, safety, frontier-safety, evaluation]
---

Google DeepMind's model card for Gemini 3 Pro, read here for what it discloses about behavior: a more detailed safety report than prior Gemini cards, two plainly named behavioral risks, and a Frontier Safety Framework evaluation.

## Why it matters

A model card is a lab's public account of how a model behaves and where it falls short. This one is notable first for its candor about scope: it states it "includes more essential information about the Gemini 3 family of models than previous model cards did."

More useful is that it names its two main behavioral risks in plain language: "a) jailbreak vulnerability (improved compared to Gemini 2.5 Pro but still an open research problem), and b) possible degradation in multi-turn conversations." A card that tells you where its own model is weak is the card worth reading.

It also reports a formal frontier-safety evaluation. Google evaluated Gemini 3 Pro against its Frontier Safety Framework and "found that it did not reach any critical capability levels," across domains including CBRN, cybersecurity, harmful manipulation, machine-learning R&D, and an exploratory Misalignment category.

## Builder read

Design around the two documented risks. If your agent holds long conversations, the card's own warning about "possible degradation in multi-turn conversations" is a direct instruction to test for behavioral drift over a session, and jailbreak resistance is described as improved but unsolved.

Read the methodology, not just the headline. The card says Gemini 3 Pro "outperforms Gemini 2.5 Pro across both safety and tone," yet it also discloses a regression on one automated measure (text-to-text safety, down 10.4% versus 2.5 Pro) and explains that manual review found the losses were "overwhelmingly either a) false positives or b) not egregious." It also cautions that its automated safety scores are "not directly comparable" across card versions.

The exploratory Misalignment evaluations are a useful probe list: the card reports the agent solved "3/11 situational awareness challenges and 1/4 stealth challenges," behaviors directly relevant to whether an agent can be trusted under evaluation.

## Exec read

A frontier model card now names its own behavioral weaknesses and reports a structured frontier-safety assessment that reached no critical capability levels. The candor and the framework are the procurement signal: this is a vendor documenting where its model behaves worse, not only where it improved.

The honest wrinkle is worth noting. The same card that reports overall safety and tone improvements also discloses and contextualizes an automated safety-evaluation regression. A model card that shows its regressions is more trustworthy than one that reports only gains, though it remains a self-reported document.

## Caveats

The card is version-specific: Gemini 3 Pro was released in November 2025 and the card was last updated May 2026, so specific findings are superseded by newer cards.

It is self-reported, and the card states its automated safety-evaluation scores are not directly comparable across versions. The deeper results live in a separate Frontier Safety Framework report.

A no-critical-capability-level result is a threshold statement, not a guarantee of safe behavior in every deployment.

## Source

Primary: [Gemini 3 Pro Model Card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Model-Card.pdf) (Google DeepMind; released November 2025, last updated May 2026).

## Related

- [[claude-opus-4-8-system-card|Claude Opus 4.8 System Card]] - the same document type from another lab
- [[gpt-5-system-card|GPT-5 System Card]] - the OpenAI equivalent, read for behavior
- [[red-teaming|Red Teaming]] - the adversarial testing this card summarizes
- [[behavioral-contracts|Behavioral Contracts]] - the behaviors a card like this documents
