## Why

The workbench category structure reflects page context ("Dashboard") rather than component type, making it harder to navigate as the library grows. The DemoStage renders components on two surfaces (dark + white) which is unnecessary for NOS's predominantly white-background apps, and table components render too narrow to be useful. A new shared `TableHeader` component is needed so all NOS tables share a consistent, configurable header pattern.

## What Changes

- **BREAKING** Rename workbench category `Dashboard` → `Metrics`; rename `Data` → `Tables`
- `DashboardCard` gains its own workbench page under Metrics
- New `TableHeader` component — configurable title, optional subtext, optional search input, variable action buttons
- `PipelineTable` refactored to use `TableHeader` internally (removes duplicated toolbar implementation)
- `RecentTimeEntries` refactored to use `TableHeader` internally (removes duplicated card-header implementation)
- `TableHeader` exported from `components/index.js`
- `DemoStage` updated: white surface only (dark surface removed); add `fullWidth` prop for table demos
- Workbench nav restructured into compound demo pages:
  - `Metrics`: DashboardCard, NeedsAttention, WeeklyPacing, MonthlyGlance
  - `Tables`: TableHeader (own page), TableCell (compound: all cell variants), TableExamples (compound: PipelineTable + RecentTimeEntries together, full-width)
- Remove `PipelineTable` and `RecentTimeEntries` as standalone workbench nav entries (they appear on `TableExamples`)

## Capabilities

### New Capabilities

- `table-header`: Reusable table header component with title, optional subtext, optional search input, and a variable list of action buttons (icon + label + onClick); used by all NOS tables
- `demo-stage-overhaul`: Updated DemoStage primitive — white surface only; `fullWidth` prop for tables; removes dark-surface rendering

### Modified Capabilities

- `workbench-nav`: Category structure changes from page-context names to component-type names; compound demo pages replace per-component entries for table sub-components

## Impact

- `components/TableHeader.jsx` + `TableHeader.css` — new files
- `components/PipelineTable.jsx` — refactored to use TableHeader
- `components/RecentTimeEntries.jsx` — refactored to use TableHeader
- `components/index.js` — add TableHeader export
- `workbench/demos/DemoStage.jsx` + `DemoStage.css` — remove dark surface, add fullWidth
- `workbench/nav.js` — new category labels and component lists
- `workbench/demos/index.jsx` — add DashboardCard, TableHeader, TableCell, TableExamples entries; remove PipelineTable + RecentTimeEntries top-level entries
