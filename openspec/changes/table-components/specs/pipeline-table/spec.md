## ADDED Requirements

### Requirement: PipelineTable renders a card container with search toolbar
The component SHALL render a full-width card (white bg, brand-50 border, 14px border-radius) with a toolbar header containing a search input on the left and Filter By / Export ghost buttons on the right.

#### Scenario: Search input renders with placeholder and kbd badge
- **WHEN** component mounts
- **THEN** a 240px search input renders with a search icon, "Search" placeholder, and a "/" keyboard shortcut badge (10px medium, neutral-400, 4px border)

#### Scenario: Search input calls onSearch on change
- **WHEN** user types in the search input
- **THEN** `onSearch(value)` is called with the current input value

#### Scenario: Filter By button triggers callback
- **WHEN** "Filter By" button is clicked
- **THEN** `onFilterBy()` is called

#### Scenario: Export button triggers callback
- **WHEN** "Export" button is clicked
- **THEN** `onExport()` is called

### Requirement: PipelineTable renders column header bar
The component SHALL render a 30px tall column header row with uppercase 10px medium tracked caps labels for each column on a brand-5 tinted (#f8f8fd) background.

#### Scenario: Column headers from column definitions
- **WHEN** `columns` array is provided
- **THEN** each column's `label` is displayed as uppercase caps in the header bar

### Requirement: PipelineTable renders data rows with per-row actions
The component SHALL render one row per entry in `rows`, each with a brand-50 bottom border divider. Each row has an actions column at the right edge with a "+Note" button and an external-link icon.

#### Scenario: Rows render with cell types
- **WHEN** `rows` data is provided with column definitions
- **THEN** each cell renders according to its column's `cellType`

#### Scenario: Row +Note callback
- **WHEN** "+Note" button is clicked on a row
- **THEN** `onNote(row)` is called with the row data object

#### Scenario: Row external link callback
- **WHEN** external link icon is clicked on a row
- **THEN** `onOpenLink(row)` is called with the row data object

### Requirement: PipelineTable ACCOUNT and DEAL columns use link cells
ACCOUNT and DEAL columns SHALL render using `TableCellLink` with a chevron `>` indicator to signal navigability.

#### Scenario: Chevron renders on link cells
- **WHEN** a row has ACCOUNT or DEAL values and corresponding onClick handlers are provided
- **THEN** each value renders with a `>` chevron to its right

### Requirement: PipelineTable handles horizontal overflow
The component SHALL wrap the table columns in a horizontally scrollable container so the 1392px design width doesn't clip on smaller viewports.

#### Scenario: Overflow scrolls horizontally
- **WHEN** the component container is narrower than the total column widths
- **THEN** the table scrolls horizontally within the card without clipping content

### Requirement: PipelineTable +Note button style
The "+Note" button SHALL render as an outlined small button with brand-500 border and brand-500 text, 6px border-radius, and a "+" prefix.

#### Scenario: Note button visual
- **WHEN** component renders a row
- **THEN** each row's "+Note" button has brand border/text and correct sizing
