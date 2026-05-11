# Spec — DashboardCard shell

## Purpose

Thin chrome wrapper shared by all NOS dashboard summary cards. Provides the outer brand-tinted container, header row, and inner white card slot. Does not impose any inner layout.

## Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | string | yes | — | Header label |
| `onTitleClick` | func | no | — | If provided, renders a chevron (⌄) after title; called on chevron click |
| `onExpand` | func | no | — | If provided, renders ↗ icon button in header |
| `onMore` | func | no | — | If provided, renders ⋯ icon button in header |
| `children` | node | yes | — | Content rendered inside the white inner card |
| `...rest` | — | no | — | Spread onto root `<section>` |

## Behaviour

- Chevron button only renders when `onTitleClick` is defined
- Header action icons only render when their corresponding callback is defined
- `children` fills the inner white card with no imposed padding — each consuming component sets its own inner padding

## Visual spec

- Root: `background: --color-brand-50`, `border-radius: --radius-xl`, `padding: --spacing-1`
- Header padding: `10px var(--spacing-3)` (10px literal — no matching token)
- Title: `--font-size-sm`, `--font-weight-medium`, `--color-neutral-700`, `line-height: 1.4`
- Chevron icon: 16×16 SVG, inline, `--color-neutral-700`
- Header actions: flex row, gap `--spacing-3`, color `--color-neutral-700`
- Icon buttons: 16×16, transparent bg, no border, hover opacity 0.7, focus ring via `--shadow-focus`
- Inner card: `background: --bg-surface`, `border-radius: --radius-lg` (12px, closest to design's 14px), fills remaining height with `flex: 1`
