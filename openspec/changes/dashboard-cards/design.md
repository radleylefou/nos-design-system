# Design — dashboard-cards

## DashboardCard — thin shell

Option A chosen (exploration session 2026-05-08): thin shell only. Each component fully owns its inner layout.

```
<DashboardCard title="..." onTitleClick onExpand onMore>
  {/* inner card content, full control */}
</DashboardCard>
```

### DOM structure

```
<section class="nos-dc">                          ← brand-50, radius-xl, padding-1
  <header class="nos-dc__header">
    <div class="nos-dc__title-group">
      <h3 class="nos-dc__title">...</h3>
      [<button class="nos-dc__chevron">⌄</button>]  ← only if onTitleClick provided
    </div>
    <div class="nos-dc__actions">
      [<button class="nos-dc__icon-btn">↗</button>]  ← only if onExpand provided
      [<button class="nos-dc__icon-btn">⋯</button>]  ← only if onMore provided
    </div>
  </header>
  <div class="nos-dc__body">                        ← white, radius-lg (~14px), fills rest
    {children}
  </div>
</section>
```

### Token mapping

| Design value | Token |
|---|---|
| Outer bg `#f1f1f9` | `--color-brand-50` |
| Outer radius 16px | `--radius-xl` |
| Outer padding 4px | `--spacing-1` |
| Header padding 10px/12px | `10px var(--spacing-3)` (10px literal, no token) |
| Title `#3a3a4a` 14px medium | `--color-neutral-700`, `--font-size-sm`, `--font-weight-medium` |
| Icon color | inherits from `--color-neutral-700` |
| Inner bg white | `--bg-surface` |
| Inner radius 14px | `--radius-lg` (12px, closest token) |
| Divider `#edebfb` | `--color-brand-100` |

---

## WeeklyPacing — layout

```
┌── nos-dc (DashboardCard, title="Weekly Pacing ⌄") ──────────┐
│  ┌── nos-dc__body (inner white card) ───────────────────────┐ │
│  │  ┌── hero row ──────────────────────────────────────────┐ │ │
│  │  │  26.5h (32px medium)          / 40h logged (12px)    │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌── pacing bar ────────────────────────────────────────┐ │ │
│  │  │  [▐▐▐▐▐▐...26 bars] [■ today 30px] [░ rest 119px]   │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌── meta row ──────────────────────────────────────────┐ │ │
│  │  │  Projected: 41.2h          Target line at Wed        │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ── divider (brand-100) ──────────────────────────────── │ │
│  │  ┌── insight row ───────────────────────────────────────┐ │ │
│  │  │  ✦ You're trending +1.2h over target.  View Report   │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Pacing bar design

- `loggedCount` thin bars (`flex-[1_0_0]`, min-width 3px), color `--color-brand-500`
- 1 "today" square, fixed ~28px, color `#57c99d` (closest: `--color-semantic-success-500` or a literal)
- 1 "remaining" block, `flex-[2_0_0]` or proportional, color `--color-neutral-200`
- Bar track height: 34px; each bar radius: 4px; gap: 4px

### Insight icon

The sparkle `✦` is a custom SVG from Figma (brand AI affordance). Rendered inline as SVG, no external dependency.

### Props

```
title          — string, default "Weekly Pacing"
value          — string  e.g. "26.5h" (hero display)
target         — string  e.g. "40h logged" (right-aligned secondary)
loggedCount    — number  bars filled (drives pacing bar)
totalCount     — number  total bars (filled + remaining)
projected      — string  e.g. "41.2h"
targetDayLabel — string  e.g. "Wed"
insight        — { prefix, emphasis, suffix }  mixed-weight insight string
onViewReport   — callback → renders "View Report" link
onTitleClick   — callback → renders chevron
onExpand, onMore
```

---

## MonthlyGlance — layout

```
┌── nos-dc (DashboardCard, title="Monthly Glance ⌄") ─────────┐
│  ┌── nos-dc__body (inner white card) ───────────────────────┐ │
│  │  ┌── stat row 1 ────────────────────────────────────────┐ │ │
│  │  │  Billable          │  PTO Left                       │ │ │
│  │  │  82%  +4% vs Mar   │  11.5d                          │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ── divider (brand-100) ──────────────────────────────── │ │
│  │  ┌── stat row 2 ────────────────────────────────────────┐ │ │
│  │  │  Active SOWs       │  Expenses • 1 Pending            │ │ │
│  │  │  5                 │  $1,320                          │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Stat cell structure

Each stat: label (12px regular, neutral-500) + value (32px medium, neutral-700) + optional badge.

Badge variants:
- `delta` — inline after value on same baseline. e.g. "+4% vs Mar", color `--color-semantic-success-600`
- `status` — inline after label with bullet separator. e.g. "• 1 Pending", color `--color-semantic-warning-600`

### Props

```
title         — string, default "Monthly Glance"
stats         — Array<{
  label:   string
  value:   string
  badge?:  {
    type:  'delta' | 'status'
    text:  string
    tone:  'success' | 'warning' | 'danger' | 'info'
  }
}>
rows          — number  (default 2, controls divider placement — stats grouped N-per-row)
onTitleClick, onExpand, onMore
```

The `rows` prop controls how stats are split: `rows=2` with 4 stats → 2 stats per row.
