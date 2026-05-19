## Why

NOS components currently use scattered color-only transitions, with a few raw timing values and no explicit reduced-motion contract. A small, token-driven motion layer would make shared design-system components feel more responsive while preserving the precise, grounded NOS aesthetic.

## What Changes

- Introduce a restrained motion contract for NOS design-system components only.
- Add semantic motion tokens for feedback, state, entry, and exit timing so component CSS does not use ad hoc timing or `ease`.
- Specify smooth, subtle animation properties per target component, including allowable transforms, opacity changes, and transition properties.
- Apply purposeful micro-interactions to selected interactive components: Button, form controls, PageTabs, SegmentedControl, ChoiceGroup, Checkbox, Overlay, Modal, side navigation primitives, and lightweight action affordances.
- Require `prefers-reduced-motion` behavior for all component animations.
- Exclude decorative page-load animation, workbench-only animation, external animation dependencies, and motion on static document content.

## Capabilities

### New Capabilities

- `nos-motion-system`: Shared motion tokens, accessibility rules, and component-level motion requirements for the NOS design system.

### Modified Capabilities

- None.

## Impact

- Affected source: `tokens/tokens.json`, generated `tokens/tokens.css`, and selected `components/*.css` files.
- No changes to component public APIs are expected.
- No new runtime dependencies are expected.
- Workbench files are out of scope except for passively rendering the real design-system components during verification.
