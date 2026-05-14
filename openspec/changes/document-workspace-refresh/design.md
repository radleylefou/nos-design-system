## Context

The Figma node `242:1688` contains a full NOS Scope screen. This proposal focuses on the central document area: breadcrumb/back row, Solution Definition page header, document tabs, two document sections, outcome rows, quantified metric cards, and the AI Actions bar. The right side panel and left navigation are out of scope for this change.

Current document primitives exist in `components/` and were introduced by the active `document-view-components` change. They are useful, but the Figma frame now shows stronger structure and a more specific visual language:

- Header area uses a 1000px content column, title/subtitle on the left, and metadata/status on the right.
- Tabs sit in a 40px row with a bottom divider and 24px item gap.
- Document sections use a neutral-50 tinted outer shell, 16px radius, 4px inset padding, 52px header row, and a white 14px-radius body.
- Status badges are mixed-case, 14px, outlined, and soft-filled.
- Content uses 10px uppercase labels, 14px body copy, 32px metric values, 12px metric supporting text, and 14px deltas.

## Goals / Non-Goals

**Goals:**

- Capture the updated Figma anatomy as OpenSpec requirements before implementation.
- Keep components presentational and shared from `components/`.
- Preserve existing token discipline: CSS custom properties only, no hardcoded values in component CSS.
- Prefer updating existing Document components when the component meaning is the same.
- Add new primitives only where the Figma pattern is materially distinct, such as metric cards and outcome rows.

**Non-Goals:**

- Implement the right-side assistant panel from the Figma frame.
- Implement page routing, persistence, document editing logic, or AI behavior.
- Add a new typography scale unless implementation proves the current token scale cannot reproduce the design acceptably.
- Duplicate these components inside the workbench.

## Decisions

### D1: Refresh existing Document primitives instead of creating a parallel document kit

`PageHeader`, `PageTabs`, `StatusPill`, `DocumentSection`, `SectionHeader`, `DescriptionList`, and `AssistBar` already express most of the intended component semantics. Implementation should evolve those components rather than introduce duplicate names such as `ScopePageHeader` or `SolutionSection`.

**Alternative considered:** Create separate scope-specific components. Rejected because this repo is the cross-app design system, and scope-specific names would make reuse harder.

### D2: Keep lifecycle badges under the existing status concept

The Figma badges are visually different from the current `StatusPill` implementation, but their job is the same: communicate lifecycle state. Prefer refreshing `StatusPill` to the new outlined, mixed-case style. If broader badge needs emerge, `StatusPill` can later become a thin wrapper over a generic `Badge`.

**Alternative considered:** Add `Badge` immediately. Deferred because no generic badge component exists today and this change only proves lifecycle badges.

### D3: DocumentSection becomes a nested shell

The Figma section is not a normal card. It has a tinted parent surface, a distinct header zone, and an inset white body surface. The component should support that structure directly while still accepting slots for custom content.

**Alternative considered:** Compose a `Card` inside `DocumentSection`. Rejected because there is no generic Card component in this repo now, and the nested structure is specific enough to document sections to belong in the component.

### D4: Snap off-scale Figma type sizes to the current typography scale

Figma shows 23px title text and 13px AI action text. The token scale already covers strong design-system type steps: 10, 12, 14, 16, 18, 20, 24, 32, 40, 48. Use `--font-size-2xl` for the page title, `--font-size-sm` for tabs/body/badges/actions, `--font-size-xs` for metric labels/supporting copy, `--font-size-2xs` for section micro-labels, and `--font-size-3xl` for metric values.

**Alternative considered:** Add `--font-size-13` and `--font-size-23`. Rejected as one-off sizes that would weaken the scale and diverge from solid design-system practice.

### D5: MetricCard should be document-specific for now

The metric cards here differ from dashboard metrics: they sit inside document body content, use a white bordered 14px-radius surface, and pair a 32px value with optional inline delta and 12px supporting copy. Name the component `DocumentMetricCard` unless implementation reveals a broader metric primitive.

### D6: AssistBar should gain a surface variant

The prior AssistBar is an inline muted action group. The Figma frame uses a success-tinted 38px row with icon, label, brand action links, and dividers. Add a `surface="success"` or `tone="ai"` style while keeping the plain inline mode available if existing demos depend on it.

## Risks / Trade-offs

- **Active spec overlap**: Existing document requirements are in an active, completed change rather than archived specs. Creating this as a separate change means some requirement language may overlap. Mitigation: keep capability names focused on the refreshed workspace patterns and archive/merge cleanly when ready.
- **Pixel fidelity vs token purity**: Snapping 23px and 13px to existing tokens may slightly differ from Figma. Mitigation: verify in browser screenshots before implementation is marked complete; add role tokens only if the browser result is visibly off.
- **Component API churn**: Refreshing existing components may change demos or consumers. Mitigation: preserve existing prop names where possible and add optional slots/variants rather than replacing APIs abruptly.
- **Status color mapping**: Figma uses dataviz amber/orange values for status badges. Mitigation: map badges through existing semantic/dataviz tokens and avoid local hex values.

## Migration Plan

1. Add or refresh specs under this change.
2. Implement component changes in `components/` using existing tokens.
3. Export any new components from `components/index.js`.
4. Add workbench demos and verify the components appear in the Document/Feedback categories.
5. Run `npx openspec validate document-workspace-refresh`, `npm run build`, and browser screenshot checks.

## Open Questions

- Should `StatusPill` remain the public component name after the visual refresh, or should it become `LifecycleBadge` with `StatusPill` exported as a compatibility alias?
- Should the AI action row be a variant of `AssistBar`, or should it be a separate `AIActionBar` component to avoid stretching the existing AssistBar API?
- Should `DocumentMetricCard` later become a generic `MetricCard` shared with dashboards once more examples exist?
