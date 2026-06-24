---
title: Language Models (Mostly) Know What They Know
url: https://arxiv.org/abs/2207.05221
type: paper
section: research
audience: both
source_tier: 1
credit: [Kadavath et al. (Anthropic)]
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [calibration, confidence, disclosure, honesty, evaluation]
---

A study of whether a model can tell when it is likely to be right: whether it can evaluate its own answers, and whether it can predict in advance which questions it can answer at all.

## Why it matters

A behavioral contract has a clause that is easy to write and hard to honor: the system should know its limits and tell the truth about them. This paper is about whether that clause is even buildable, and the answer is a qualified yes.

Two findings carry the weight. Given the right format, larger models are reasonably calibrated, meaning their stated confidence tracks how often they are actually correct. And a model can be asked to evaluate the probability that its own answer is true, or trained to predict the probability that it knows an answer at all, before committing to one. That is the raw material for an agent that can defer, abstain, or escalate instead of confidently inventing.

This is the missing piece between specifying good behavior and getting it. Disclosure and escalation only work if the system has some internal signal for "I am probably wrong here." This paper says that signal exists and can be surfaced.

## Builder read

There is a usable control signal hiding in the model. Asking it to rate the probability its answer is correct, or to predict whether it knows, gives you a number you can threshold: below the line, the agent hands off, asks for confirmation, or says it is not sure, rather than acting.

That is the mechanism behind a real escalation policy. Most teams hard-code escalation to keywords or never build it. A calibrated confidence signal lets escalation be a function of the model's own uncertainty, which is the version that generalizes.

The caution is that the signal is reliable in familiar territory and shaky outside it. Treat self-reported confidence as a strong input to an abstain-or-escalate decision, not as ground truth, and pair it with external checks where being wrong is expensive.

## Exec read

The honesty of an AI system is partly measurable, not purely aspirational. A model carries an internal signal for how likely it is to be right, and that signal can be surfaced and acted on. A system that knows when to say "I am not sure" is buildable, not just desirable.

It also reframes hallucination. Confident wrong answers are not only a training problem to be stamped out later. They are partly a product decision about whether the system is allowed to act on low confidence, and that decision belongs to whoever owns the behavior.

## Caveats

The reassuring result has a hard edge: models are far worse at judging their own knowledge on unfamiliar tasks than on familiar ones. The confidence signal degrades exactly where you most need it, on the novel question the system has not seen before.

The work studies models and their self-evaluation, not a deployed agent's runtime behavior. The path from "the signal exists" to "the agent reliably escalates on it" is engineering you still have to do.

It is one lab's study from an earlier model generation. The direction has held up, but specific numbers are dated and should not be quoted as current capability.

## Source

Primary: [Language Models (Mostly) Know What They Know](https://arxiv.org/abs/2207.05221) (Kadavath et al., Anthropic, 2022).

Author overview: [Anthropic research page](https://www.anthropic.com/research/language-models-mostly-know-what-they-know).

## Related

- [[behavioral-contracts|Behavioral Contracts]] - where the disclosure and confidence clauses live
- [[constitutional-ai|Constitutional AI]] - training honesty in rather than measuring it
- [[st-webagentbench|ST-WebAgentBench]] - benchmarking whether agents defer and seek consent under uncertainty
