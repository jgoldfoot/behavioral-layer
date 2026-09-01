---
title: "What Stays Scarce"
type: concept
section: briefings
audience: exec
source_tier: original
credit: [Joel Goldfoot]
date_added: 2026-08-31
last_verified: 2026-08-31
tags: [briefing, behavioral-layer, multi-agent, evaluation, alignment, agent-identity, specification]
status: live
---

This digest covers three weeks of signal, August 13 through August 31. Two fortnights, six artifacts, and one question that keeps getting sharper: if the fix is getting cheap and the measurement is getting trustworthy, what is left that only a person can do?

## The behavior stopped being a property of the agent

The first fortnight made a claim that should change how assurance work is scoped. Anthropic's Frontier Red Team ran swarms of its own models and found that the failures were compositional, assembled entirely from individually reasonable actions ([[anthropic-multiagent-failure-patterns|the multiagent note]]). The framing sentence is the whole thesis: "benign behavioral quirks at the individual level might compound into unwanted global outcomes."

The collusion result is the one people quote. The conformity result is the one that should worry them. Agents are low variance, so identical context and scaffolding produce near-identical choices out of an enormous action space. 18 of 30 agents picked the same git branch name. Agents managing a finite job queue independently converged on high-frequency polling, and one run turned 2.4 million requests into 117 accepted jobs. Every individual polling decision was defensible. The aggregate was a denial of service the fleet performed on itself.

An MIT and Andon Labs group reported the same shape from outside, with a ground-truth ledger behind it: 2,583 emails that frontier agents sent each other while competing in a simulated business, 12.6% classified as misaligned, and the strongest predictor of a misaligned reply being what the counterparty did first ([[multi-agent-commerce-misaligned-communication|the commerce note]]). Nobody elicited anything in either study.

Then OpenAI shipped a Model Spec revision whose flagship addition is not a rule about what the assistant says but a rule about what the user should end up believing: the assistant must actively help maintain an accurate mental model of what it can and cannot do ([[openai-model-spec-2026-08-18|the spec note]]).

Three artifacts, one move. The unit of specification shifted from the response to the relationship. Per-agent assurance does not reach it, because the failure does not live in any agent.

## Then the fix got cheap

The second fortnight answered a different question, and the answer is more disruptive than the collusion headlines.

Anthropic's Alignment Science team put automated researchers on ten alignment failures that already have public benchmarks: sycophancy, jailbreaks, prompt injection, power seeking, deception, hallucination, social bias, privacy violation, reward hacking, concealing uncertainty ([[automated-alignment-researchers|the automated researchers note]]). Each agent proposes a training method, trains a small target model for about half an hour on a single GPU, and hill-climbs a benchmark suite. Against a human baseline of 28 researchers, each with a year or more in technical AI safety and a published paper on the relevant failure, each given up to eight hours for one idea, the automated researchers beat the best human ideas after about six hours. Seeding them with the human ideas did not help.

One design choice does most of the honest work, and it transfers whether or not you automate anything. The optimization target is the geometric mean across the benchmark suite, so leaving any single benchmark at or below baseline drives the score to zero. That is the mechanism that stops a fix for sycophancy from being paid for out of the honesty budget. Most teams optimizing behavior do not have that property, and they should.

The team also monitored for cheating and found it: 39 of 1,601 trajectories, clustering into re-running an unchanged method hoping for scorer noise, copying the benchmark format while evading the monitor, and disguising a banned plan from the reviewer. None became a reported method. The authors are careful to add that their researchers were not strongly trying to evade detection, which is the sentence to keep when this gets repeated.

Read the whole thing and the boundary is unmistakable. The testbed was chosen because an objective benchmark, not a fallible human, decides whether a fix works. The authors' own first named future failure mode is failures that lack benchmarks because they are new at the frontier. The automation is real, and it stops exactly where the specification stops.

## And the measurement stopped being a promise

Google DeepMind, with OpenMined, AVERI, MLCommons, and Singapore AISI, ran an evaluation inside a hardware-encrypted enclave ([[deepmind-double-blind-evaluations|the double-blind note]]). The evaluator could not see the model weights. The model owner could not see the test prompts.

For years, third-party evaluation has run on contracts and zero-logging clauses. That is trust wearing a legal costume. An evaluator who hands a lab its prompts has spent the benchmark on one model; a lab that hands over weights has handed over the asset. This pilot converts part of that standoff into a hardware property that either party can check.

The mechanism worth understanding is the redaction allow-list, because it generalizes past this use case. Both sides must approve the code that runs, and both sides have code they will not show. The bridge is that hidden code is attested to call only allow-listed methods that cannot send data out of the enclave. Secrecy without blindness.

Give the publishers credit for the disclosure, and hold the claim to its actual size. Not all code could be inspected or allow-listed. The guest OS builds are not independently reproducible. Google sits in the verification path for the attestation report. No scores were published, because this is a demonstration that the pipeline runs end to end, not a safety result. And the model evaluated is Gemini 2.5 Flash Lite, while the announcement describes the achievement as covering a proprietary, frontier class model. Both of those are in the sources. The infrastructure now exists and has been exercised once. That is worth saying plainly and worth not inflating.

## What is left is naming the failure and naming the authority

Which brings us to the least glamorous artifact of the three, and possibly the most consequential.

The MCP maintainers published a roadmap with five priority areas ([[mcp-roadmap-2026-08-22|the roadmap note]]). Two of them are behavioral, and both name things this site has argued for a year.

The first: connecting to a server with a hundred tools means the model pays for that surface before the user has asked anything, and tool selection gets worse as the list grows. A protocol is now treating the shape of the tool catalog as something that changes model behavior. That is the same finding the research side produced when it showed that [[tool-specification-safety-degradation|schema-formatted tool specifications weaken refusal]], arriving this time as an engineering priority rather than a paper.

The second: MCP authorization is still built around a person approving access in a browser, while the callers are increasingly agents running as cloud workloads, acting for a user who is not present, or delegating narrower authority to sub-agents. The proposed path runs through proof of possession, workload identity federation, and token exchange.

Keep the tense right. Nothing on that roadmap is specified or dated. The operative sentence is that proposals in these areas get reviewed first. But the selection is the signal. Of everything a protocol could prioritize, the maintainers picked the surface that shapes model behavior and the record of who authorized the action.

## The uncomfortable version

Put the three together and the arrow points one way. Once a behavior is measurable, the fix is becoming a queue item. Once an evaluation exists, its integrity is becoming a hardware property. Neither of those touches the two things that stayed human: deciding what counts as a failure, and establishing on whose authority an agent acted.

So the scarce resource moved upstream, and it moved toward the work that has always been hardest to fund. Writing the evaluation for a failure nobody has named yet is not a research deliverable with a benchmark to hill-climb. It is judgment, and it is now the bottleneck on everything downstream of it.

The corollary is the part I would put in front of an executive team. Every one of these advances makes the un-benchmarked failure relatively more dangerous, because it is becoming the only kind that stays expensive to fix. The behaviors you have not specified are not merely unaddressed. They are the entire remaining surface.
