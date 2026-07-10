---
title: Claude's Constitution
url: https://www.anthropic.com/constitution
type: framework
section: behavior
audience: both
source_tier: 1
credit: [Anthropic]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [behavioral-contracts, model-behavior, alignment, specification, transparency]
---

The normative document Anthropic trains Claude toward, published in full: "a detailed description of Anthropic's intentions for Claude's values and behavior" that "plays a crucial role in our training process, and its content directly shapes Claude's behavior."

## Builder read

Read it as the second public example, after the OpenAI Model Spec, of a frontier lab writing its model's intended behavior down as a document. The load-bearing part is the priority stack. The constitution states that Anthropic wants all current Claude models to be "Broadly safe," "Broadly ethical," "Compliant with Anthropic's guidelines," and "Genuinely helpful," and that "In cases of apparent conflict, Claude should generally prioritize these properties in the order in which they're listed." That is a conflict-resolution rule, the same structural move the Model Spec makes with its chain of command, and it is the piece most teams forget to write for their own agents.

The design bet is different, though. The announcement is explicit that the previous constitution "was composed of a list of standalone principles" and that the new approach is to explain rather than enumerate: models "need to understand why we want them to behave in certain ways, and we need to explain this to them rather than merely specify what we want them to do." Where the Model Spec reads like policy, this reads like character: helpfulness is framed as being "a brilliant friend who also has the knowledge of a doctor, lawyer, and financial advisor."

Keep two things distinct. [[constitutional-ai|Constitutional AI]] is the training technique (critique and revision against written principles). The constitution is the document that technique, and the rest of Anthropic's training stack, now points at. This note is about the document.

## Exec read

The constitution is positioned as "the final authority on our vision for Claude," with the aim that "all of our other guidance and training" be consistent with it. That makes it the closest public artifact to a vendor's behavioral source of truth, and Anthropic gives the governance rationale plainly: publishing "lets people understand which of Claude's behaviors are intended versus unintended, to make informed choices, and to provide useful feedback."

Two implications. First, intended-versus-unintended is now checkable: when a Claude deployment behaves oddly, there is a published standard to compare against. Second, the document is released "under a Creative Commons CC0 1.0 Deed, meaning it can be freely used by anyone for any purpose without asking for permission," which is an invitation to reuse the structure for your own behavioral specifications. With two labs now publishing competing behavior documents, not having one of your own is a visible gap.

## Source

Primary: [Claude's Constitution](https://www.anthropic.com/constitution), Anthropic. Announced January 22, 2026 in [Claude's new constitution](https://www.anthropic.com/news/claude-new-constitution), replacing the earlier list-of-principles constitution.

## Related

- [[constitutional-ai|Constitutional AI]] - the training technique; this note covers the published document it instills
- [[openai-model-spec|OpenAI Model Spec]] - the other public behavioral specification, structured as policy rather than character
- [[behavioral-contracts|Behavioral Contracts]] - the general pattern both labs are now practicing in public
