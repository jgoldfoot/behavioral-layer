---
title: Specification Is Enforcement
type: concept
section: behavior
audience: both
source_tier: original
credit: [Joel Goldfoot]
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [behavioral-contracts, specification, enforcement, architecture, determinism]
---

The common belief is that AI behavior is squishy, that you shape it with prompts and hope. The opposite is closer to true: once you specify a behavior precisely enough, most of it stops needing the model at all.

## The prose-to-rule move

A behavioral contract starts as prose, because prose is how humans reach agreement on what the system should do. But prose is not enforceable. To enforce a clause, you have to normalize it into something with structure: a trigger that says when the rule applies, a check that says what to look for, and an action that says what happens when it fires.

That move, from a sentence to a typed rule, is where the real information shows up. The moment a clause has a trigger and a check, you can see what kind of rule it actually is. And most rules, it turns out, are not asking the model to exercise judgment. They are asking whether a condition holds, which is a question code can answer.

## The enforcement split

Specify a contract this way and the clauses sort themselves into a small number of kinds.

Some are purely deterministic. Never reveal this field. Always confirm before a destructive action. Refuse outside this scope. These have a clear trigger and a checkable condition, and a service can enforce them with no model involvement at all. They are, functionally, code.

Some genuinely need the model. Is this request in good faith. Is this the kind of nuance that warrants an exception. These require judgment that does not reduce to a rule, and the model is the right tool for them.

And some are hybrid: the model proposes, a deterministic check disposes. The interesting finding, the one that surprises people who assume AI behavior is irreducibly fuzzy, is how large the first category is. When you actually decompose a real contract, a large share of the clauses turn out to be enforceable in deterministic code, with the model nowhere in the loop. Most of behavior is not a model problem. It is a specification problem wearing a model's clothes.

## Why this is the whole argument

This is what turns the behavioral layer from prompt-tuning into engineering, and it is the answer to the reliability problem that benchmarks keep exposing. A behavior enforced in code does not drift across runs, does not get talked out of itself, does not score differently the eighth time you ask. The deterministic share of a contract is the share you can actually guarantee.

It also inverts the architecture. The instinct is to picture a powerful model that you try to fence in. The shape that actually works is the reverse: a small core of genuine model judgment, wrapped in a large surface of deterministic enforcement the model never gets to override. The model does less than people expect. The specification, and the code that enforces it, does more.

Which is why the work is the specification. Writing a clause precisely enough to know whether it needs the model is most of the job, and it is the part no one can skip by reaching for a better model. The teams that treat behavior as something you specify, rather than something you tune, are the ones whose systems behave the same way twice.

## Related

- [[behavioral-contracts|Behavioral Contracts]] - the artifact this method operates on
- [[llama-guard|Llama Guard]] - the deterministic enforcement surface, as a component
- [[tau-bench]] - the reliability problem that deterministic enforcement answers
- [[who-owns-the-behavior|Who Owns the Behavior]] - specification is the work the owner is responsible for
