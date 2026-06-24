---
title: Failure and Repair
type: concept
section: behavior
audience: both
source_tier: original
credit: [Joel Goldfoot]
date_added: 2026-06-24
last_verified: 2026-06-24
status: live
tags: [failure-and-repair, behavior, trust, escalation, recovery]
---

An AI system will fail. The question a behavioral contract has to answer is not whether, but how: what the system does in the moment it is wrong, and whether that moment builds trust or destroys it.

## The part everyone skips

Most behavioral design optimizes for the success path: the agent understands, acts, and resolves. That path gets the demos and the roadmap. The failure path, what happens when the agent misunderstands, hits its limits, or simply gets it wrong, is where trust is actually decided, and it is the part most systems leave to chance.

This is backwards. Users do not form their judgment of a system from the times it worked. They form it from the time it failed and what it did next. A system that fails and recovers gracefully can earn more trust than one that never visibly stumbles, because the user learns it can be relied on when things go wrong. A system that fails and doubles down loses trust permanently, in a single interaction.

## Failure is a behavior, and it can be specified

The instinct is to treat failure as the absence of correct behavior, a gap to be minimized. That framing is why failure handling goes unspecified: you cannot design a gap. The more useful frame is that failure has its own behaviors, and they can be written into the contract as deliberately as the success path.

There are a small number of these, and they are nameable. Detecting that something has gone wrong, which depends on the system having some signal for its own uncertainty. Disclosing the failure honestly instead of papering over it. Escalating to a human when the system is out of its depth, rather than pressing on. Recovering, by offering a path forward instead of a dead end. None of these are automatic. Each is a behavior you specify or forfeit, and the systems that handle failure well are the ones that treated these as design surface rather than as the place where design stops.

## Why graceful failure is hard to fake

Repair is where the gap between a system that was specified and one that was tuned shows most clearly. Anyone can prompt an agent to apologize. Far fewer can build one that knows it is wrong in the first place, which requires a real uncertainty signal, and fewer still can build one that escalates at the right threshold rather than too early or too late.

That is why failure handling is a good test of whether an organization actually owns its behavioral layer. The success path can be built by accident, by a capable model doing what it does. The failure path cannot. It only exists if someone decided how the system should behave when it is wrong, and wrote that down. Most systems reveal, in their first real failure, that no one did.

## Related

- [[behavioral-contracts|Behavioral Contracts]] - where failure behaviors get specified
- [[language-models-know-what-they-know|Language Models (Mostly) Know What They Know]] - the uncertainty signal that detection depends on
- [[st-webagentbench|ST-WebAgentBench]] - scoring escalation and deferral as correct behavior
- [[sycophancy|Sycophancy]] - failing to repair honestly, by agreeing instead of correcting
