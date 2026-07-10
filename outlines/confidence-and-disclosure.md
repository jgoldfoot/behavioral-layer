# Confidence and Disclosure (outline for Joel to write in his own voice)

NOT a finished note. This is a staging outline: structure and evidence only, for the
author to rewrite entirely. Do not publish, lint, or link as-is.

## Working thesis (offered, not imposed)

A trustworthy agent is not the one that is always right; it is the one whose stated
confidence tracks how often it is right, and that tells the truth about what it did and why.

## Argument beats

- Calibration is the load-bearing concept. A confidence statement only communicates if it
  tracks actual accuracy; otherwise it is decoration. Evidence:
  language-models-know-what-they-know (larger models are reasonably calibrated given the
  right format, and can predict whether they know an answer before committing to one).
- The signal can be surfaced in words, not just logits. Models can be trained to express
  calibrated uncertainty in natural language ("90% confidence"), which is what a user
  actually receives. Evidence: Lin et al., "Teaching Models to Express Their Uncertainty
  in Words" (external source below).
- Hedging everything is not disclosure. A uniform "I might be wrong" on every answer
  carries zero information; the contract should specify when uncertainty gets voiced
  (below a threshold) and in what form, so the hedge means something when it appears.
  Evidence: the threshold framing in language-models-know-what-they-know.
- Sycophancy is the mirror-image failure: false confidence in the user's direction,
  agreeing instead of correcting. A disclosure clause has to cover both overclaiming and
  capitulating. Evidence: sycophancy.
- Disclosure is more than uncertainty; it is provenance. What the agent did, what it
  consulted, what it acted on, and why: the activity has to be legible to the person
  accountable for it. Evidence: "Legibility of Agent Activity" in the OpenAI
  agentic-governance practices (external source below); system cards as the lab-scale
  version of the same duty (claude-opus-4-8-system-card, gpt-5-system-card).
- The signal degrades exactly where it matters most: unfamiliar territory. So high-stakes
  disclosure cannot rest on self-report alone; pair it with external checks. Evidence:
  the caveats section of language-models-know-what-they-know.
- Part of disclosure is deterministic. "Always state the data source," "always disclose
  when acting below the confidence threshold" have triggers and checks; they are code, not
  vibes. Evidence: the enforcement split in specification-is-enforcement.
- Whether stated behavior matches actual behavior is measurable. Labs now evaluate their
  models against their own published behavior specs. Evidence: openai-model-spec-evals,
  openai-model-spec.

## Existing notes to link

behavioral-contracts, failure-and-repair, specification-is-enforcement,
language-models-know-what-they-know, sycophancy, openai-model-spec,
openai-model-spec-evals, claude-opus-4-8-system-card, gpt-5-system-card

## External primary sources (fetched and verified 2026-07-09)

- Teaching Models to Express Their Uncertainty in Words (Lin, Hilton, Evans, 2022):
  https://arxiv.org/abs/2205.14334 (verbalized probability is well calibrated and holds
  up under distribution shift)
- Practices for Governing Agentic AI Systems (Shavit et al., OpenAI, 2023):
  https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf
  (section 4.4, Legibility of Agent Activity)

## Notes for the author

- Scope call: is provenance (what I did and why) part of this note, or does it belong
  more to trust-scaffolding's transparency surfaces? The two outlines currently share
  that beat; decide which note owns it and which one points.
- The calibration numbers in both cited papers are from earlier model generations. The
  direction has held; the specifics are dated. How firmly to lean on them is your call.
- Tone question: "expressing uncertainty without hedging everything" invites a strong
  opinion about hedging as a UX anti-pattern. That opinion is yours to state or skip.
- Possible bridge: confidence is the input, escalation is the action taken on it. Whether
  this note or the escalation note owns the threshold mechanics needs one owner.
