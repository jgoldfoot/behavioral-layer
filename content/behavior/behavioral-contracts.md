---
title: Behavioral Contracts
aliases:
  - Behavioral Contracts
type: concept
section: behavior
audience: both
source_tier: original
credit: [Joel Goldfoot]
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [behavioral-contracts, behavior, governance, specification, trust]
---

A behavioral contract is a written specification of how an AI system behaves with users: what it does at the edges, when it escalates, what it refuses, how it discloses its limits, and how it recovers when it fails. It is the design artifact the agentic era keeps skipping.

## The unwritten contract

Every agent already has a behavioral contract. Most of them are just unwritten, scattered across a system prompt, a handful of guardrails, and whatever the model happened to learn.

That holds until it doesn't. The moment an agent has to refuse a reasonable-sounding request, escalate to a human, admit it does not know, or recover from its own mistake, the unwritten contract gets exposed. Those are the moments that decide whether anyone trusts the system, and they are exactly the moments most teams never specified.

## Specification, not tuning

The conventional move is to treat behavior as a tuning problem. Write a better system prompt, add a guardrail when something breaks, patch the next incident when it arrives. That scales the way a pile of patches scales, which is to say it does not.

The better move is to treat behavior as a specification problem. You decide how the system should act at the edges before it acts, you write it down as the canonical artifact, and everything downstream conforms to it. A behavioral contract covers conduct, not capability: how confident the system must be to act, when it hands off, what it will not do, how it tells the user the truth about its own limits, how it holds context, how it repairs a failure.

## What happens when you make the prose executable

I have built these in production, and the surprising part is what falls out when you take the prose seriously enough to make it run.

Start with a contract written in plain language, dozens of clauses organized by domain. Then normalize each clause into a typed rule: what triggers it, what it checks, how it is enforced, and what happens when it is violated. Two things surface immediately. The contradictions you could not see in prose become mechanical, because two rules that disagree now disagree in a way a query can find. And the enforcement split becomes visible.

When I decomposed one production contract this way, close to half the clauses turned out to be enforceable in deterministic code, with no model judgment involved at all. That is one decomposition, classified by the same person who wrote the contract, and I want to be exact about what it is and is not. It is the observation that convinced me this discipline is real. It is not a survey, and it is not evidence about anyone else's system. If the ratio holds elsewhere, a large share of AI behavior is code-enforceable once someone does the specification work, and that would be the argument for the whole discipline. Whether it holds elsewhere is an open question I would like other people's numbers on.

What I can say without qualification is architectural rather than statistical: once the split exists at all, the behavioral layer stops being a softer, vibes-based cousin of engineering. It is a real architecture, a thin, constrained model wrapped in deterministic services that check it, with the contract as the source both design and engineering build from.

*A note on provenance: the production work described here is the author's own. The specific system, the client, and the underlying clause counts are withheld under confidentiality. What is shared is the finding, not the artifact that produced it. That makes the ratio above unverifiable by a reader, which is a real limitation and the reason it is stated as one case rather than as a result.*

## Why it is not documentation

A behavioral contract is not a description of a system someone already shipped. It is the thing the system gets built from. The prose exists for human consensus. The normalized register exists for machine enforcement. The same artifact serves both, and that is what makes it infrastructure instead of paperwork.

The agentic era keeps producing agents faster than anyone can govern them. The teams that pull ahead will be the ones who can state, precisely and in writing, how their systems are supposed to behave, and then show that the system conforms. That document does not have one settled name across the industry yet, though the vocabulary is converging on this one. I have used "behavioral contract" for this artifact since 2025, and in February 2026 a preprint arrived using the same term for a compatible idea, formalizing agent behavioral contracts as a specification language with runtime enforcement ([arXiv:2602.22302](https://arxiv.org/abs/2602.22302)). Convergent naming is worth recording rather than ignoring, so it is recorded here.

## Where this comes from

None of this is new, and pretending otherwise would be the fastest way to be dismissed by people who have been at it longer.

Bertrand Meyer's Design by Contract, from Eiffel in the 1980s, is the source of the word. Its move is the one repeated here: state the obligations at an interface as checkable assertions, then let the runtime enforce them rather than trusting the caller to have read the docs. Swap the caller for a model and most of the structure survives.

The formal study of specified conduct for autonomous agents is older and deeper than the current wave assumes. Normative multi-agent systems and deontic logic have spent decades formalizing obligations, permissions, and prohibitions for agents, including runtime norm enforcement and the institutional machinery around it. The trigger, check, action shape of a typed rule is a rediscovery of that work, not an invention on top of it.

And the deterministic half already has industrial practice: policy-as-code, where authorization and conduct rules are written as inspectable code and evaluated at runtime by an engine like Open Policy Agent, is the enforcement split shipped at scale in a neighboring domain.

The honest question is not what is new here. It is why a mature formal literature never reached the products, and whether the current wave gets further. My working answer is that the earlier work optimized for provable specifications and this one has to survive contact with a probabilistic component, which changes what the artifact has to be: less a logic, more a design document that happens to be partially executable. That is a claim about adoption, not about rigor, and the older literature has the better formal tools.

## Start here

- [[openai-model-spec|OpenAI Model Spec]] - what a behavioral specification looks like when a frontier lab publishes one
- [[constitutional-ai|Constitutional AI]] - training a behavioral standard into a model
- [[tau-bench]] - measuring whether the specified behavior actually holds
