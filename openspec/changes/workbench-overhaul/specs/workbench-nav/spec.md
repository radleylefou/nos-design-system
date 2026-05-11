## ADDED Requirements

### Requirement: Workbench has Metrics category
The workbench SHALL have a category named "Metrics" containing: DashboardCard, NeedsAttention, WeeklyPacing, MonthlyGlance. Each has its own nav card and detail page.

#### Scenario: Metrics category visible in sidebar
- **WHEN** user navigates to Components
- **THEN** "Metrics" category appears in the sidebar with all four components listed

#### Scenario: DashboardCard has its own detail page
- **WHEN** user clicks DashboardCard in the sidebar
- **THEN** a detail page shows DashboardCard demo variants

### Requirement: Workbench has Tables category with compound pages
The workbench SHALL have a category named "Tables" with three entries: TableHeader, TableCell, TableExamples. These are compound reference pages, not individual per-component cards.

#### Scenario: Tables category visible in sidebar
- **WHEN** user navigates to Components
- **THEN** "Tables" category appears in the sidebar with TableHeader, TableCell, and TableExamples entries

#### Scenario: TableHeader page shows all header variants
- **WHEN** user clicks TableHeader in the sidebar
- **THEN** detail page shows TableHeader with: title only, title+subtext, with search, with actions, with all options combined

#### Scenario: TableCell page shows all cell variants
- **WHEN** user clicks TableCell in the sidebar
- **THEN** detail page shows all five cell types: Text, Subtext, Icon, Link, Actions — each with a labeled example

#### Scenario: TableExamples page shows full table components
- **WHEN** user clicks TableExamples in the sidebar
- **THEN** detail page shows PipelineTable and RecentTimeEntries rendered at full width on white background

## REMOVED Requirements

### Requirement: Dashboard category
**Reason**: Replaced by Metrics category with a component-type label rather than a page-context label.
**Migration**: `nav.js` entry `{ label: 'Dashboard' }` → `{ label: 'Metrics' }`.

### Requirement: Data category
**Reason**: Replaced by Tables category. PipelineTable and RecentTimeEntries are shown on the TableExamples compound page.
**Migration**: `nav.js` entry `{ label: 'Data' }` → `{ label: 'Tables', components: ['TableHeader', 'TableCell', 'TableExamples'] }`.

### Requirement: PipelineTable and RecentTimeEntries as standalone nav entries
**Reason**: Both are shown together on the TableExamples compound page for easier comparison. Both remain fully exported components — this is a workbench-only change.
**Migration**: Remove from nav.js component lists; add demo content to TableExamples DEMOS entry.
