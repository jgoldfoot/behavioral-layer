# Briefing outline (for Joel to write in his own voice)

NOT a finished note. The research agent stages facts and structure; the briefing is
opinion/synthesis in Joel's voice, so he writes the published version. If used, target
`content/briefings/<kebab-slug>.md` with `type: concept`, `credit: [Joel Goldfoot]`,
`date_added` on or after 2026-07-09, and the piped-wikilink + no-em-dash house style.

## Working thesis (pick or rewrite)
Three unrelated releases in this cycle point the same direction: the behavioral layer is
being built as governed infrastructure, not demo-ware. Specification, measurement, and the
plumbing underneath are all maturing at once.

## Beats
1. Hook: three orgs, three artifacts, one direction. Name them, then the through-line.
2. **The plumbing is being made governable.** MCP's 2026-07-28 release candidate makes the
   protocol stateless, cacheable, and OAuth/OpenID-aligned, with a formal deprecation policy,
   and puts the UI surface itself inside the spec via MCP Apps (sandboxed iframes, every
   click routed through the base protocol). Source note: [[signal/mcp-2026-07-28-spec-rc]].
3. **Behavior is becoming measurable.** OpenAI's Model Spec Evals turn a written behavior
   spec into a per-model compliance score, and the named gaps are trust behaviors (deciding
   for the user, flattening viewpoints, over-delivering). Source note:
   [[signal/openai-model-spec-evals]].
4. **Model releases now lead with behavior.** Claude Sonnet 5's headline is agentic safety:
   prompt-injection robustness up, cyber refusal a documented tradeoff (more reliable refusal
   of malicious requests, higher over-refusal), alignment framed as the timing and
   calibration of engagement. Source note: [[signal/claude-sonnet-5-agentic-safety]].
5. **Synthesis / so-what.** Specification + measurement + governed plumbing = the behavioral
   layer becoming load-bearing. What it means for someone deciding whether and how to ship an
   agent this quarter.

## Primary sources
- MCP RC: https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/ (2026-05-21; final 2026-07-28)
- Model Spec Evals: https://alignment.openai.com/model-spec-evals/ (2026-03-25)
- Claude Sonnet 5 System Card: https://www.anthropic.com/claude-sonnet-5-system-card (2026-06-30)

## Notes for Joel
- Voice and opinion are yours; every fact above traces to the linked primary source.
- The MCP Apps angle connects to your Experience Contract work. Decide whether to draw that
  line explicitly here or keep the briefing neutral; the agent did not assume either way.
- Once you publish the briefing, its `## Related` can link the three signal notes above.
