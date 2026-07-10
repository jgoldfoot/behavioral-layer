---
title: Claude Sonnet 5 Reports Improved Agentic Safety
url: https://www.anthropic.com/claude-sonnet-5-system-card
type: news
section: signal
audience: both
source_tier: 1
credit: [Anthropic]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [system-card, agentic-safety, prompt-injection, model-behavior]
---

Anthropic shipped Claude Sonnet 5 on 2026-06-30 with a system card whose agentic-safety section reports an improvement over Claude Sonnet 4.6, alongside a more mixed picture on cyber-related refusals.

## Builder read

The card runs a dedicated "Agentic safety" section (Section 5) covering "the malicious use of coding and computer use agents, autonomous execution of influence operations, and prompt injection robustness." It reports that "Sonnet 5 demonstrates an improvement over Sonnet 4.6 in agentic safety, especially in prompt injection robustness (assessed, in part, using a new benchmark)," tested for robustness "against adaptive attackers" across coding, computer use, and browser surfaces. The result is not uniformly better: on Claude Code cyber-related test cases, "results were more mixed," with Sonnet 5 refusing malicious requests "much more reliably than Sonnet 4.6, but" showing "a higher rate of over-refusal."

## Exec read

The behavioral headline is a tradeoff, not a single score. Prompt injection robustness improves, while the cyber path trades more reliable refusal of malicious requests against more over-refusal of benign ones: the kind of detail a deployment decision has to read directly. On alignment, the card notes an improvement "in the timing and calibration of its engagement with potentially harmful requests," with the model tending to "surface concerns about a request's end goal earlier in conversations, for instance asking the purpose of a requested artifact before beginning work." Where the model draws its lines, and how early it raises them, is now documented behavior you can plan around.

## Source

Primary: [Claude Sonnet 5 System Card](https://www.anthropic.com/claude-sonnet-5-system-card) (Anthropic, June 30, 2026). Agentic safety is Section 5; the cyber and over-refusal findings are in the summary of results.

## Related

- [[gpt-5-system-card|GPT-5 System Card]] - the same document type from another lab
- [[claude-opus-4-8-system-card|Claude Opus 4.8 System Card]] - the prior Anthropic card, read for behavior
- [[gemini-3-pro-model-card|Gemini 3 Pro Model Card]] - the Google equivalent
