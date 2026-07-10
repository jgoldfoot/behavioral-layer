# Trust Scaffolding (outline for Joel to write in his own voice)

NOT a finished note. This is a staging outline: structure and evidence only, for the
author to rewrite entirely. Do not publish, lint, or link as-is.

## Working thesis (offered, not imposed)

Trust in an agent is not granted, it is extended in increments; the scaffolding (previews,
confirmations, undo, transparency) is what makes each increment safe to extend and cheap
to take back.

## Argument beats

- Trust is a control loop, not a sentiment. The person needs mechanisms to extend trust,
  verify what happened, and withdraw trust without cost; the scaffolding is those
  mechanisms. Evidence: the lineage argument in the-behavioral-layer-is-the-new-ux (this
  is the UX discipline applied to behavior), and Amershi et al.'s guidelines on efficient
  invocation, dismissal, and correction (external source below).
- Preview converts an irreversible action into a reviewable one. Showing the plan, the
  draft, or the diff before execution moves the decision to the cheapest possible moment.
  Everyday cases carry the point: the drafted email shown before send, the code diff shown
  before apply.
- Confirmation should be proportional to consequence. Blanket confirmation trains
  click-through and destroys the signal (the alarm-fatigue problem); the contract should
  reserve hard confirmation for consequential, hard-to-reverse actions. Evidence: the
  approval-requirement practice in the OpenAI agentic-governance paper (external source
  below).
- Undo is the deepest primitive in the stack. Reversibility changes the entire risk
  calculus of delegation; where undo is impossible, confirmation and preview have to carry
  the full weight. Note the deterministic clause shape: "always confirm before a
  destructive action" is code, per specification-is-enforcement.
- Transparency surfaces close the loop: activity logs, "here is what I did and why,"
  visible state. Without them the user cannot verify, so trust cannot compound. Evidence:
  Amershi et al. (make clear why the system did what it did) and the legibility practice
  in the OpenAI paper.
- Progressive autonomy: autonomy expands with track record and contracts on failure.
  Start at the least autonomy the task needs, not the most the model can handle, and let
  demonstrated behavior widen the envelope. Evidence: building-effective-agents;
  failure-and-repair (the failure moment is where the trust ledger actually moves).
- These patterns are contract clauses, not UI garnish. Each scaffold maps to an
  enforceable clause with a trigger and a check, which is what separates scaffolding from
  reassurance theater. Evidence: behavioral-contracts, specification-is-enforcement, and
  st-webagentbench (consent-seeking scored as correct agent behavior).

## Existing notes to link

behavioral-contracts, specification-is-enforcement, failure-and-repair,
building-effective-agents, the-behavioral-layer-is-the-new-ux, st-webagentbench

## External primary sources (fetched and verified 2026-07-09)

- Guidelines for Human-AI Interaction (Amershi et al., CHI 2019):
  https://www.microsoft.com/en-us/research/publication/guidelines-for-human-ai-interaction/
  (18 guidelines validated against 20 AI products; dismissal, correction, and
  explanation guidelines are the relevant ones)
- Practices for Governing Agentic AI Systems (Shavit et al., OpenAI, 2023):
  https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf
  (constraining the action-space and requiring approval; legibility of agent activity)

## Notes for the author

- Naming call: "trust scaffolding" is the index's term. Decide whether the note defines
  it as a coinage or treats it as descriptive; also whether "scaffolding" implies the
  structure comes down once trust is built (a real design question: do confirmations
  ever get removed, and who decides?).
- Overlap to resolve: transparency surfaces appear here and provenance appears in
  confidence-and-disclosure. One note should own the mechanism, the other the content.
- Progressive autonomy needs a concrete shape to avoid being a platitude: what actually
  widens the envelope (time? volume of clean actions? explicit user grant?). That
  mechanism design is a judgment call this outline does not make.
- The Amershi guidelines predate agentic systems. Whether to frame them as directly
  applicable or as a pre-agentic baseline the field must extend is your read to make.
