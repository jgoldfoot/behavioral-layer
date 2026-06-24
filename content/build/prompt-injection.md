---
title: Prompt Injection
url: https://owasp.org/www-project-top-10-for-large-language-model-applications/
type: framework
section: build
audience: both
source_tier: 1
credit: [OWASP]
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [security, prompt-injection, adversarial, guardrails, behavior]
---

The attack that defines the behavioral layer's threat model: an adversary writes input that the model reads as an instruction rather than as content, and the model obeys.

## Why it matters

Every other note here assumes the system is trying to behave well. This one is about what happens when someone is trying to make it behave badly, and it is the threat that does not go away.

Prompt injection works because a language model reads instructions and data through the same channel. It has no reliable way to tell "here is text to process" from "here is a command to follow," so an attacker who can get text in front of the model can try to redirect it. Direct injection is a user typing "ignore your instructions and do this instead." Indirect injection is the dangerous one for agents: hidden instructions buried in a web page, a document, or an email that the agent reads while doing its job, and then follows. It has held the top spot on the industry's standard list of LLM risks across consecutive editions, which is the field's way of saying this is the one to take seriously.

It belongs on a site about behavior because it is a behavioral failure with an author. Every refusal, every disclosure rule, every escalation policy you specified can be peeled away by input the model was never supposed to treat as a command. The behavioral layer is not just something you design. It is something someone will attack.

## Builder read

You cannot prompt your way out of this. The vulnerability is in how the model reads, not in how you phrased your system prompt, so "tell the model to ignore injected instructions" is not a fix. The standard guidance is defense in depth: validate input, filter output, separate and clearly mark untrusted content, restrict what the agent is allowed to do, and put a human in the loop for high-consequence actions.

The agent-specific danger is the combination of injection and capability. A chatbot that gets injected says something wrong. An agent with tools that gets injected takes an action: sends the email, moves the money, calls the API. The more your agent can do, the more an injection can do through it, which is why least-privilege tooling is a behavioral control, not just a security one.

This is also where an enforcement layer earns its place. A separate check on input and output catches some of what injection slips past the model, which is exactly the job a guard model is built for.

## Exec read

Some part of an AI system's behavior is not yours to fully control, because an adversary gets a vote. Prompt injection is a structural property of how current models work, not a bug a vendor will patch away, so a deployed agent's behavioral guarantees are conditional on defenses holding, not absolute.

This reframes the deployment question. The right question is not "will the agent behave," it is "what can the agent be made to do by someone who wants it to misbehave, and what stops that." An agent that can take consequential actions without a human check is a standing risk whose size equals the most damaging thing it is permitted to do.

## Caveats

The standard taxonomy is a security framework, not a complete account of agent behavior. It catalogs risks well, but defending against them is engineering it points toward rather than performs.

There is no known complete fix. Mitigations reduce the risk, sometimes substantially, but the field has not solved prompt injection, and any claim of a fully injection-proof system should be read with suspicion.

The list reflects a point in time. Attack techniques evolve, multimodal injection is now part of the picture, and the specific ranking and entries are revised between editions.

## Source

Primary: [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (prompt injection is LLM01 in the 2025 edition).

Direct: [2025 edition PDF](https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf).

## Related

- [[llama-guard|Llama Guard]] - an enforcement layer that catches some of what injection slips past
- [[behavioral-contracts|Behavioral Contracts]] - the controls an injection is trying to peel away
- [[claude-opus-4-8-system-card|Claude Opus 4.8 System Card]] - a frontier lab reporting its own model's injection vulnerability
- [[who-owns-the-behavior|Who Owns the Behavior]] - excessive agency is an unowned behavioral risk
