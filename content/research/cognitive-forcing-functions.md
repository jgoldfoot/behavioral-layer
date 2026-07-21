---
title: "To Trust or to Think: Cognitive Forcing Functions Can Reduce Overreliance on AI in AI-assisted Decision-making"
url: https://arxiv.org/abs/2102.09692
type: paper
section: research
audience: both
source_tier: 1
credit: [Buçinca, Malaya, and Gajos]
date_added: 2026-07-10
last_verified: 2026-07-10
status: live
tags: [overreliance, explanations, cognitive-forcing, decision-support, human-ai-interaction]
---

An experiment (N=199) showing that cognitive forcing functions (interventions at decision time that push a person to think before adopting an AI suggestion) reduced overreliance on AI advice relative to simple explainable-AI designs, at a cost in how much people liked them.

## Why it matters

Overreliance is the human half of the reliability problem: people "accept an AI's suggestion even when that suggestion is wrong." The obvious fix, explanations, is weaker than assumed: the paper notes that adding explanations "does not appear to reduce the overreliance and some studies suggest that it might even increase it." The authors posit that people "rarely engage analytically with each individual AI recommendation and explanation, and instead develop general heuristics about whether and when to follow the AI suggestions." If that is right, the fix is not better prose from the model; it is interaction design that interrupts the heuristic.

## Builder read

The three interventions are directly buildable: on demand (the AI suggestion stays hidden until the user asks for it), update (the user commits to their own answer first, then sees the AI's and may revise), and wait (a 30-second delay before the suggestion appears). In this study, "cognitive forcing significantly reduced overreliance compared to the simple explainable AI approaches."

Two warnings travel with that result. First, "people assigned the least favorable subjective ratings to the designs that reduced the overreliance the most," so a satisfaction-driven A/B test will select against the safer design. Second, the benefit was uneven: "on average, cognitive forcing interventions benefited participants higher in Need for Cognition more," meaning the intervention helped the already-motivated most. Friction is a real design material here, kin to [[guardrails|Guardrails]], but it is friction users will report disliking.

## Exec read

If the safety story for an AI-assisted workflow is "the AI explains itself," this study is the counterweight: in this experiment, explanations alone did not reduce overreliance, and the designs that did reduce it scored worst on preference. That makes overreliance a metrics-governance question. A team graded on satisfaction will strip out the very friction that protects decision quality, so someone has to decide, explicitly, which number wins.

## Caveats

One task domain (a nutrition decision: choosing a low-carbohydrate substitute for an ingredient in a meal image), one session, N=199. The 2021 "AI" was a recommendation over images, not a conversational LLM agent; whether these designs transfer to open-ended agent delegation is untested here.

Cognitive forcing reduced overreliance; it did not make AI-assisted people better than unassisted ones on bad advice. When the model's predictions were incorrect, participants with no AI at all performed significantly better than participants in any AI-assisted condition in this study. And the preference penalty was measured in a single encounter; repeated professional use could rate the friction differently, in either direction.

## Source

Primary: [To Trust or to Think](https://arxiv.org/abs/2102.09692) (Buçinca, Malaya, and Gajos, 2021). Published in Proceedings of the ACM on Human-Computer Interaction (CSCW), DOI: [10.1145/3449287](https://doi.org/10.1145/3449287).

## Related

- [[trust-in-automation|Trust in Automation]] - the appropriate-reliance frame this work operationalizes
- [[human-ai-complementarity|Human-AI Complementarity]] - the companion result: explanations raised acceptance of wrong recommendations
- [[guardrails|Guardrails]] - deliberate constraint as a behavioral design tool
