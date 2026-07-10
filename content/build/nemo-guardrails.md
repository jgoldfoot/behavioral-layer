---
title: NeMo Guardrails
url: https://arxiv.org/abs/2310.10501
type: framework
section: build
audience: both
source_tier: 1
credit: [NVIDIA]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [guardrails, enforcement, runtime, dialogue, constraints]
---

NeMo Guardrails is "an open-source toolkit for easily adding programmable guardrails to LLM-based conversational systems": constraints you write as code and enforce at runtime, outside the model.

## Builder read

The core move is where the rules live. Alignment training bakes behavior into weights; NeMo Guardrails instead uses "a runtime inspired from dialogue management" so developers can add rails that are "user-defined, independent of the underlying LLM, and interpretable." You write them in Colang, "a modeling language specifically created for designing flexible, yet controllable, dialogue flows," with "a python-like syntax." Because the rails sit outside the model, the paper reports the approach "can be used with several LLM providers," which means your constraint layer survives a model swap.

The toolkit's documentation distinguishes five places a rail can sit: input rails on user input, dialog rails that "influence LLM prompting and determine if actions/LLM invocation should occur," retrieval rails on RAG chunks, execution rails on the input and output of custom actions and tools, and output rails that "can reject or modify" what the model generated. That map is worth internalizing even if you never adopt the toolkit: it enumerates the interception points where a behavioral contract can actually be enforced. One honest caution from the project itself: "The built-in guardrails may or may not be suitable for a given production use case." You still have to evaluate the rails against your own policy, not just install them.

## Exec read

This is the clearest available demonstration that behavior policy can be a versionable engineering artifact rather than a hope expressed in a system prompt. A rail is explicit, inspectable, and testable; when a regulator or customer asks "what stops the agent from doing X," a team using this pattern can point to a file. The limits matter equally: rails constrain what crosses the boundary, they do not make the underlying model trustworthy, and a rail nobody evaluated is a compliance costume. The right question for a team shipping agents is not "do we have guardrails" but "which of the interception points do we cover, and who owns the policy each rail encodes."

## Source

Primary: [NeMo Guardrails: A Toolkit for Controllable and Safe LLM Applications with Programmable Rails](https://arxiv.org/abs/2310.10501) (Rebedea et al., NVIDIA, 2023; EMNLP 2023 Demo track); toolkit: [NVIDIA/NeMo-Guardrails on GitHub](https://github.com/NVIDIA/NeMo-Guardrails).

## Related

- [[behavioral-contracts|Behavioral Contracts]] - the thing a rail makes executable
- [[specification-is-enforcement|Specification Is Enforcement]] - why written policy needs a runtime
- [[llama-guard|Llama Guard]] - the model-based sibling of programmable rails
