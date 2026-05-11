## ADDED Requirements

### Requirement: DemoStage renders on white surface only
The component SHALL render components on a single white (#ffffff) surface. The dark (neutral-900) surface SHALL be removed entirely.

#### Scenario: Single white surface
- **WHEN** DemoStage renders
- **THEN** exactly one surface container with white background is shown; no dark surface is shown

### Requirement: DemoStage supports fullWidth mode
When `fullWidth` prop is true, the component SHALL render its surface at 100% of the available container width with `overflow-x: auto` to handle wide content like tables. When `fullWidth` is false (default), the component uses its current padded card-centered layout.

#### Scenario: Default layout unchanged
- **WHEN** `fullWidth` is not set or false
- **THEN** component renders in the existing padded centered layout

#### Scenario: fullWidth layout
- **WHEN** `fullWidth={true}` is set
- **THEN** surface stretches to 100% container width; horizontal overflow scrolls rather than clipping

## REMOVED Requirements

### Requirement: DemoStage renders on dual surfaces
**Reason**: NOS apps use white backgrounds throughout; the dark surface test provides no practical value and doubles visual noise in every detail view.
**Migration**: Remove `surface="dark"` or equivalent surface switching from all DemoStage usages. All existing demo entries continue to work; only the dark surface is removed.
