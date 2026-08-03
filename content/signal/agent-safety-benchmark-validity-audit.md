---
title: A Validity Audit Finds Agent-Safety Scores Are Not Interchangeable
url: https://arxiv.org/abs/2607.28685
type: paper
section: signal
audience: both
source_tier: 1
credit: [Wang et al.]
date_added: 2026-08-03
last_verified: 2026-08-03
status: live
tags: [evaluation, benchmark, measurement-validity, agent-safety, capability, metrics]
---

A paper submitted to arXiv on 2026-07-30 treats four agent-safety benchmarks as measurements to be validated rather than scores to be quoted, and reports that they rank the same models differently, that one benchmark's headline metric can be beaten by a policy that judges nothing, and that a capability score does not stand in for a safety score.

## Why it matters

The site's standing position is that a behavioral claim is only as good as the instrument behind it. This paper is that argument run as an experiment on the instruments the field actually cites. Its opening observation is that agent-safety benchmarks "measure different behaviors, and their scores get quoted interchangeably as an agent's safety." Everything downstream of a safety number, a procurement decision, a release gate, a vendor comparison, inherits whatever that number does and does not discriminate.

## Builder read

The metric failure comes first and is the cleanest result. On any binary trace-judgment benchmark scored by F1, a constant "always positive" policy has a closed-form score of 2p/(1+p) for class base rate p. On R-Judge that is 0.690, above five of the 21 models that actually discriminate. The authors' diagnosis is structural rather than incidental: the problem is "F1's blindness to true negatives: correctly identifying a benign trace earns nothing, so F1 cannot stand alone as a measure of two-sided discrimination on this trace-judgment benchmark." They note that balanced accuracy reorders the leaderboard because it credits correct decisions on both classes.

The panel results are the part worth internalizing before citing any small comparison. Running R-Judge, InjecAgent, AgentHarm, and AgentDojo under their official implementations and author-provided scorers on up to 22 models, with MMLU and GPQA measured under one protocol as a capability composite, the three broad-coverage benchmarks rank the same 18 models differently. The apparent trade-off behind that disagreement turns out to be a sample-size artifact: R-Judge specificity against AgentHarm safety correlates -0.64 at n=7 and +0.02 at n=18, and "a quarter of random size-7 subsets reach |ρ| ≥ 0.5 around that near-zero value." On held-out criteria, capability predicts task success (ρ=+0.60) but correlates negatively with misalignment safety (ρ=-0.44, n=21); the paired crossover contrast is Δ=-1.00 (95% CI [-1.48, -0.49], p<0.001) and survives leave-one-organization-out and organization-clustered bootstrap analyses. On an expanded panel of 40 to 41 models across 12 organizations the misalignment correlation weakens to -0.16 (95% CI [-0.54, +0.22]) and jailbreak strengthens to +0.34, "though neither change is significant." The strongest held-out association is AgentHarm's, ρ=+0.72 with three-template jailbreak safety after controlling capability, which the authors deliberately do not sell as general safety: "both instruments score harmful compliance, so this is evidence of convergent validity rather than general safety."

## Exec read

Two practical rules fall out of this. First, "the model scored well on the safety benchmark" is not a sentence that carries meaning on its own. The authors' minimum bar is worth adopting verbatim as a review question: "Naming the benchmark, metric, target behavior, and model panel is the minimum a safety claim needs." A number without those four things tells you that something was measured, not what.

Second, do not read a capability score as a safety proxy in either direction. The headline conclusion is stated plainly: "A capability score is not a safety score, and no one agent-safety benchmark stands in for safety as a whole. What a score licenses you to say depends on how it was produced." Note also what the paper demonstrates about its own genre. The negative capability-safety relationship that looked robust on roughly twenty models weakened to a non-significant value on forty. If a comparison you are shown rests on a handful of models, the authors' warning applies: "at seven models a weak relationship can look systematic."

## Caveats

This is a v1 arXiv preprint, not peer-reviewed, and no author affiliations are stated on it. AgentDojo ran on only five models, so the cross-benchmark analyses "depend primarily on the other three benchmarks." The authors report per-test p-values "without a family-wise correction" and say the two strongly significant tests would survive Bonferroni while the R-Judge and InjecAgent misalignment cells "would not, and we treat those as suggestive throughout." The retail task-success criterion (40 tasks, one run per model) "is scored by a user-simulator whose variance we do not bound." Their own scope note is the right frame for the whole paper: the three held-out criteria "are stand-ins for deployment, not claims about real-world harm." This is a result about what the instruments support, not a ranking of which models are safe.

## Source

Primary: [Safety, or Just Capability? A Validity Audit of Agent-Safety Benchmarks](https://arxiv.org/abs/2607.28685), Youting Wang, Xiao Han, Dingyan Shang, Yuan Tang, Bowen Liu (arXiv:2607.28685v1, submitted 2026-07-30). The F1 result is Observation 1; the panel and criterion-validity figures are from the abstract and Sections 2 to 6; the stated limits are from Section 6.

## Related

- [[agentharm|AgentHarm]] - one of the four benchmarks audited
- [[harness-evolution-evaluation|Automatic harness evolution fails to beat simple test-time scaling]] - the adjacent measurement-integrity result
- [[llm-as-judge|LLM as judge]]
- [[openai-model-spec-evals|OpenAI introduces Model Spec evals]]
- [[red-teaming|Red teaming]]
- [[prompt-injection|Prompt injection]]
