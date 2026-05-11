## ADDED Requirements

### Requirement: Content area renders a card grid when no component is selected
When `componentId` is absent from the view state, the content area SHALL render a grid of component cards. If `categoryId` is also absent, all components across all categories are shown. If `categoryId` is present, only that category's components are shown.

#### Scenario: All-components grid at level 1
- **WHEN** `categoryId` and `componentId` are both absent from view state
- **THEN** a card grid renders showing every component from all categories

#### Scenario: Category-filtered grid at level 2
- **WHEN** `categoryId` is present and `componentId` is absent
- **THEN** a card grid renders showing only the components in that category
- **AND** the category name and description are shown as a heading above the grid

#### Scenario: Component detail at level 3
- **WHEN** both `categoryId` and `componentId` are present
- **THEN** the card grid is replaced by the component detail view for that component

### Requirement: Each component card has a fixed preview sandbox
Each component card SHALL contain a fixed-height preview area where the component's `preview` render function is invoked. The preview container SHALL clip overflow so that large components do not break the card layout.

#### Scenario: Preview renders when demo is registered
- **WHEN** the component has an entry in the DEMOS registry with a `preview` function
- **THEN** the preview function output is rendered inside the card's preview sandbox

#### Scenario: Placeholder renders when no demo is registered
- **WHEN** the component has no entry in DEMOS, or the entry has no `preview` function
- **THEN** a placeholder element is rendered in the preview area (no error, no empty space)

### Requirement: Clicking a card navigates to the component detail
Each card SHALL be interactive. Clicking it SHALL navigate to that component's detail view.

#### Scenario: Card click sets componentId
- **WHEN** the user clicks a component card
- **THEN** `onNavigate` is called with `{ section: 'component', categoryId: <parent category>, componentId: <name> }`

### Requirement: Card displays component name and description
Each card SHALL display the component name and, if available, a short description. The description source is the `description` field on the category entry in nav.js (per-component descriptions may be added later via the DEMOS registry).

#### Scenario: Card shows name
- **WHEN** a component card renders
- **THEN** the component name is visible on the card

#### Scenario: Card shows description when available
- **WHEN** a component card renders and the DEMOS registry has a `description` for that component
- **THEN** the description text is shown below the component name
