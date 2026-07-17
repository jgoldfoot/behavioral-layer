---
title: Anthropic Proposes a Cyber Jailbreak Severity Scale
url: https://www.anthropic.com/news/fable-safeguards-jailbreak-framework
type: news
section: signal
audience: both
source_tier: 1
credit: [Anthropic]
date_added: 2026-07-13
last_verified: 2026-07-13
status: live
tags: [jailbreak, safety-classifier, severity-scoring, agentic-safety, governance]
---

Anthropic published a proposed industry framework for scoring the severity of AI jailbreaks on 2026-07-02, alongside the cyber safety classifiers it shipped with Claude Fable 5 two days earlier.

## Builder read

The framework, drafted "together with Amazon, Microsoft, Google, and other Glasswing partners," scores a jailbreak on four axes: Capability Gain (0 to 4, "How far beyond their existing tools the technique takes the attacker"), Breadth of Capability Gain (0 to 2), Ease of Weaponization (0 to 2), and Discoverability (0 to 2). The axis scores combine into five bands, CJS-0 (Informational) through CJS-4 (Critical), and "The bands are intended to be exponential rather than linear, so each step up is several times more serious than the last." The safeguards side is a live example: Fable 5's classifiers sort cybersecurity requests into Prohibited Use, High-Risk Dual Use, Low-Risk Dual Use, and Benign Use, and run inside a deliberately widened safety margin. Anthropic is explicit about the resulting behavior change: "This means a higher rate of false positives (genuinely benign prompts being blocked) but also greater reassurance about the prevention of harmful outcomes." When a request is blocked, "users will be notified if a request to Fable 5 is blocked, and the request will instead be sent to Opus 4.8."

## Exec read

A severity scale is what turns "was it jailbroken" from a binary into a graded, comparable measurement that more than one lab agrees on. That is the same move as a shared CVSS for vulnerabilities: a cross-vendor vocabulary lets a finding be triaged proportionately rather than escalated to a crisis every time. The safeguard tradeoff is the part a deployment decision has to read directly: a wider safety margin buys assurance at the cost of over-blocking benign work, and the fallback-to-Opus-4.8 behavior means the user experience of a blocked request is itself specified rather than left to a raw refusal. Behavior that is scored, banded, and routed is behavior you can govern.

## Source

Primary: [More details on Fable 5's cyber safeguards and our jailbreak framework](https://www.anthropic.com/news/fable-safeguards-jailbreak-framework) (Anthropic, July 2, 2026), which defines the four axes and the CJS-0 through CJS-4 bands and the safety-margin tradeoff. The partner list and the block-to-Opus-4.8 fallback are stated in [Redeploying Fable 5](https://www.anthropic.com/news/redeploying-fable-5) (Anthropic, June 30, 2026).

## Related

- [[claude-sonnet-5-agentic-safety|Claude Sonnet 5's agentic-safety report]]
- [[guardrails|Guardrails]]
- [[specification-is-enforcement|Specification is enforcement]]
