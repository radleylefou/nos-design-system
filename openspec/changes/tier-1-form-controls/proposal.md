## Why

The design system has no foundational form or action components documented in the workbench. The first attempt at this change ported eight components verbatim from the old design system (pre-branch), but the resulting variants (e.g. Button "Super", "Danger", inadequate SegmentedControl, white outline secondary buttons) did not match the actual Figma references. The user explicitly rejected this approach: every Tier-1 component must be built from scratch, grounded only in the design tokens and the provided Figma frames.

## What Changes

- Delete the ported Button, Input, Select, Combobox, Textarea, Checkbox, RadioGroup, Switch components.
- Rebuild the components that are actually grounded in the current Figma frames: Button, Input, Textarea, Select, Checkbox, SegmentedControl.
- Defer Combobox, RadioGroup, Switch to a later tier — they are not yet present in the screens we are designing against.
- Button variants are derived from the screens: `primary` (solid brand), `secondary` (white with brand-tinted border), `ghost`, `soft` (brand-50 background for inline / table actions like "+ Note"), `link` ("View All →" text style). No `danger`, no `super`.
- Button sizes: `sm` (table inline) and `md` (everything else). No `lg`.
- SegmentedControl has a brand-50 outer container (same token as DashboardCard), an active pill with brand-50 surface + brand-500 text + check icon, and inactive pills that are transparent with neutral text + per-option icon.
- Register every new component in components/index.js.
- Add "Actions" and "Form Controls" categories to workbench/nav.js.
- Wire up workbench demos for each new component.

## Capabilities

### New Capabilities

- `tier-1-form-controls`: Foundational action and form input components grounded in the current Figma frames, available in the workbench with demos.

### Modified Capabilities

<!-- none -->

## Impact

- components/: 6 new .jsx + .css files (Button, Input, Textarea, Select, Checkbox, SegmentedControl); 3 deletions (Combobox, RadioGroup, Switch jsx + css).
- components/index.js: 6 exports added, 3 removed.
- workbench/nav.js: "Form Controls" entry trimmed to the 6 grounded components.
- workbench/demos/index.jsx: demo entries rewritten to match the new component APIs and variants.
