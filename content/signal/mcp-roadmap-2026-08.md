---
title: The MCP Roadmap Moves Authorization Off the Person in the Browser
url: https://blog.modelcontextprotocol.io/posts/mcp-roadmap/
type: news
section: signal
audience: both
source_tier: 1
credit: [Model Context Protocol]
date_added: 2026-09-07
last_verified: 2026-09-07
status: live
tags: [mcp, protocol, agent-infrastructure, agent-identity, authorization, delegation, tool-discovery]
---

The Model Context Protocol maintainers published a roadmap on 2026-08-22 naming five priority areas, the most consequential of which replaces browser-based human approval with machine-to-machine agent identity built on Demonstrating Proof of Possession and Workload Identity Federation.

## Builder read

The five stated priorities are agentic messaging primitives, HTTP-native transport unification, agent identity and enterprise-ready security, improved primitives, and improved SDK developer experience. The roadmap is a prioritization of maintainer attention rather than a commitment: "Proposals outside them aren't rejected automatically, but maintainer review time is scarce and goes to these areas first."

**The identity work is the behavioral change.** The roadmap states the current position plainly: "MCP authorization today is built around a person approving access in a browser." What replaces it is machine identity. "We want MCP servers to have a standardized way to recognize and trust those agent identities, built on existing standards rather than pasted API keys and long-lived tokens", with the work covering "finalizing Demonstrating Proof of Possession (DPoP) and driving its adoption, and defining an opinionated path for agent identity and delegation through Workload Identity Federation". This continues the direction of the shipped 2026-07-28 specification, whose authorization hardening the roadmap describes as "issuer validation, issuer-bound client credentials, and Client ID Metadata Documents (CIMD) as the preferred registration path for clients".

Two things are happening at once, and they are worth separating. Removing pasted keys and long-lived tokens is a straightforward security improvement: a bearer secret that anything can replay is replaced by a key the holder must prove possession of. Delegation is the other half, and it is a governance question wearing an authentication costume. Once a cloud agent carries its own recognized identity, the browser consent screen stops being the place a human decides what the agent may reach, and authority instead flows through a federation configuration set up once, in advance, by somebody else.

**The messaging work removes polling.** "Modern agentic workloads no longer fit the standard request-and-response pattern", and the roadmap spans "server-initiated events (webhooks and channels, so clients aren't left polling for results)". Combined with the tasks, subscriptions, and progress notifications introduced in the last specification, this is the protocol accepting that agent work is long-running and needs to be steerable mid-flight rather than awaited.

**Two primitive-level items matter for how models actually behave.** The first is an ambiguity the roadmap admits: "A tools/call response can carry the same output in more than one form, and a server developer today has no way to know which form a given client will put in front of the model." The server cannot currently know what the model will see. The second is scale: "We're starting a progressive discovery effort so a server can offer a small entry point and reveal more of its catalog as the conversation narrows." That is a direct response to servers exposing too many tools at once, and it makes the visible tool surface a function of conversation state.

## Exec read

The line to carry into any agent governance review is the roadmap's own description of the status quo: authorization today is a person approving access in a browser. That click is where most organizations' actual agent controls live, whether or not they have written it down. The roadmap proposes to replace it with an identity the agent holds and a delegation path configured ahead of time. That is the right engineering answer to agents that run without a person present, and it also relocates the consent decision from the moment of access to a provisioning decision made earlier, by a different team, with less context about the specific action.

Plan for that relocation rather than being surprised by it. The questions to have answers to before this lands: who configures the federation that grants an agent its authority, what scope that authority carries, how it is reviewed and revoked, and what record exists of which agent acted under whose delegation. None of these are protocol problems, which is exactly why the protocol will not solve them for you.

The progressive discovery item is quieter and worth noting for a different reason. If a server reveals more of its catalog as a conversation narrows, then the set of tools an agent can reach becomes conversation-dependent, and any assurance of the form "this agent can only call these tools" has to be restated as a claim about the whole discovery path, not a fixed list.

This is a roadmap. Nothing here is specified, dated, or shipped, and the maintainers say only that these areas get review time first.

## Source

Primary: [The New MCP Roadmap](https://blog.modelcontextprotocol.io/posts/mcp-roadmap/), Model Context Protocol, August 22, 2026. Quotations of the shipped authorization hardening are from the roadmap's own account of the 2026-07-28 specification release.

## Related

- [[mcp-2026-07-28-spec-ships|MCP ships the 2026-07-28 specification]] - the release this roadmap builds on
- [[model-context-protocol|Model Context Protocol]]
- [[escalation|Escalation]] - the human approval step this moves off the critical path
- [[tool-specification-safety-degradation|Tool specification safety degradation]] - why the shape of the tool list is a behavioral variable
- [[a2a-protocol|A2A Protocol]]
- [[trust-scaffolding|Trust Scaffolding]]
