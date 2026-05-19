## ADDED Requirements

### Requirement: Lifecycle status badge renders mixed-case status text
The lifecycle status badge SHALL render mixed-case status text such as `Draft`, `In Progress`, `Reviewed`, `Approved`, and `Pending`. It SHALL NOT force uppercase text for document lifecycle badges.

#### Scenario: Draft badge text
- **WHEN** the badge variant is `draft`
- **THEN** the visible label renders as `Draft`

### Requirement: Lifecycle status badge uses outlined soft-fill styling
The lifecycle status badge SHALL render as an inline-flex pill with soft background, visible border, full radius, horizontal padding, and token-based text color. Document status badges SHALL use existing semantic, dataviz, neutral, and brand tokens.

#### Scenario: In-progress badge style
- **WHEN** the badge variant is `in-progress`
- **THEN** it renders with an amber-tinted background, amber border, and amber text using existing tokens

### Requirement: Lifecycle status badge supports label override
The lifecycle status badge SHALL accept a label override for cases where product copy differs from the default variant label.

#### Scenario: Custom label
- **WHEN** variant `pending` and label `Needs Review` are provided
- **THEN** the badge renders `Needs Review` while keeping the pending visual tone
