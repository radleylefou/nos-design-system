## 1. Cleanup — Remove Obsolete Code

- [x] 1.1 Delete `workbench/pages/CategoryPage.jsx` and `CategoryPage.css`
- [x] 1.2 Remove CategoryPage import and render branch from `workbench/App.jsx`
- [x] 1.3 Remove secondary panel logic from `workbench/Sidebar.jsx` (activeCategory, showPanel, wb-sidebar--no-panel, panel render block, back button)
- [x] 1.4 Remove CategoryPage-related CSS from `workbench/Sidebar.css` if any panel-specific styles exist

## 2. Demo Registry

- [x] 2.1 Create `workbench/demos/index.js` exporting an empty `DEMOS` object with JSDoc comment explaining the expected entry shape `{ preview, detail, description? }`

## 3. ComponentsPage Layout

- [x] 3.1 Rewrite `workbench/pages/ComponentsPage.jsx` with two-column layout: `ComponentNavSidebar` (left) + content area (right)
- [x] 3.2 Implement `ComponentNavSidebar` — renders all categories from `COMPONENT_CATEGORIES` as collapsible accordion sections; expansion driven by `categoryId` prop; clicking a header calls `onNavigate`; clicking a component item calls `onNavigate` with `componentId`; active item highlighted via CSS class
- [x] 3.3 Implement content area level 1 — all-components card grid when `categoryId` and `componentId` are both absent
- [x] 3.4 Implement content area level 2 — category-filtered card grid with category heading when `categoryId` present and `componentId` absent
- [x] 3.5 Implement content area level 3 — component detail view when `componentId` present; renders `DEMOS[componentId]?.detail()` or fallback stub with component name
- [x] 3.6 Implement `ComponentCard` — fixed-height preview sandbox (renders `DEMOS[componentId]?.preview()` or placeholder), component name, optional description; click calls `onNavigate`

## 4. Styles

- [x] 4.1 Write `ComponentsPage.css` — two-column layout, sidebar width, content area flex
- [x] 4.2 Style the sidebar accordion — category headers, expand/collapse indicator, component items, active item state
- [x] 4.3 Style component cards — fixed preview sandbox with overflow hidden, name + description typography, hover state
- [x] 4.4 Style preview placeholder — muted fill, appropriate height to match preview sandbox

## 5. App.jsx Routing

- [x] 5.1 Update `App.jsx` routing: collapse the two `section === 'component'` branches into one — always render `ComponentsPage` with `categoryId` and `componentId` props when `section === 'component'`
- [x] 5.2 Remove `handleSelectCategory` helper from `App.jsx` if it becomes unused

## 6. Verification

- [x] 6.1 Confirm workbench builds without errors (`npm run build`)
- [x] 6.2 Verify global sidebar shows no panel when navigating to Components
- [x] 6.3 Verify level 1 all-components grid renders (empty if nav.js has no components)
- [x] 6.4 Verify clicking a category in the sidebar expands it and shows level 2 grid
- [x] 6.5 Verify clicking a component card navigates to level 3 detail (stub state)
- [x] 6.6 Verify back-navigation works (clicking expanded category header collapses it)
