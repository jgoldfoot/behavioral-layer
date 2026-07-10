---
title: OSWorld
url: https://arxiv.org/abs/2404.07972
type: benchmark
section: evaluate
audience: both
source_tier: 1
credit: [Xie et al. (The University of Hong Kong & Salesforce Research)]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [computer-use, agents, benchmark, evaluation, reliability]
---

A benchmark of 369 real computer tasks in executable operating-system environments, graded by what actually changed on the machine: at publication, humans completed over 72% of tasks while the best agent managed 12.24%.

## Builder read

OSWorld is "the first-of-its-kind scalable, real computer environment for multimodal agents, supporting task setup, execution-based evaluation, and interactive learning across various operating systems such as Ubuntu, Windows, and macOS." On top of that environment sits "a benchmark of 369 computer tasks involving real web and desktop apps in open domains, OS file I/O, and workflows spanning multiple applications." The design choice that makes it durable is how it grades: each task includes "a detailed initial state setup configuration and a custom execution-based evaluation script for reliable, reproducible evaluation." The score comes from inspecting the resulting machine state, not from reading the agent's account of what it did. An agent that narrates success while leaving the file unsaved fails, which is exactly the discipline a production evaluation needs.

For a builder shipping computer-use agents, this is the environment to run your stack against before trusting it with a real desktop. The paper's failure analysis is a useful map: it found the best model "primarily struggling with GUI grounding and operational knowledge", meaning agents misread where things are on screen and do not know how applications actually work. Those are the failure modes to instrument for in your own telemetry.

## Exec read

The number to remember from the original paper: "While humans can accomplish over 72.36% of the tasks, the best model achieves only 12.24% success". Scores have climbed since these spring 2024 results, but the artifact's lasting value for a deployment decision is the measurement standard, not the leaderboard. It says capability claims about computer-use agents should be verified against actual machine state in a real environment, because an agent operating a desktop can quietly do the wrong thing while reporting the right thing. Until an agent's measured gap against human performance closes on tasks like yours, that gap is the argument for scoped permissions, human checkpoints, and recovery paths rather than open-ended autonomy.

## Source

Primary: [OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments](https://arxiv.org/abs/2404.07972) (Xie et al., The University of Hong Kong, Salesforce Research, CMU, University of Waterloo; submitted April 2024, revised May 2024).

## Related

- [[webarena|WebArena]] - the earlier realistic-environment benchmark, scoped to the web
- [[tau-bench]] - measures consistency of agent behavior rather than one-shot capability
- [[building-effective-agents|Building Effective Agents]] - design guidance for the systems these environments stress-test
