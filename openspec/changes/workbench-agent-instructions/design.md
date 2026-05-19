# Design Notes

## Agent-facing design brief

`DESIGN.md` should be concise and interpretive. It should explain how NOS should feel and how an agent should make product UI decisions, while leaving tactical composition rules in `rules/rules.md` and implementation details in tokens and components.

## Instructions page

The workbench page should act like an onboarding handoff for AppGen tools:

- Start with plain-language context for the workbench and the NOS design system
- Provide a copyable starter prompt that can be pasted into Codex, Replit, or another AppGen tool
- Point agents to the hosted workbench first, then GitHub/source files as the implementation reference
- Keep everything on one continuous page with no nested subsections, tab bars, or router changes
- Use workbench-only CSS and local helper UI; do not introduce a reusable NOS component for this page

## Non-goals

- Do not change design-system tokens or component APIs
- Do not expose `.impeccable.md` as the public design brief
- Do not duplicate the full contents of rules, tokens, or component docs inside the Instructions page
