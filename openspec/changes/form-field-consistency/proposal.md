## Why

The modal form primitives introduced a Figma-aligned field label style, but existing Input, Select, Textarea, and Checkbox components still use an older, tighter label/helper relationship. This creates visible inconsistency across form controls in the workbench and downstream NOS apps.

## What Changes

- Make `Field` the canonical label/helper/error wrapper for form controls.
- Refactor Input, Select, and Textarea to render through `Field` while preserving their public props.
- Align Checkbox label, helper, error, spacing, and color tokens with the shared field relationship.
- Replace old form label color usage with semantic foreground tokens.
- Improve helper/error accessibility by wiring `aria-describedby` consistently.
- Update demos only as needed to reflect the unified spacing and typography.

## Capabilities

### New Capabilities

<!-- none -->

### Modified Capabilities

- `form-field-consistency`: All form controls share the same label/control/helper/error relationship.

## Impact

- `components/Field.jsx` and `Field.css`
- `components/Input.jsx`, `Select.jsx`, `Textarea.jsx`, `Checkbox.jsx`
- `components/Input.css`, `Checkbox.css`
- No component API removals and no new dependencies
