## ADDED Requirements

### Requirement: Field wraps labels, controls, and feedback
The `Field` component SHALL render an associated label, arbitrary control children, and optional helper/error text.

#### Scenario: Error text overrides helper text
- **WHEN** `error` and `helperText` are both provided
- **THEN** error text renders in the feedback slot
- **AND** the field is marked as invalid for styling

### Requirement: FieldRow creates responsive form grouping
The `FieldRow` component SHALL arrange child fields in columns on wide viewports and stack them on narrow viewports.

#### Scenario: Two-column row
- **WHEN** `columns={2}` and two children are provided
- **THEN** the children render as equal columns on desktop
- **AND** stack on narrow screens
