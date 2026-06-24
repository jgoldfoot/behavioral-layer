---
title: Llama Guard
url: https://arxiv.org/abs/2312.06674
type: model
section: build
audience: both
source_tier: 1
credit: [Inan et al. (Meta)]
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [guardrails, enforcement, safety, classification, behavior]
---

A separate model whose only job is to read what goes into and comes out of another model and classify it as safe or unsafe against a defined policy. It is the enforcement layer as a product.

## Why it matters

The Behavioral Contracts note argues that a serious agent is a constrained model wrapped in services that check it. Llama Guard is the cleanest public example of one of those services: a guard model that sits at the input and the output and decides whether the content crosses a line you defined.

The design choice worth noticing is that the check is a different model from the one being checked. The thing doing the judging is not the thing being judged. That separation is the whole point of an enforcement layer: the agent can be general and creative, while a narrow, swappable component holds the line on what is allowed. Input filtering catches a bad request before the model ever answers it. Output filtering lets the model try, then refuses to ship a response that violates policy.

It is now several versions in, which tells you this is not a research curiosity. The enforcement layer is becoming standard equipment.

## Builder read

Treat policy as a component, not a prompt. The instinct is to stuff your rules into the system prompt and hope. Llama Guard models the alternative: rules live in an explicit taxonomy that a dedicated classifier enforces, and you can change the taxonomy without retraining, because the categories are passed in at inference time.

Two practical moves come from this. Run the check on both sides, because input and output catch different failures: input filtering stops the bad ask, output filtering stops the bad answer to a reasonable ask. And keep the guard swappable. It is a separate model with its own lifecycle, so you can upgrade the enforcement layer without touching the agent it protects.

The honest caution is that the guard is itself a model, which means it can be fooled. Plan for the enforcement layer to be attacked, not just the agent.

## Exec read

The enforcement of an AI system's behavior can be a distinct, auditable component with its own name, version, and owner. That is a meaningful shift. It means "is this safe to ship" stops being a vague property of the whole model and becomes a question about a specific part you can point to, test, and replace.

It also signals where the market is heading. Safety enforcement is being packaged as infrastructure, released and versioned like any other dependency, which means the absence of such a layer in a deployed system is now a visible gap rather than an excusable unknown.

## Caveats

The guard classifies against a safety taxonomy, which is a narrower slice of behavior than a full behavioral contract. It catches policy-violating content. It does not handle escalation, disclosure, or graceful failure on its own.

It is a model, so it inherits a model's weaknesses. Adversarial inputs and prompt injection can bypass or alter its judgment, and published work has shown that even benign context inserted into the guard can shift its decisions. An enforcement layer is a real improvement, not a guarantee.

The shipped taxonomy reflects one vendor's policy choices. Adapting it to your own definition of unsafe is supported, but it is work, not a default.

## Source

Primary: [Llama Guard: LLM-based Input-Output Safeguard for Human-AI Conversations](https://arxiv.org/abs/2312.06674) (Inan et al., Meta, 2023).

Current version: [Llama Guard 4 model card](https://www.llama.com/docs/model-cards-and-prompt-formats/llama-guard-4/) and [weights on Hugging Face](https://huggingface.co/meta-llama/Llama-Guard-4-12B).

## Related

- [[behavioral-contracts|Behavioral Contracts]] - the enforcement layer this note makes concrete
- [[openai-model-spec|OpenAI Model Spec]] - the kind of standard a guard model can be pointed at
- [[st-webagentbench|ST-WebAgentBench]] - measuring whether an agent actually respects its policies
