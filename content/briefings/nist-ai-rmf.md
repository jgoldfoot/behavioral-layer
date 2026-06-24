---
title: NIST AI RMF
url: https://www.nist.gov/itl/ai-risk-management-framework
type: framework
section: briefings
audience: both
source_tier: 1
credit: [NIST]
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [governance, standards, trust, risk, accountability]
---

The vendor-neutral framework that gives the behavioral layer an institutional vocabulary. When you need a recognized name for the trust properties this site is about, this is where they are written down.

## Why it matters

Most of the behavioral-layer canon comes from the labs building the models. That makes it sharp and current, and it also makes it interested. This is the one piece written by a standards body with no model to sell, which gives it a different kind of weight: it is the closest thing to an agreed-upon, neutral articulation of what a trustworthy AI system is supposed to be.

Its useful core is a list. It names the characteristics a trustworthy system should have: valid and reliable, safe, secure and resilient, accountable and transparent, explainable and interpretable, privacy-enhanced, and fair with harmful bias managed. Read that list again and notice what it is. It is the behavioral layer, named from the outside. These are the properties of how a system acts, written down by an institution rather than a vendor.

Around that list it puts a loop: govern, map, measure, manage. Establish who is accountable, identify the risks in context, measure them, and act on them, continuously. It belongs in this collection because it is the institutional version of the argument the rest of these notes make from the inside: that behavior is something you specify, measure, own, and manage, not something you hope for.

## Builder read

Use the framework as a checklist of properties, not as a method. It will not tell you how to make a system honest or how to enforce a refusal. What it will do is give you a complete, defensible enumeration of the trust dimensions you are supposed to have covered, which is useful precisely when you are deep enough in the build to have forgotten one. Mapping your behavioral contract onto the seven characteristics is a fast way to find the property you did not specify.

The govern-map-measure-manage loop also encodes a discipline worth keeping: that trustworthiness is assessed before deployment and tracked continuously after, not certified once. Treating behavioral risk as a thing you monitor as context shifts, rather than a box you check at launch, is the part of the framework that survives contact with a real system.

## Exec read

There is now a vendor-neutral, widely-referenced framework that defines what a trustworthy AI system is and how to manage the risk of building one. It is voluntary, but it has become the common reference that regulators, auditors, and enterprises point to, which makes it the shared language for discussing AI risk across organizational lines.

Its value to a leader is leverage and legibility. It translates abstract commitments like fairness, accountability, and reliability into a structured set of outcomes a team can be held to, and it gives you a recognized standard to align with rather than inventing your own. When a vendor or a team claims their system is trustworthy, this is the framework that lets you ask what they actually did, against named characteristics, instead of taking the claim on faith.

## Caveats

It is a governance framework, not a behavioral-engineering guide. It tells you which properties to ensure and how to organize the risk work, and almost nothing about how to actually produce a well-behaved system. It is the map, not the build.

It is deliberately general, spanning all of AI risk rather than the agent-behavior layer specifically. Much of it is broader than this site's focus, and the parts most relevant here are the trustworthiness characteristics and the measure-and-manage discipline.

It is voluntary and high-level. It confers a shared vocabulary and a defensible structure, not a guarantee, and a system can map cleanly to the framework and still behave badly in the specifics that matter.

## Source

Primary: [NIST AI Risk Management Framework (AI RMF 1.0)](https://www.nist.gov/itl/ai-risk-management-framework) (NIST AI 100-1, 2023).

## Related

- [[who-owns-the-behavior|Who Owns the Behavior]] - the govern function is accountability, named
- [[behavioral-contracts|Behavioral Contracts]] - the trust characteristics are what a contract specifies
- [[red-teaming|Red Teaming]] - the measure-and-manage work, done adversarially
- [[the-behavioral-layer-is-the-new-ux|The Behavioral Layer Is the New UX]] - the institutional version of the thesis
