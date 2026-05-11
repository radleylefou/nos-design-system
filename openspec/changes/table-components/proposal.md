## Why

The NOS workbench has dashboard cards (NeedsAttention, WeeklyPacing, MonthlyGlance) but no data table components. Two distinct table patterns appear in Figma: a compact card-framed time-entry table (`RecentTimeEntries`) and a full-width filterable data grid (`PipelineTable`). Both are needed to build out NOS dashboard and CRM-style views.

## What Changes

- New `RecentTimeEntries` component — card-framed 4-column table (TASK, DEMAND, PROJECT, HOURS) for dashboard summary views
- New `PipelineTable` component — full-width data table with search input, Filter By / Export toolbar, and per-row actions (+Note, external link)
- New shared cell sub-components: `TableCellText`, `TableCellSubtext`, `TableCellIcon`, `TableCellLink`, `TableCellActions`
- New workbench demos and nav entries for both components
- New "Data" nav category added to workbench for PipelineTable

## Capabilities

### New Capabilities

- `recent-time-entries`: Card-framed compact table showing recent time log rows with icon+task, demand+client subtext, project name, and hours columns
- `pipeline-table`: Full-width standalone data table with search input, header toolbar actions (Filter By, Export), linked cells with chevrons, and per-row action buttons
- `table-cell-primitives`: Reusable cell sub-components shared across table types: plain text, stacked subtext, icon+text, link+chevron, and action buttons

### Modified Capabilities

## Impact

- `components/`: 8 new files (5 cell components + 2 table components + 2 CSS files per component)
- `components/index.js`: 7 new exports
- `workbench/nav.js`: `RecentTimeEntries` added to Dashboard category; new "Data" category with `PipelineTable`
- `workbench/demos/index.jsx`: new demo entries for both components
