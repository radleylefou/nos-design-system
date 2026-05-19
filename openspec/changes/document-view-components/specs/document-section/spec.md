## ADDED Requirements

### Requirement: DocumentSection provides a card shell with three zones
DocumentSection SHALL render a card surface with three zones: a `header` prop slot (top), `children` for the body, and a `footer` prop slot (bottom). A visual divider SHALL separate the footer from the body when a footer is present.

#### Scenario: Header, body, and footer
- **WHEN** `header`, `children`, and `footer` are all provided
- **THEN** the header renders at the top, children in the middle, and footer at the bottom with a divider above it

#### Scenario: No footer
- **WHEN** only `header` and `children` are provided with no `footer`
- **THEN** no divider is rendered and the card ends after the body

#### Scenario: No header
- **WHEN** only `children` are provided
- **THEN** the card renders with body content only

### Requirement: DocumentSection uses card surface styling
DocumentSection SHALL render with a white/surface background, a border using `--border-subtle` or equivalent, and `--radius-lg` (8px) border radius. It SHALL use `--shadow-xs` or `--shadow-sm` at rest.

#### Scenario: Surface appearance
- **WHEN** DocumentSection is rendered
- **THEN** it has a card-like appearance with border, radius, and subtle shadow

### Requirement: DocumentSection does not impose inner layout
The body children area SHALL have consistent padding but no flex/grid layout imposed. Consumers define the inner layout.

#### Scenario: Freeform body
- **WHEN** arbitrary children are passed
- **THEN** they render with padding but no imposed layout constraints
