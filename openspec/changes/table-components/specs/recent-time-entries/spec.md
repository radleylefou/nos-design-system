## ADDED Requirements

### Requirement: RecentTimeEntries renders a card with a table header
The component SHALL render a card container (white bg, brand-50 border, 14px border-radius) with a header row showing a title and a "View All ↗" link.

#### Scenario: Renders title and View All link
- **WHEN** component mounts with default `title` prop
- **THEN** the header shows "Recent Time Entries" (14px medium neutral-700) and "View All ↗" (12px regular brand-500) at opposite ends

#### Scenario: Custom title
- **WHEN** `title` prop is provided
- **THEN** the custom title is displayed in the header

#### Scenario: View All callback
- **WHEN** `onViewAll` prop is provided and "View All" link is clicked
- **THEN** `onViewAll()` is called

### Requirement: RecentTimeEntries renders column header bar
The component SHALL render a 30px tall column header row below the card header with uppercase 10px medium tracked caps labels for each column.

#### Scenario: Column headers match column definitions
- **WHEN** `columns` array is provided
- **THEN** each column's `label` is rendered as uppercase caps in brand-5 tinted (#f8f8fd) background

### Requirement: RecentTimeEntries renders data rows
The component SHALL render one row per entry in the `rows` prop. Each row is 61px tall with a brand-50 bottom border divider. The last row has no bottom divider.

#### Scenario: Rows render with correct cell types
- **WHEN** `rows` data is provided
- **THEN** each column renders the cell type specified in the column definition (icon, subtext, text, or hours cell)

#### Scenario: Empty state
- **WHEN** `rows` is empty
- **THEN** no data rows are rendered (no error thrown)

### Requirement: RecentTimeEntries TASK column shows clipboard icon + task name
The TASK column SHALL render a clipboard SVG icon (18×18, neutral-400) to the left of the task name using `TableCellIcon`.

#### Scenario: Icon and task name rendered
- **WHEN** a row has a `task` value
- **THEN** clipboard icon and task name render side by side

### Requirement: RecentTimeEntries DEMAND column shows demand name + client subtext
The DEMAND column SHALL render demand name (14px medium) stacked above client name (12px regular neutral-500) using `TableCellSubtext`.

#### Scenario: Demand and client stacked
- **WHEN** a row has `demand` and `client` values
- **THEN** demand renders above client in the stacked subtext style

### Requirement: RecentTimeEntries HOURS column is fixed width
The HOURS column SHALL have a fixed width of 71px and display the hours value right-padded using `TableCellText`.

#### Scenario: Hours column width
- **WHEN** component renders
- **THEN** HOURS column occupies 71px regardless of content width
