---
title: Behavior
noteType: index
section: behavior
tags:
  - section-index
---

The thesis core. This section covers the behavioral layer itself: the rules, signals,
and recovery paths that decide whether an agent is trustworthy in use, independent of how
capable the underlying model is.

## What belongs here

- Behavioral contracts: the explicit promises an agent makes about what it will and will
  not do.
- Guardrails: the constraints that keep behavior inside the contract.
- Escalation: when and how an agent hands control back to a human or a stronger process.
- Failure and repair: how an agent detects it is wrong, discloses it, and recovers.
- Confidence and disclosure: how an agent communicates certainty, limits, and provenance.
- Trust scaffolding: the patterns (previews, confirmations, undo, transparency) that let a
  person extend or withdraw trust safely.

## What goes elsewhere

- How you *measure* these behaviors lives in [[evaluate/index|Evaluate]].
- The *mechanisms* that implement them (orchestration, memory, tool use) live in
  [[build/index|Build]].
- The *evidence base* (papers) lives in [[research/index|Research]].
