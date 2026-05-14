## ADDED Requirements

### Requirement: AI action bar renders tinted action row
The AI action bar SHALL render an inline action row with a success-tinted background, optional icon, label, and action links. It SHALL be suitable for placement at the end of document section body content.

#### Scenario: AI action row with two links
- **WHEN** the label `AI Actions:` and two actions are provided
- **THEN** the row renders the icon, label, first action, divider, and second action in a single horizontal row

### Requirement: AI action bar uses brand-colored action links
The AI action bar SHALL use brand text tokens for action links and neutral foreground tokens for the label. It SHALL use existing success background tokens for the tinted surface.

#### Scenario: Link visual treatment
- **WHEN** action links render in the AI action bar
- **THEN** the links use brand color while the row background uses the lightest success token

### Requirement: AI action bar remains presentational
The AI action bar SHALL accept action definitions or children and call provided callbacks without owning AI workflow state, loading state, or persistence.

#### Scenario: Action callback
- **WHEN** a user activates an action link
- **THEN** the component calls the provided callback and does not perform any API request itself
