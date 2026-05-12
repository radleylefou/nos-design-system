## ADDED Requirements

### Requirement: Callout renders compact guidance
The `Callout` component SHALL render a compact inline message with optional icon and tone styling.

#### Scenario: Success callout
- **WHEN** `tone="success"` is provided
- **THEN** the callout uses the success background and success icon/text accent colors

#### Scenario: Custom content
- **WHEN** rich children are provided
- **THEN** the callout renders them without stripping inline emphasis
