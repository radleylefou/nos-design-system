## ADDED Requirements

### Requirement: SideNavSection renders a labeled navigation group
SideNavSection SHALL render an optional section label and a vertical group of navigation children. It supports groups such as "Main" and "Platform".

#### Scenario: Section with title
- **WHEN** `title="Main"` and children are provided
- **THEN** a muted section label and the child navigation items render in order

#### Scenario: Section without title
- **WHEN** no title is provided
- **THEN** only the child navigation group renders

### Requirement: SideNavSection matches Figma group rhythm
SideNavSection SHALL provide the Figma group rhythm: section label row, horizontal inset, and 8px vertical gap between items.

#### Scenario: Item spacing
- **WHEN** multiple children render in a section
- **THEN** each item is separated by the section gap token

### Requirement: SideNavSection uses semantic grouping
SideNavSection SHALL use structural markup that allows the group to be understood as a related set of navigation links or actions.

#### Scenario: Group label relationship
- **WHEN** a title is provided
- **THEN** the group is associated with that label for assistive technologies
