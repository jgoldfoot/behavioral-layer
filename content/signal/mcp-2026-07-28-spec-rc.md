---
title: MCP 2026-07-28 Spec Release Candidate
url: https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/
type: news
section: signal
audience: both
source_tier: 1
credit: [Model Context Protocol]
date_added: 2026-07-09
last_verified: 2026-07-09
status: live
tags: [mcp, protocol, agent-infrastructure, mcp-apps, authorization]
---

The Model Context Protocol published a release candidate for its largest revision since launch, with the final specification dated 2026-07-28 and a ten-week window for implementers to validate the changes.

## Builder read

The core goes stateless. The `initialize`/`initialized` handshake is removed, and so is the `Mcp-Session-Id` header and the protocol-level session, so "any MCP request" can "land on any server instance" and a server can "run behind a plain round-robin load balancer." Cross-call state now uses explicit, server-minted handles rather than protocol sessions. Two extensions matter for behavior: MCP Apps ships "server-rendered interactive HTML interfaces that hosts render in a sandboxed iframe," with "every UI-initiated action" routed "through the same JSON-RPC base protocol"; and the Tasks extension lets a server "answer `tools/call` with a task handle" that the client drives with `tasks/get`, `tasks/update`, and `tasks/cancel` for long-running work. List and resource reads now carry `ttlMs` and `cacheScope` caching hints.

## Exec read

This is the plumbing of the behavioral layer being built to be governed, not just demoed. A stateless, cacheable, OAuth-and-OpenID-aligned protocol with a formal deprecation policy (every feature gets an Active, Deprecated, and Removed lifecycle with "at least twelve months between deprecation and removal") is what agent tooling looks like when reliability and change management are first-class. MCP Apps is the piece to watch: it moves the interface itself into the protocol, so what an agent shows a user, and what a user's click does, becomes a specified, sandboxed surface rather than an afterthought. The final spec lands 2026-07-28.

## Source

Primary: [The 2026-07-28 MCP Specification Release Candidate](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) (Model Context Protocol Blog, May 21, 2026).

## Related

- [[behavioral-contracts|Behavioral Contracts]] - capabilities and the UI surface as a specified contract between agent and host
- [[openai-model-spec|OpenAI Model Spec]] - the broader move toward writing agent behavior down
