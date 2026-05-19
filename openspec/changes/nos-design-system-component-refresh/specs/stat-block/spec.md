## ADDED Requirements

### Requirement: StatBlock supports a 2x2 grid layout variant
The StatBlock component SHALL accept a `layout="grid"` prop that arranges up to 4 stat items in a 2-column grid. Each cell renders a label above a large value. This is used in "Monthly Glance"-style dashboard cards.

#### Scenario: Grid layout renders 4 stats in 2 columns
- **WHEN** `layout="grid"` and 4 stat items are passed
- **THEN** items render in a 2×2 grid: 2 per row, label stacked above value

#### Scenario: Grid layout with 2 stats
- **WHEN** `layout="grid"` and 2 stat items are passed
- **THEN** items render in a single row with 2 columns

### Requirement: StatBlock value supports an inline delta badge
Each stat item SHALL optionally accept a `delta` object (`{ value: string, direction: "up" | "down" | "neutral" }`) rendered inline after the primary value in a small colored badge. Positive deltas use success color, negative use error color.

#### Scenario: Positive delta badge rendered
- **WHEN** a stat item has `delta={{ value: "+4% vs Mar", direction: "up" }}`
- **THEN** a small green badge reading "+4% vs Mar" appears inline after the value

#### Scenario: No delta
- **WHEN** no `delta` is provided for a stat item
- **THEN** no badge renders and the value displays alone

### Requirement: StatBlock supports an inline annotation next to a label
Each stat item SHALL optionally accept a `labelAnnotation` string (e.g. "1 Pending") rendered as a small accented text element inline with the label. This is used to surface metadata like pending expense counts.

#### Scenario: Label annotation rendered
- **WHEN** `labelAnnotation="1 Pending"` is passed
- **THEN** the annotation appears inline with the label, visually de-emphasized but colored (e.g. warning or brand)
