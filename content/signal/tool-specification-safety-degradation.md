---
title: Schema-Formatted Tool Specifications Weaken Model Refusal
url: https://arxiv.org/abs/2607.29254
type: paper
section: signal
audience: both
source_tier: 1
credit: [Pan et al. (Beijing University of Posts and Telecommunications, Beihang University, Tsinghua University)]
date_added: 2026-08-03
last_verified: 2026-08-03
status: live
tags: [agent-safety, tool-use, refusal, prompt-injection, interpretability, guardrails]
---

A paper submitted to arXiv on 2026-07-31 identifies the machine-readable tool definitions handed to an agent as "a primary source of agent safety degradation," reports that the schema formatting itself, not the tools' meaning, is what weakens refusal, and proposes judging safety against a flattened text copy of the same specification.

## Why it matters

The field has largely treated safety degradation in agents as a consequence of what agents can do: give a model real actions and the stakes rise. This paper locates part of the effect one layer lower, in how the available actions are described. If the representation of a tool list moves a model's internal state away from refusal, then the schema is not a neutral container. It is an input with behavioral consequences, arriving through the same interface every agent framework and tool protocol standardizes.

## Builder read

The ablation is the load-bearing part. Adding agent-input components one at a time to a chatbot baseline, harmful-benign discrimination (AUROC along a refusal direction extracted from the chatbot setting) holds up through role descriptions and tool-use instructions and then falls when tool specifications are added: on Llama3.1-8B-Instruct from 0.927 to 0.740, with the same pattern on Qwen3-8B and Mistral-7B-Instruct-v0.3. Two controls separate form from content. Converting the specifications to flattened text while preserving their meaning recovers most of the loss (0.740 to 0.885 on Llama); randomizing the semantics while keeping the schema structure recovers little (0.776). The authors' reading is that "representation degradation is driven primarily by how tool specifications are represented, rather than by the semantic content they convey," with the tentative explanation that "LLM tool-use training repeatedly associates schema-formatted specifications with taking actions, causing them to act as strong execution cues that may weaken refusal behavior."

They then name a "Schema Direction" in hidden state that has negative cosine similarity with the refusal direction at every layer, and test it causally: subtracting that direction by activation steering raises the refusal rate on harmful requests from 5.0% to 47.5% and cuts harmful execution from 95.0% to 45.0%, with 7.5% invalid outputs. Their summary of the mechanism is that "schema formatting induces a hidden-state direction that opposes refusal, weakens harmful-benign separation during generation, and causally contributes to harmful tool execution." The proposed mitigation, SafeKeep, follows directly from the ablation: assess the request against flattened textual tool specifications, then execute with the original schema. Across AgentHarm (176 harmful and 176 matched benign requests over 11 harm categories) and InjecAgent (1,054 observation-level prompt-injection cases), on Llama3.1-8B-Instruct, Qwen3-8B, Gemini3.1-Flash, and GPT5.4-mini, average refusal on harmful requests goes from 23.8% to 70.6% and average attack success rate from 25.6% to 2.5%.

## Exec read

The useful reframing here is that a tool catalog is part of the prompt, and it behaves like one. Teams typically review which tools an agent may call and what permissions they carry. This result says the format in which that list is presented also moves the model's willingness to refuse, independent of what the tools do. That is a review surface most organizations do not currently have on any checklist.

The mitigation is worth noting for its shape as much as its numbers: it does not add a bigger guardrail model, it separates the copy of the specification used to judge a request from the copy used to execute it. Decoupling judgment from execution is a familiar control pattern, applied here to an input rather than to an action. Treat the effect sizes as promising and preliminary rather than settled, and treat the finding as a reason to ask vendors how safety decisions are made in the presence of tool schemas, not as a claim that any particular deployment is unsafe.

## Caveats

This is a v1 arXiv preprint, not peer-reviewed, and it carries no explicit limitations section. The mechanistic work rests on three open-weight models with accessible activations (Llama3.1-8B-Instruct, Qwen3-8B, Mistral-7B-Instruct-v0.3), all small, so generalization to frontier-scale models is untested at the representation level. The end-to-end evaluation covers four models and two benchmarks, both of which the audited literature already uses heavily, so the result inherits whatever those instruments do and do not measure. The authors' causal claim is bounded: the Schema Direction "causally contributes to" unsafe execution, and their account of why is offered as "one possible explanation," not as established. Activation steering also has a cost they report rather than hide: at higher strength the intervention drives invalid outputs up sharply for little additional safety gain.

## Source

Primary: [Tool Specifications Matter: Uncovering and Mitigating Safety Risks in AI Agents](https://arxiv.org/abs/2607.29254), Minghui Pan, Jiayuxuan Yang, Yuanyuan Yuan, Yu Jiang, Zhenpeng Chen (arXiv:2607.29254v1, submitted 2026-07-31). AUROC figures are from Tables 1 and 2, the steering result from Table 3, and the end-to-end numbers from the abstract and Table 4.

## Related

- [[mcp-2026-07-28-spec-ships|MCP ships the 2026-07-28 specification]] - the protocol that standardizes these schemas at scale
- [[guardrails|Guardrails]]
- [[prompt-injection|Prompt injection]]
- [[agentharm|AgentHarm]]
- [[agent-safety-benchmark-validity-audit|A validity audit finds agent-safety scores are not interchangeable]] - what the benchmarks used here do and do not support
- [[specification-is-enforcement|Specification is enforcement]]
