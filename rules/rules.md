# NOS Design Rules

Composition and design guidance for anyone building inside or on top of the NOS design system. Keep these in mind whenever you add, modify, or consume a component.

## Principles

1. **Calm by default.** Neutral surfaces and text dominate. Color is a signal, not decoration.
2. **Hierarchy through typography and spacing first**, not through color or shadows. A well-composed view reads clearly in grayscale.
3. **One source of truth.** Every value lives in `tokens.json`. If a design needs a value that doesn't exist, the answer is to extend the token set, never to hardcode.
4. **Components are presentational.** They accept data and callbacks. Product-level concerns (state, routing, data fetching) belong in the consuming app.
5. **Predictable props.** Same prop names mean the same thing across components (`variant`, `size`, `disabled`, `loading`, `leadingIcon`, `trailingIcon`).

## Color use

| Role | Where |
|------|-------|
| Brand accent | Primary actions, selected states, brand moments. Never for body text or large areas. |
| Neutrals | Surfaces, text, borders, hover fills. The default palette for most UI. |
| Success / Warning / Error / Info | Only for their intended semantic meaning — never as decoration. |

If more than ~10% of a screen is saturated with brand color, it's wrong.

## Density and spacing

- Use the 4px spacing scale (`--space-1` through `--space-16`). Never ad-hoc pixel values.
- Default row spacing inside a card or form is `--space-4`.
- Section spacing between blocks of content is `--space-6` to `--space-8`.
- Data tables use `--space-2` vertical padding per row to stay compact.

## Radius

- **6px** (`--radius-md`): buttons, inputs, badges that aren't pill-shaped.
- **8px** (`--radius-lg`): cards, surfaces, panels.
- **12px** (`--radius-xl`): modals, sheets, large overlays.
- **full** (`--radius-full`): pills, avatars, status dots.

Don't mix radii arbitrarily. A card (8px) containing a button (6px) is fine. A card with 12px buttons is not.

## Typography

- Body: `--font-size-md` (14px) at `regular` weight.
- Section titles: `--font-size-sm` uppercase, `semibold`, muted color, tracked slightly wider (see `.wb-section__title`).
- Page titles: `--font-size-3xl` at `semibold`, tight line-height.
- Never use more than three type sizes in a single view.

## Shadows

- `--shadow-xs` / `--shadow-sm`: resting cards, inputs.
- `--shadow-md`: hovered/active interactive cards.
- `--shadow-lg` / `--shadow-xl`: modals, popovers, menus.
- `--shadow-focus`: always on interactive focus states — never rely on outline alone.

Shadows should read as depth, not as decoration. If you can see a shadow at a glance on a static screenshot, it's probably too strong.

## Interaction

- Hover: shift background a single step in the neutral ramp (e.g., `--color-neutral-100`). Do not change text color on hover.
- Focus: always show the 2px brand ring via `--shadow-focus`. This replaces native outlines.
- Active/pressed: go one more step darker than hover.
- Disabled: reduce opacity to `0.55`, set `cursor: not-allowed`. Do not change the component's color entirely.

## Layout patterns

NOS screens fall into four modes. Match the shell components to the mode — don't mix them.

| Mode | When to use | Shell components |
|------|-------------|-----------------|
| **Dashboard** | KPIs, summaries, metric cards | `DashboardCard`, `WeeklyPacing`, `MonthlyGlance` |
| **Data table** | Rows of records, sortable/filterable lists | `PipelineTable`, `TableCell`, `TableHeader` |
| **Document** | Structured content with lifecycle status (proposals, definitions, specs) | `DocumentSection`, `PageHeader`, `PageTabs` |
| **Form / Modal** | Edit mode, input-heavy, transactional | `Field`, `Modal`, `ChoiceGroup` |

Rules:
- Don't use `DashboardCard` for document content. It's metric-chrome, not a content container.
- `SegmentedControl` is for compact toggles inside modals and forms (2–4 options). Use `PageTabs` for document-level navigation (3–7 tabs, underline style).
- `StatusPill` applies to any object with a lifecycle state. Use consistent variant names across all screens: `draft`, `in-progress`, `reviewed`, `approved`, `pending`.
- Document sections use a divider before their footer action row. The footer is freeform children — compose with `Button` (secondary/ghost variants) or `AssistBar` for AI-adjacent actions.

## Composition checklist

Before shipping a new component or pattern:

- [ ] Every visible value is a CSS custom property.
- [ ] Hover, focus, and disabled states exist and match the rules above.
- [ ] The component's JSDoc lists every prop and its type/default.
- [ ] It's exported from `components/index.js`.
- [ ] It appears in the workbench sidebar under the correct category.
- [ ] It works in isolation (no global state or routing required to render it).
