## ADDED Requirements

### Requirement: DescriptionList renders labeled content pairs
DescriptionList SHALL accept an `items` prop (array of `{ label, value }` objects) and render them as a `dl` element with `dt` (label) and `dd` (value) pairs.

#### Scenario: Basic rendering
- **WHEN** `items=[{label:'Client Profile', value:'Acme Health Systems...'}]` is passed
- **THEN** a `dl` is rendered with a `dt` for "Client Profile" and `dd` for the value text

#### Scenario: Multiple items
- **WHEN** multiple items are provided
- **THEN** each label/value pair renders as a `dt`/`dd` group in order

### Requirement: Labels render as uppercase
The `dt` element SHALL render with uppercase text transform and a muted, semibold typographic treatment using CSS tokens.

#### Scenario: Label styling
- **WHEN** DescriptionList renders
- **THEN** `dt` elements use `text-transform: uppercase`, `font-weight: var(--font-weight-semibold)`, and a muted color

### Requirement: DescriptionList accepts ReactNode values
The `value` in each item SHALL accept either a string or ReactNode, allowing rich content (bold text, links, nested elements) inside the `dd`.

#### Scenario: String value
- **WHEN** a plain string value is provided
- **THEN** it renders as text inside `dd`

#### Scenario: ReactNode value
- **WHEN** a JSX element is provided as value
- **THEN** it renders inside `dd` without modification
