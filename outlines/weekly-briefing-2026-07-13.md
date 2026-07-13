# Weekly briefing outline -- 2026-07-13

Draft outline for Joel. NOT a finished briefing, NOT in his voice. Beats + sources only.
He writes the published digest.

## Working thesis

The behavioral layer got a scoring vocabulary and a control stack in the same fortnight. Two
labs, working the opposite ends of the same problem, both moved agent safety from a yes/no
verdict to a graded, governable system: Anthropic gave the industry a severity scale for
jailbreaks (measure the harm), and DeepMind gave operators a tiered control roadmap for agents
running inside their own systems (contain the harm). The connective tissue is the site's
recurring point: behavior you can score, band, and route is behavior you can govern. Behavior
you can only refuse or allow is not.

## Beat 1 -- A shared severity scale for jailbreaks

- New signal note: [[anthropic-cyber-jailbreak-severity|Anthropic proposes a cyber jailbreak severity scale]]
- The move: a cross-vendor framework (Anthropic with Amazon, Microsoft, Google, and other
  "Glasswing partners") scores a jailbreak on four axes (capability gain, breadth, ease of
  weaponization, discoverability) into five bands, CJS-0 to CJS-4, "exponential rather than
  linear."
- Why it matters: this is the CVSS move for model misuse. A shared vocabulary lets a finding
  be triaged proportionately instead of every jailbreak becoming a crisis. Note for Joel: the
  real-world backdrop was the Fable 5 export-control episode; the briefing can gesture at it
  but the durable story is the scoring instrument, not the news cycle.
- The behavior change to name: Fable 5's classifiers run a deliberately wide safety margin, an
  explicit "higher rate of false positives" traded for assurance, and a blocked request is
  routed to Opus 4.8 rather than dead-ended. The user experience of a refusal is itself
  specified. Source: Anthropic, 2026-07-02 and 2026-06-30.

## Beat 2 -- Controlling the agent inside the building

- New signal note: [[deepmind-ai-control-roadmap|DeepMind's AI Control Roadmap treats agents as insider threats]]
- The move: treat an untrusted agent as a "potential insider threat," layer control on top of
  alignment, and grade safeguards by what the model can actually do: Detection tiers D1-D4
  (evasion capability) and Response tiers R1-R3 (attack execution capability), with after-the-
  fact transcript review for low-risk actions and real-time blocking for high-risk ones.
- Why it matters: it reframes the question from "is the agent aligned" to "what can it do
  before anyone notices, and can we intervene in time." Source: DeepMind, 2026-06-18.
- Caveat to flag: this source is ~3.5 weeks old, just outside the normal one-to-two-week scan
  window (see PR note). Included for the diversity and because it pairs so cleanly with Beat 1;
  Joel decides whether it still reads as "this week."

## The through-line for the close

- Both beats are the same discipline from two directions: specify the thing (a severity band, a
  control tier), measure against it, then let the specification drive what the system does
  (route the request, block the action). Ties to [[specification-is-enforcement|Specification is enforcement]]
  and [[the-behavioral-layer-is-the-new-ux|The behavioral layer is the new UX]].
- What did NOT make the cut this week and why (for Joel's awareness):
  - Claude Fable 5 / Mythos 5 system card (agentic-safety evals, published failure transcripts):
    strong and in-window, but the agentic-safety-from-a-system-card angle would near-duplicate
    the existing [[claude-sonnet-5-agentic-safety|Sonnet 5 note]]. Candidate for a models/ note,
    not signal.
  - OpenAI Model Spec "scope of autonomy" agent principles: real and on-thesis, but they landed
    in the 2025-12-18 spec, not this window.

## Primary sources
- Anthropic, "More details on Fable 5's cyber safeguards and our jailbreak framework," 2026-07-02.
- Anthropic, "Redeploying Fable 5," 2026-06-30.
- Google DeepMind, "Securing internal systems against increasingly capable and imperfectly aligned AI," 2026-06-18.
