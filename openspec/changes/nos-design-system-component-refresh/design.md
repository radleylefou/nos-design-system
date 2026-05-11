## Context

The NOS design system currently has ~25 components. An updated round of Figma designs for the Home Dashboard, Pipeline Grid, and Pipeline Kanban screens introduces new patterns and refines existing ones. The system's tokens are mostly stable; the work is component-level. All components are plain JSX + CSS custom properties — no CSS-in-JS, no external component library.

Current component state after reading source:
- `Card` — `Card.Header` is a bare wrapper div; no action icons or dropdown affordance
- `Button` — sizes: `sm` (30px), `md` (36px), `lg` (42px); missing `xs` for inline row actions
- `Badge` — `variant` conflates color and visual treatment; all variants use same filled-pill style
- `Table` — no per-row action slot, no navigable cell indicator, column headers unstyled (not uppercase)
- `ProgressBar` — single fill only; `ProgressRing` exists separately
- `StatBlock` — supports delta arrow + label inline; no grid layout; no label annotation

## Goals / Non-Goals

**Goals:**
- All component changes are additive (new props, new variants) — zero breaking changes
- New components (`AlertItem`, `CategoryStatCard`, `KanbanBoard`/`KanbanCard`, `SparkLine`) follow existing file/naming/export conventions
- All new visual values use CSS custom properties from `tokens.css`
- All 10 components/new files registered in `components/index.js`
- Workbench does not need page-level examples yet — component docs in the existing workbench pages are sufficient

**Non-Goals:**
- No token changes to `tokens.json` / `tokens.css` unless a needed value is genuinely missing
- No new page-level demos in the workbench (that is a separate task)
- No data fetching, state management, or routing logic in any component
- No animation library usage

## Decisions

### Badge: `appearance` prop instead of overloading `variant`
The spec says `variant="subtle"`, but `variant` on Badge already encodes the color (neutral, brand, success, etc.). Adding "subtle" as a variant value would conflict with the color dimension.

**Decision**: Add an `appearance` prop (`"filled" | "subtle"`, default `"filled"`) orthogonal to `variant`. Existing behavior unchanged. `appearance="subtle"` renders tinted background + colored text, no border.

**Alternative considered**: A single combined variant like `"subtle-neutral"`, `"subtle-success"` — rejected as verbose and not scalable.

### Card header actions: slot-based approach via `Card.Header` props
`Card.Header` is currently a bare `<div>`. The Figma shows a consistent layout: left title (with optional dropdown chevron), right action icons (expand + overflow).

**Decision**: Add `title`, `titleDropdown`, and `actions` props directly to `Card.Header`. When `title` is a string, it renders in a `.nos-card__title` span. When `children` is passed instead (legacy), it falls through unchanged — backward compatible.

**Alternative considered**: A new `Card.Toolbar` subcomponent — rejected as over-engineering for the current scope.

### Table: actions column as a column definition type
The existing column definition shape supports `render` for arbitrary cell content. Per-row actions could be done via a custom `render` function today.

**Decision**: Add a `navigable` boolean to column definitions (renders `›` chevron suffix in that cell) and document the pattern of using `render` + `align: "right"` for an actions column in the workbench. No structural Table changes needed for actions — just a CSS class for the chevron and uppercase header styling.

**Alternative considered**: A dedicated `rowActions` prop on Table — deferred; `render` is sufficient and avoids API bloat.

### ProgressBar dual-segment: new `segments` prop, `variant` stays as-is
Adding `variant="dual"` requires restructuring the fill div. Rather than branching inside the existing `ProgressBar`:

**Decision**: The dual-segment feature is additive via a `segments` prop (`[{ value, color }, ...]`). When `segments` is provided, `ProgressBar` renders multiple `.nos-progress__fill` elements with widths proportional to total track. When absent, existing behavior is unchanged.

### SparkLine: inline SVG, no charting library
No chart library exists in the project and CLAUDE.md prohibits adding animation/visualization libraries.

**Decision**: Render a native `<svg>` with a single `<polyline>` element. Points are normalized to the SVG viewBox using `Math.min`/`Math.max` on the data array. Accepts `width`, `height`, `data`, `color`.

### KanbanBoard / KanbanCard: two files, no drag-and-drop in this pass
Drag-and-drop would require a library or significant pointer event logic.

**Decision**: Ship `KanbanBoard` (layout + column headers) and `KanbanCard` (deal card display) as presentational components. Column reordering and card dragging are out of scope for this change.

## Risks / Trade-offs

- **Badge `appearance` prop diverges from spec name** → Spec said `variant="subtle"` but implementation uses `appearance="subtle"`. Spec will need a note; the behavior is identical.
- **SparkLine with flat/constant data** → `Math.min === Math.max` causes division by zero in normalization → Mitigation: guard with fallback (`max === min ? 0 : ...`), renders a flat horizontal line.
- **KanbanBoard horizontal scroll on narrow viewports** → Cards may be hard to reach. Not a concern for the workbench authoring context; noted for future responsive work.
- **Table uppercase headers via CSS only** → Any consumer who relies on `.nos-table__cell--head` rendering mixed-case via CSS `text-transform` may see a visual change → Acceptable since it matches the Figma and is purely cosmetic.

## Migration Plan

All changes are additive. No consumer code needs to change. New props have defaults matching current behavior. New components do not replace existing ones.

Deploy order: tokens check → modified components → new components → `index.js` registration → workbench verification.
