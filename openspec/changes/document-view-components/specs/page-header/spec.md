## ADDED Requirements

### Requirement: PageHeader renders title and optional metadata
PageHeader SHALL render a page-level header with a required `title` (h1), optional `subtitle` string, optional `status` (renders a StatusPill), and optional `meta` string for contextual info (e.g. "Last edited by Alex · 2h ago").

#### Scenario: Title only
- **WHEN** only `title` is provided
- **THEN** an h1 with the title text is rendered, no other elements

#### Scenario: Full header
- **WHEN** `title`, `subtitle`, `status`, and `meta` are all provided
- **THEN** title (h1), StatusPill, subtitle, and meta string all render in the correct layout

#### Scenario: Status prop renders StatusPill
- **WHEN** `status="in-progress"` is passed
- **THEN** a StatusPill with that variant is rendered adjacent to the title

### Requirement: PageHeader uses semantic heading level
PageHeader SHALL render `title` as an `h1` element. The heading level SHALL NOT be configurable — PageHeader is always a page-level element.

#### Scenario: Heading semantics
- **WHEN** PageHeader is rendered
- **THEN** the title is wrapped in an `<h1>` tag

### Requirement: PageHeader meta is plain text
The `meta` prop SHALL be a plain string rendered as small muted text. It is not interactive.

#### Scenario: Meta display
- **WHEN** `meta="Last edited by George · 3h ago"` is provided
- **THEN** the string is rendered in muted, small text below the subtitle
