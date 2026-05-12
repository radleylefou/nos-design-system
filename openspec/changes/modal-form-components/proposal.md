## Why

The NOS design system now has form controls and dashboard/table primitives, but it lacks the overlay and modal form primitives needed to build the Time Entry interaction shown in Figma. Adding these components gives downstream NOS apps a reusable, token-driven way to compose modal workflows without duplicating shell, field layout, callout, or choice-pill patterns.

## What Changes

- Add a reusable `Overlay` scrim component based on the Figma modal wrapper.
- Add `ModalShell` and `Modal` components for centered dialog surfaces with header, close action, body, and footer regions.
- Add a `Callout` feedback component for compact inline guidance such as the green task-routing message.
- Add `Field` and `FieldRow` layout primitives for consistent form labels, helper/error text, and responsive field grouping.
- Add a `ChoiceGroup` pill-radio component for groups such as Entry Type.
- Add token support for modal radius, overlay scrim, callout success background, and modal shadow.
- Register all components in `components/index.js`, add workbench categories, and add demos including a full Time Entry modal composition.

## Capabilities

### New Capabilities

- `overlay`: Interaction-blocking page scrim that centers overlay content.
- `modal`: Modal shell and composed modal dialog for NOS workflows.
- `callout`: Compact inline feedback/guidance message box.
- `field-layout`: Shared field label/helper wrapper and responsive field rows.
- `choice-group`: Single-select outlined pill group for form choices.

### Modified Capabilities

<!-- none -->

## Impact

- New files in `components/`: Overlay, Modal, Callout, Field, FieldRow, ChoiceGroup.
- `tokens/tokens.json` and generated `tokens/tokens.css` gain modal/overlay/callout support tokens.
- `components/index.js`, `workbench/nav.js`, and `workbench/demos/index.jsx` are updated so components are exported and documented.
- No external dependencies, routing changes, or TypeScript files.
