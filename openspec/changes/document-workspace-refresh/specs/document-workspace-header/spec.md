## ADDED Requirements

### Requirement: Document workspace header renders breadcrumbs and back action
The system SHALL provide a document workspace header pattern that can render an optional back action followed by ordered breadcrumbs. Breadcrumb text SHALL support muted ancestors and emphasized current context using typography and color tokens.

#### Scenario: Breadcrumb header
- **WHEN** the header is rendered with a back action and breadcrumb items
- **THEN** the back action appears before the breadcrumb trail and the current breadcrumb is visually emphasized

### Requirement: Document workspace header renders title, subtitle, metadata, and status
The system SHALL render page title and subtitle on the left and optional metadata plus lifecycle status on the right. The layout SHALL allow the right-side metadata/status group to wrap below the title area on narrower containers.

#### Scenario: Full document header
- **WHEN** title, subtitle, last-edited metadata, relative time, and status are provided
- **THEN** the title/subtitle and metadata/status groups render in a single page header region without overlapping

### Requirement: Document workspace header uses existing typography tokens
The system SHALL use existing typography tokens for the document header. Page titles SHALL use the nearest existing title token rather than introducing one-off 23px text.

#### Scenario: Token-aligned title
- **WHEN** the Figma title size is implemented
- **THEN** the component uses `--font-size-2xl` or another existing typography token instead of hardcoded pixel values
