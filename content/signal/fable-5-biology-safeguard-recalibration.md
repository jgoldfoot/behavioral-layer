---
title: Anthropic Loosens Fable 5's Biology Classifier and Publishes the False-Positive Cost
url: https://www.anthropic.com/news/improving-fable-5-s-biology-safeguards
type: news
section: signal
audience: both
source_tier: 1
credit: [Anthropic]
date_added: 2026-08-09
last_verified: 2026-08-09
status: live
tags: [guardrails, over-refusal, safety-classifier, deployment, model-routing, false-positives]
---

Anthropic rewrote the constitution governing Fable 5's biology safety classifier and reported how much it had been over-firing, describing a deliberate launch decision to block almost all biology queries and accept a high false-positive rate in order to ship the model sooner.

## Builder read

The control is a routing decision, not a refusal. Anthropic describes safety classifiers as "smaller, automated AI systems that detect when Fable 5 is asked to perform a safeguarded biology task, or produce a harmful output." When one fires, "the model re-routes the user's request to Opus 5, a capable model that does not have the same level of biological capability as Fable 5 and which cannot provide as much assistance to a malicious user." Anthropic calls the result a fallback, and is explicit that it is visible: "This is the fallback that users see when their requests are blocked."

The change was made to the classifier's written specification, then propagated by retraining the classifier rather than the served model. Over several weeks Anthropic "carefully rewritten the classifier's constitution (which consists of a collection of rules to help the model discern between safeguarded and allowed content), taking care to carve out benign uses in detail," solicited expert feedback internally and externally, "developed updated training data for the classifier based on that constitution, and retrained it."

Two different numbers are reported, and they carry different weight. The measured one: "In our testing, this update reduced biology-related fallbacks by about 85% across our product surfaces." The projected one, given in a footnote, is an expectation rather than a result: Anthropic writes that it expects the total number of fallbacks, for biology-related or any other reasons, "will also be reduced: by roughly 67% on Claude.ai, 55% on Cowork, 17% on Claude Code, and 7% on the Claude Platform." Do not quote those four figures as observed outcomes.

The spread across surfaces is still the most useful part of the disclosure, with the caveat that it describes expected reductions in total fallbacks from all causes. A biology-classifier change that is expected to remove two thirds of all fallbacks on Claude.ai but only 7% on the Claude Platform implies biology was a large share of consumer false positives and a small share of developer ones. That is an inference from the projection, not something the post states. The transferable point is that a vendor's headline over-refusal number is a property of their traffic mix as much as of the classifier.

What remains blocked is stated plainly. Anthropic writes that Fable "still falls back to Opus 5 for requests we consider dual-use," naming virology, toxicology, and molecular design, and that it "isn't yet usable for professional biology research and drug development." The company also declines to claim the false-positive problem is solved: "There will inevitably remain false positives," which it locates in "requests that fall within the classifier's safety margin where the request is very low-risk but where the classifier still fires." The safety margin is a designed feature, described in the diagram caption as "content that is very likely benign but which is still blocked out of an abundance of caution."

## Exec read

The disclosure posture is the story here, and it has little to do with biology.

Anthropic published the cost side of its own safety control. The industry norm is to report what a guardrail caught; this post reports how often it fired on people who deserved an answer, and frames the original setting as a conscious tradeoff rather than an accident. On launching with almost all biology queries blocked: "We knew this would be frustrating for legitimate biology users: it would result in a high number of false positives in the near term." The stated alternative was "holding back the model until much more safeguards progress was made," which "would have delayed the model's general access, and its potential benefits to our users, by weeks or months." That is a vendor naming the exchange rate it chose between over-blocking and time-to-market, in public, with a number attached afterward. It is a reasonable thing to ask of any vendor selling you a filtered model.

The second transferable idea is the fallback pattern itself. When the guardrail trips, the system degrades to a less capable model instead of ending the request, and the user is shown that this happened. Graceful degradation plus disclosure is a better default than a hard refusal for most enterprise deployments, because it preserves the task and tells the user why the answer may be weaker. Worth noting the tuning cost Anthropic describes: precise classifiers take "time and iteration," must balance false positives against false negatives, and must be robust to jailbreak attempts, which is why the loosening arrived weeks after launch rather than at it.

Read the numbers as vendor-reported and self-measured. There is no external audit, no absolute false-positive rate, and no denominator that would let you check the 85% independently. The per-surface figures are projections.

## Source

Primary: [Improving Fable 5's biology safeguards](https://www.anthropic.com/news/improving-fable-5-s-biology-safeguards), Anthropic, 2026-08-07. All quotations are verbatim from that post. The 85% figure is from the opening paragraph and is described as measured in Anthropic's testing; the 67 / 55 / 17 / 7 per-surface figures are from footnote 1 and are framed there as expected reductions in total fallbacks, not as observed results. The safety-margin description is from the diagram caption.

## Related

- [[guardrails|Guardrails]] - the control being recalibrated
- [[specification-is-enforcement|Specification is enforcement]] - the change was made to the written rules, then retrained in
- [[claudes-constitution|Claude's Constitution]] - the same constitutional pattern applied to a classifier
- [[confidence-and-disclosure|Confidence and disclosure]] - what a downgraded user is told
- [[hugging-face-agentic-intrusion|Hugging Face discloses an agent-run intrusion]] - the operational cost of over-refusal, from the other direction
- [[anthropic-cyber-jailbreak-severity|Anthropic proposes a cyber jailbreak severity scale]] - the cybersecurity classifiers this post refers back to
