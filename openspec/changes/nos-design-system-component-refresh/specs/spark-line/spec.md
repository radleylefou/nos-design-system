## ADDED Requirements

### Requirement: SparkLine renders a minimal inline SVG line chart
The SparkLine component SHALL accept a `data` array of numbers and render a proportionally-scaled SVG polyline. It SHALL accept `width` and `height` props (defaults: 88×32) to fit inline in table cells.

#### Scenario: Renders from data array
- **WHEN** `data={[10, 14, 9, 16, 12]}` is passed
- **THEN** a polyline is rendered connecting the proportionally-scaled points

#### Scenario: Renders at custom dimensions
- **WHEN** `width={60}` and `height={24}` are passed
- **THEN** the SVG viewBox matches and the line scales accordingly

### Requirement: SparkLine supports a color prop
The SparkLine SHALL accept a `color` prop (CSS color or token reference) applied to the polyline stroke. Default SHALL be the brand color token.

#### Scenario: Custom color applied
- **WHEN** `color="var(--color-semantic-warning-500)"` is passed
- **THEN** the polyline stroke uses the warning color (as seen in Figma for over-pace burn trends)

### Requirement: SparkLine renders without axes or labels
The SparkLine SHALL render only the line — no axes, gridlines, tick marks, or labels. It is a purely visual sparkline for trend indication.

#### Scenario: No extra chart elements present
- **WHEN** SparkLine renders
- **THEN** the DOM contains only the SVG and polyline — no text, axis, or grid elements
