## Context

`ComponentsPage` has three view levels: Level 1 (all components, no selection), Level 2 (one category selected), and Level 3 (a specific component). The issue is Level 1 — `AllComponentsGrid` flattens every component across every category into a single undifferentiated grid. With two categories (Metrics × 4 components, Tables × 3 components), there's no visual grouping. The grid gap (`--spacing-4` = 16px) is also tight for the card size (min 180px).

## Goals / Non-Goals

**Goals:**
- Level 1 renders each category as a named section with its own card grid
- Section headings use existing token-based type styles
- Card grid gap increases to `--spacing-5` or `--spacing-6` for comfortable scanning
- No change to Level 2 or Level 3 behavior

**Non-Goals:**
- Adding collapse/expand to category sections on Level 1 (that's what Level 2 is for)
- Changing the sidebar nav structure
- Touching components outside `ComponentsPage.jsx` / `ComponentsPage.css`

## Decisions

**Decision: Replace `AllComponentsGrid` flat loop with a per-category section loop**

`AllComponentsGrid` currently does `COMPONENT_CATEGORIES.flatMap(...)` to get a flat list, then renders one `<div className="comp-grid">`. The fix is to map over `COMPONENT_CATEGORIES` directly — each category produces a `<section>` with a heading and its own `.comp-grid`. No new state, no new components, no dependencies.

Alternative considered: a CSS `subgrid` approach with data attributes — rejected because it adds complexity for no benefit when a simple JSX loop already achieves the result.

**Decision: Use `--spacing-6` (24px) for grid gap**

Current `--spacing-4` (16px) is too tight for 120px-tall cards. `--spacing-6` gives each card a comfortable margin without feeling sparse. Applies to both Level 1 sections and Level 2 category views (same `.comp-grid` class).

## Risks / Trade-offs

- If a category has zero components it will render an empty section heading with no cards. Acceptable at workbench scale; add a guard only if categories-with-no-components becomes a real scenario.
- Bump in grid gap is a global change to `.comp-grid` — also affects Level 2 category view. This is desirable; the spacing issue exists there too.
