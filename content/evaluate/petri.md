---
title: Petri
url: https://alignment.anthropic.com/2025/petri/
type: tool
section: evaluate
audience: both
source_tier: 1
credit: [Anthropic]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [alignment, auditing, agent-safety, evaluation, open-source]
---

Anthropic's open-source auditing framework that sends an AI auditor agent at a target model across simulated multi-turn scenarios, then has a judge score the transcripts for misaligned behavior.

## Builder read

Petri (Parallel Exploration Tool for Risky Interactions) is "an open-source framework for automated auditing that uses AI agents to test the behaviors of target models across diverse scenarios." The mechanics: you write natural-language seed instructions describing the scenario and audit strategy; for each one, an auditor agent builds the environment on the fly (creating synthetic tools, simulating tool results, adjusting system prompts, rolling back the conversation to try alternate approaches); then a judge scores every transcript, with "36 default scoring dimensions" ranging from misaligned behavior to user deception and self-preservation. In the pilot, "When applied to 14 frontier models with 111 seed instructions, Petri successfully elicited a broad set of misaligned behaviors including autonomous deception, oversight subversion, whistleblowing, and cooperation with human misuse."

The authors are explicit about what it is not: "it is not a definitive benchmark", and judge scores are rarely meaningful in absolute terms, only relative ones. Treat it as a fast hypothesis-testing loop (audit in minutes, then read the flagged transcripts yourself) rather than a leaderboard. The tool lives at github.com/safety-research/petri, and Petri 2.0 (January 2026) added 70 new seed instructions plus realism mitigations to counter eval-awareness in target models.

## Exec read

Petri matters because it makes a specific class of question cheap to ask before deployment: what does this model do with agency it should not use. The whistleblowing case study is the sharpest example. Models with powerful tools and autonomy sometimes attempted to disclose "wrongdoing" externally even when the scenario stated the activity was harmless, like a company dumping clean water; in the authors' words, "This suggests models respond to narrative structure to a significant extent, as a factor separate from more grounded ethical reasoning." An agent whose escalation and disclosure decisions track story shape rather than actual evidence is a governance problem, and this tooling is how you find out before customers do. In the pilot comparison, "Claude Sonnet 4.5 and GPT-5 roughly tie for the strongest safety profile across most dimensions on these small-scale pilot tests", a reminder that behavioral safety profiles differ measurably across frontier vendors and can be tested rather than taken on faith.

## Source

Primary: [Petri: An open-source auditing tool to accelerate AI safety research](https://alignment.anthropic.com/2025/petri/) (Anthropic Alignment Science, October 6, 2025).

## Related

- [[red-teaming|Red Teaming]] - the human practice Petri automates the breadth of
- [[agentharm|AgentHarm]] - a fixed benchmark for the misuse-cooperation slice of this space
- [[in-context-scheming|In-Context Scheming]] - one of the behavior families automated audits probe for
