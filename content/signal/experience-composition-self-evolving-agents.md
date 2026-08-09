---
title: Individually Benign Experiences Compose Into a Jailbreak in Self-Evolving Agents
url: https://arxiv.org/abs/2608.01759
type: paper
section: signal
audience: both
source_tier: 1
credit: [Yan et al. (Beihang University, Beijing Academy of Artificial Intelligence, Beijing University of Posts and Telecommunications)]
date_added: 2026-08-09
last_verified: 2026-08-09
status: live
tags: [agent-memory, self-evolving-agents, jailbreak, safety-boundary, attack-surface, persistence]
---

A paper submitted to arXiv on 2026-08-03 reports that agents which distill past interactions into persistent memory can be walked across a safety boundary by a sequence of tasks that are each benign on their own, with the harmful capability emerging only when the accumulated experiences are recalled together.

## Why it matters

Most memory attacks in the literature need something visibly wrong: privileged write access to the memory store, or a poisoned record that is itself malicious. Both are things a reviewer could in principle look for. This paper's claim is that neither is required. The attacker only interacts with the agent normally, and every individual task it submits would pass an audit of that task in isolation. The unsafe capability is assembled from parts that are separately unobjectionable.

That matters for the behavioral layer because it breaks the unit of analysis. Safety review, red-teaming, and runtime guardrails almost all evaluate a request, a trajectory, or a session. If the harmful property lives in the composition of experiences across sessions, and no single session contains it, then per-session review is looking at the wrong object. It is the same structural problem as an over-permissive set of individually reasonable permissions, moved into memory.

## Builder read

The attack, EvoBreak, is described as "an experience-conditioned sequential attack that operates through individually benign attack-stage tasks and induced experiences." Its loop is adaptive rather than fixed: it observes what the victim actually distilled into memory, identifies which target-relevant requirements are still uncovered, acquires complementary experiences to fill those gaps, and only then reformulates the final query so the stored experiences are activated jointly. The authors also build BreakGym, "a structure-first synthesis pipeline that generates decomposable safety-sensitive targets," to train against, and optimize the attacker with rejection-sampling supervised fine-tuning plus what they call Hint-guided GRPO.

The evaluation covers two self-evolving frameworks with different evolution mechanisms (ReasoningBank, which distills reusable reasoning strategies, and SE-Agent, which iteratively revises prior trajectories), two victim backbones (GPT-5-mini and Llama-3.1-8B-Instruct), three pre-evolution domains used to seed memory (AIME for math, LiveCodeBench for code, MMLU-Pro for general reasoning), and two safety benchmarks (JailbreakBench, 100 malicious prompts, and HarmBench, 400 harmful behaviors). Reported attack success rates for EvoBreak run 78.20 to 86.25 on GPT-5-mini and 87.40 to 93.85 on Llama-3.1-8B-Instruct across those cells, above every baseline compared (PAIR, FlipAttack, ReNeLLM, AgentPoison, MINJA).

The ablation is the part that carries the mechanistic claim, and it is unusually clean. A variant labeled "RF Query Only," which issues the reformulated final query without the preceding experience-acquisition stages, scores 26.40 to 31.20 against the full attack's 87.40 to 90.60 on JailbreakBench. Removing the adaptive replanning drops it to 62.60 to 67.60; removing the reformulation step drops it to 63.00 to 70.40; removing training entirely lands at 52.40 to 56.60. In other words the final query alone does very little, and neither does memory alone: the effect is in the composition, which is exactly what the paper set out to argue. On the trade-off against detectability, the authors position EvoBreak as achieving the best effectiveness-benignness balance in their comparison, noting that AgentPoison "achieves stronger attack performance through direct injection of malicious memory records, requiring privileged access and making the attack more detectable."

## Exec read

If you are deploying agents that remember, this is the risk worth naming to your teams: memory turns a series of acceptable interactions into a state you never approved. Nothing in the sequence looks like an attack while it is happening, so the controls that watch individual requests will not see it.

The practical implications are about lifecycle rather than filtering. An agent's accumulated memory is a durable artifact that grows outside any review gate, is shaped by whoever interacts with the agent, and persists across the sessions your monitoring treats as independent. That suggests treating the memory store itself as something with a retention policy, a provenance record, and a reset path, rather than as an invisible performance optimization. Ask whether your agent's stored experience can be inspected, attributed to who induced it, and rolled back.

Do not read this as a claim that memory-enabled agents are broadly compromised in the wild. It is a controlled study of an attack that its authors constructed and trained, against two frameworks and two models, with no deployed system tested and no defense proposed.

## Caveats

This is a v1 arXiv preprint and has not been peer reviewed. It is an attack paper: it demonstrates a vulnerability and does not evaluate or propose a mitigation, so nothing here tells you what defense would work. The victim backbones are two models at the small and mid tier (Llama-3.1-8B-Instruct and GPT-5-mini), not frontier systems, and the attack is markedly more effective against the smaller open-weight model, which leaves its behavior at frontier scale untested. Both self-evolving frameworks are research systems rather than deployed products. Attack success is scored by whether the victim's final response fulfills the target objective, a judgment that inherits the well-documented limits of automated harm grading, and the benignness figures are likewise the authors' own measurement of their own attack. The headline framing that benign composition is "a persistent attack surface in self-evolving agents" is the authors' generalization from this setup, not an independently replicated finding.

## Source

Primary: [Benign Alone, Harmful Together: Exploiting Experience Composition in Self-Evolving LLM Agents](https://arxiv.org/abs/2608.01759), Bingyu Yan, Xiaoming Zhang, Chaozhuo Li, Ziyi Zhou, Yirui Qi, Litian Zhang (arXiv:2608.01759v1, submitted 2026-08-03). Affiliations are as printed on the paper's first page. Attack success rates are from Table 1, the ablation figures from Table 2, and the detectability comparison from section 4.3.

## Related

- [[memgpt|MemGPT]] - the persistent-memory pattern this attacks
- [[guardrails|Guardrails]] - controls that evaluate a single request will not see this
- [[red-teaming|Red teaming]]
- [[sleeper-agents|Sleeper Agents]] - harmful behavior that stays latent until a trigger
- [[openart-agent-red-teaming-arena|OpenART scales agent red teaming through environment evolution]] - the same cumulative-state problem, approached as an evaluation gap
- [[behavioral-contracts|Behavioral Contracts]]
