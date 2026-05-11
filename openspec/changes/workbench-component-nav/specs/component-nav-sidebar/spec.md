## ADDED Requirements

### Requirement: Secondary navigation sidebar renders inside ComponentsPage
ComponentsPage SHALL render a two-column layout with a secondary navigation sidebar in the left column. The sidebar SHALL display all categories from `COMPONENT_CATEGORIES` in nav.js as collapsible accordion sections.

#### Scenario: Sidebar renders with categories
- **WHEN** the user navigates to the Components section
- **THEN** the secondary sidebar is visible with all categories listed

#### Scenario: Categories are collapsed by default
- **WHEN** no `categoryId` is present in the view state
- **THEN** all category sections are collapsed

### Requirement: Category expansion is driven by view state
The expanded category SHALL be determined by `view.categoryId`. Only the category whose label matches `categoryId` SHALL be expanded. This is a single-open accordion — only one category can be expanded at a time.

#### Scenario: Active category expands
- **WHEN** `categoryId` is set in the view state
- **THEN** the matching category section is expanded, showing its component list
- **AND** all other categories remain collapsed

#### Scenario: Clicking a collapsed category sets categoryId
- **WHEN** the user clicks a collapsed category header
- **THEN** `onNavigate` is called with `{ section: 'component', categoryId: <label> }`

#### Scenario: Clicking an expanded category collapses it
- **WHEN** the user clicks the currently expanded category header
- **THEN** `onNavigate` is called with `{ section: 'component' }` (no categoryId)

### Requirement: Active component is highlighted in the sidebar
When a component is selected, its entry in the sidebar SHALL be visually highlighted using the active state style.

#### Scenario: Active component item is highlighted
- **WHEN** `componentId` is set in the view state and the parent category is expanded
- **THEN** the matching component item renders with the active style class

#### Scenario: Clicking a component item navigates to it
- **WHEN** the user clicks a component name in the sidebar
- **THEN** `onNavigate` is called with `{ section: 'component', categoryId, componentId: <name> }`

### Requirement: Global Sidebar has no secondary panel for Components
The global Sidebar SHALL NOT render a secondary panel when the active section is 'component'. It SHALL remain rail-only regardless of `categoryId` or `componentId` in the view state.

#### Scenario: Global sidebar stays rail-only in component section
- **WHEN** the view state has `section: 'component'` with any `categoryId`
- **THEN** the global sidebar renders only the primary rail, no secondary panel
