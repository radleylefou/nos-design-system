## Context

The project design context describes NOS as precise, considered, and grounded: a light, neutral-heavy internal design system for professional desktop workflows. Motion should support that tone by making component state changes feel immediate and legible, not theatrical.

Current component CSS already has duration tokens (`--duration-instant`, `--duration-fast`, `--duration-base`, `--duration-slow`) and easing tokens (`--easing-standard`, `--easing-accelerate`, `--easing-decelerate`). However, some components still use raw timing or `ease`, there is no reduced-motion utility, and important state changes such as modal entry, button press, tab selection, and checkbox selection are visually abrupt.

## Goals / Non-Goals

**Goals:**

- Define a shared NOS motion contract before implementation.
- Keep animation subtle, fast, and tied to component state.
- Use only CSS custom properties from the token system.
- Prefer `transform`, `opacity`, `background-color`, `border-color`, `box-shadow`, and `color` transitions.
- Respect `prefers-reduced-motion`.
- Keep motion inside `components/` and `tokens/`.

**Non-Goals:**

- Do not animate workbench chrome or demo layout.
- Do not add page-load choreography, scroll-triggered reveals, parallax, confetti, particles, decorative looping animation, or route transitions.
- Do not add animation libraries.
- Do not animate static reading surfaces such as `DescriptionList`, `DocumentMetricCard`, `DocumentOutcomeList`, or document section body copy.
- Do not change component APIs unless implementation proves an animation needs an existing state prop.

## Exploration

### Proposed motion tokens

Implement the motion layer with a small semantic set:

- `--motion-duration-feedback`: `120ms` for immediate press/check/active feedback.
- `--motion-duration-state`: `180ms` for hover, focus, selection, validation, and subtle affordance changes.
- `--motion-duration-entry`: `220ms` for modal and overlay entrance.
- `--motion-duration-exit`: `160ms` for future dismiss/exit states.
- `--motion-easing-standard`: `cubic-bezier(0.25, 1, 0.5, 1)` for most smooth state transitions.
- `--motion-easing-enter`: `cubic-bezier(0.16, 1, 0.3, 1)` for modal entry.
- `--motion-easing-exit`: `cubic-bezier(0.3, 0, 1, 1)` for exit states.

These can either be emitted as new tokens or aliased to the existing duration/easing scale during implementation. Component CSS should consume the semantic names so animation intent is readable.

### Components that should receive motion

- `Button`: hover transitions color, border-color, background-color, and box-shadow over `--motion-duration-state`; active press uses `transform: translateY(1px) scale(0.99)` over `--motion-duration-feedback`. Icon-only buttons use the same press transform. Disabled buttons do not transform.
- `Overlay` and `Modal`: overlay enters with opacity `0 → 1` over `--motion-duration-entry`; modal enters with opacity `0 → 1`, `transform: translateY(6px) scale(0.995) → translateY(0) scale(1)` over `--motion-duration-entry`. No bounce, spring, blur, or overshoot.
- `Checkbox`: box color and border-color transition over `--motion-duration-state`; check icon enters with opacity `0 → 1` and `scale(0.85) → scale(1)` over `--motion-duration-feedback`.
- `Input`, `Textarea`, `Select`, and `Field`: focus and error states transition border-color, box-shadow, color, and background-color over `--motion-duration-state`. Fields must not scale, shake, or move.
- `PageTabs`: tab label color and active underline/border-color transition over `--motion-duration-state`. The row remains 40px tall; underline remains 2px. No content fade or tab-panel animation in this pass.
- `SegmentedControl` and `ChoiceGroup`: selected state transitions background-color, border-color, color, and icon opacity over `--motion-duration-state`. Active press can use `transform: translateY(1px)` on the pressed item only. No moving selection pill unless the existing DOM can support it without layout recalculation.
- `SideNavItem`, `SideNavSearch`, `SideNavAccount`, and `SideNavNotificationButton`: hover/focus transitions color, background-color, and opacity over `--motion-duration-state`; active press uses `transform: translateY(1px)` or `scale(0.995)` only where it does not disturb row alignment. Sidebar item dimensions remain unchanged.
- `Callout`, `AIActionBar`, `AssistBar`, `DocumentBreadcrumbs` back action, `DashboardCard` icon controls, and section edit actions: animate action text/icon color or opacity over `--motion-duration-state`; action press can use `translateY(1px)`. Surfaces do not animate on mount.

### Components that should stay still

- `DescriptionList`, `DocumentMetricCard`, `DocumentOutcomeList`, `PageHeader`, `SectionHeader` title/content, table cell text, and dashboard/metric content should not animate by default because they are reading and scanning surfaces.

## Decisions

### D1: Use tokenized CSS motion only

Motion should live in component CSS and use tokenized durations/easings. No JavaScript animation or new dependencies are needed for this pass.

**Alternative considered:** Add a React animation helper. Rejected because this library is presentational and most desired motion is state-based CSS.

### D2: Add semantic motion aliases for implementation clarity

The existing tokens cover basic motion, but semantic aliases make the difference between feedback, state, entry, and exit behavior explicit. Add the semantic tokens listed above even if some values initially match existing duration/easing values.

**Alternative considered:** Hardcode cubic-bezier values in component CSS. Rejected because this repo requires tokenized styling.

### D3: Reduce motion globally for design-system components

Every new animation must have a reduced-motion fallback. The simplest implementation is a shared `@media (prefers-reduced-motion: reduce)` block in a globally imported token/base stylesheet that neutralizes component transitions and animations.

**Alternative considered:** Add reduced-motion blocks to every component CSS file. Acceptable but more repetitive.

### D4: Motion is feedback, not decoration

Motion should only appear on interaction, selection, validation, or modal entry. Static informational components should remain still.

**Alternative considered:** Add entrance reveals to document sections and cards. Rejected because NOS is a dense work tool and repeated content reveals would slow scanning.

## Risks / Trade-offs

- **Animation fatigue**: Too many hover transforms could make the system feel jumpy. Mitigation: restrict transform feedback to command surfaces and keep movement at 1-2px or very small scale changes.
- **Layout instability**: Animated dimensions would shift dense UIs. Mitigation: do not animate width, height, padding, margin, top, or left.
- **Reduced-motion gaps**: Component-specific keyframes can be missed. Mitigation: add a central reduced-motion rule and verify by searching for all `animation` and `transition` declarations.
- **Token sprawl**: Adding many motion tokens could weaken the system. Mitigation: use a small semantic set only.
- **Over-crisp motion**: Durations below 100ms can feel like a flicker rather than feedback. Mitigation: reserve `80ms` instant timing for reduced motion or very small color changes; default component feedback starts at `120ms`.

## Migration Plan

1. Add or standardize motion tokens in `tokens/tokens.json`; regenerate `tokens/tokens.css`.
2. Add reduced-motion handling in the shared token/base CSS path.
3. Update only the selected design-system component CSS files.
4. Search for raw motion values and replace them with tokens.
5. Run `openspec validate nos-motion-primitives` and `npm run build`.
6. Verify representative components in the workbench without editing workbench source.

## Open Questions

- Should NOS add semantic motion aliases (`--motion-feedback-duration`, `--motion-enter-duration`) or keep using the existing `--duration-*` tokens directly?
- Should modal entry animation require a prop-driven mounted state later, or is initial CSS keyframe entry sufficient for this design-system pass?
