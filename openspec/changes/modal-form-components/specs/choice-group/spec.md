## ADDED Requirements

### Requirement: ChoiceGroup renders single-select pills
The `ChoiceGroup` component SHALL render a group of selectable pill buttons from an options array.

#### Scenario: Selecting an option
- **WHEN** a pill is clicked
- **THEN** `onChange` is called with that option value
- **AND** the active pill is visually selected

#### Scenario: Disabled option
- **WHEN** an option has `disabled: true`
- **THEN** that pill is disabled and cannot be selected

#### Scenario: Radio semantics
- **WHEN** the group renders
- **THEN** it uses radio-group semantics so assistive technology can identify the current selection
