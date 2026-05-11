## ADDED Requirements

### Requirement: Alert item renders colored left-border accent
The AlertItem component SHALL render a row with a 4–6px left border whose color reflects the severity: `error` (red), `warning` (orange), `caution` (yellow). The background SHALL be a light tint of the same semantic color.

#### Scenario: Error severity renders red accent
- **WHEN** `severity="error"` is passed
- **THEN** the left border and background tint use the error semantic color tokens

#### Scenario: Warning severity renders orange accent
- **WHEN** `severity="warning"` is passed
- **THEN** the left border and background tint use the warning semantic color tokens

#### Scenario: Caution severity renders yellow accent
- **WHEN** `severity="caution"` is passed
- **THEN** the left border and background tint use the caution/warning-light semantic color tokens

### Requirement: Alert item displays primary text and subtext
The AlertItem component SHALL accept a `title` prop (primary text, ~14px semibold) and a `subtitle` prop (secondary text, ~12px muted). Both SHALL be rendered in a stacked column layout.

#### Scenario: Title and subtitle rendered
- **WHEN** both `title` and `subtitle` props are provided
- **THEN** title appears above subtitle in a vertical stack

#### Scenario: Subtitle omitted
- **WHEN** only `title` is provided
- **THEN** component renders without a subtitle row and maintains correct height

### Requirement: Alert item supports an optional trailing action
The AlertItem component SHALL accept an optional `action` prop — a `{ label, onClick }` object — which renders a small secondary/ghost Button aligned to the right edge of the row.

#### Scenario: Action button rendered
- **WHEN** `action={{ label: "Log Time", onClick: fn }}` is passed
- **THEN** a button with label "Log Time" appears right-aligned in the row

#### Scenario: No action prop
- **WHEN** no `action` prop is provided
- **THEN** no button is rendered and trailing space collapses
