## 1. DemoStage — white only + fullWidth

- [x] 1.1 Update `workbench/demos/DemoStage.jsx` — remove dark surface; render single white surface; add `fullWidth` prop that stretches surface to 100% container width with `overflow-x: auto`
- [x] 1.2 Update `workbench/demos/DemoStage.css` — remove dark surface styles; add `.demo-stage__surface--full-width` rule

## 2. TableHeader component

- [x] 2.1 Create `components/TableHeader.jsx` — title (required), subtext (optional), search config `{ value, onChange }` (optional), actions array `[{ label, icon?, onClick }]` (optional); renders brand-50 bg header with search left, actions right
- [x] 2.2 Create `components/TableHeader.css` — header container, title/subtext block, search field (icon + input + kbd badge), action buttons (ghost style)
- [x] 2.3 Export `TableHeader` from `components/index.js`

## 3. Refactor tables to use TableHeader

- [x] 3.1 Refactor `components/RecentTimeEntries.jsx` — replace inline card-header markup with `<TableHeader title={title} actions={onViewAll ? [{ label: 'View All', icon: <ArrowUpRight />, onClick: onViewAll }] : []} />`; remove no-longer-needed header markup and icons from this file
- [x] 3.2 Remove outer-header styles from `components/RecentTimeEntries.css` (now owned by TableHeader)
- [x] 3.3 Refactor `components/PipelineTable.jsx` — replace inline toolbar markup with `<TableHeader search={onSearch ? { value: searchValue, onChange: onSearch } : undefined} actions={[...filterBy, ...export buttons]} />`; remove no-longer-needed toolbar markup and icons from this file
- [x] 3.4 Remove toolbar styles from `components/PipelineTable.css` (now owned by TableHeader)

## 4. Workbench nav restructure

- [x] 4.1 Update `workbench/nav.js` — rename Dashboard→Metrics, add DashboardCard; rename Data→Tables with components: `['TableHeader', 'TableCell', 'TableExamples']`

## 5. Workbench demo entries

- [x] 5.1 Add `DashboardCard` demo entry to `workbench/demos/index.jsx` — import DashboardCard; show variants: minimal (title only), with chevron/expand/more actions, with custom children
- [x] 5.2 Add `TableHeader` demo entry to `workbench/demos/index.jsx` — show: title only, title+subtext, with search, with actions, fully loaded (all options)
- [x] 5.3 Add `TableCell` compound demo entry to `workbench/demos/index.jsx` — show all five variants: TableCellText, TableCellSubtext, TableCellIcon, TableCellLink, TableCellActions; each labeled
- [x] 5.4 Add `TableExamples` compound demo entry to `workbench/demos/index.jsx` — show PipelineTable (fullWidth DemoStage, all callbacks) and RecentTimeEntries (fullWidth DemoStage) together on one page
- [x] 5.5 Remove `PipelineTable` and `RecentTimeEntries` as top-level DEMOS entries (content moved to TableExamples)

## 6. Verification

- [x] 6.1 Build passes without errors (`npm run build`)
- [x] 6.2 Workbench shows Metrics category with DashboardCard, NeedsAttention, WeeklyPacing, MonthlyGlance
- [x] 6.3 Workbench shows Tables category with TableHeader, TableCell, TableExamples
- [x] 6.4 TableExamples page renders PipelineTable and RecentTimeEntries at full width on white
- [x] 6.5 DemoStage renders only white surface across all existing demos
- [x] 6.6 No console errors or React warnings from current code (HMR history log contains old intermediate-state warnings only)
