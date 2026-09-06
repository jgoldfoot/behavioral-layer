---
title: The New MCP Roadmap Puts Agent Identity and Progressive Tool Discovery on the Critical Path
url: https://blog.modelcontextprotocol.io/posts/mcp-roadmap/
type: news
section: signal
audience: both
source_tier: 1
credit: [Model Context Protocol]
date_added: 2026-08-31
last_verified: 2026-08-31
status: live
tags: [mcp, protocol, agent-identity, delegation, tool-discovery, authorization, governance]
---

The MCP maintainers published an updated roadmap on 2026-08-22 organized into five priority areas, two of which name behavioral problems this site has been tracking: authorization built for a person clicking approve in a browser, and tool catalogs large enough that "tool selection tends to get worse as the list grows".

## Builder read

This is a statement of direction, not a shipped specification change. The concrete deliverables from the previous roadmap already landed in the [[mcp-2026-07-28-spec-ships|2026-07-28 release]]; the post says "The bulk of the changes landed in the 2026-07-28 specification release" and then sets the agenda from there. Read it as a signal about what will be accepted, not about what you can build against: Specification Enhancement Proposals inside the five areas "get expedited review and have the best chance of acceptance", while proposals outside them "aren't rejected automatically, but maintainer review time is scarce and goes to these areas first".

Two of the five areas matter for agent behavior rather than plumbing.

**Agent identity.** The post is direct about the gap: "MCP authorization today is built around a person approving access in a browser. That works well for interactive clients, but more and more of the callers are agents running as cloud workloads with their own identity, acting on behalf of a user who isn't present, or delegating narrower authority to sub-agents." The stated goal is "a standardized way to recognize and trust those agent identities, built on existing standards rather than pasted API keys and long-lived tokens", via Demonstrating Proof of Possession (DPoP), Workload Identity Federation, the ID-JAG grant behind Enterprise-Managed Authorization, and standard token exchange, with continued engagement in the IETF OAuth and WIMSE working groups. Delegating narrower authority to sub-agents is an authorization problem the ecosystem has mostly been solving with shared credentials, which is to say not solving.

**Progressive discovery.** The post names the cost precisely: "Connecting to a server with a hundred tools means the model pays for that entire surface before the user has asked a single question, and tool selection tends to get worse as the list grows." The response is "a progressive discovery effort so a server can offer a small entry point and reveal more of its catalog as the conversation narrows." Separately, under improved primitives, the post identifies a contract gap in results: "A tools/call response can carry the same output in more than one form, and a server developer today has no way to know which form a given client will put in front of the model."

The other three areas are agentic messaging primitives (server-initiated events via webhooks and channels, plus maturing the Tasks extension into the specification), HTTP-native transport unification including local servers speaking Streamable HTTP over stdio, and SDK ergonomics and conformance. The messaging area is framed on the observation that "Modern agentic workloads no longer fit the standard request-and-response pattern".

## Exec read

The behavioral significance here is that a protocol is acknowledging, in its own roadmap, that the shape of what a server exposes changes what the model does with it. Tool selection degrading as the catalog grows is not a performance note; it is a statement that the interface is part of the behavior. That has been an empirical finding in the literature and is now an engineering priority in the protocol most agent deployments sit on.

The identity item is the one to track if you are approving agent deployments. Today the common pattern is a human consenting once in a browser and an agent inheriting that consent indefinitely, with sub-agents inheriting it again. A standardized delegation path is the difference between an audit trail that names the acting agent and one that names a person who left the room hours ago.

Keep the tense right when this gets repeated internally. Nothing here is specified, dated, or guaranteed. It is a prioritization published by the Core Maintainers with community maintainers and Working Groups, and the honest summary is that proposals in these areas will be reviewed first.

## Source

Primary: [The New MCP Roadmap](https://blog.modelcontextprotocol.io/posts/mcp-roadmap/), David Soria Parra and Den Delimarsky (Lead Maintainers), Model Context Protocol Blog, August 22, 2026. All quotations are from that post.

## Related

- [[model-context-protocol|Model Context Protocol]] - the standing note on the protocol
- [[mcp-2026-07-28-spec-ships|MCP ships the 2026-07-28 specification]] - the release this roadmap picks up from
- [[tool-specification-safety-degradation|Schema-formatted tool specifications weaken model refusal]] - evidence that the form of the tool surface changes behavior
- [[escalation|Escalation]] - delegation and the authority a sub-agent should inherit
- [[guardrails|Guardrails]]
