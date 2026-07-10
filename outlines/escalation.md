# Escalation (outline for Joel to write in his own voice)

NOT a finished note. This is a staging outline: structure and evidence only, for the
author to rewrite entirely. Do not publish, lint, or link as-is.

## Working thesis (offered, not imposed)

Escalation is not the agent failing; it is a specified behavior: the contract clause that
decides when the system stops acting on its own and what it hands to the human it stops for.

## Argument beats

- Every agent already has an escalation policy, and most are implicit: never escalate,
  or escalate on a hard-coded keyword. Evidence: the "unwritten contract" framing in
  behavioral-contracts, and who-owns-the-behavior (nobody is assigned the thresholds).
- Escalation is a threshold decision, and a threshold needs a signal. Calibrated
  self-reported confidence gives you a number to threshold: below the line, hand off
  instead of acting. Evidence: language-models-know-what-they-know (builder read makes
  exactly this move).
- Early vs late escalation are different behaviors with different costs. Early means
  asking purpose or clarification up front, before acting; late means stopping only after
  damage. Early costs friction; late costs trust, and often irreversibly, so the tradeoff
  is not symmetric. Evidence: building-effective-agents (least autonomy the task needs)
  and failure-and-repair (the right threshold, "rather than too early or too late").
- Over-escalation is its own failure mode. An agent that hands everything back is
  useless, and over-refusal is the model-level version of the same mistake. Evidence:
  claude-sonnet-5-agentic-safety (the card reports a higher over-refusal rate alongside
  better refusal reliability).
- What gets surfaced at handoff matters as much as the handoff itself: state, what was
  attempted, why the agent stopped, what it is uncertain about. A raw transcript dump is
  not an escalation; a legible package is. Evidence: the "Legibility of Agent Activity"
  practice in the OpenAI agentic-governance paper (external source below), plus
  failure-and-repair (recovery means offering a path forward, not a dead end).
- Interrupt points have to be designed in, not assumed. An agent that cannot be stopped
  mid-flight can only escalate between actions, which may be after the damage. Evidence:
  "Interruptibility and Maintaining Control" (section 4.7 of the same OpenAI paper).
- Escalation triggers split the same way all clauses do: some are deterministic (action
  class, spend limit, scope boundary crossed) and some need model judgment (is this
  request out of my depth). Evidence: the enforcement split in
  specification-is-enforcement.
- Escalation can be measured as correct behavior rather than penalized as task failure.
  Evidence: st-webagentbench scores deferral and consent-seeking as success, not failure.

## Existing notes to link

behavioral-contracts, failure-and-repair, specification-is-enforcement,
language-models-know-what-they-know, st-webagentbench, building-effective-agents,
who-owns-the-behavior, claude-sonnet-5-agentic-safety

## External primary sources (fetched and verified 2026-07-09)

- Practices for Governing Agentic AI Systems (Shavit et al., OpenAI, white paper, 2023):
  https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf
  (sections 4.2 approval requirements, 4.4 legibility, 4.7 interruptibility)

## Notes for the author

- Boundary call: failure-and-repair already treats escalation as one of its four failure
  behaviors. This note needs its own altitude: escalation as a designed handoff in normal
  operation, not only as a failure response. Where you draw that line is yours.
- Is "asking purpose up front" escalation, or a separate clarification behavior that
  deserves its own beat (or note)? The early/late framing works either way, but the
  choice changes the note's scope.
- Who sets the threshold is a governance question (product? risk? the behavior owner from
  who-owns-the-behavior?). Decide whether this note takes a position or points at the
  briefing.
- The handoff-package beat could become a concrete checklist (what a good escalation
  surfaces). Whether the site does checklists is a voice decision.
