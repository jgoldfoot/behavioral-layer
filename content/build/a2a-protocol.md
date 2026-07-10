---
title: Agent2Agent (A2A) Protocol
url: https://a2a-protocol.org
type: framework
section: build
audience: both
source_tier: 1
credit: [A2A Project (Linux Foundation)]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [interoperability, multi-agent, protocol, agent-discovery, task-lifecycle]
---

A2A is "an open standard designed to facilitate communication and interoperability between independent, potentially opaque AI agent systems": a common language for agents built by different teams, on different frameworks, to work together "without needing access to each other's internal state, memory, or tools."

## Builder read

Two objects carry the protocol. The Agent Card is "a JSON metadata document published by an A2A Server, describing its identity, capabilities, skills, service endpoint, and authentication requirements": the published promise of what an agent can do, discoverable before you send it anything. The Task is "the fundamental unit of work managed by A2A, identified by a unique ID. Tasks are stateful and progress through a defined lifecycle." The v1.0.0 specification defines transport bindings for JSON-RPC 2.0, gRPC, and HTTP+JSON/REST, and the design is "Async First: Designed for (potentially very) long-running tasks and human-in-the-loop interactions."

For this site's purposes, the task lifecycle is the interesting part. Alongside submitted, working, and completed, the states include failed, canceled, rejected (the agent declined), input-required, and auth-required. That is escalation and refusal machinery specified at the wire level: a remote agent has a standard, machine-readable way to say "I will not do this," "I cannot proceed without a human," or "this failed," instead of burying the failure in prose. If you build on A2A, treat those states as contract surface: decide which of your agent's obligations map to rejected versus failed, and what your client does when a peer interrupts for input.

## Exec read

The governance move is as significant as the mechanics: the site states "A2A was originally developed by Google and donated to the Linux Foundation," and the project is maintained by a Technical Steering Committee with representatives from AWS, Cisco, Google, IBM Research, Microsoft, Salesforce, SAP, and ServiceNow. That roster signals the industry converging on one boundary standard for agent-to-agent commerce rather than per-vendor bridges. The behavioral implication: when your agent transacts with an agent you did not build and cannot inspect, the protocol boundary is the only place accountability can live. The Agent Card is a claim of capability, and the task states are the auditable record of behavior; whether the counterparty honors either is exactly the trust question the standard surfaces but cannot answer for you.

## Source

Primary: [Agent2Agent (A2A) Protocol](https://a2a-protocol.org) (A2A Project, Linux Foundation; specification v1.0.0).

## Related

- [[behavioral-contracts|Behavioral Contracts]] - the Agent Card as a published promise
- [[failure-and-repair|Failure and Repair]] - rejected, failed, and input-required as first-class states
- [[mcp-2026-07-28-spec-rc|MCP Specification]] - the agent-to-tool boundary next to A2A's agent-to-agent one
