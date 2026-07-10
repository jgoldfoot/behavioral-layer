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

When I decomposed a production contract this way, close to half the clauses turned out to be enforceable in deterministic code, with no model judgment involved at all. That finding is the argument for the whole discipline. Most of an AI system's behavior is code-enforceable once someone does the specification work. The behavioral layer is not a softer, vibes-based cousin of engineering. It is a real architecture: a thin, constrained model wrapped in deterministic services that check it, with the contract as the source both design and engineering build from.

*A note on provenance: the production work described here is the author's own. The specific system, the client, and the underlying clause counts are withheld under confidentiality. What is shared is the finding, not the artifact that produced it.*

## Why it is not documentation

A behavioral contract is not a description of a system someone already shipped. It is the thing the system gets built from. The prose exists for human consensus. The normalized register exists for machine enforcement. The same artifact serves both, and that is what makes it infrastructure instead of paperwork.

The agentic era keeps producing agents faster than anyone can govern them. The teams that pull ahead will be the ones who can state, precisely and in writing, how their systems are supposed to behave, and then show that the system conforms. That document does not have a settled name across the industry yet. Here, it is called a behavioral contract.

## Start here

- [[openai-model-spec|OpenAI Model Spec]] - what a behavioral specification looks like when a frontier lab publishes one
- [[constitutional-ai|Constitutional AI]] - training a behavioral standard into a model
- [[tau-bench]] - measuring whether the specified behavior actually holds
