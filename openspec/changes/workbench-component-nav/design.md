## Context

The workbench currently uses a two-phase component browsing flow: a separate `CategoryPage` (grid of category cards) followed by `ComponentsPage` (component detail). The global `Sidebar` grows a secondary panel when a category is active. This creates a layout shift on drill-in and scatters navigation responsibility across three files. On the scaffold branch (no components yet), this is the right moment to replace it with a single coherent layout.

## Goals / Non-Goals

**Goals:**
- Single consistent layout for all three levels of component browsing (all → category → detail)
- Secondary nav sidebar lives inside ComponentsPage, not the global Sidebar
- View state (`categoryId`, `componentId`) fully drives sidebar expansion and content area
- Demo registry architecture in place so components can be added incrementally
- Placeholder rendering when no demo is registered

**Non-Goals:**
- Building actual component demos (that happens per-component as the system is rebuilt)
- Animations or transitions on sidebar expand/collapse
- Search or filtering within the component nav
- Multiple categories open simultaneously (single-open accordion only)

## Decisions

### D1: Secondary sidebar owns component navigation

The global `Sidebar` secondary panel is removed. `ComponentsPage` renders a two-column layout: left column = `ComponentNavSidebar`, right column = content area. The global sidebar stays rail-only.

**Rationale**: Component browsing nav is contextual to ComponentsPage. Putting it in the global shell forced the shell to know about component-level state, and created layout shifts when entering/leaving the component section.

**Alternative considered**: Keep the global sidebar panel, just improve the UX. Rejected — it doesn't solve the layout-shift issue and keeps nav state management split across App/Sidebar/ComponentsPage.

### D2: View state drives sidebar expansion (single-open)

`categoryId` in the view state is the single source of truth for which category is expanded. Clicking a category header calls `onNavigate({ section: 'component', categoryId })`. No local accordion state in the sidebar component.

**Rationale**: Makes every navigation state bookmarkable and shareable. Keeps ComponentsPage stateless relative to its parent.

**Alternative considered**: Local `useState` for expanded categories (allows multiple open). Rejected — the URL state already handles this cleanly and multi-open adds no real value for a sidebar this size.

### D3: Three content states keyed to view state

| `categoryId` | `componentId` | Content rendered |
|---|---|---|
| absent | absent | All-components card grid (every component across all categories) |
| present | absent | Category card grid (filtered to that category) |
| present | present | Component detail view |

The content area reads `categoryId` and `componentId` from props and renders accordingly — no internal routing or state needed.

### D4: Demo registry as a plain JS object in `workbench/demos/index.js`

```js
// workbench/demos/index.js
export const DEMOS = {
  // 'Button': { preview: () => <Button>Click</Button>, detail: () => <ButtonDetail /> }
};
```

Cards check `DEMOS[componentId]?.preview`. If absent, render a placeholder `<div className="component-card__preview-placeholder" />`.

**Rationale**: Simplest possible structure. No dynamic imports, no code splitting needed at workbench scale. Easy to add entries as components are built.

### D5: Fixed preview sandbox via CSS containment

Card preview area is a fixed-height container (`height: 120px`, `overflow: hidden`) with `transform-origin: top left` scaling applied to the rendered component. Each component renders at full size inside; the container clips it.

**Rationale**: Consistent card heights regardless of component complexity. No per-component sizing decisions needed.

**Trade-off**: Some components (e.g., KanbanBoard) will be heavily cropped. That's acceptable — the card communicates "this is what the component looks like at a glance," not a full demo.

## Risks / Trade-offs

- **Preview scaling skews small components** → Cards for atomic components (Button, Badge) will look sparse. Mitigation: the placeholder visual fills the space until a hand-crafted preview is registered.
- **CategoryPage deletion is irreversible** → Low risk — the functionality is fully superseded and no external code references it.
- **Global Sidebar panel removal** → Sidebar.jsx already gates on `COMPONENT_GROUPS.length > 0`; with empty nav.js on scaffold, the panel never rendered anyway. Safe to remove.

## Open Questions

- None — all decisions locked during explore session.
