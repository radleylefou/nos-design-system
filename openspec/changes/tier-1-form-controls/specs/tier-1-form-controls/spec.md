## ADDED Requirements

### Requirement: Tier 1 form controls available in component library
The system SHALL expose Button, Input, Select, Combobox, Textarea, Checkbox, RadioGroup, Switch, and SegmentedControl via components/index.js and SHALL display them in the workbench under the Actions and Form Controls categories.

#### Scenario: Components appear in workbench
- **WHEN** a user navigates to the Components section of the workbench
- **THEN** they SHALL see an "Actions" category containing Button and a "Form Controls" category containing all other Tier 1 components

#### Scenario: Each component has a workbench demo
- **WHEN** a user clicks any Tier 1 component card
- **THEN** the detail page SHALL show at least one live rendered demo of that component
