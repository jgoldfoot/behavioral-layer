# Guardrails (outline for Joel to write in his own voice)

NOT a finished note. This is a staging outline: structure and evidence only, for the
author to rewrite entirely. Do not publish, lint, or link as-is.

## Working thesis (offered, not imposed)

Guardrails are the enforcement half of a behavioral contract: the contract says what must
hold, guardrails are the components that make it hold, and the central design question is
which checks get to be code.

## Argument beats

- Guardrails without a contract are patches. Rules accreted incident-by-incident scale
  like a pile of patches; rules derived from a specification scale like architecture.
  Evidence: the tuning-vs-specification argument in behavioral-contracts.
- The first design axis is deterministic vs model-judged enforcement. Some clauses have a
  trigger and a checkable condition and are functionally code; some genuinely need
  judgment; some are hybrid (model proposes, deterministic check disposes). The
  deterministic share is the share you can guarantee. Evidence:
  specification-is-enforcement (this note's beats should extend it, not restate it).
- The guard should be a separate component from the thing it guards. The judge is not the
  judged: a narrow, swappable enforcement layer with its own version and owner, wrapped
  around a general model. Evidence: llama-guard.
- The second design axis is placement: input, output, or action. Input rails stop the bad
  ask, output rails stop the bad answer, action rails stop the bad deed (tool allowlists,
  approval gates, sandboxes, spend limits). For agents, action rails are the ones that
  matter most, because an injected agent with tools does things, not just says things.
  Evidence: llama-guard (checks on both sides), prompt-injection (injection plus
  capability equals action risk), and the action-space constraint practice in the OpenAI
  agentic-governance paper (external source below).
- Rails can be programmable and model-agnostic: a runtime layer that enforces
  user-defined rules independent of the underlying model, so the rules survive a model
  swap. Evidence: the NeMo Guardrails toolkit paper (external source below); a resource
  note on it (nemo-guardrails) is drafted concurrently with this outline.
- The enforcement layer inherits the threat model. A model-judged guard is itself a model
  and can be fooled; plan for the rails to be attacked, not just tested. Evidence:
  prompt-injection, the caveats in llama-guard, and red-teaming as the practice that
  probes the rails.
- Guardrails are not the whole contract. They catch violations; they do not produce
  escalation, disclosure, or repair. A system can be fully railed and still behave in a
  way no one would trust. Evidence: the caveats section of llama-guard, plus
  failure-and-repair for the half of behavior rails cannot supply.
- Whether the rails hold is measurable: policy-compliance and reliability benchmarks turn
  "our guardrails work" into a score. Evidence: st-webagentbench, tau-bench.

## Existing notes to link

behavioral-contracts, specification-is-enforcement, llama-guard, prompt-injection,
failure-and-repair, red-teaming, st-webagentbench, tau-bench
(plus nemo-guardrails when the concurrent draft lands)

## External primary sources (fetched and verified 2026-07-09)

- NeMo Guardrails: A Toolkit for Controllable and Safe LLM Applications with Programmable
  Rails (Rebedea et al., NVIDIA, 2023): https://arxiv.org/abs/2310.10501
- Practices for Governing Agentic AI Systems (Shavit et al., OpenAI, 2023):
  https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf
  (section 4.2, constraining the action-space and requiring approval)

## Notes for the author

- Altitude call: specification-is-enforcement already owns the deterministic-split
  argument. This note's job is probably the component view (what a guardrail is, where it
  sits, what it cannot do). Decide how much of the split to restate vs simply link.
- The input/output/action taxonomy is offered as an organizing frame; if you prefer a
  different cut (preventive vs detective, or by who owns each rail), the beats survive
  the reorganization.
- "Guardrails as the enforcement half of the contract" implies the other half is the
  specification itself. Whether to make that pairing explicit as the note's spine is a
  voice decision.
- Open question flagged, not answered: when a deterministic rail and the model disagree,
  the rail wins by design. Is there ever a legitimate override path, and who holds it?
