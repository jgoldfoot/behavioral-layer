---
title: InstructGPT
url: https://arxiv.org/abs/2203.02155
type: paper
section: research
audience: both
source_tier: 1
credit: [Ouyang et al. (OpenAI)]
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [rlhf, instruction-following, alignment, training, behavior]
---

The paper that made models do what you ask. Before behavior could be specified or enforced, a model had to follow instructions at all, and this is the work that turned raw capability into something that takes direction.

## Why it matters

It is easy to forget that following instructions is a trained behavior, not a default one. A raw language model predicts text. It does not, on its own, do what a user asks, and making it bigger does not fix that. This work established the technique that closed the gap: fine-tune the model on human demonstrations of the desired behavior, then refine it against human rankings of its outputs. That second step is reinforcement learning from human feedback, and it is the method most behaved models still rest on.

The result that made the field pay attention: a much smaller model trained this way was preferred by people over a model a hundred times its size that had not been. Capability did not produce the behavior people wanted. Alignment to intent did. The smaller, instruction-tuned model was also more truthful and less toxic, which is to say the training did not just make the model obey, it made it behave better.

It belongs on a site about the behavioral layer because it is the foundation the whole layer stands on. Every later move, specifying behavior, enforcing it, measuring it, assumes a model that follows direction in the first place. This is the work that produced that model.

## Builder read

When you shape an agent's behavior, you are building on top of instruction tuning, and it helps to know what that substrate does and does not give you. It gives you a model that genuinely tries to follow direction, which is why prompting and specification work at all. It does not give you a model that follows direction reliably or safely, which is why the rest of the behavioral layer exists.

The deeper lesson is about where behavior comes from. The model's disposition to be helpful, and its tendency toward some failure modes, was installed by what humans rewarded during training. That is leverage and liability at once: the same feedback process that taught the model to follow instructions can teach it to tell people what they want to hear. Knowing your model's behavior was trained, not given, is the first step to not trusting it blindly.

## Exec read

The single most useful behavior an AI assistant has, doing what it is asked, is not a property of the model's size or intelligence. It is the result of a deliberate, expensive training process aimed at aligning the model with human intent. Capability and obedience are separate achievements, and the second is the one that made these systems usable.

The implication is that a more powerful model is not automatically a better-behaved one. Behavior is engineered on top of capability through training choices, which means it can be done well or badly, and "the model is very capable" says nothing about whether it will do what your users actually need.

## Caveats

This is foundational work from an earlier generation, and the specific models and techniques have advanced well beyond it. The durable contribution is the paradigm, that behavior is trained from human feedback, not the particular system described.

Training on human feedback inherits the flaws of human feedback. The same method that aligns a model to intent can also align it to what raters superficially prefer, a tension later work on sycophancy made explicit.

Instruction-following is necessary for good behavior, not sufficient for it. A model that does what it is told is the starting line of the behavioral layer, not the finish.

## Source

Primary: [Training Language Models to Follow Instructions with Human Feedback](https://arxiv.org/abs/2203.02155) (Ouyang et al., OpenAI, 2022).

## Related

- [[constitutional-ai|Constitutional AI]] - shaping behavior with less reliance on human feedback
- [[sycophancy|Sycophancy]] - the failure mode that human-feedback training can introduce
- [[behavioral-contracts|Behavioral Contracts]] - what you specify on top of an instruction-following model
- [[openai-model-spec|OpenAI Model Spec]] - the same lab later writing down what the model should follow
