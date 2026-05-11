## Why

The Components landing page renders all component cards in a single undifferentiated grid, making it hard to visually distinguish which components belong to which category. As the number of categories grows, users must rely entirely on the sidebar to understand groupings — the main content area provides no category-level structure. Additionally, card spacing in the grid is too tight for comfortable scanning.

## What Changes

- The Components landing page (`ComponentsPage`) gains a categorized layout: each category renders as a labeled section with its own card grid
- A section heading (category label) separates each group of component cards
- Card grid gap increases to give cards more breathing room
- The flat "all components in one grid" layout is replaced by "one grid per category"

## Capabilities

### New Capabilities

- `components-page-category-layout`: Components landing page renders cards grouped by category, with a visible section heading per category and improved card spacing

### Modified Capabilities

<!-- none -->

## Impact

- `workbench/pages/ComponentsPage.jsx` — restructure render logic to loop over categories and render grouped card grids
- `workbench/pages/ComponentsPage.css` — add section heading styles, adjust grid gap for card spacing
