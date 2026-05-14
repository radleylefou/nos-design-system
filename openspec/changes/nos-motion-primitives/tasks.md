## 1. Motion Foundations

- [x] 1.1 Add semantic motion tokens for feedback, state, entry, and exit durations/easings in `tokens/tokens.json`.
- [x] 1.2 Map component CSS to semantic motion tokens instead of raw duration/easing values.
- [x] 1.3 Regenerate `tokens/tokens.css`.
- [x] 1.4 Add a shared `prefers-reduced-motion` fallback for design-system component motion.

## 2. Component Motion

- [x] 2.1 Update `Button.css` with `translateY(1px) scale(0.99)` active feedback and tokenized hover transitions.
- [x] 2.2 Update `Overlay.css` and `Modal.css` with `opacity` entry and modal `translateY(6px) scale(0.995)` entry motion.
- [x] 2.3 Update form-control CSS (`Field`, `Input`, `Textarea`, `Select`, `Checkbox`) with stable focus/error transitions and checkbox checkmark opacity/scale feedback.
- [x] 2.4 Update selection controls (`PageTabs`, `SegmentedControl`, `ChoiceGroup`) with tokenized selected-state transitions that preserve measured layout.
- [x] 2.5 Update side navigation primitives with quiet hover/focus transitions and optional `translateY(1px)` or `scale(0.995)` press feedback.
- [x] 2.6 Update action-only affordances in `DocumentBreadcrumbs`, `DashboardCard`, `AIActionBar`, `AssistBar`, and section edit controls with text/icon color transitions and optional `translateY(1px)` press feedback.

## 3. Verification

- [x] 3.1 Search `components/` and `tokens/` for raw motion values and replace or justify any remaining values.
- [x] 3.2 Verify no static reading components gained default animation.
- [x] 3.3 Run `openspec validate nos-motion-primitives`.
- [x] 3.4 Run `npm run build`.
- [x] 3.5 Verify representative components in the workbench without editing workbench source.
