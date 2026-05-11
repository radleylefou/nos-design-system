## Why

The workbench Components section currently splits navigation across two separate layouts (CategoryPage grid → ComponentsPage detail), creating a disorienting context switch and making it hard to browse across categories. As we rebuild the design system from scratch on the scaffold branch, this is the right moment to establish a more coherent, consistent browsing structure.

## What Changes

- **BREAKING** — Remove `CategoryPage` (the category-card landing grid); it is replaced by the new ComponentsPage layout
- **BREAKING** — Remove the secondary panel from the global `Sidebar`; the global sidebar becomes rail-only
- Introduce a secondary navigation sidebar inside `ComponentsPage` — a collapsible accordion of categories driven by `view.categoryId` (single-open, URL-state-backed)
- Introduce a component card grid in the `ComponentsPage` content area — shows all components at level 1, filtered by category at level 2
- Each card: fixed preview sandbox (component rendered inside, scaled/clipped) + name + description; renders a placeholder when no demo is registered
- Introduce a `workbench/demos/index.js` demo registry — maps `componentId` to `{ preview, detail }` render functions
- Component detail view renders at level 3 (category expanded in sidebar, component highlighted, full detail in content area)
- `App.jsx` simplified: `section === 'component'` always renders `ComponentsPage` regardless of `categoryId`

## Capabilities

### New Capabilities

- `component-nav-sidebar`: Secondary accordion sidebar inside ComponentsPage for navigating categories and components
- `component-card-grid`: Card grid showing components with fixed preview sandbox and placeholder support
- `demo-registry`: Registration system mapping componentId to preview and detail render functions

### Modified Capabilities

<!-- No existing specs to delta against — this is a fresh scaffold -->

## Impact

- `workbench/App.jsx` — routing simplification
- `workbench/Sidebar.jsx` — remove secondary panel logic
- `workbench/pages/ComponentsPage.jsx` + `ComponentsPage.css` — full rewrite
- `workbench/pages/CategoryPage.jsx` + `CategoryPage.css` — deleted
- `workbench/demos/index.js` — new file
- `workbench/nav.js` — no changes required
