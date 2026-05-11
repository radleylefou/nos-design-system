# Spec — MonthlyGlance

## Purpose

Dashboard card showing key monthly metrics in a 2-column stat grid. Supports optional delta and status badges per stat.

## Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | string | no | `"Monthly Glance"` | Card header label |
| `stats` | array | yes | — | See stat shape below |
| `cols` | number | no | `2` | Stats per row (default 2-column grid) |
| `onTitleClick` | func | no | — | Passed to DashboardCard; renders chevron |
| `onExpand` | func | no | — | Passed to DashboardCard |
| `onMore` | func | no | — | Passed to DashboardCard |

### Stat shape

```
{
  id?:    string                    — used as React key
  label:  string                    — e.g. "Billable"
  value:  string                    — e.g. "82%"
  badge?: {
    type: 'delta' | 'status'
    text: string                    — e.g. "+4% vs Mar" or "1 Pending"
    tone: 'success' | 'warning' | 'danger' | 'info'
  }
}
```

### Badge behaviour

- `delta` badge: rendered inline to the right of the value, baseline-aligned. No bullet. e.g. `82%  +4% vs Mar`
- `status` badge: rendered inline after the label with a bullet separator `•`. e.g. `Expenses • 1 Pending`
- Tone → color mapping:
  - `success` → `--color-semantic-success-600`
  - `warning` → `--color-semantic-warning-600`
  - `danger` → `--color-semantic-error-600`
  - `info` → `--color-brand-500`

## Inner layout (inside DashboardCard white card)

Stats are grouped into rows of `cols` items. Between each row a divider is rendered.

### Stat cell

```
┌── label row ──────────────────────────────────────┐
│  label text  [• status badge text]                 │  ← status badge inline here
└────────────────────────────────────────────────────┘
┌── value row ──────────────────────────────────────┐
│  value text  [delta badge text]                    │  ← delta badge inline here
└────────────────────────────────────────────────────┘
```

- Label: 12px regular, `--color-neutral-500`, line-height 1.4
- Value: 32px medium, `--color-neutral-700`, line-height 1.4
- Delta badge: 14px medium, tone color, baseline-aligned with value, `padding-bottom: 6px` (matching Figma)
- Status badge: 12px regular, tone color; bullet is a plain `·` character

### Row grid

- `display: grid; grid-template-columns: repeat(cols, 1fr); gap: --spacing-4`
- Row padding: `--spacing-3` top and bottom
- Divider between rows: `border-bottom: 1px solid --color-brand-100`
- Last row has no divider (no bottom border)

## Visual spec (inner card)

- Inner card padding: `var(--spacing-2) var(--spacing-3)` top/bottom, sides
- Stat rows: `padding: var(--spacing-3) 0` with `border-bottom` between rows
