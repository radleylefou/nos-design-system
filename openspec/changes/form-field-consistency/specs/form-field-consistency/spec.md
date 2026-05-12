## ADDED Requirements

### Requirement: Form controls share label relationship
Input, Select, Textarea, and composed Field controls SHALL use the same label typography, label color, helper/error typography, and vertical spacing.

#### Scenario: Input and Field labels match
- **WHEN** Input and Field render labels
- **THEN** both labels use the same font-size, font-weight, line-height, color, and control gap

#### Scenario: Select and Textarea labels match
- **WHEN** Select and Textarea render labels
- **THEN** both labels use the same relationship as Field

### Requirement: Form controls use semantic foreground tokens
Form labels, control text, placeholders, helper text, and error text SHALL use semantic foreground or semantic error tokens rather than direct neutral color tokens where a semantic token exists.

#### Scenario: Helper text renders
- **WHEN** helper text is provided
- **THEN** it uses the shared muted foreground treatment

#### Scenario: Error text renders
- **WHEN** error text is provided
- **THEN** it uses the shared error treatment

### Requirement: Feedback text is accessible
Input, Select, Textarea, and Checkbox SHALL associate helper or error text with their control via `aria-describedby`.

#### Scenario: Helper text is provided
- **WHEN** a control has helper text
- **THEN** the control has `aria-describedby` pointing to the helper text id

#### Scenario: Error text is provided
- **WHEN** a control has error text
- **THEN** the control has `aria-invalid`
- **AND** `aria-describedby` points to the error text id

### Requirement: Checkbox aligns with shared field rhythm
Checkbox SHALL preserve its inline box and label layout while matching shared helper/error typography, color, and vertical rhythm.

#### Scenario: Checkbox helper text renders
- **WHEN** Checkbox has helper text
- **THEN** it uses the same feedback typography and color as other fields
