---
title: MCP Ships the 2026-07-28 Specification
url: https://blog.modelcontextprotocol.io/posts/2026-07-28/
type: news
section: signal
audience: both
source_tier: 1
credit: [Model Context Protocol]
date_added: 2026-08-03
last_verified: 2026-08-03
status: live
tags: [mcp, protocol, agent-infrastructure, elicitation, deprecation, authorization]
---

The Model Context Protocol released the 2026-07-28 specification on 2026-07-28, turning the release candidate into the shipped version: a stateless protocol core, a new request/response mechanism for asking the user something mid-call, and a twelve-month deprecation clock started on five existing features.

## Builder read

The breaking changes are now live rather than proposed. The `initialize`/`initialized` exchange and the `Mcp-Session-Id` header are retired (SEP-2575, SEP-2567); each request carries its protocol version, client identity, and client capabilities in `_meta`, with a new optional `server/discover` RPC for clients that want capabilities up front. Streamable HTTP requests must now include `Mcp-Method` and `Mcp-Name` headers (SEP-2243), so gateways route and meter without parsing JSON bodies. List responses from `tools/list`, `prompts/list`, `resources/list`, and `resources/read` carry `ttlMs` and `cacheScope` (SEP-2549). Authorization hardens: authorization servers should return `iss` per RFC 9207 and clients must validate it before redeeming a code (SEP-2468), client credentials are bound to the issuer that minted them (SEP-2352), and Dynamic Client Registration is formally deprecated in favor of Client ID Metadata Documents.

The change that matters most for behavior is Multi Round-Trip Requests (SEP-2322), which replace the server-initiated `elicitation/create`, `sampling/createMessage`, and `roots/list` requests that "previously required a held-open stream." A server that needs something from the user mid-call now returns `resultType: "input_required"` with the requests it needs answered, and the client retries the original call with the answers attached in `inputResponses`. Tasks move out of the experimental core into the `io.modelcontextprotocol/tasks` extension with poll-based `tasks/get` and a new `tasks/update` (SEP-2663). Roots, Sampling, and Logging are deprecated (SEP-2577) and keep working "for at least twelve months"; the legacy HTTP+SSE transport is deprecated with a year-long offramp. TypeScript, Python, Go, and C# speak the new version as of release day, with the Rust SDK in beta. On carrying state without sessions, the maintainers' guidance is to "mint an explicit handle from a tool and have the model pass it back as an argument," because "the model can see the handle and thread it between tools."

## Exec read

Ask-before-you-act just became infrastructure that scales. Under the old design, a server asking a user to confirm a consequential step required a held-open bidirectional stream, which is precisely the thing that does not survive a plain load balancer. The confirmation step was therefore the piece of agent behavior that was hardest to run in production, and the easy path was to skip it. Multi Round-Trip Requests turn that exchange into an ordinary request/response round trip, so the checkpoint before an irreversible action no longer costs you your deployment architecture.

The second thing to note is governance of the protocol itself. The release ships "a formal deprecation policy with a twelve-month minimum window," and it exercises that policy immediately on five features. A dependency with a published lifecycle and a stated notice period is a different procurement risk than one without, and the adoption figures the maintainers report (close to half a billion downloads a month across the Tier 1 SDKs, with the TypeScript and Python SDKs each past a billion total) are the reason that distinction now matters to people who never touch the spec.

## Source

Primary: [The 2026-07-28 Specification](https://blog.modelcontextprotocol.io/posts/2026-07-28/), David Soria Parra and Den Delimarsky, Model Context Protocol Blog, 2026-07-28. The specification itself is at [modelcontextprotocol.io/specification/2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28).

## Related

- [[mcp-2026-07-28-spec-rc|The 2026-07-28 release candidate]] - the same revision ten weeks earlier
- [[model-context-protocol|Model Context Protocol]]
- [[tool-specification-safety-degradation|Schema-formatted tool specifications weaken model refusal]] - a finding about the tool definitions this protocol standardizes
- [[escalation|Escalation]] - the confirmation step MRTR makes portable
- [[behavioral-contracts|Behavioral Contracts]]
