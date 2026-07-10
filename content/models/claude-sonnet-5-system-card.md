---
title: Claude Sonnet 5 System Card
url: https://www.anthropic.com/claude-sonnet-5-system-card
type: model
section: models
audience: both
source_tier: 1
credit: [Anthropic]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [system-card, agentic-safety, prompt-injection, over-refusal, alignment]
---

Anthropic's system card for Claude Sonnet 5 (June 30, 2026), read for behavior: stronger agentic safety and prompt injection robustness than its predecessor, a documented over-refusal tradeoff, and an alignment assessment that candidly ranks the model below the lab's own larger models.

## Builder read

The headline: "Sonnet 5 demonstrates an improvement over Sonnet 4.6 in agentic safety, especially in prompt injection robustness." The agentic safety section is worth reading for its structure alone. It splits into malicious use of agents (Claude Code, computer use, and agentic influence campaigns, the last testing whether the model can "autonomously execute an end-to-end influence operation in a way that would meaningfully uplift a malicious actor") and prompt injection risk, which pairs external red teaming with "Robustness against adaptive attackers across surfaces": a live bug bounty plus coding, computer use, and browser use. The card's own methodological warning is one to steal: "Fixed datasets of known attacks can provide a false sense of security, as a model may perform well against established attack patterns while remaining vulnerable to novel approaches."

The tradeoff to design around: on Claude Code cyber-related test cases "results were more mixed," with the model refusing malicious requests "much more reliably than Sonnet 4.6, but has a higher rate of over-refusal." Expect earlier friction too: the model "tends to surface concerns about a request's end goal earlier in conversations, for instance asking the purpose of a requested artifact before beginning work." If your product wraps coding or security workflows, that is refusal-handling work on your side, not a footnote.

And keep your own defenses: the card states that "Preventing prompt injection remains one of our highest priorities for the secure deployment of models in agentic systems." A priority is not a solved problem.

## Exec read

The alignment assessment framing is the candor signal. Sonnet 5 "improves upon Sonnet 4.6 on most alignment measures, though it falls short of the levels of alignment shown by more capable recent models from the Opus and Mythos classes," with improvements in constitutional adherence, misuse robustness, and self-initiated risky behavior alongside "a few minor regressions" in prefill and harmful-system-prompt susceptibility. A lab publicly placing its new mid-tier model below its own larger models tells you tier selection is a behavioral decision, not just a price-performance one.

The over-refusal finding is a business cost stated plainly: safer refusal behavior arrived with a higher rate of declining legitimate work. That tradeoff belongs in the deployment decision, not discovered in production.

## Caveats

Version-specific: everything here describes Sonnet 5 at release and is superseded by later models and updates.

Self-reported: this is the lab's own evaluation of its own model. Unusually detailed, but not independent.

Documented behavior is behavior under test conditions. It is not a guarantee of behavior in your deployment, under your prompts, against your adversaries.

## Source

Primary: [Claude Sonnet 5 System Card](https://www.anthropic.com/claude-sonnet-5-system-card) (Anthropic, June 30, 2026).

## Related

- [[claude-sonnet-5-agentic-safety|Claude Sonnet 5 Reports Improved Agentic Safety]] - the short Signal take on this card
- [[claude-opus-4-8-system-card|Claude Opus 4.8 System Card]] - the sibling card, and the comparison class the alignment assessment cites
- [[prompt-injection|Prompt Injection]] - the failure mode this card spends the most adversarial effort on
