---
title: Agent Behavioral Contracts (ABC)
url: https://arxiv.org/abs/2602.22302
type: paper
section: behavior
audience: both
source_tier: 1
credit: [Bhardwaj (Accenture)]
date_added: 2026-07-31
last_verified: 2026-07-31
status: live
tags: [behavioral-contracts, formal-methods, runtime-enforcement, governance, drift]
---

A 2026 preprint that gives the behavioral contract a formal definition: a specification-and-enforcement framework for AI agents, with a contract language, a runtime checker, probabilistic compliance measures, and a drift bound, extending Design by Contract from software correctness to agent conduct.

## Why it matters

The document this site calls a behavioral contract is acquiring a formal-methods literature. The paper opens from the same observation this site is built on: "Traditional software relies on contracts -- APIs, type systems, assertions -- to specify and enforce correct behavior. AI agents, by contrast, operate on prompts and natural language instructions with no formal behavioral specification." When the practice side and the formal side converge on the same object, the object is becoming real infrastructure, and the vocabulary is settling.

## Builder read

The contract is defined as a tuple of preconditions, invariants, governance policies, and recovery mechanisms, with the paper's fuller definition splitting invariants and governance into hard and soft variants. Two artifacts make it concrete: ContractSpec, a YAML-based language for writing the contracts, and AgentAssert, a runtime library that checks them per turn and triggers recovery on violation. The theory contribution is a drift bound: under the framework's assumptions, a contract whose recovery rate exceeds its violation rate keeps behavioral drift bounded in expectation.

The reported evaluation runs 200 scenarios across 7 models from 6 vendors. The paper reports that "contracted agents detect 5.2-6.8 soft violations per session" that baselines miss, "88-100% hard constraint compliance," and bounded drift, at what it describes as minimal computational overhead. Read the shape of this even if you never adopt the tooling: specification as data (not prose buried in a prompt), deterministic checks wrapped around the model, and recovery as a first-class contract component rather than an afterthought.

## Exec read

The behavioral contract is moving from practitioner discipline to tooling category: something you can write in a schema, check at runtime, and hold a vendor to. The related-work trail runs through Meyer's Design by Contract, which is the right lineage: this treats how an agent behaves the way software engineering treats whether code is correct. For a decision-maker, the signal is that "our agent follows its specification" is becoming a testable claim with numbers attached, and the questions to ask a vendor follow directly: where is the contract, what enforces it at runtime, and what happens on violation.

## Caveats

This is a single-author preprint, not peer-reviewed, and the paper notes a patent pending: read it as a proposal with a commercial interest attached, not settled science.

The benchmark is the author's own construction, evaluated by its author; the compliance and detection numbers have not been independently reproduced, and no production deployments are cited.

The drift bound is a theorem about the framework's model of drift, holding under its assumptions; it is not a field-measured property of deployed agents.

## Source

Primary: [Agent Behavioral Contracts: Formal Specification and Runtime Enforcement for Reliable Autonomous AI Agents](https://arxiv.org/abs/2602.22302) (Varun Pratap Bhardwaj, Accenture; February 25, 2026; 71 pages).

## Related

- [[behavioral-contracts|Behavioral Contracts]] - the same object, from the design-practice side
- [[specification-is-enforcement|Specification Is Enforcement]] - the enforcement split this framework mechanizes
- [[guardrails|Guardrails]] - runtime enforcement as a component, the pattern ABC formalizes
- [[nemo-guardrails|NeMo Guardrails]] - an earlier programmable-rails toolkit in the same lineage
