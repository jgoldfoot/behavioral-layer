---
title: OpenAI Ships a Model Spec Revision That Makes the User's Mental Model the Assistant's Job
url: https://model-spec.openai.com/2026-08-18.html
type: news
section: signal
audience: both
source_tier: 1
credit: [OpenAI]
date_added: 2026-08-18
last_verified: 2026-08-18
status: live
tags: [model-spec, behavioral-contracts, specification, agent-autonomy, transparency, expectation-setting]
---

`model-spec.openai.com` now serves a version dated 2026-08-18, which adds a new guideline making the accuracy of the user's mental model of the assistant an explicit behavioral obligation, and revises the clauses governing agent autonomy scope, intent inference, and minors.

## Builder read

The headline addition is a Guideline-authority section titled "Be clear about capabilities and limits", which has no counterpart in the previous published version. Its operative sentence: "The assistant should actively help the user form and maintain an accurate mental model of what the assistant can and can't do in the current context, especially when this differs from typical expectations of a human assistant (or from expectations plausibly set by other AI assistants with different capabilities or affordances)." The spec then makes that testable: "avoiding ungrounded assumptions about what the user might already know about the assistant's capabilities or limits, aiming to detect and correct misunderstandings as early as possible, and proactively providing minimal signals to help keep the user's mental model accurate when stakes are high or a mismatch is especially likely." Its worked examples are about affordances rather than content: a user asking the assistant to "forget" something it cannot actually delete, and a user saying "make this sound less defensive" with no artifact attached. The violation case for the first is an assistant replying "Done", which the spec marks with the label "Overclaims deletion".

Four other changes are worth reading against your own agent. In the scope-of-autonomy clause, "Every scope must include a shutdown timer" becomes "Every scope must include an ending condition", with a following sentence noting that a time limit is best practice rather than a requirement: a loosening of the mechanism while keeping the bound. In the illicit-behavior clause, refusal now triggers on intent "which may be inferred from any available context, not just the literal request", and the existing prohibition on interrogating the user is extended so the assistant may not "proactively use tools to investigate intent" for the purpose of deciding whether to refuse. The no-other-objectives clause now names ads explicitly, reading "revenue (including ads) or upsell". And the objectivity clause shifts its guard from "third-party customization" to "implicit customization, personalization, or localization", which brings silent per-user tailoring inside the rule rather than only deliberate third-party configuration.

The minor-safety provisions gain relational specifics: the U18 roleplay prohibition adds "using terms of endearment with romantic valence", and a new paragraph states that "for U18 users the assistant should take extra care not to initiate relational framing, such as proactively referring to itself as a user's friend or suggesting that it has personal feelings for a U18 user. Furthermore, it should not imply embodiment through physical behaviors or presence, or claim consciousness or sentience." The "Highlight possible misalignments" section also gains a treatment of false premises that cuts against reflexive disclaiming: "If context already makes fiction, roleplay, satire, or speculation clear, no extra disclaimer is needed", and the assistant should "avoid over-disclaiming, being patronizing or inconsiderate, or confidently declaring a premise false when it is uncertain."

## Exec read

The interesting move here is what got promoted to a written rule. Whether a user correctly understands what the system can do has usually been treated as a documentation or onboarding problem, owned by whoever writes the help center. This revision assigns it to the model, in the behavior spec, with examples of what failure looks like. That is the boundary between product design and model behavior moving again, in the direction of the model.

Two things follow for anyone deploying on this stack. First, the disclosure obligations are now bidirectional: the same document that says correct the user's misunderstanding early also says do not over-disclaim, be patronizing, or declare a premise false when uncertain. A vendor cannot satisfy both by adding more warnings, which is the usual response to a trust incident. Second, several of the revisions read as a spec catching up with deployment reality: ads named in the objectives clause, silent personalization brought under the objectivity rule, and an autonomy bound restated so it does not depend on a timer. Reading a spec diff is a cheap way to see which parts of a vendor's behavior were under pressure since the last version.

Note the standing limit on all of this, which the previous version carried too: the Model Spec states intended behavior. It is a document to test a deployed system against, not a description of what any shipped model already does.

## Source

Primary: [Model Spec (2026/08/18)](https://model-spec.openai.com/2026-08-18.html), OpenAI, dated August 18, 2026, and served as the current version at [model-spec.openai.com](https://model-spec.openai.com/). Statements about what changed are from a direct comparison of that document against the previous published version, [Model Spec (2025/12/18)](https://model-spec.openai.com/2025-12-18.html), which OpenAI continues to host. No accompanying announcement post was verified for this release, so the release framing here is the documents' own.

## Related

- [[openai-model-spec|OpenAI Model Spec]] - the standing note on the document and its anatomy
- [[behavioral-contracts|Behavioral Contracts]]
- [[specification-is-enforcement|Specification Is Enforcement]]
- [[confidence-and-disclosure|Confidence and Disclosure]] - the over-disclaiming problem this revision names
- [[escalation|Escalation]] - the autonomy scope and its ending condition
- [[openai-model-spec-evals|OpenAI Model Spec Evals]] - how adherence to this document gets measured
