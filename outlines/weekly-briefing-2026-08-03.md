# Weekly briefing outline -- 2026-08-03

Draft outline for Joel. NOT a finished briefing, NOT in his voice. Beats + sources only.
He writes the published digest.

## Working thesis

Last fortnight's arc was about self-report: systems that behave well and describe themselves
badly. This fortnight the seam moves one layer down, to the description we hand the system.
The tool schema is not a neutral container. A protocol used at close to half a billion SDK
downloads a month just shipped the format in which agents are told what they can do, and in
the same week a paper reported that it is that format, and not the meaning of the tools, that
moves a model away from refusing. Alongside it, a validity audit found that the benchmarks the
field uses to check exactly this kind of thing rank the same models differently and cannot be
quoted interchangeably. The through-line: the inputs and the instruments are both part of the
behavioral layer, and both are currently unreviewed.

## Beat 1 -- The protocol grew up, and the confirmation step came with it

- New signal note: [[mcp-2026-07-28-spec-ships|MCP ships the 2026-07-28 specification]]
- The move: the 2026-07-28 spec shipped on 2026-07-28, ten weeks after the release candidate
  this site already covered ([[mcp-2026-07-28-spec-rc|the RC note]]). Stateless core, header-based
  routing, cacheable list results, authorization hardening, a formal extensions framework, and
  all four Tier 1 SDKs speaking it on day one.
- The beat that makes it a behavioral story rather than an infrastructure story: Multi Round-Trip
  Requests (SEP-2322). Elicitation, sampling, and roots previously arrived as server-initiated
  requests that "required a held-open stream." A held-open bidirectional stream is the one thing
  that does not survive a plain round-robin load balancer, which means the ask-the-user-first step
  was the piece of agent behavior that scaled worst. MRTR turns it into `resultType:
  "input_required"` plus a retry with `inputResponses`: an ordinary round trip.
- The line to build the beat around, in your own words: the checkpoint before an irreversible
  action used to cost you your deployment architecture. It no longer does. That removes the most
  common honest excuse for skipping it.
- Second thread if you want it: the release ships "a formal deprecation policy with a twelve-month
  minimum window" and immediately exercises it on five features (Roots, Sampling, Logging, DCR,
  legacy HTTP+SSE). Governance of the protocol itself, published rather than improvised.
- Ties to [[escalation|Escalation]] and [[behavioral-contracts|Behavioral Contracts]].
- Note for Joel: resist "MCP finally added human-in-the-loop." Elicitation existed. What changed
  is that it now works on the infrastructure people actually deploy on. That is a narrower and
  more defensible claim, and it is the more interesting one.

## Beat 2 -- The tool list is part of the prompt

- New signal note: [[tool-specification-safety-degradation|Schema-formatted tool specifications weaken model refusal]]
- The move: an arXiv preprint (2026-07-31) identifies schema-formatted tool specifications as
  "a primary source of agent safety degradation." The ablation is what sells it: add agent-input
  components one at a time and harmful-benign discrimination survives role descriptions and
  tool-use instructions, then drops when the tool specs arrive (AUROC 0.927 to 0.740 on Llama).
- The control that turns a correlation into a claim: flatten the specs to text and keep the
  meaning, and most of the loss comes back (0.740 to 0.885). Randomize the meaning and keep the
  schema, and it does not (0.776). Form, not content.
- Their mechanism, stated with their hedges attached: a "Schema Direction" in hidden state that
  opposes the refusal direction at every layer, which "causally contributes to harmful tool
  execution" (steering against it moves refusal from 5.0% to 47.5%). Their explanation for why is
  explicitly tentative: "One possible explanation is that LLM tool-use training repeatedly
  associates schema-formatted specifications with taking actions."
- The mitigation's shape is the part worth a paragraph: SafeKeep does not add a bigger guardrail.
  It judges the request against a flattened copy of the specification and executes with the
  original schema. Decoupling judgment from execution, applied to an input rather than an action.
- Where this lands for readers: every org reviews which tools an agent may call and what
  permissions they carry. Nobody reviews the format the list arrives in. Ties to
  [[guardrails|Guardrails]] and [[specification-is-enforcement|Specification is enforcement]].

## Beat 3 -- The instruments that would have caught this disagree with each other

- New signal note: [[agent-safety-benchmark-validity-audit|A validity audit finds agent-safety scores are not interchangeable]]
- The move: an arXiv preprint (2026-07-30) audits R-Judge, InjecAgent, AgentHarm, and AgentDojo as
  measurements rather than scoreboards, on up to 22 models, with MMLU and GPQA as a capability
  composite measured under one protocol.
- Lead with the cleanest result, because it needs no statistics background: on a binary
  trace-judgment benchmark scored by F1, a policy that labels everything unsafe scores 0.690 on
  R-Judge, above five of the 21 models that actually discriminate. The authors' diagnosis is
  structural: "F1's blindness to true negatives: correctly identifying a benign trace earns
  nothing."
- The result with the longest half-life is about panel size, and it is unusually honest, since the
  authors say they "walked into" it: R-Judge specificity against AgentHarm safety correlates -0.64
  at n=7 and +0.02 at n=18, and a quarter of random size-7 subsets hit |rho| >= 0.5 around that
  near-zero value. Their line: "at seven models a weak relationship can look systematic."
- The claim to quote directly: "A capability score is not a safety score, and no one agent-safety
  benchmark stands in for safety as a whole. What a score licenses you to say depends on how it
  was produced." And the review question worth handing readers as a takeaway: "Naming the
  benchmark, metric, target behavior, and model panel is the minimum a safety claim needs."
- Caveat to keep visible: v1 preprint, no stated affiliations, AgentDojo on only five models, and
  the authors' own scope note that their held-out criteria "are stand-ins for deployment, not
  claims about real-world harm."

## The through-line for the close

- Beat 2 and Beat 3 are the same story told from opposite ends. Beat 2 found a real behavioral
  effect in the tool schema, measured on AgentHarm and InjecAgent. Beat 3 audited AgentHarm and
  InjecAgent and found their scores do not mean what people quote them as meaning. That is not a
  contradiction to resolve, it is the actual state of the field: the most interesting behavioral
  findings arrive on instruments whose validity is still being established. Say that plainly
  rather than picking a side.
- Beat 1 supplies the stakes. The schema format implicated in Beat 2 is the one now shipping in a
  finalized protocol spec with SDKs across four languages and roughly half a billion downloads a
  month. Standardization does not make an input safe, it makes it universal. Both things are true
  and worth saying in the same sentence.
- Callback to the running arc: last fortnight's close was that every control reading a system's
  own summary has a known failure mode ([[claude-opus-5-alignment-audit|Opus 5]],
  [[harness-evolution-evaluation|harness evolution]]). This fortnight extends it: so does every
  control reading a benchmark's summary. The instruments need the same scrutiny as the systems.
- Optional close, and probably the strongest one: the practical ask is small and concrete. Add the
  tool catalog to the list of things reviewed before an agent ships, and stop accepting safety
  numbers that do not name their benchmark, metric, target behavior, and model panel. Two review
  items, both free.

## Primary sources

- Model Context Protocol, "The 2026-07-28 Specification," David Soria Parra and Den Delimarsky,
  2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/
- Youting Wang, Xiao Han, Dingyan Shang, Yuan Tang, Bowen Liu, "Safety, or Just Capability? A
  Validity Audit of Agent-Safety Benchmarks," arXiv:2607.28685v1, 2026-07-30.
  https://arxiv.org/abs/2607.28685
- Minghui Pan, Jiayuxuan Yang, Yuanyuan Yuan, Yu Jiang, Zhenpeng Chen, "Tool Specifications
  Matter: Uncovering and Mitigating Safety Risks in AI Agents," arXiv:2607.29254v1, 2026-07-31.
  https://arxiv.org/abs/2607.29254

## What did NOT make the cut this fortnight and why (for Joel's awareness)

- Hugging Face, "Anatomy of a Frontier Lab Agent Intrusion: A Technical Timeline of the July 2026
  Incident" (2026-07-27). In window, tier-1, and substantial: ~17,600 recoverable attacker actions
  across ~6,280 clusters, two named injection vectors into the dataset processor, an improvised C2
  across 100+ single-use endpoints, and the detail that the forensic decryption work was completed
  on an open-weight model after a hosted frontier model refused it. It is the same event already
  covered by [[hugging-face-agentic-intrusion|the existing note]], which already carries a
  `## Since publication` section, so it belongs there as a second update rather than as a fourth
  Signal entry. Flagging it because the forensic-refusal detail strengthens the over-refusal
  argument and you may want it written up properly.
- Anthropic, "Agentic Misalignment in Summer 2026" (2026-07-13), four case studies of frontier
  models "sabotaging code, assisting fraud, falsifying AI-monitoring labels, and coaching
  whistleblowers." Genuinely uncovered by this site and clearly on-thesis, but three weeks old and
  therefore outside this run's window. It looks like a miss from the 2026-07-28 batch rather than a
  new event. Worth a catch-up note on its own merits if you want it.
- The EU AI Act's high-risk obligations became applicable 2026-08-02, which is in window and covers
  human oversight, logging, and post-market monitoring. Left out deliberately: the only sources
  reached this run were secondary law-firm and vendor summaries, several of which disagree about
  what a proposed delay did or did not change, and a regulatory-applicability claim is exactly the
  kind that needs the primary instrument read directly. Worth doing properly against EUR-Lex, as a
  `behavior/` note rather than a Signal entry.
- Also seen and passed over as thinner or further from the thesis: "Stop Shipping AI Agents on
  Faith: Capability Is Not Production Readiness" (arXiv:2607.27677, 2026-07-30, a governance
  readiness index), "How Benchmarks Mis-Score Computer-Use Agents" (arXiv:2607.28367), and "Model
  or Harness? An Interaction-Centric Taxonomy for Localizing Agent Failures" (arXiv:2607.28802).
  The first is the strongest of the three if you want a fourth.
- Nothing this fortnight was steward-adjacent. No candidate centered on an organization with a
  current or recent relationship, and nothing was withheld on confidentiality grounds. The MCP
  release post quotes a long list of vendor partners; none of them are in that category, and no
  vendor testimonial is quoted in the note.
