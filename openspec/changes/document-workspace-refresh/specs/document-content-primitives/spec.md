## ADDED Requirements

### Requirement: Document content blocks render uppercase micro-labels and paragraph copy
Document content blocks SHALL render uppercase micro-labels above paragraph copy. Labels SHALL use small, tokenized typography with caps letter spacing; values SHALL use body-sized tokenized typography and neutral foreground color.

#### Scenario: Labeled document paragraph
- **WHEN** a content block is rendered with label `Client Profile` and paragraph text
- **THEN** the label renders in uppercase styling above the paragraph copy

### Requirement: Document content blocks preserve source casing while styling labels
Document content blocks SHALL allow author-provided labels in any casing and apply the visual uppercase treatment in CSS.

#### Scenario: Mixed-case label input
- **WHEN** the label prop is `Strategic Value`
- **THEN** the component visually displays uppercase text without requiring the caller to pass uppercase content

### Requirement: Outcome rows render status icon, text, and optional separators
Outcome rows SHALL render an icon slot followed by body text. A list of outcome rows SHALL support separator lines between rows while omitting the trailing separator after the final row.

#### Scenario: Outcome list with four rows
- **WHEN** four outcome rows are rendered
- **THEN** the first three rows have separators and the final row ends cleanly without a trailing divider

### Requirement: Outcome rows use success tokens for positive check states
Outcome rows SHALL use existing success/dataviz green tokens for positive check icons and neutral text tokens for row copy.

#### Scenario: Positive outcome row
- **WHEN** an outcome row renders with a positive status
- **THEN** the icon uses a green token and the copy uses the default document body text token
