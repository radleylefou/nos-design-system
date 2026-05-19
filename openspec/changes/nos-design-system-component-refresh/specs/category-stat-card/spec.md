## ADDED Requirements

### Requirement: Category stat card renders a tinted background per category
The CategoryStatCard component SHALL accept a `category` prop (`"neutral" | "success" | "warning" | "info"`) and apply a matching subtle background tint using semantic color tokens. The tint SHALL be light enough to keep body text readable at WCAG AA contrast.

#### Scenario: Success category renders green tint
- **WHEN** `category="success"` is passed
- **THEN** the card background uses the success-50 or equivalent tint token

#### Scenario: Warning category renders orange tint
- **WHEN** `category="warning"` is passed
- **THEN** the card background uses the warning-50 or equivalent tint token

#### Scenario: Neutral category renders no tint
- **WHEN** `category="neutral"` is passed
- **THEN** the card background uses the standard surface token

### Requirement: Category stat card displays title, description, and two stat rows
The CategoryStatCard SHALL accept `title` (bold, ~14px), `description` (muted, ~12px), and two stat objects: `weightedStat` and `totalStat`, each with a `label` and `value`. Stats SHALL be stacked vertically with label above value.

#### Scenario: All fields rendered
- **WHEN** `title`, `description`, `weightedStat`, and `totalStat` are provided
- **THEN** all four pieces of content render in correct typographic hierarchy

#### Scenario: Large monetary values render correctly
- **WHEN** `value` is a formatted string like "$14,589,090"
- **THEN** the value renders at a large size (~24px bold) without truncation

### Requirement: Category stat card displays a count in the title
The CategoryStatCard SHALL accept a `count` prop displayed inline with the `title` in parentheses, e.g. "All Pipeline (65)".

#### Scenario: Count appended to title
- **WHEN** `count={65}` is provided
- **THEN** the rendered title reads "All Pipeline (65)"
