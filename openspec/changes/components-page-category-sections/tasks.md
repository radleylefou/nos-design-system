## 1. ComponentsPage — categorized landing view

- [x] 1.1 In `AllComponentsGrid`, replace the flat `flatMap` loop with a per-category section loop: map over `COMPONENT_CATEGORIES`, render a `<section>` per category with a heading and a `.comp-grid` containing that category's cards
- [x] 1.2 Add `.comp-landing` wrapper div around the sections with `display: flex; flex-direction: column; gap: var(--spacing-10)` so sections breathe
- [x] 1.3 Add `.comp-landing__section-heading` style: `font-size: var(--font-size-xs)`, `font-weight: var(--font-weight-semibold)`, `color: var(--wb-subtle)`, `text-transform: uppercase`, `letter-spacing: var(--letter-spacing-wide)`, `margin: 0 0 var(--spacing-4)`

## 2. CSS — grid gap

- [x] 2.1 In `ComponentsPage.css`, change `.comp-grid` gap from `var(--spacing-4)` to `var(--spacing-6)`

## 3. Verification

- [x] 3.1 Confirm the Components landing page (Level 1) shows two sections — "Metrics" and "Tables" — each with their own card grid
- [x] 3.2 Confirm clicking any card still navigates correctly to the component detail page
- [x] 3.3 Confirm Level 2 (category view) and Level 3 (component detail) are unaffected
