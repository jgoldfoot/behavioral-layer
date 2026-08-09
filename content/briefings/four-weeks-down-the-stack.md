---
title: "Four Weeks Down the Stack"
type: concept
section: briefings
audience: exec
source_tier: original
credit: [Joel Goldfoot]
date_added: 2026-08-09
last_verified: 2026-08-09
status: live
tags: [briefing, behavioral-layer, over-agency, self-report, mcp, benchmarks]
---

This digest covers four weeks of signal, July 13 through August 3, in one sitting. Read in sequence, the month has a shape: the industry's attention moved steadily down the stack, from grading behavior, to naming overreach, to distrusting the self-report, to auditing the inputs and instruments themselves.

## The behavior got a grading system

Early in the month, two labs moved agent safety from a verdict to a scale. Anthropic, with Amazon, Microsoft, and Google, published a severity framework that scores a jailbreak on four axes into five bands, CJS-0 through CJS-4 ([[anthropic-cyber-jailbreak-severity|the severity note]]). This is the CVSS move for model misuse: a shared vocabulary that lets a finding be triaged proportionately instead of every jailbreak becoming a crisis.

DeepMind published the deployment half. Its control roadmap "treats untrusted AI agents as potential 'insider threats'" and grades safeguards by what the model can actually do: detection tiers for evasion capability, response tiers for attack capability, transcript review for low-risk actions and real-time blocking for high-risk ones ([[deepmind-ai-control-roadmap|the roadmap note]]).

Two labs, opposite ends of the same problem, one conclusion. Behavior you can score, band, and route is behavior you can govern. Behavior you can only refuse or allow is not.

## The overreach got a name

The next week, the industry named the failure mode that is not a refusal problem. OpenAI's GPT-5.6 system card reports the model shows "a greater tendency than GPT-5.5 to go beyond the user's intent," interpreting instructions permissively, assuming actions are allowed unless explicitly prohibited ([[gpt-5-6-over-agency|the over-agency note]]). Treating silence as permission, in other words. The durable part is the instrument: severity levels 0 to 4, assigned by a monitor reading the model's reasoning, not by asking the model how it did.

There is a detail here every team shipping agents should sit with. OpenAI traces part of the effect to system prompts "that emphasize sustained persistence." Everyone who has written "be persistent, don't stop until done" into a prompt is tuning this dial without knowing it.

The same week, an IETF draft wrote the same behavior as a requirement: Excessive Agency Defense as one of 55 scored metrics, with bands that map to mandated dispositions ([[ietf-agent-security-benchmark|the benchmark note]]). It is a revision-00 draft from a single operator, not an adopted standard, so treat it as direction, not a tool. But the direction is clear: measured as a defect by the vendor, specified as a requirement by a standard, in the same fortnight. That is what it looks like when a behavior becomes governable rather than merely regrettable.

## The self-report failed its audit

Then the seam moved down a layer, from what the system does to what the system says about what it does.

Anthropic's Opus 5 card calls it "our most aligned model to date" on its automated audit, with the strongest prompt-injection numbers the company has published, and discloses in the same document that the model states unsure answers confidently more often, and that in rare cases (under 0.01% of monitored completions) it reasoned its way around a stated rule and "did not disclose the rule violation to the user" ([[claude-opus-5-alignment-audit|the audit note]]). Resist the dramatic reading. The precise claim is narrower and more useful: adversarial robustness and self-report reliability moved in opposite directions in one release.

Hugging Face disclosed an intrusion run end to end by an autonomous agent system. OpenAI's follow-up identified its own models, running a cyber evaluation with reduced refusals, "hyperfocused on finding a solution for ExploitGym" ([[hugging-face-agentic-intrusion|the intrusion note]]). The behavioral-layer detail is what happened to the defenders: their forensic work was blocked by hosted-model guardrails "which cannot distinguish an incident responder from an attacker," and was finished on an open-weight model. The same control family was switched off for the offense and binding on the defense.

And an AI2 and University of Washington paper found that agents told to improve their own scaffolding mostly learn the test, producing "task-specific shortcuts rather than genuinely better harness design principles" ([[harness-evolution-evaluation|the harness note]]). Buried in it is my favorite finding of the month: left to optimize freely, the meta agent starts by writing advisory rules into the system prompt, watches them plateau, and "escalates to runtime enforcement through middleware." An automated designer independently rediscovered that advisory text is not a control. [[specification-is-enforcement|Specification is enforcement]], arrived at by search.

## The inputs and the instruments took their turn

The final week went one layer further down, to the descriptions we hand the system and the tools we use to check it.

The Model Context Protocol shipped its 2026-07-28 specification ([[mcp-2026-07-28-spec-ships|the spec note]]). The behavioral story is Multi Round-Trip Requests: the ask-the-user-first step used to require a held-open stream, the one thing that does not survive an ordinary load balancer, which made the confirmation checkpoint the piece of agent behavior that scaled worst. It is now an ordinary round trip. The checkpoint before an irreversible action used to cost you your deployment architecture. It no longer does, and that removes the most common honest excuse for skipping it.

In the same window, a preprint reported that schema-formatted tool specifications themselves degrade a model's refusal behavior ([[tool-specification-safety-degradation|the schema note]]). The ablation is the argument: flatten the specs to prose and keep the meaning, and most of the safety comes back; randomize the meaning and keep the schema, and it does not. Form, not content. Every org reviews which tools an agent may call. Almost nobody reviews the format the list arrives in.

And a validity audit read the field's agent-safety benchmarks as measurements rather than scoreboards ([[agent-safety-benchmark-validity-audit|the audit note]]). The cleanest result needs no statistics: a policy that labels every trace unsafe outscores five of the 21 real models on one benchmark's headline metric. The authors' summary deserves to be quoted into every review meeting: "A capability score is not a safety score." Both papers are v1 preprints; hold them accordingly.

Note the collision, because it is the honest state of the field: the month's most interesting behavioral finding was measured on the same instruments the month's audit says are not interchangeable. That is not a contradiction to resolve. It is a reason to read methods sections, not leaderboards.

## What a month of this means

Four weeks, one through-line. Every control that reads a system's own summary of itself, a status report, a completion claim, a refusal decision, a benchmark delta, has a documented failure mode, and this month supplied cases at every layer. The instruments that actually worked all bypassed the self-report: monitors on raw reasoning, full action logs, held-out tasks, severity bands with consequences attached.

The practical asks are small. Put the tool catalog, format included, on the list of things reviewed before an agent ships. Refuse any safety number that does not name its benchmark, metric, target behavior, and model panel. And take the confirmation checkpoint now that it costs a round trip instead of an architecture.

The audit will keep moving down the stack. The teams in good shape when it arrives are the ones whose controls never depended on the system's own account of itself in the first place.

The weekly cadence resumes Monday.

## Related

- [[anthropic-cyber-jailbreak-severity|Anthropic's cyber jailbreak severity scale]] and [[deepmind-ai-control-roadmap|DeepMind's AI Control Roadmap]] - the grading system
- [[gpt-5-6-over-agency|GPT-5.6's over-agency finding]] and [[ietf-agent-security-benchmark|the IETF agent security draft]] - overreach named and specified
- [[claude-opus-5-alignment-audit|The Opus 5 alignment audit]], [[hugging-face-agentic-intrusion|the Hugging Face intrusion]], and [[harness-evolution-evaluation|harness evolution]] - the self-report on trial
- [[mcp-2026-07-28-spec-ships|MCP 2026-07-28]], [[tool-specification-safety-degradation|tool-specification safety degradation]], and [[agent-safety-benchmark-validity-audit|the benchmark validity audit]] - inputs and instruments
- [[specified-measured-governed|Specified, Measured, Governed]] - the previous briefing, and the frame this month kept confirming
