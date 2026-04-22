# NOS Design System — Project Context

> This file is read by Codex on every prompt in this repo. Follow it as the authoritative guide before responding to any request.

## What this is

The NOS Design System is the shared component and token library for Nymbl's internal NOS apps — a suite of ~10 modular internal tools. This repo contains two things:

- **The design system itself** (tokens, components) — consumed by NOS apps
- **The workbench** — a React app that renders the design system for authoring, review, and documentation

Both the workbench and downstream NOS apps import from the same component files. There is only one source of truth for every component.

## Repo structure

```
nos-design-system/
├── components/          ← The product. NOS apps import from here.
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   └── index.js         ← Component registry. Every component must be exported here.
├── tokens/
│   ├── tokens.json      ← Source of truth for all design values
│   └── tokens.css       ← Generated from tokens.json. Imported globally.
├── rules/
│   └── rules.md         ← Design principles and composition guidance
├── workbench/           ← Authoring environment. Imports from components/ and tokens/.
│   ├── App.jsx
│   ├── Sidebar.jsx
│   └── pages/
│       ├── ComponentsPage.jsx
│       ├── TokensPage.jsx
│       └── PlaygroundPage.jsx
└── AGENTS.md            ← This file
```

## Non-negotiable rules

1. **Plain JSX only.** Never TypeScript, never `.tsx` files. All components use `.jsx` extension.
2. **CSS custom properties for all styling.** Never hardcode colors, spacing, radii, or typography values. If a needed value isn't in `tokens.css`, add it to `tokens.json` first, then regenerate `tokens.css`.
3. **Every new component requires three actions:** (a) create the `.jsx` file in `components/`, (b) add export to `components/index.js`, (c) verify it appears in the workbench sidebar under the correct category.
4. **Components belong in `components/`. Workbench code belongs in `workbench/`.** Never duplicate a component into the workbench folder — the workbench always imports the real component from `components/`.
5. **Components are presentational.** No API calls, no global state management, no routing logic inside components. Accept props, render UI, call callbacks.

## Aesthetic direction

NOS targets a **modern enterprise SaaS** aesthetic — calm, confident, data-friendly. Professional without being stiff. The visual language should feel closer to tools like Vercel's dashboard, Attio, or Linear (with slightly softened edges) than to consumer products like Notion or enterprise suites like Salesforce.

### Concrete characteristics

- **Brand accent:** Purple. `#7C3AED` is the brand-600 value; the full ramp spans 50–950.
- **Rounding:** 6px on buttons and inputs, 8px on cards and surfaces, 12px on modals.
- **Density:** Balanced — clear hierarchy with moderate whitespace. Not spacious, not cramped. Enterprise-appropriate information density.
- **Color use:** Restrained. Neutrals dominate. The brand accent appears only on primary actions and selection states. Semantic colors (success/warning/error/info) are reserved for their intended purpose.
- **Typography:** Sans-serif. Strong weight contrast between headings (semibold/bold) and body (regular). Tight line-height on data rows, relaxed on body copy.
- **Shadows:** Subtle, multi-layer for depth. Never flashy or dramatic.
- **Focus states:** Always visible. A 2px ring in the brand accent color.
- **Hover states:** Subtle background shifts using neutral tokens, not dramatic color changes.

## Component API conventions

- Props destructured in the function signature
- Variants, sizes, and states controlled via string props (e.g., `variant="primary"`, `size="md"`)
- Boolean state props: `disabled`, `loading`, `error` — not `isDisabled`, `isLoading`
- Pass-through of native HTML attributes via `...rest`
- JSDoc comment at the top of every component documenting purpose, props, and usage

## Running the project

- `npm run dev` — starts workbench at `localhost:5173`
- `npm run build` — builds static output to `dist/`
- After editing `tokens.json`, regenerate `tokens.css` before assuming changes apply

## Anti-patterns to avoid

- Adding TypeScript or `.tsx` files
- Hardcoding colors, spacing, radii, or font values anywhere
- Creating a component without registering it in `components/index.js`
- Duplicating components into the workbench folder
- Using CSS-in-JS libraries (styled-components, emotion) — plain CSS only
- Adding router libraries (react-router, etc.) — the workbench uses plain React state for navigation
- Adding component libraries as dependencies (Chakra, MUI, shadcn, Radix) — this repo *is* the component library
- Adding animation libraries before the system has motion tokens defined
