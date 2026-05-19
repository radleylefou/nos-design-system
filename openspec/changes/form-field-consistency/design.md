## Context

The Figma modal frame shows form labels at 14px regular, muted foreground, with a consistent gap above controls. The newly added `Field` component matches this direction, while older input components still use 12px medium labels and smaller gaps. The goal is to make the visual relationship consistent without changing how consumers use existing form props.

## Goals / Non-Goals

**Goals:**
- One shared field wrapper relationship for Input, Select, Textarea, Field, FieldRow, and ChoiceGroup compositions.
- Semantic typography colors: `--fg-muted`, `--fg-default`, `--fg-disabled`, and semantic error tokens.
- Preserve existing component props: `label`, `helperText`, `error`, `id`, `disabled`, `size`.
- Add consistent `aria-describedby` to controls when helper or error copy exists.

**Non-Goals:**
- Rebuild all form controls from scratch.
- Change ChoiceGroup or SegmentedControl to own labels.
- Change Checkbox visual structure from inline box + label.
- Add validation behavior or state management.

## Decisions

**Field as source of truth.** Input, Select, and Textarea should import `Field` and delegate label/helper/error rendering to it. This keeps component APIs stable while removing duplicated label/hint markup.

**Field IDs.** `Field` accepts `feedbackId` and uses it for helper/error text. Controls compute a stable feedback id and pass it to both `Field` and `aria-describedby`.

**Color tokens.** Labels and helper copy use semantic foreground variables instead of direct neutral ramp references. Error text uses `--color-semantic-error-600`; field borders can continue using semantic error border colors already present.

**Checkbox alignment.** Checkbox remains structurally distinct because the label is inline with the box. It should still adopt the same vertical gap, helper/error typography, semantic colors, and `aria-describedby`.

## Risks / Trade-offs

- Refactoring Input/Select/Textarea to use Field introduces a component dependency from controls to layout primitives, but the dependency is presentational and local.
- Existing snapshots, if any, may see class names change from `.nos-input__label`/`.nos-input__hint` to `.nos-form-field__label`/`.nos-form-field__feedback`.
