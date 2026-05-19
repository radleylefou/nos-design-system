## ADDED Requirements

### Requirement: AssistBar renders a labeled row of ghost action links
AssistBar SHALL accept a `label` prop (string, e.g. "AI Actions:") and an `actions` prop (array of `{ label, onClick }` objects). It SHALL render the label followed by the action links in a horizontal row.

#### Scenario: Full render
- **WHEN** `label="AI Actions:"` and `actions=[{label:'Regenerate',...},{label:'Expand with metrics',...}]` are provided
- **THEN** "AI Actions:" label and both action links render in a horizontal row

#### Scenario: Single action
- **WHEN** one action is provided
- **THEN** the label and one action link render

### Requirement: AssistBar visual weight is muted
AssistBar SHALL use muted/subtle color tokens for the label and action links. Links SHALL NOT use the brand accent color by default — they should feel secondary, never competing with primary Button actions.

#### Scenario: Muted appearance
- **WHEN** AssistBar is rendered alongside primary Button components
- **THEN** AssistBar is visually lighter (smaller text, muted color, no border/fill)

### Requirement: AssistBar label defaults to empty string
The `label` prop SHALL be optional. When omitted, no label is rendered — just the action links.

#### Scenario: No label
- **WHEN** `label` prop is omitted
- **THEN** only action links render, no label prefix
