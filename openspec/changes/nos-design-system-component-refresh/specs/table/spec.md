## ADDED Requirements

### Requirement: Table rows support an inline action slot
The Table component SHALL accept an `actions` column definition that renders a right-aligned slot per row containing icon buttons or small buttons (e.g. "+ Note", external link). The actions column SHALL not have a column header label.

#### Scenario: Action buttons rendered per row
- **WHEN** a column definition with `type: "actions"` is provided with button configs
- **THEN** each row renders the action buttons right-aligned in the last column

### Requirement: Table cells support a navigable indicator
A cell SHALL optionally render a chevron-right icon when `navigable: true` is set on the column definition, indicating the cell value is clickable and leads to a detail view. The chevron SHALL appear after the cell value.

#### Scenario: Navigable cell shows chevron
- **WHEN** a column has `navigable: true` and a row is rendered
- **THEN** a chevron-right icon appears after the cell content

#### Scenario: Non-navigable cell shows no chevron
- **WHEN** `navigable` is not set
- **THEN** no chevron appears in the cell

### Requirement: Table column headers render in uppercase with wide letter-spacing
Column header text SHALL be rendered uppercase, at 11px (2xs), with wide letter-spacing, matching the `letter-spacing.wide` token. This applies to all column headers.

#### Scenario: Column header style applied
- **WHEN** a Table renders with column definitions
- **THEN** all column header cells display in uppercase with wide tracking
