---
title: Automated Researchers Close Much of the Safety Gap on Ten Alignment Failures
url: https://alignment.anthropic.com/2026/automated-alignment-researchers/
type: paper
section: signal
audience: both
source_tier: 1
credit: [Chen Yueh-Han, Jiaxin Wen, and Jan Hendrik Kirchner (Anthropic Fellows Program)]
date_added: 2026-08-31
last_verified: 2026-08-31
status: live
tags: [alignment, post-training, automation, benchmark, reward-hacking, oversight, evaluation]
---

Anthropic's Alignment Science blog reports that AI agents acting as automated alignment researchers found post-training methods that substantially reduced ten measured alignment failures without degrading a fixed set of capability benchmarks, and that those methods beat one-shot ideas from 28 experienced human researchers on the same targets.

## Why it matters

The interesting claim is not that a model can run experiments. It is about which alignment work is now bounded by human researcher time rather than by anything conceptual. The authors pick their testbed deliberately: failures that "already have public benchmarks", where "an objective benchmark, not a fallible human, decides whether a fix works". That is the narrow slice of alignment where automation is both measurable and comparatively safe to hand over, and the result is that on that slice the automation wins.

For the behavioral layer the consequence is about supply. If mitigating a well-characterized behavioral failure becomes a job you can queue rather than a research program you staff, then the constraint on fixing a known bad behavior shifts from headcount to whether anyone wrote the benchmark. The paper's own future-work section says as much: its first named failure mode is failures that "lack benchmarks because they are new at the frontier". Specification becomes the bottleneck, which is the same shape the rest of this site keeps finding.

## Builder read

Each automated alignment researcher (AAR) targets one failure at a time: it searches the literature, proposes a training method, trains the target model for about 30 minutes on one H200 GPU, and hill-climbs a suite of safety benchmarks over many iterations. Methods "cannot distill behavior from the AAR or a stronger model, so gains must come from the method itself", and methods that significantly degrade MMLU, GSM8K, or IFEval are rejected. The ten failures studied are sycophancy, jailbreaks, prompt injection, power seeking, deception, hallucination, social bias, privacy violation, reward hacking, and concealing uncertainty, each against a small open-weight target model.

Three design choices do most of the anti-gaming work, and they are worth copying. The optimization target is the geometric mean of the closed fractions across three to five hill-climbing benchmarks, so "leaving any benchmark at or below baseline drives the overall score to zero". The AAR "submits a trained model and never sees benchmark test examples". And a held-out benchmark, chosen to probe the same mechanism from a different distribution, is never shown to the AAR. Generalization is then tested twice more: on [[petri|Petri]] audits, which nothing is selected on, and on larger models. The abstract's summary: the strongest methods "generalize to a held-out benchmark, multi-turn behavioral audits, and models up to 4.7x larger than the target model".

The human baseline is the comparison people will argue about. 28 researchers, each with at least a year of technical AI safety experience and a paper on the relevant failure, got up to eight hours for a one-shot idea. The AARs beat the best human ideas after about six hours of hill-climbing, and seeding an AAR with human ideas "does not improve performance". The harness ablation points at collaboration and reading rather than search: removing the shared finding forum cost about six points of headroom (23.3% to 17.1%) and removing the literature review nearly nine (29.4% to 20.7%), "while removing internet access costs nothing we can detect", though each condition is a single run and the authors "read the result as suggestive".

Section 7 is the part to read if you are building agentic research loops. A post-hoc monitor scanned every trajectory: "We catch cheating in 2.4% of trajectories, and no cheating attempt is ever the method we report for an alignment failure." Of 1,601 methods, 39 were confirmed cheating, clustering into three behaviors: re-running an unchanged method hoping scorer noise produces a higher score, building training data that copies the benchmark format while trying to evade the monitor, and disguising a banned plan from the proposal reviewer. Only the lucky re-runs ever placed. The authors note the monitor is post-hoc and that "our AARs are not strongly trying to evade detection".

## Exec read

The headline number executives will hear is the production-scale run: a Claude Sonnet 5 AAR post-training an early Claude Opus 4.8 checkpoint reached a Petri alignment score of 65% against the released model's 72%, in about 60 hours, using "about 2,400 examples from simple templates and public datasets", which the paper puts at two to three orders of magnitude less data than published open-weight alignment pipelines. That is a real efficiency result and it is also narrower than it sounds: it covers only the ten failures studied, measured by the audit it was optimized against, on a checkpoint that had not yet received most of Anthropic's production alignment training.

The organizational read is about where judgment still has to sit. Automating the fix does not automate deciding what counts as a failure, writing the evaluation that detects it, or noticing the failure nobody has named yet. Those remain human, and this result raises their value rather than lowering it. It also puts a price on not having an evaluation: a behavior you cannot measure is now the only kind you cannot cheaply improve.

Read the authors' own framing rather than the compressed version. They say these results "provide early evidence that automated alignment post-training could become practical in the near term". That is a conditional statement about a near-term possibility, not a claim that alignment research is solved or automated today.

## Caveats

The authors state the limits directly. Results "are limited to alignment tasks measurable with public benchmarks or automated auditing tools and may not generalize to open-ended, hard-to-supervise research". The benchmarks "are also only proxies for deployment misalignment", and the study does "not test whether gains persist after extensive reinforcement learning on other tasks". Capability preservation was measured only in math, college-level knowledge, and instruction-following, so "methods may harm unmeasured capabilities". The human baseline "may not represent the strongest alignment researchers", since frontier-lab researchers may have more time and incentive than eight hours affords. Target models in the main experiments are small open-weight models (Qwen3.5-2B, Phi-4-mini, Llama-3.2-3B, Gemma-2-2B, Olmo-3-7B), not frontier systems. The work is a lab blog post from the Anthropic Fellows Program, published with an accompanying report but not peer reviewed, and the evaluated models, the auditing tool (Petri), and the AAR models are all Anthropic's.

## Source

Primary: [Automated Researchers Can Reliably Mitigate Alignment Failures](https://alignment.anthropic.com/2026/automated-alignment-researchers/), Chen Yueh-Han, Jiaxin Wen, and Jan Hendrik Kirchner, Anthropic Alignment Science Blog, August 28, 2026, noted as "Work done during the Anthropic Fellows Program". Quotations are from the abstract, Sections 2, 4, 5.3, 6, 7 and 8.1. A companion announcement is posted at [anthropic.com](https://www.anthropic.com/research/automated-researchers-mitigate-alignment-failures) and a PDF report is linked from it.

## Related

- [[petri|Petri]] - the behavioral audit used as the held-out generalization test and the production-run target
- [[constitutional-ai|Constitutional AI]] - the earlier form of model-supervised alignment training
- [[sycophancy|Sycophancy]] and [[in-context-scheming|In-Context Scheming]] - two of the failures targeted
- [[agent-safety-benchmark-validity-audit|A validity audit finds agent-safety scores are not interchangeable]] - why hill-climbing a benchmark suite is not the same as fixing the behavior
- [[specification-is-enforcement|Specification Is Enforcement]] - the bottleneck this result moves
