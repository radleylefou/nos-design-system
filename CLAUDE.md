# NOS Design System — Project Context

> This file is read by Claude Code on every prompt in this repo. Follow it as the authoritative guide before responding to any request.

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
└── CLAUDE.md            ← This file
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
- Adding UI component libraries (Chakra, MUI, shadcn, Radix, Ant Design) — this repo *is* the component library. Headless capability libraries are NOT covered by this prohibition; see below.
- Adding animation libraries before the system has motion tokens defined

## Capability Libraries (Permitted Exceptions)

Some app features require behavioral infrastructure that cannot be hand-built in reasonable time and has no equivalent in the NOS DS component registry. Headless capability libraries — those that provide behavior and event wiring with zero visual opinions — are permitted for these cases.

**Approved headless capability libraries:**

| Category | Library | Rationale |
|---|---|---|
| Drag-and-drop | `dnd-kit` | Zero styles, full token control, accessible |
| Diagramming canvas | `@xyflow/react` (React Flow) | Headless nodes/edges; NOS styles apply |
| Rich text editing | `@tiptap/react` | Headless, no default styles, fully token-styleable |
| Gantt / timeline | SVG/CSS first | Build from NOS tokens. Reach for a library only after 3+ days of complexity |

**Rules for using capability libraries:**
1. The library must not ship or require its own CSS stylesheet for functional output.
2. All visual output must use NOS token CSS custom properties exclusively.
3. Wrapper components that integrate the library (e.g., `DiagramCanvas.jsx`) must be registered in `components/index.js` and demonstrated in the workbench like any other component.
4. One library per category maximum — do not add a second drag-and-drop or diagramming library.

**What is still prohibited:** Any library that duplicates NOS DS components (buttons, inputs, dropdowns, modals, tables, selects, etc.) — e.g., Radix Primitives, HeadlessUI, shadcn/ui. These wrap what NOS already provides and will fragment the design system.

## Building Custom Components Not in the Registry

When a needed UI component doesn't exist in `components/index.js`, build it as a NOS component. Do not inline it inside a page or feature file.

**Step-by-step:**
1. Create `components/ComponentName.jsx` and `components/ComponentName.css`
2. Export it from `components/index.js`
3. Add a workbench demo page in `workbench/pages/`

**LLM pattern for inferring a new NOS component:**

Start from these constraints and the component will be correct by construction:

- **Visual baseline:** calm, neutral surface (`var(--bg-surface)`), border `var(--border-default)`, radius matching context (8px for panels/cards, 6px for interactive elements)
- **Typography:** 14px regular for data rows; 14px semibold for section headers; 12px for metadata. Never exceed 3 type sizes in one view.
- **Color:** neutrals dominate; brand accent only for selected/active states; no decorative color
- **Spacing:** 4px grid — use `var(--space-2)` (8px) for row padding, `var(--space-4)` (16px) for section padding, `var(--space-6)` (24px) between major sections
- **State coverage:** default, hover, selected/active, disabled, focus — all required
- **Props API:** variant, size, disabled, loading as needed; callbacks via onX props; `...rest` spread

**Reference patterns for common missing components:**

*KanbanBoard / KanbanColumn / KanbanCard:*
- Column: `Card` with `var(--bg-subtle)` background, `var(--radius-md)` radius, `var(--space-4)` padding
- Card: `Card` component with drag handle, status badge, label text
- Use `dnd-kit` for drag behavior; KanbanCard is purely presentational

*CommandPalette:*
- Modal overlay (`var(--z-modal)`), `var(--shadow-modal)` shadow, `var(--radius-lg)` radius
- Input at top using NOS `Input` component; results list using standard row pattern
- Keyboard navigation state via React, not a library

*GanttChart:*
- SVG-based; rows use `var(--color-neutral-800)` text, bars use `var(--color-brand-400)` fill
- Grid lines use `var(--border-subtle)`; today marker uses `var(--color-semantic-info-500)`
- No library unless SVG complexity exceeds 3 days

*PhaseBoard:*
- Grid of `Card` components, one per phase column
- Phase header: uppercase label token, `var(--color-neutral-500)`
- Epics inside columns: draggable via dnd-kit

## App-Level Token Overrides

The NOS DS token set is intentionally minimal and semantic-neutral. Individual NOS apps may need additional semantic tokens for domain-specific contexts (entity types, workflow states, custom status systems) that don't exist in the base token set.

**Pattern: local token override file**

Each NOS app may define a `tokens-app.css` at its root that extends (not replaces) `tokens.css`. Import order: `tokens.css` first, then `tokens-app.css`.

**Rules:**
1. App token values must reference NOS token variables — never raw hex values.
   - ✓ `--color-type-experience: var(--color-brand-400);`
   - ✗ `--color-type-experience: #6869DD;`
2. Each override must have a comment documenting its semantic intent.
3. App tokens must not shadow or override any existing NOS base token name.
4. App tokens use a namespaced prefix: `--color-type-*`, `--status-*`, `--entity-*`, etc.

**Base semantic color rule relaxation for apps:**
The base rule "semantic colors serve only their intended purpose" applies to the NOS DS and its shared components. An app may intentionally map a base semantic color to a domain-specific state — but it must be documented explicitly in `tokens-app.css` with a rationale comment, not silently repurposed.

Example `tokens-app.css`:
```css
/* tokens-app.css — app-level token overrides. Import after tokens.css. */

/* L1 component type colors — domain entity classification, not semantic status */
--color-type-experience:   var(--color-brand-400);            /* Experience = Nymbl brand */
--color-type-workflow:     var(--color-semantic-info-500);    /* Workflow = active process */
--color-type-integration:  var(--color-semantic-warning-500); /* Integration = bridging */
--color-type-foundation:   var(--color-neutral-500);          /* Foundation = structural */

/* Engagement status — info-blue intentionally repurposed as progress-ready indicator */
--status-draft:    var(--color-neutral-400);
--status-ready:    var(--color-semantic-info-500);
--status-approved: var(--color-semantic-success-600);
--status-blocked:  var(--color-semantic-error-600);
```
