# Spec — WeeklyPacing

## Purpose

Dashboard card showing a user's current week hours against target. Displays a segmented bar chart, projection, and an AI-generated insight.

## Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | string | no | `"Weekly Pacing"` | Card header label |
| `value` | string | yes | — | Current logged hours display, e.g. `"26.5h"` |
| `target` | string | yes | — | Target label shown right-aligned, e.g. `"40h logged"` |
| `loggedCount` | number | yes | — | Number of filled (logged) bars in the pacing chart |
| `totalCount` | number | yes | — | Total number of bars (filled + remaining) |
| `projected` | string | no | — | Projected total label, e.g. `"41.2h"` |
| `targetDayLabel` | string | no | — | Target day label, e.g. `"Wed"` |
| `insight` | object | no | — | `{ prefix, emphasis, suffix }` — mixed-weight insight text |
| `onViewReport` | func | no | — | If provided, renders "View Report" link in insight row |
| `onTitleClick` | func | no | — | Passed to DashboardCard; renders chevron |
| `onExpand` | func | no | — | Passed to DashboardCard |
| `onMore` | func | no | — | Passed to DashboardCard |

## Inner layout (inside DashboardCard white card)

### Hero row

- Left: `value` — 32px medium, `--color-neutral-700`, line-height 1.4
- Right: `target` — 12px regular, `--color-neutral-500`, line-height 1.4
- Items vertically centered (`align-items: center`)

### Pacing bar

Three zones in a single flex row, gap 4px, height 34px:

1. **Logged bars** — `loggedCount` bars, each `flex: 1 0 0`, `min-width: 3px`, `background: --color-brand-500`, `border-radius: 4px`
2. **Today marker** — 1 bar, fixed `width: 28px`, `background: #57c99d` (no exact token; use literal), `border-radius: 4px`
3. **Remaining block** — 1 bar, `flex: 2 0 0`, `background: --color-neutral-200`, `border-radius: 4px`

### Meta row

- Left: `"Projected: " + projected` — 12px regular, `--color-neutral-500`
- Right: `"Target line at " + targetDayLabel` — 12px regular, `--color-neutral-500`
- Only renders if either prop is provided

### Divider

`border-bottom: 1px solid --color-brand-100` — separates bar section from insight row

### Insight row

- Left: sparkle SVG icon (14×14) + insight text
  - Insight text: `prefix` in `--color-neutral-500`, `emphasis` in `--color-neutral-700` medium, `suffix` in `--color-neutral-500`
  - All 12px, line-height 1.4
- Right: `"View Report"` — 12px regular, `--color-neutral-500` — only renders if `onViewReport` provided; clicking calls `onViewReport`

## Sparkle icon

Inline SVG of the four-point star (✦) shape matching the Figma asset. Color: `--color-brand-400`.

## Visual spec (inner card)

- Inner card padding: `var(--spacing-3) var(--spacing-3) var(--spacing-3)` top/sides, `var(--spacing-3)` bottom
- Hero row margin-bottom: `var(--spacing-1)`
- Pacing bar margin-bottom: `var(--spacing-2)`
- Meta row margin-bottom: `var(--spacing-3)` (before divider)
- Divider margin-bottom: `var(--spacing-3)`
- Insight row: no extra margin
