---
title: Model Context Protocol
url: https://modelcontextprotocol.io/introduction
type: framework
section: build
audience: both
source_tier: 1
credit: [Model Context Protocol]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [mcp, protocol, tool-use, agent-infrastructure, context]
---

The Model Context Protocol is an open standard that connects AI applications to external tools, data, and prompts through one uniform client-server interface: the emerging plumbing for how agents act on the world.

## Builder read

MCP is "an open-source standard for connecting AI applications to external systems." The documentation's analogy is that MCP is "like a USB-C port for AI applications": one standardized interface, so a builder can "build once and integrate everywhere." An MCP server exposes capability to a host application (Claude, ChatGPT, VS Code, Cursor, and others) in three forms: tools (actions the model can call, such as a search or a calculation), resources (data sources such as local files and databases), and prompts (reusable, specialized workflows). Because the interface is uniform, the same server works across any MCP-compatible client rather than being wired to one product.

## Exec read

MCP matters to the behavioral layer because it standardizes the surface where an agent acts. When tool access, data access, and the actions an agent can take all flow through one specified protocol, what an agent is permitted to do becomes describable and governable in one place rather than reinvented per integration. That is the precondition for the controls the behavioral layer depends on: capability negotiation, permissioning, disclosure of what an action will do, and an audit trail of what was done. A shared protocol does not by itself make an agent safe, but it is what makes agent behavior specifiable at the boundary where it touches real systems.

## Source

Primary: [What is the Model Context Protocol (MCP)?](https://modelcontextprotocol.io/introduction) (Model Context Protocol documentation).

## Related

- [[mcp-2026-07-28-spec-rc|MCP 2026-07-28 Spec Release Candidate]] - the protocol's largest revision to date, tracked in Signal
- [[behavioral-contracts|Behavioral Contracts]] - an agent's permitted capabilities as a specified contract
- [[prompt-injection|Prompt Injection]] - the attack surface any tool-calling boundary has to defend
