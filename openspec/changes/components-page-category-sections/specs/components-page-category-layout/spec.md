## ADDED Requirements

### Requirement: Components landing page groups cards by category
The Level 1 view (no category or component selected) SHALL render component cards in per-category sections rather than a single flat grid. Each section SHALL display the category label as a heading followed by a grid of component cards belonging to that category.

#### Scenario: Multiple categories render as separate sections
- **WHEN** the user navigates to the Components landing page with no category selected
- **THEN** each category defined in `COMPONENT_CATEGORIES` renders as a distinct section with its own heading and card grid

#### Scenario: Section heading matches category label
- **WHEN** a category section is rendered on the landing page
- **THEN** the section heading text SHALL equal the category's `label` value from `COMPONENT_CATEGORIES`

#### Scenario: Cards within a section belong only to that category
- **WHEN** a category section renders its card grid
- **THEN** only the components listed in that category's `components` array SHALL appear in that grid

### Requirement: Component card grid uses adequate spacing
The `.comp-grid` class SHALL use a gap of `--spacing-6` (24px) between cards so cards have comfortable visual separation.

#### Scenario: Grid gap is applied to landing page and category view
- **WHEN** the component grid renders in either the landing page (Level 1) or category view (Level 2)
- **THEN** the gap between cards SHALL be `var(--spacing-6)`
