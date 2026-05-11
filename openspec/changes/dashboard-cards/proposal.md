# dashboard-cards

## What

Add two new dashboard summary cards to the NOS design system — `WeeklyPacing` and `MonthlyGlance` — and extract a shared `DashboardCard` chrome component that all dashboard-style cards use. Also bumps `DemoStage` padding and refactors `NeedsAttention` to use the shared shell.

## Why

Three Figma-designed dashboard cards (NeedsAttention, WeeklyPacing, MonthlyGlance) share identical outer chrome — a brand-tinted wrapper, header row with title/icons, and inner white card. Without extraction this chrome would be duplicated across every dashboard component. Extracting it now (3 components in) keeps the system composable and reduces future maintenance surface.

## Scope

1. **DemoStage padding bump** — increase from `--spacing-5` to `--spacing-8`
2. **DashboardCard** — thin-shell chrome component (wrapper + header + inner card slot)
3. **NeedsAttention refactor** — swap hand-rolled chrome for DashboardCard
4. **WeeklyPacing** — pacing bar chart card with hero value, segmented bar, and insight footer
5. **MonthlyGlance** — 2×N stat grid card with delta/status badges

## Out of scope

- Period-selector dropdown (chevron triggers onTitleClick callback; popover/dropdown UI is a future change)
- Dark-mode variants of the components themselves
- Animation or transitions on pacing bar segments

## Affected files

### New
- `components/DashboardCard.jsx` + `.css`
- `components/WeeklyPacing.jsx` + `.css`
- `components/MonthlyGlance.jsx` + `.css`
- `workbench/demos/` — new demo entries for WeeklyPacing and MonthlyGlance

### Modified
- `components/NeedsAttention.jsx` — use DashboardCard
- `components/NeedsAttention.css` — remove outer chrome styles now owned by DashboardCard
- `components/index.js` — add exports
- `workbench/demos/DemoStage.css` — padding bump
- `workbench/nav.js` — add WeeklyPacing, MonthlyGlance to Dashboard category
- `workbench/demos/index.jsx` — add demo entries
