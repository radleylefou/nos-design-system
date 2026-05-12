## Context

The current component registry exports Button, Input, Textarea, Select, Checkbox, SegmentedControl, DashboardCard, NeedsAttention, WeeklyPacing, MonthlyGlance, TableHeader, TableCell primitives, RecentTimeEntries, and PipelineTable. These components need dense, readable enterprise typography rather than an expressive display face.

## Goals / Non-Goals

**Goals:**
- Remove Bitcount Single and the `--font-family-display` token.
- Keep typography rooted in `sans` and `mono` families.
- Make metric values, table labels, helper text, and workbench headings expressible through tokens.
- Remove raw typography values from current components and visible workbench pages where practical.
- Keep the system close to familiar design-system scales used by product UI libraries.

**Non-Goals:**
- Add CSS-in-JS, generated utility classes, or a typography component.
- Change component props or behavior.
- Add new font files or external font dependencies.
- Redesign the visual identity beyond typography token cleanup.

## Decisions

**Family tokens.** Keep only `font-family.sans` and `font-family.mono`. The current NOS surface does not justify a separate display family; large metrics should use the sans stack with tabular numeric rendering where needed.

**Size scale.** Use a product-oriented scale:
- `2xs` 10px for dense badges and tiny labels
- `xs` 12px for captions, helper text, and metadata
- `sm` 14px for controls, table cells, and default UI text
- `base` 16px for body copy
- `lg` 18px for small headings
- `xl` 20px for section headings
- `2xl` 24px for page subheads
- `3xl` 32px for metric values
- `4xl` 40px for page titles
- `5xl` 48px for rare hero/workbench title moments

**Line heights.** Add `none`, `display`, and `snug` so hardcoded `1`, `1.1`, and `1.4` can become tokens. Keep `tight`, `normal`, and `relaxed`, adjusting relaxed to `1.7` for a less loose product-docs rhythm.

**Letter spacing.** Use `normal`, `caps`, and `wide`. `caps` replaces most hardcoded 0.04em uppercase UI labels; `wide` handles stronger section/category labels.

**Documented recipes.** The Tokens page should document recipes, not generate more CSS variables. Recipes should correspond to current component needs: page title, page description, section title, control label, control text, helper text, table header, table cell, table meta, metric value, metric label, and code.

## Risks / Trade-offs

- Changing `4xl` from 36px to 40px can make existing page titles larger. Workbench hero-style text should use `5xl` or constrained layout where needed.
- Removing `display` is a breaking token change for downstream consumers if they already reference `--font-family-display`.
- Some hardcoded numeric values in CSS are not typography tokens, such as icon dimensions and offsets. Those should remain unless they are clearly font-size, line-height, or letter-spacing.
