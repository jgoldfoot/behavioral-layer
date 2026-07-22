---
title: "Does the Whole Exceed its Parts? The Effect of AI Explanations on Complementary Team Performance"
url: https://arxiv.org/abs/2006.14779
type: paper
section: research
audience: both
source_tier: 1
credit: [Bansal et al.]
date_added: 2026-07-10
last_verified: 2026-07-10
status: live
tags: [complementarity, explanations, overreliance, team-performance, human-ai-interaction]
---

A CHI 2021 study of human-plus-AI decision making finding that, in the tasks studied, AI explanations increased how often people accepted the AI's recommendation whether or not it was correct, and did not increase complementary team performance.

## Why it matters

The paper sets the bar most human-in-the-loop workflows quietly assume: complementary performance, "where team accuracy is higher than either the human or the AI working solo." Then it undercuts the standard justification for explanations. Earlier "explanations help" results, the authors note, came from settings where "the AI, alone, outperformed both the human and the best team," meaning the measured wins could come from persuading people toward a stronger AI, not from better human judgment. When this study set AI accuracy comparable to human accuracy, "explanations increased the chance that humans will accept the AI's recommendation, regardless of its correctness."

## Builder read

The operational metric this paper hands you is acceptance-when-wrong. If you add explanations to an agent's recommendations, do not just measure task accuracy or satisfaction; measure whether the explanation raises adoption of incorrect outputs. In these studies it did: "explanations increased reliance on recommendations even when the AI was incorrect."

Note what did and did not move: "While we observed complementary improvements from AI augmentation, they were not increased by explanations." Pairing a person with the AI helped in places; the explanation layer was not the ingredient doing the helping. The authors close by asking for explanation designs that "encourage appropriate trust," which for agent builders points toward calibrated signals, the territory of [[confidence-and-disclosure|Confidence and Disclosure]], rather than more persuasive rationale text.

## Exec read

"The AI explains its reasoning" is often sold as a control. In this study it behaved more like persuasion: it made people more likely to go along with the system, including when the system was wrong. For any workflow whose justification is human oversight, the paper supplies the honest benchmark question: is the human-plus-agent combination actually more accurate than the agent alone? If explanations only increase agreement, the oversight is nominal and the cost is real.

## Caveats

This is 2020-2021 work, before conversational LLM agents: crowdworker participants, classifier-style recommendations, and three text tasks (sentiment analysis of book and beer reviews, plus LSAT logical-reasoning questions). The explanation formats tested are those of that era; the results do not automatically cover chain-of-thought style rationales from modern models, nor expert users in high-stakes domains.

The headline result is scoped to the studied regime, where the AI's accuracy was deliberately set comparable to human accuracy. The paper itself reports prior gains from explanations when the AI was clearly stronger than the human, so "explanations increase acceptance regardless of correctness" is a finding about these tasks and designs, not a universal law.

## Source

Primary: [Does the Whole Exceed its Parts?](https://arxiv.org/abs/2006.14779) (Bansal, Wu, Zhou, Fok, Nushi, Kamar, Ribeiro, and Weld, CHI 2021).

## Related

- [[cognitive-forcing-functions|Cognitive Forcing Functions]] - an interaction-design lever that reduced the overreliance this paper measures
- [[trust-in-automation|Trust in Automation]] - the appropriate-reliance frame behind "appropriate trust"
- [[confidence-and-disclosure|Confidence and Disclosure]] - calibrated signals as the alternative to persuasive explanation
