---
title: LLM-as-a-Judge
url: https://arxiv.org/abs/2306.05685
type: paper
section: evaluate
audience: both
source_tier: 1
credit: [Zheng et al. (UC Berkeley)]
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [evaluation, llm-as-judge, scalability, bias, behavior]
---

Using a strong model to grade the behavior of another model, because you cannot put a human on every output. This is the study that showed it works well enough to rely on, and exactly where it does not.

## Why it matters

Behavior is hard to measure at scale. The properties that matter most, honesty, helpfulness, whether a response followed policy, are open-ended and resist a simple answer key. Humans can judge them but cannot judge millions of them. This work established that a capable model can stand in for that judgment surprisingly well.

The headline result is that a strong judge model reaches over 80% agreement with human preferences, about the same rate humans agree with each other. That is the finding that made model-graded evaluation a default tool: if the judge agrees with people as often as people agree with people, it is good enough to scale. But the same work is careful about the failure modes, and they are the more useful part.

It belongs in the evaluation section because it is how most behavioral evaluation actually gets done now. Every benchmark that scores open-ended behavior, every automated check on whether an agent stayed in policy, is leaning on some version of this, which makes its biases everyone's problem.

## Builder read

Use a model to judge behavior, but treat the judge as a system with its own behavioral flaws. The work names the ones that bite: position bias, where the judge favors whichever answer it sees first; verbosity bias, where it rewards length over substance; and self-enhancement bias, where it favors outputs that resemble its own. A judge is not a neutral oracle. It is another model with tendencies you have to control for.

The defenses follow from the biases. Randomize or swap the order of answers to cancel position bias. Watch for the judge rewarding long, confident responses that are not actually better. And be wary of grading a model with a judge from the same family, which can quietly inflate the score. A judge with a clear rubric and single-answer grading tends to be more stable than loose pairwise comparison.

The deeper point: a model-graded eval is only as trustworthy as your handle on the judge's biases. Validate the judge against human labels on a sample before you trust it on the rest.

## Exec read

The evaluation that certifies an AI system's behavior is increasingly performed by another AI system, and that judge has biases of its own. Model-graded evaluation is what makes behavioral testing affordable at scale, but it means the trust chain now includes a grader whose own tendencies, toward length, toward order, toward self-resemblance, can shape the result.

The implication is to ask how a system was evaluated, not just what it scored. A high score from a biased or unvalidated judge is a weaker signal than it looks, and knowing whether the evaluation controlled for the known failure modes is part of knowing whether to trust the number.

## Caveats

The specific agreement rates and judge models are from an earlier generation and have moved. The durable contributions are the method and the catalog of biases, not the leaderboard.

Agreement with human preference is not the same as correctness. A judge that matches what people prefer inherits whatever is wrong with what people prefer, including a taste for confident, agreeable answers.

Model-graded evaluation is a powerful tool, not a complete one. It works best alongside human spot-checks and ground-truth tests, particularly where the cost of a wrong judgment is high.

## Source

Primary: [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685) (Zheng et al., 2023).

## Related

- [[tau-bench]] - a benchmark whose open-ended scoring leans on model judgment
- [[st-webagentbench|ST-WebAgentBench]] - scoring policy compliance at a scale humans cannot reach
- [[sycophancy|Sycophancy]] - the judge's taste for agreeable answers is a bias to control for
- [[behavioral-contracts|Behavioral Contracts]] - judging whether behavior conformed to the contract
