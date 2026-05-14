## ADDED Requirements

### Requirement: Document metric card renders label, value, optional delta, and supporting text
The document metric card SHALL render a small label, prominent value, optional inline delta, and supporting text. It SHALL be presentational and accept content through props.

#### Scenario: Metric card with positive delta
- **WHEN** label, value, delta, and supporting text are provided
- **THEN** the label appears above the value row, the delta appears inline with the value, and supporting text appears below

### Requirement: Document metric card supports cards without delta
The document metric card SHALL render correctly when no delta is provided.

#### Scenario: Metric card without delta
- **WHEN** only label, value, and supporting text are provided
- **THEN** the value row renders without empty delta spacing or placeholder text

### Requirement: Document metric card uses document body surface styling
The document metric card SHALL use a white surface, subtle border, rounded corners, and tokenized padding suitable for placement inside a document section body.

#### Scenario: Metric row inside document section
- **WHEN** three metric cards render in a horizontal row inside a document section
- **THEN** each card has consistent surface, border, radius, and spacing using design tokens

### Requirement: Document metric card uses tabular numeric emphasis
The document metric card SHALL use prominent tokenized type for metric values and support tabular numeric rendering for stable scanability.

#### Scenario: Numeric value display
- **WHEN** metric values such as `$840K`, `88%`, and `+1.3 pts` are rendered
- **THEN** they use the same value typography and align cleanly across cards
