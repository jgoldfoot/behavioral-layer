# Watch-list (unpublished)

Artifacts that qualify as citable (EDITORIAL 1.2) but do not yet clear the notability bar
(EDITORIAL 1.6). Each entry records what would earn it a resource note. Revisit during
reverification passes.

## Agent Behavioral Contracts (Bhardwaj, arXiv 2602.22302)

- **What it is:** single-author preprint (Feb 25, 2026; Accenture affiliation; patent
  pending) formalizing behavioral contracts for AI agents: ContractSpec YAML DSL,
  AgentAssert runtime enforcement, probabilistic compliance measures, a drift bound, and a
  self-built benchmark (200 scenarios, 7 models).
- **Why it is here, not on the site:** not peer-reviewed; benchmark self-evaluated with no
  independent reproduction; no cited production deployments; patent pending implies a
  commercial interest; and its main claim on this site's attention is terminological
  convergence with the site's own thesis (the exact inclusion motive clause 1.6 exists to
  check). Editorial decision recorded on closed PR #24 (2026-07-31).
- **Include if any of:** peer-reviewed acceptance; independent citations or adoption of
  ContractSpec/AgentAssert in the wild; independent reproduction of the benchmark results.
- **Meanwhile:** the vocabulary-convergence observation belongs, at most, as a passing
  citation in the steward's own `behavioral-contracts` concept note (his voice, his call --
  flagged in the PR #24 body).

## Diagnosing Tool-Selection Reasoning in LLM Agents with Canary Tools (Anand and Chattaraj, arXiv 2608.04719)

- **What it is:** two-author preprint (Aug 5, 2026) planting diagnostic "canary tools" in an
  agent's MCP tool set to probe why a model picks the wrong tool. Six-type taxonomy (semantic
  decoys, parameter traps, capability mirages, prerequisite blindness, temporal decoys,
  granularity traps), eight models across three capability tiers, 120 tasks, 8,640 runs plus a
  2,880-run subtlety ablation, second judge at Cohen's kappa 0.75. Reports canary susceptibility
  varying about 36x across models and that capability tier alone does not predict safety.
- **Why it is here, not on the site:** no institutional affiliation is printed on the paper and
  no funding or organizational backing is stated; the framework, tasks, and grading are all the
  authors' own, so the headline numbers are self-evaluated; v1 preprint with no peer review and
  no independent uptake yet. Methodologically it is the strongest of the unaffiliated candidates
  seen in the 2026-08-09 scan, which is exactly why it needs the notability bar applied rather
  than waived.
- **Include if any of:** peer-reviewed acceptance; independent use of the canary-tool framework
  or taxonomy by another group; stated institutional affiliation plus reproduction.
- **Relevance if it clears:** it is the natural companion to
  `tool-specification-safety-degradation` (form of the tool list) from the diagnostic side (why
  a specific tool gets picked).

## Why Formal Monitors Fail (Zhang, arXiv 2608.01388)

- **What it is:** single-author preprint (Aug 2, 2026) proving that the recall of a fixed-invariant
  finite-automaton runtime monitor is bounded above by the concentration of the attack
  distribution, validated across eight LLM backends: low-entropy attack distributions (H ~ 0.24
  bits) explain 68-75% monitor recall, high-entropy ones (H ~ 2.81 bits) explain 6-13%, with
  entropy accounting for 76% of coverage variance (Pearson r = -0.87). Proposes a pre-deployment
  entropy test for monitor selection.
- **Why it is here, not on the site:** single author, no affiliation printed, no funding
  statement, v1 preprint, no independent reproduction. The theoretical claim is attractive to this
  site's thesis (it would say guardrail coverage is a property of the attack distribution, not of
  the guardrail), and that attraction is the reason to hold it to clause 1.6 rather than to relax
  it. The statistical base is also thin for the strength of the claim: n=8 backends, p=0.005.
- **Include if any of:** peer-reviewed acceptance; independent replication of the entropy-coverage
  bound; adoption of the pre-deployment entropy test by another group.
