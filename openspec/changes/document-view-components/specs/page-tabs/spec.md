## ADDED Requirements

### Requirement: PageTabs renders a navigable tab bar
PageTabs SHALL render a horizontal tab bar from a `tabs` prop (array of `{ id, label }` objects) and an `activeTab` prop. It SHALL call `onTabChange(id)` when a tab is clicked.

#### Scenario: Tab rendering
- **WHEN** `tabs=[{id:'overview',label:'Overview'},{id:'pain-points',label:'Pain Points'}]` is passed
- **THEN** two tab buttons are rendered with their labels

#### Scenario: Active tab highlighted
- **WHEN** `activeTab="overview"` is set
- **THEN** the Overview tab has the active visual state (underline indicator)

#### Scenario: Tab change callback
- **WHEN** user clicks a non-active tab
- **THEN** `onTabChange` is called with that tab's `id`

### Requirement: PageTabs uses underline active indicator
The active tab SHALL be indicated by a bottom border/underline, not a background fill. This visually distinguishes PageTabs from SegmentedControl.

#### Scenario: Active state visual
- **WHEN** a tab is active
- **THEN** it has a colored bottom border, no background fill

### Requirement: PageTabs supports keyboard navigation
PageTabs SHALL support arrow key navigation between tabs (ArrowLeft, ArrowRight), and Home/End to jump to first/last tab.

#### Scenario: Arrow key navigation
- **WHEN** focus is on a tab and ArrowRight is pressed
- **THEN** focus moves to the next tab

#### Scenario: Home key
- **WHEN** focus is on any tab and Home is pressed
- **THEN** focus moves to the first tab

### Requirement: PageTabs has correct ARIA semantics
PageTabs SHALL render with `role="tablist"` on the container and `role="tab"` + `aria-selected` on each tab button.

#### Scenario: ARIA roles
- **WHEN** PageTabs is rendered
- **THEN** the container has `role="tablist"` and each tab button has `role="tab"` and `aria-selected` set correctly
