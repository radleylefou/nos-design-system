## 1. Table cell primitives

- [x] 1.1 Create `components/TableCell.jsx` — export `TableCellText`, `TableCellSubtext`, `TableCellIcon`, `TableCellLink`, `TableCellActions` from a single file
- [x] 1.2 Create `components/TableCell.css` — styles for all five cell types
- [x] 1.3 Export all five cell components from `components/index.js`

## 2. RecentTimeEntries component

- [x] 2.1 Create `components/RecentTimeEntries.jsx` — card chrome (own wrapper, not DashboardCard), header row with title + View All link, column header bar, and data rows using cell primitives
- [x] 2.2 Create `components/RecentTimeEntries.css` — card container, header, column bar, row styles
- [x] 2.3 Export `RecentTimeEntries` from `components/index.js`

## 3. PipelineTable component

- [x] 3.1 Create `components/PipelineTable.jsx` — card chrome, search input with "/" kbd badge, Filter By and Export ghost buttons, column header bar, data rows with per-row TableCellActions, horizontal scroll wrapper
- [x] 3.2 Create `components/PipelineTable.css` — card container, toolbar, search field, ghost buttons, column header bar, row, actions column styles
- [x] 3.3 Export `PipelineTable` from `components/index.js`

## 4. Workbench wiring

- [x] 4.1 Add `RecentTimeEntries` to `Dashboard` category in `workbench/nav.js`
- [x] 4.2 Add new `Data` category with `PipelineTable` to `workbench/nav.js`
- [x] 4.3 Add `RecentTimeEntries` demo entry to `workbench/demos/index.jsx` (preview + detail with DemoStage)
- [x] 4.4 Add `PipelineTable` demo entry to `workbench/demos/index.jsx` (preview + detail with DemoStage)

## 5. Verification

- [x] 5.1 Build passes without errors (`npm run build`)
- [x] 5.2 RecentTimeEntries renders correctly in workbench with TASK/DEMAND/PROJECT/HOURS columns
- [x] 5.3 PipelineTable renders with search input, Filter By/Export buttons, link cells with chevrons, and row actions
- [x] 5.4 All new components visible in workbench sidebar under correct categories
