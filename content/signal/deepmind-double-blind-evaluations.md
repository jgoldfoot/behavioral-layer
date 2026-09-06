---
title: A Double-Blind Evaluation Hides the Benchmark From the Model and the Weights From the Evaluator
url: https://deepmind.google/blog/piloting-the-worlds-first-double-blind-ai-evaluations/
type: news
section: signal
audience: both
source_tier: 1
credit: [Google DeepMind, OpenMined, AVERI, MLCommons, and Singapore AISI]
date_added: 2026-08-31
last_verified: 2026-08-31
status: live
tags: [evaluation, benchmark-contamination, third-party-evaluation, confidential-computing, measurement-validity, governance]
---

Google DeepMind and four partners ran a pilot evaluation inside a hardware-encrypted enclave so that the evaluator never saw the model weights and the model owner never saw the test prompts, which is a mechanism for keeping a private benchmark private rather than a published result about how the model scored.

## Builder read

The setup is specific. Per the accompanying technical report, Gemini 2.5 Flash Lite was served inside a Google Cloud A3 Confidential VM (an `a3-highgpu-1g` instance with Intel TDX host memory encryption and an NVIDIA H100 80GB Confidential GPU), with OpenMined's PySyft managing code submission and approval. Prompts came from the reserve set of MLCommons' AILuminate corpus, described as prompts "that have never been processed by any model", covering hazard domains the report lists as CBRNE, cyberattacks, hate speech, self-harm, and violent crime elicitation. A second run with Singapore AISI used a private prompt set focused on harmful content elicitation in Singapore's context. The blog post states the guarantee plainly: "The evaluator cannot see the Gemini model weights, and Google cannot see the evaluator's test prompts."

The mechanism worth understanding is the redaction allow-list, because it is what makes mutual secrecy tractable at all. Both sides must approve the code that runs, yet both sides have code they will not show. The report's bridge is that proprietary code decomposes into non-proprietary primitives: if hidden code "can be guaranteed to only run methods which themself do not send any data out of the enclave", then it cannot exfiltrate the counterparty's asset regardless of what it does internally. So a model owner submits redacted inference code that is attested to call only allow-listed, non-network-bound framework methods, and the evaluator does the same with its scoring code.

Read the report's own limits before treating this as solved. It says outright that eliminating proprietary method implementations was "too significant of an engineering challenge for this project", "such that not all code could be inspected or allowlisted", and that AVERI was told and accepted the setup anyway. The Confidential Space guest OS builds "are not independently reproducible, as they take private signing keys as inputs", and "we rely on Google's services to sign and verify the attestation report, which places Google in the verification path and thus increases the trust placed in it". The stated bottleneck is also not technical: overhead is reported as under 5%, and the report says the primary constraint "is instead the procedural overhead and human coordination required for legal agreements and code review".

Note what is absent: no benchmark scores are published. This is a demonstration that the pipeline runs end to end, not a safety result about Gemini 2.5 Flash Lite.

## Exec read

The governance problem this addresses is real and has been stuck for a while. An external evaluator who hands a lab its test prompts has burned the benchmark for every future model; a lab that hands over weights has handed over the asset. In practice that has meant high-stakes evaluations run on contracts and zero-logging promises, which is trust, not verification. Putting both assets in an attested enclave converts part of that trust into something a third party can check.

Two things to keep straight when this gets cited. First, the "world's first" framing is the publishers' own and applies to a specific claim, mutual secrecy for one organization's proprietary weights and another's closed benchmark. Second, the model evaluated is Gemini 2.5 Flash Lite, a small fast-tier model, while the announcement describes the achievement as covering "a proprietary, frontier class AI model". The report is candid that scaling to frontier-size systems is future work requiring distributed confidential clusters. Treat this as infrastructure that now exists and has been exercised once, not as the current state of third-party frontier evaluation.

For anyone whose assurance story depends on outside evaluators, the useful question is narrower than the headline: does your evaluation contract currently rely on the other party not retaining your prompts, and would you rather that were a hardware property than a clause?

## Source

Primary: [Piloting the world's first double-blind AI evaluations](https://deepmind.google/blog/piloting-the-worlds-first-double-blind-ai-evaluations/), William Isaac, Sol Messing and Kristian Lum, Google DeepMind, August 27, 2026. Technical detail, quotations about the allow-list mechanism, and all stated limitations are from the accompanying technical report, [Double Blind Evals: Resolving the Dual Confidentiality Dilemma in AI Safety Auditing](https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/piloting-the-worlds-first-double-blind-ai-evaluations/double-blind-evaluations-technical-report.pdf), authored across AVERI, Google, Singapore AISI, OpenMined, and MLCommons. The report gives the AILuminate corpus a version number in its experimental setup that differs from the version named in its introduction, so no version is stated here.

## Related

- [[agent-safety-benchmark-validity-audit|A validity audit finds agent-safety scores are not interchangeable]] - the other half of the measurement problem
- [[harness-evolution-evaluation|Automatic harness evolution fails to beat simple test-time scaling]] - benchmark overfitting from the other direction
- [[red-teaming|Red teaming]]
- [[llm-as-judge|LLM as judge]]
- [[trust-scaffolding|Trust Scaffolding]] - verification replacing assurance-by-contract
