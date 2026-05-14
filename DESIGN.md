# NOS Design System Brief

NOS is the shared design system for Nymbl's internal operating software. It supports a family of modular enterprise tools used for planning, guidance, time entry, expenses, meetings, CRM, demand planning, and project management.

This document is a high-level design brief for agents and AppGen tools. Use it to understand the character of NOS before choosing components, tokens, layouts, or motion. For implementation rules, read `rules/rules.md`, `AGENTS.md`, and the source files in `components/` and `tokens/`.

## Product Character

NOS should feel like a precise internal workbench: calm, structured, fast to scan, and built for repeat daily use. The interface should support complex operational workflows without becoming visually heavy.

The aesthetic is modern enterprise SaaS. Think restrained, data-friendly tools with clear hierarchy and confident spacing. NOS should feel closer to Linear, Attio, or Vercel dashboard surfaces than to consumer note-taking apps or legacy enterprise suites.

## Visual Principles

- Neutrals carry the interface. Use white, off-white, and neutral borders for most surfaces.
- Purple is the brand accent. Reserve it for primary actions, selection, focus, and important active states.
- Semantic colors have jobs. Use success, warning, error, and info only when the state is meaningful.
- Density is balanced. NOS should not feel sparse, but it should always give controls and content enough room to breathe.
- Corners are soft but controlled. Buttons and inputs use compact rounding; cards and modals are slightly softer.
- Shadows are quiet. Elevation should help layer surfaces, not call attention to itself.

## Layout And Density

Prefer practical product layouts over marketing layouts. Dashboards, document workspaces, tables, forms, and navigation should prioritize scanning, comparison, and repeated action.

Use clear page structure:

1. A concise page header with title, supporting context, and important actions.
2. Navigation or filters close to the content they affect.
3. Content modules with consistent spacing and predictable hierarchy.
4. Dense data views only when labels, dividers, and alignment keep them readable.

Avoid decorative sections, oversized hero treatments, card stacks inside cards, and purely ornamental gradients.

## Typography

Use the sans-serif type system for product UI, body copy, labels, controls, tables, and metrics. Use the mono stack only for code, tokens, identifiers, and keyboard shortcuts.

Typography should communicate hierarchy through size, weight, and spacing:

- Page titles are strong and compact.
- Section labels are small, controlled, and often uppercase.
- Form labels and helper text are quiet but legible.
- Table rows use tight line-height and clear contrast between primary and secondary text.
- Metric values are prominent but not theatrical.

Do not introduce display fonts or decorative type styles.

## Components

Use existing NOS components before creating new UI. Components in `components/` are the source of truth; the workbench exists to document and review them.

When composing screens:

- Import components from `components/index.js`.
- Use token-backed CSS custom properties from `tokens/base.css` or `tokens/tokens.css`.
- Keep components presentational.
- Prefer established form, modal, navigation, document, feedback, and table primitives.
- Create a new component only when no existing primitive can represent the pattern clearly.

## Interaction And Motion

Interactions should feel smooth, subtle, and purposeful. Motion should clarify state changes, focus movement, hover affordances, and layered surfaces.

Use motion tokens when animation is needed. Avoid dramatic page motion, bouncing, excessive delay, or animation that slows down repeated work. Respect reduced motion preferences.

## Agent Guidance

When building with NOS:

1. Read this brief first to understand the system character.
2. Browse the hosted workbench to identify existing components and examples.
3. Inspect `components/index.js` for available exports.
4. Inspect `tokens/tokens.json` and import `tokens/tokens.css` globally before adding visual values.
5. Follow `rules/rules.md` for composition guidance.
6. Follow `AGENTS.md` and `CLAUDE.md` for repo and implementation constraints.
7. Verify UI against the workbench before inventing new patterns.
8. If a needed component is not in `components/index.js`, build it as a NOS-compliant component in `components/`, export it, and add a workbench demo.
9. Put app-specific semantic tokens in a local `tokens-app.css` file. Values must reference NOS token variables, never raw hex, and each override needs a comment explaining its semantic intent.

## Avoid

- Hardcoded colors, spacing, radii, shadows, or typography values
- Generic SaaS landing-page layouts inside product UI
- Decorative gradients, floating ornaments, or visual effects without purpose
- Consumer-style whimsy that weakens operational clarity
- New component libraries, routers, CSS-in-JS, or TypeScript files
- One-off variants that bypass the design system
