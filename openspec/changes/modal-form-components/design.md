## Context

The Figma frame `193:6515` is named "Modal Wrapper". It contains a 1700×1000 overlay (`#545464` at 50% opacity) centered around a 700×634 white modal with 20px padding, 20px radius, 16px vertical gap, and a 44px drop shadow. The content is a Time Entry form: title/description/close button, Task/Project mode selector, search select, green callout, entry type pills, Hours + Date field row, textarea, and footer buttons.

## Goals / Non-Goals

**Goals:**
- Implement reusable primitives, not a domain-only Time Entry component.
- Match Figma dimensions and spacing while using NOS tokens.
- Reuse existing Button, Select, Textarea, and SegmentedControl where appropriate.
- Add enough demos for each primitive plus one full Time Entry composition.
- Keep components presentational, prop-driven, and accessible.

**Non-Goals:**
- Add focus-trap or portal infrastructure in this pass.
- Add domain-specific duration parsing, date picker behavior, or task search behavior.
- Add router/state-management dependencies.
- Rebuild existing Input/Select/Textarea APIs.

## Decisions

**Overlay and Modal separation.** Export both low-level `Overlay` and composed `Modal`. `ModalShell` is exported from `Modal.jsx` for apps that need to place shells into custom overlay systems.

**Token additions.**
- `radius.2xl` = 20px for modal surfaces.
- `shadow.modal-soft` mirrors the Figma modal shadow.
- `semantic.overlay.scrim` is the 50% Figma scrim color.
- `semantic.callout.success-bg` captures the green box background.

**Field extraction.** `Field` is a presentational wrapper. Existing controls can keep their current APIs, while advanced forms can use `Field` around composed control groups like ChoiceGroup or custom date controls.

**ChoiceGroup distinct from SegmentedControl.** SegmentedControl is a rail-based switcher for Task/Project. ChoiceGroup is a group of independent outlined pills for Entry Type.

**Workbench composition demo.** The Time Entry demo should prove the primitives together without becoming a shipped domain component. It can use static sample values and existing Button/Select/Textarea/SegmentedControl components.

## Risks / Trade-offs

- Without a focus trap, `Modal` is visually and semantically useful but not a complete app-level dialog manager. This is acceptable for the current design-system primitive pass and should be documented in component JSDoc.
- Adding `Field` means there are temporarily two field-label patterns: existing control-owned labels and the new shared wrapper. Future work can migrate controls incrementally.
- Pixel fidelity is balanced with existing token values for typography and colors; spacing/radius/shadow that were not represented are added as tokens.
