## Why

The NOS design system components need to be brought in line with updated Figma designs for the Home Dashboard, Pipeline Grid, and Pipeline Kanban screens. Several components have drifted from the designs, and new UI patterns (Kanban board, inline alert items, colored category stat cards, budget progress bars, sparkline trends) have been introduced that have no component representation in the system yet.

## What Changes

**Modified components:**
- `Card` — header area gains a standardized action icon row (expand + overflow); content padding tightened to match designs
- `StatBlock` — gains a 2×2 grid variant ("Monthly Glance" layout: label above, large value below, optional delta badge inline)
- `Button` — gains an `xs` size (26px height) for inline row actions like "+ Note"
- `Badge` — gains a `subtle` variant with tinted background for stage probability labels (e.g. "5%", "10%")
- `Table` — rows gain inline action slot (right-aligned buttons/icon buttons); navigable cells gain a chevron-right indicator; column headers standardized to uppercase 11px tracking
- `Progress` — gains a two-segment variant (used + remaining as distinct fills) for budget consumption bars
- `SideNav` — minor: section label spacing and active item treatment verified against designs

**New components:**
- `AlertItem` — a card-body row pattern: colored left-border accent (error/warning/caution), primary text + subtext, optional trailing action button
- `CategoryStatCard` — a summary card with a tinted category-color background, title, description, and two labeled stat values (Weighted / Total); used in the Pipeline header row
- `KanbanBoard` / `KanbanCard` — a scrollable horizontal board layout with stage columns and deal cards (company, date, amount, deal-type tag, assignee)
- `SparkLine` — a minimal inline SVG line chart for burn trend visualization in table cells

## Capabilities

### New Capabilities
- `alert-item`: Colored left-border alert row for surfacing actionable issues in dashboard cards
- `category-stat-card`: Tinted summary card for grouping pipeline opportunities by stage with weighted + total values
- `kanban`: Full kanban board with stage columns, probability headers, and deal cards
- `spark-line`: Minimal inline sparkline for burn trend data in dense table contexts

### Modified Capabilities
- `card`: Header action icons (expand, overflow menu) added as a standard slot
- `stat-block`: 2×2 grid layout variant with inline delta badge
- `button`: New `xs` size added
- `badge`: New `subtle` tinted variant
- `table`: Inline row action slot; navigable cell indicator; uppercase column headers
- `progress`: Two-segment fill variant

## Impact

- `components/Card.jsx` — updated
- `components/StatBlock.jsx` — updated
- `components/Button.jsx` — updated
- `components/Badge.jsx` — updated
- `components/Table.jsx` — updated
- `components/Progress.jsx` — updated
- `components/SideNav.jsx` — minor update
- `components/AlertItem.jsx` — new file
- `components/CategoryStatCard.jsx` — new file
- `components/KanbanBoard.jsx` + `components/KanbanCard.jsx` — new files
- `components/SparkLine.jsx` — new file
- `components/index.js` — all new components registered
- `tokens/tokens.json` / `tokens/tokens.css` — no changes expected; any gaps (e.g. category tint colors) will be added as new semantic tokens
