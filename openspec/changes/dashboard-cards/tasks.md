## 1. Quick fixes

- [x] 1.1 Increase the preview container padding in `workbench/demos/DemoStage.css` — change `.demo-stage__surface` padding from `--spacing-5` to `--spacing-8`. This is the neutral/900 and white stage box only; do NOT touch any component internal padding.

## 2. DashboardCard shell

- [x] 2.1 Create `components/DashboardCard.jsx` — section root, header with title/chevron/icons, inner white card slot
- [x] 2.2 Create `components/DashboardCard.css` — outer wrapper, header, icon button, inner card styles
- [x] 2.3 Export `DashboardCard` from `components/index.js`

## 3. Refactor NeedsAttention

- [x] 3.1 Rewrite `components/NeedsAttention.jsx` to use `DashboardCard` for outer chrome; remove hand-rolled header and wrapper
- [x] 3.2 Remove outer chrome styles from `components/NeedsAttention.css` (outer wrapper, header, icon button rules now owned by DashboardCard)

## 4. WeeklyPacing component

- [x] 4.1 Create `components/WeeklyPacing.jsx` using `DashboardCard`; implement hero row, pacing bar (logged/today/remaining), meta row, divider, insight row
- [x] 4.2 Create `components/WeeklyPacing.css`
- [x] 4.3 Export `WeeklyPacing` from `components/index.js`

## 5. MonthlyGlance component

- [x] 5.1 Create `components/MonthlyGlance.jsx` using `DashboardCard`; implement stat grid with `cols`-per-row layout, dividers, delta/status badges
- [x] 5.2 Create `components/MonthlyGlance.css`
- [x] 5.3 Export `MonthlyGlance` from `components/index.js`

## 6. Workbench wiring

- [x] 6.1 Add `WeeklyPacing` and `MonthlyGlance` to the `Dashboard` category in `workbench/nav.js`
- [x] 6.2 Add `WeeklyPacing` demo entry to `workbench/demos/index.jsx` (preview + detail with DemoStage)
- [x] 6.3 Add `MonthlyGlance` demo entry to `workbench/demos/index.jsx` (preview + detail with DemoStage)

## 7. Verification

- [x] 7.1 Build passes without errors (`npm run build`)
- [x] 7.2 NeedsAttention renders identically to before the refactor
- [x] 7.3 WeeklyPacing detail view renders on both neutral/900 and white surfaces via DemoStage
- [x] 7.4 MonthlyGlance detail view renders on both surfaces
- [x] 7.5 All three components visible in workbench under Dashboard category
