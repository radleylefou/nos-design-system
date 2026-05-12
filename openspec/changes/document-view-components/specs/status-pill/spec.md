## ADDED Requirements

### Requirement: StatusPill renders lifecycle state
StatusPill SHALL render a compact badge indicating an object's lifecycle state. It accepts a `variant` prop with values: `draft`, `in-progress`, `reviewed`, `approved`, `pending`. Each variant maps to a distinct visual tone using semantic color tokens.

#### Scenario: Draft variant
- **WHEN** `variant="draft"` is set
- **THEN** the pill renders with neutral background and muted text, no semantic color

#### Scenario: In-progress variant
- **WHEN** `variant="in-progress"` is set
- **THEN** the pill renders with warning-toned background and text

#### Scenario: Reviewed variant
- **WHEN** `variant="reviewed"` is set
- **THEN** the pill renders with info-toned background and text

#### Scenario: Approved variant
- **WHEN** `variant="approved"` is set
- **THEN** the pill renders with success-toned background and text

#### Scenario: Pending variant
- **WHEN** `variant="pending"` is set
- **THEN** the pill renders with neutral muted background and text

### Requirement: StatusPill uses token-based styling
StatusPill SHALL use only CSS custom properties for all colors, spacing, and typography. No hardcoded hex values.

#### Scenario: Token compliance
- **WHEN** the component is rendered
- **THEN** all CSS values reference `var(--*)` tokens

### Requirement: StatusPill accepts a custom label
StatusPill SHALL accept a `label` prop that overrides the default display text derived from the variant name.

#### Scenario: Custom label
- **WHEN** `label="Under Review"` is provided alongside `variant="reviewed"`
- **THEN** the pill displays "Under Review" rather than "Reviewed"
