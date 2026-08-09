# Weekly briefing outline -- 2026-08-09

Draft outline for Joel. NOT a finished briefing, NOT in his voice. Beats + sources only.
He writes the published digest.

## Working thesis

The last two fortnights were about inputs and instruments: the tool schema we hand the model,
and the benchmarks we use to check it. This fortnight the seam moves again, to time. Two
independent groups reported the same structural problem from opposite sides: harm that no
single request contains, assembled out of state that accumulates between requests. One built it
in the agent's memory, one built it in the agent's environment. In both cases every individual
step was permitted, and in both cases the reviewing controls we actually deploy would have
inspected the wrong object. The third entry is the counterweight, and it is a rare one: a vendor
publishing what its own over-cautious control cost, and correcting it by rewriting the
specification rather than the model. The through-line: the unit of safety review is the session,
and the interesting failures are no longer session-sized.

## Beat 1 -- The harmful thing was never in any one session

- New signal note: [[experience-composition-self-evolving-agents|Individually benign experiences compose into a jailbreak]]
- The move: an arXiv preprint (2026-08-03, Beihang / BAAI / BUPT) attacks self-evolving agents
  (agents that distill past interactions into persistent memory) with a sequence of tasks that are
  each benign in isolation. The harmful capability appears only when the accumulated experiences
  are recalled together.
- Why it is different from the memory attacks people already know: the prior art needs privileged
  write access to the memory store, or plants a record that is itself malicious. This needs
  neither. The attacker just uses the agent. Their own contrast with AgentPoison is the cleanest
  way to say it: AgentPoison works "through direct injection of malicious memory records,
  requiring privileged access and making the attack more detectable."
- The number to build the beat on is the ablation, not the headline. Issue only the reformulated
  final query, with none of the preceding experience-building, and it scores 26.40 to 31.20.
  The full attack scores 87.40 to 90.60. The query is not the attack. The composition is.
- The line for your own voice: every control you own inspects a request, a trajectory, or a
  session. If the harmful property is a property of the set, and no member of the set contains
  it, then per-session review is not weak, it is aimed at the wrong object.
- Ties to [[memgpt|MemGPT]], [[sleeper-agents|Sleeper Agents]], [[guardrails|Guardrails]].
- Note for Joel: keep the scope tight. Two victim backbones (GPT-5-mini, Llama-3.1-8B-Instruct),
  two research frameworks, no deployed product, no defense proposed. It is a real mechanism shown
  in a small setting, not a claim about the field. Resist "memory agents are broken."

## Beat 2 -- Same problem, built in the environment instead of the memory

- New signal note: [[openart-agent-red-teaming-arena|OpenART red-teams agents by evolving the environment]]
- The move: an arXiv preprint (2026-08-01, Fudan / Shanghai AI Lab / XSafeAI) holds the task and
  the safety contract fixed and changes only the environment state around the agent, using
  authorized state transitions. Over 10K stateful scenarios, 50 domains, a median of 97 tool calls
  per task, 75 agent-model configurations. Pooled strict attack success rate 85.0%.
- The finding that makes it a pair with Beat 1: the advantage of evolving the environment over
  evolving only the instruction grows with task complexity, from 1.8 to 2.7% on simple
  environments to 17.2 to 17.6% on the most complex. Short static benchmarks do not just miss
  some of this, they miss more of it the more the task resembles real work.
- The finding that extends the site's own running arc: incorporating target-agent identity
  explains an additional 7.6% of attack-success variation beyond model and capability controls.
  Same model, different runtime, measurably different safety outcome. Their phrasing is hedged and
  should stay hedged: it suggests "that runtime implementation plays a significant role in agent
  safety."
- Callback worth making explicitly: this is the adversarial-side measurement of what
  [[harness-evolution-evaluation|the harness-evolution paper]] found on the capability side. The
  scaffolding is not neutral packaging. It is part of the system under test, and almost nobody
  evaluates it.
- The exec sentence hiding in here: the agent framework is a procurement decision with a safety
  coefficient attached, and most organizations currently choose it on developer ergonomics.
- Caveat to keep visible: the arena, the attack, and the grading all belong to the same group.
  85.0% is the reach of their attack inside their arena. It is not a probability that a deployed
  agent is compromised.

## Beat 3 -- What it costs to be wrong in the safe direction, published

- New signal note: [[fable-5-biology-safeguard-recalibration|Anthropic loosens Fable 5's biology classifier]]
- The move: Anthropic (2026-08-07) rewrote the constitution behind Fable 5's biology safety
  classifier, retrained the classifier, and reported that in its testing the change "reduced
  biology-related fallbacks by about 85% across our product surfaces."
- The part that is actually unusual, and the reason this is in the batch: they published the cost
  of their own control, and framed the original setting as a deliberate trade. On launching with
  almost all biology blocked: "We knew this would be frustrating for legitimate biology users: it
  would result in a high number of false positives in the near term." The alternative they rejected
  was "holding back the model until much more safeguards progress was made," which would have cost
  "weeks or months" of access. That is a vendor naming its exchange rate between over-blocking and
  time-to-market, in public.
- Second structural detail worth a line: the fix was made to a written specification, not to the
  model. They rewrote the classifier's constitution, took expert feedback on the text, then
  generated training data from that constitution and retrained. Direct tie to
  [[specification-is-enforcement|Specification is enforcement]].
- Third: the control's action is not refusal, it is routing to a weaker model, and the user is
  shown it. "This is the fallback that users see when their requests are blocked." Graceful
  degradation plus disclosure, rather than a hard no. Worth naming as a pattern.
- ACCURACY WARNING, please do not lose this in the rewrite: the 85% is measured (their testing).
  The per-surface numbers (67% Claude.ai, 55% Cowork, 17% Claude Code, 7% Claude Platform) are in
  a footnote and are stated as an EXPECTATION about total fallbacks from all causes, not a
  measured biology result. My first draft got this wrong and the verification pass caught it. If
  you quote the four numbers, say "expects."

## The through-line for the close

- Beats 1 and 2 are one finding discovered twice, by two groups who did not coordinate, in the two
  places state can accumulate: inside the agent (memory) and outside it (environment). That
  convergence is the strongest thing in the batch and probably the spine of the piece. Neither
  paper needed a forbidden action. Both assembled the harm out of permitted ones.
- The uncomfortable corollary is about review cadence, not tooling. Everything we currently gate
  (a request, a trajectory, a session, a pre-deployment eval) is a snapshot. Both papers describe
  harm that exists only across snapshots. You cannot fix that by making the snapshot stricter.
- Beat 3 is the honest counterweight and keeps the piece from being a scare story. The failure
  mode in Beats 1 and 2 is a control that is too narrow in scope. The failure mode in Beat 3 is a
  control that was deliberately too wide, and the response was to publish the cost and rewrite the
  spec. Those are the two directions a control can be wrong, and only one of them currently gets
  disclosed as a matter of course.
- Callback to the running arc: fortnight one, systems describe themselves badly. Fortnight two,
  the inputs and the instruments are unreviewed. This fortnight, the unit of review itself is the
  wrong size. Three consecutive fortnights of the same underlying point (the thing we are not
  looking at is the thing that moves behavior) is a pattern worth naming out loud rather than
  letting the reader assemble.
- Practical ask to close on, keeping it small and concrete as last time: if your agent remembers,
  the memory store needs a retention policy, a provenance record, and a reset path. If your agent
  runs long stateful workflows, your safety evidence from short tasks does not transfer, and the
  runtime you picked is part of what you are trusting.

## Primary sources

- Anthropic, "Improving Fable 5's biology safeguards," 2026-08-07.
  https://www.anthropic.com/news/improving-fable-5-s-biology-safeguards
- Bingyu Yan, Xiaoming Zhang, Chaozhuo Li, Ziyi Zhou, Yirui Qi, Litian Zhang, "Benign Alone,
  Harmful Together: Exploiting Experience Composition in Self-Evolving LLM Agents,"
  arXiv:2608.01759v1, 2026-08-03. https://arxiv.org/abs/2608.01759
- Yunhao Chen, Xin Wang, Yixu Wang, Yi Liu, Jie Li, Yan Teng, Xingjun Ma, Xia Hu, Yu-Gang Jiang,
  "OpenART: Scaling Agent Red Teaming via Open-Ended Environment Evolution," arXiv:2608.00677v1,
  2026-08-01. https://arxiv.org/abs/2608.00677

## What did NOT make the cut this fortnight and why (for Joel's awareness)

- **Correction to the 2026-08-03 outline, please note.** That outline said the EU AI Act's
  "high-risk obligations became applicable 2026-08-02" and left it out for lack of a primary
  source. Leaving it out was right, and the reason is now clearer: multiple secondary sources this
  run report that a Digital Omnibus on AI postponed the Annex III high-risk obligations (to
  2026-12-02 in some accounts, with Annex I products later still), while Article 50 transparency
  duties did take effect on 2026-08-02. So the earlier framing would have been wrong on the part
  that mattered. I could not reach EUR-Lex this run (the fetch returned no content), and every
  available account is a law-firm or vendor summary, several disagreeing. Still out, still worth
  doing properly against the consolidated text as a `behavior/` note. Do not let this one drift
  into the feed on secondary sourcing.
- Two strong preprints held at the notability bar and written into `outlines/watchlist.md` instead
  of the feed: "Diagnosing Tool-Selection Reasoning in LLM Agents with Canary Tools"
  (arXiv:2608.04719, Aug 5) and "Why Formal Monitors Fail" (arXiv:2608.01388, Aug 2). Both are
  genuinely interesting and both are unaffiliated, self-evaluated v1 preprints with no independent
  uptake. The second is the one to watch: its claim (that a runtime monitor's coverage is bounded
  by the entropy of the attack distribution, not by the monitor's design) would be a real addition
  to the guardrails argument if anyone replicates it. Flagging explicitly because the canary-tools
  paper is the better-executed of the two and would have been a defensible third entry if you want
  to overrule the bar.
- Also seen and passed over as further from the thesis or thinner: "DreamGuard: Efficient Runtime
  Guardrail for LLM Agents via Risk-Aware World Model" (arXiv:2608.05695), "$S^3$: Improving Agent
  Safety through Multi-Stage Defense" (arXiv:2608.02683), "Stateful Governance for Concurrent
  Agentic Systems" (arXiv:2608.02764), and "Resourced Authority: A Mechanism-Design Model for
  Participatory Governance of Deployed AI Agents" (arXiv:2608.06353). The last is the most
  interesting if you want a governance-flavored fourth.
- Checked and empty this fortnight: the MCP blog published nothing after the 2026-07-28
  specification post, OpenAI's alignment blog published nothing in the window, and DeepMind's only
  August post was on weather forecasting.
- **Steward adjacency: nothing withheld this fortnight.** No candidate centered on Salesforce /
  Agentforce or on any organization in that category. The Anthropic entry is a public product
  announcement from a lab with no relationship to the steward's non-public work, and the two
  preprints are academic. Denylist guard passed clean (0 hits across `content/`).
