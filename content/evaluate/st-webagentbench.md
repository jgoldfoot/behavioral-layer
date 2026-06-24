---
title: ST-WebAgentBench
url: https://arxiv.org/abs/2410.06703
type: benchmark
section: evaluate
audience: both
source_tier: 1
credit: [IBM Research]
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [evaluation, safety, trust, policy-compliance, web-agents, benchmark]
---

A benchmark that scores a web agent not on whether it finished the task, but on whether it finished while obeying the policies it was given.

## Why it matters

Most agent benchmarks ask whether the task got done. This one asks the question a real enterprise actually has: did the agent get it done without breaking the rules. That reframing is the behavioral layer turned into a score.

Its headline metric, Completion Under Policy, credits a task as successful only if the agent respected every applicable policy along the way. A run that finishes the task but violates a rule counts as a failure, which is how a business would judge it. The finding is sobering: completion-under-policy comes in well below raw completion rate, so a large share of apparent successes are policy violations wearing a success label.

This belongs next to tau-bench. That one measures whether behavior is consistent across repetition. This one measures whether behavior stays inside the rules under load. Both say the same thing from different angles: task success is the easy part, and it is not the part that decides whether you can deploy.

## Builder read

Score compliance, not just completion. If your evaluation only tracks task success, it is blind to the failures that actually block deployment, the ones where the agent did the thing but did it in a way the business cannot allow. Completion Under Policy makes those failures visible.

Two design lessons fall out of the benchmark's own findings. Policies should be first-class state the agent carries throughout a task, not a one-time instruction it forgets three steps in, because compliance degrades sharply as the number of active policies rises. And consent and escalation should be explicit actions the agent can take, since the benchmark treats deferring to a human under uncertainty as correct behavior, not as a failure to complete.

The structure also gives you a vocabulary: it scores along several orthogonal dimensions of safe and trustworthy behavior, including user consent and robustness, so failures can be diagnosed by type rather than collapsed into one number.

## Exec read

The gap between "the agent can do the task" and "the agent can be trusted to do the task in production" is now measurable, and it is wide. A meaningful fraction of an agent's successful completions involve breaking a policy that mattered, and that fraction grows as the rules get more numerous.

The benchmark also makes a deployment principle concrete: an agent that knows when to stop and ask is scored as behaving correctly. The ability to defer is not a limitation of the system. It is part of what makes the system trustworthy enough to deploy at all.

## Caveats

The benchmark is grounded in enterprise web tasks built on a specific web-agent environment, so its scenarios represent that setting rather than every kind of agent. The construct generalizes further than the specific tasks do.

The reported results cover a small number of agents on a shared backbone, so read the pattern, the large gap between completion and compliant completion, rather than any single agent's score as a fixed fact.

Like any benchmark, it encodes its authors' framework for what safe and trustworthy means. It is a strong and useful framework, not the last word on the dimensions that matter.

## Source

Primary: [ST-WebAgentBench: A Benchmark for Evaluating Safety and Trustworthiness in Web Agents](https://arxiv.org/abs/2410.06703) (IBM Research).

Project site: [ST-WebAgentBench overview](https://sites.google.com/view/st-webagentbench/home).

## Related

- [[tau-bench]] - the reliability sibling: consistency across repetition
- [[behavioral-contracts|Behavioral Contracts]] - the policies this benchmark scores against are a behavioral contract
- [[language-models-know-what-they-know|Language Models (Mostly) Know What They Know]] - the confidence signal behind knowing when to defer
