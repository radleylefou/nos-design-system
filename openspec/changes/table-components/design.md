## Context

The NOS design system currently has dashboard card components (NeedsAttention, WeeklyPacing, MonthlyGlance) using the DashboardCard shell. Two new table patterns from Figma need to be added: a compact time-entry card table and a full-width data grid. Both require shared cell primitives, which introduces a new class of sub-components.

## Goals / Non-Goals

**Goals:**
- Implement `RecentTimeEntries` as a self-contained card table (own chrome, not DashboardCard)
- Implement `PipelineTable` as a full-width data grid with search + toolbar
- Extract 5 reusable cell sub-components usable across both tables
- Wire up workbench demos and nav entries

**Non-Goals:**
- Sorting, pagination, or virtualization (data display only)
- Drag-and-drop row reordering
- Inline editing of cell values
- Responsive/mobile table collapse patterns (desktop-first for now)

## Decisions

### D1: Cell sub-components as separate exported components
Rationale: The user explicitly requested "separate components for cells." Cell components are independently reusable and should be first-class exports, not private internals. Each cell component receives its data as props and renders the appropriate structure.

Alternatives considered: Internal helper functions inside each table — rejected because it prevents reuse across tables and contradicts the explicit request.

### D2: RecentTimeEntries owns its own card chrome (not DashboardCard)
Rationale: RecentTimeEntries has a table that spans edge-to-edge inside the card, with column headers flush to the card body. DashboardCard imposes an inner white card with padding and a rounded inner surface — incompatible with this layout. RecentTimeEntries manages its own `#f8f8fd` header bg, `--color-brand-50` border, and `14px` border-radius.

Alternatives considered: Using DashboardCard and overriding inner padding — rejected because it fights the DashboardCard shell design and creates coupling.

### D3: PipelineTable is a standalone table, not a DashboardCard
Rationale: PipelineTable is a full-width layout component with its own toolbar. It doesn't fit the dashboard card card shell pattern. It uses the same white bg + brand-50 border + 14px radius as RecentTimeEntries but with a search/filter toolbar instead of a title header.

### D4: Column definition as props array
Rationale: Both tables accept `columns` (array of column def objects) and `rows` (array of row data objects) rather than rendering hardcoded columns. This makes the components usable with real data without requiring code changes. Column defs specify `key`, `label`, `width`, and `cellType`.

### D5: Cell type matching via cellType prop
Each column def includes `cellType: 'text' | 'subtext' | 'icon' | 'link' | 'hours' | 'actions'`. The table renders the appropriate cell component based on this type. Row data provides the matching fields.

## Risks / Trade-offs

- [Fixed column widths] → PipelineTable has a 1392px design width; on smaller containers columns may overflow. Mitigation: use `overflow-x: auto` on the table container; explicit widths only on fixed-size columns (ACCOUNT 290px, actions column).
- [Cell type coupling] → Adding a new cell type requires updating the table's rendering switch. Mitigation: keep the switch small and explicit; document the convention.
- [No sorting/filtering UI] → Filter By and Export buttons in PipelineTable are rendered as ghost icon-text buttons but receive `onClick` callbacks only — no built-in behavior. Mitigation: clear prop naming (`onFilterBy`, `onExport`) signals intent without implementing logic.
