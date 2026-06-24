---
title: OpenAI Model Spec
aliases:
  - OpenAI Model Spec
url: https://model-spec.openai.com/
type: framework
section: behavior
audience: both
source_tier: 1
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [behavioral-contracts, model-behavior, governance, alignment, specification]
---

A public, versioned document in which a frontier lab specifies how its models should behave: how they follow instructions, resolve conflicts between competing directives, and stay inside safety bounds.

## Why it matters

For most of software history, how a system behaved was a byproduct of how it was built. With AI systems, behavior is the design surface itself.

The Model Spec is the clearest public evidence of that shift: a lab treating the behavior of its models as a document to be authored, versioned, and defended, not an outcome to be discovered after launch. It separates the rules a model must not break from the defaults it follows when no one says otherwise, and it defines a chain of command for when instructions conflict.

That structure is the point. It is what a behavioral specification looks like when a serious team writes one down. The reason it sits at the front of this collection is simple: it ends the argument about whether behavior is a real, ownable layer. A frontier lab just published theirs.

## Builder read

Read it as a template, not a policy. The most useful thing in the Spec is not its specific rules but its anatomy: a hierarchy of authority, a split between hard constraints and soft defaults, and explicit handling for what happens when two instructions collide.

If you are writing behavior for your own agent, those are the load-bearing parts. Most teams write a flat list of dos and don'ts, then discover that half the real work is conflict resolution: what wins when the user asks for something a developer instruction forbids. The Spec models that explicitly. Take the structure.

One caution. The Spec describes intended behavior, which is not the same as shipped behavior. Use it as a specification to test your system against, not a description of what any model already does.

## Exec read

Behavior is now a governable asset. A behavioral specification can be authored, reviewed, versioned, and audited like any other critical document. The standard for what that looks like is now public, which means the absence of one is also now visible.

And labs are competing on this in the open. A published behavior spec is a signal about which vendors treat the trust layer as a first-class concern and which leave it implicit.

## Caveats

The Spec describes behavior the lab is working toward, and the lab itself notes that training can lag the document. The model may not yet do everything the Spec says. Read it as intent.

It encodes one lab's values and resolutions, not a neutral or industry-wide standard. Its choices about whose instruction wins are arguments, not laws.

It is a living document. Anything you build on a specific clause should be checked against the current version.

## Source

Primary: [model-spec.openai.com](https://model-spec.openai.com/) (current version dated December 18, 2025).

Context on why the Spec exists and how the lab maintains it: [Inside our approach to the Model Spec](https://openai.com/index/our-approach-to-the-model-spec/).

## Related

- [[constitutional-ai|Constitutional AI]] - the training-time mechanism for instilling a behavioral standard
- [[tau-bench]] - measuring whether specified behavior actually holds under repeated trials
