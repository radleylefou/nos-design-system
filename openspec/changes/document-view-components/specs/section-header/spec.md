## ADDED Requirements

### Requirement: SectionHeader renders icon, title, and optional controls
SectionHeader SHALL accept an `icon` slot (ReactNode), a required `title` string, an optional `status` prop (renders StatusPill), and an optional `onEdit` callback (renders an Edit button/link when provided).

#### Scenario: Full header
- **WHEN** `icon`, `title`, `status`, and `onEdit` are all provided
- **THEN** icon, title, StatusPill, and edit action all render in a single row

#### Scenario: Title only
- **WHEN** only `title` is provided
- **THEN** just the title text renders, no icon, no badge, no edit action

#### Scenario: Edit action
- **WHEN** `onEdit` callback is provided
- **THEN** an "Edit" action is rendered; clicking it calls `onEdit`

### Requirement: SectionHeader layout is horizontal, space-between
The icon + title group SHALL be on the left. The status badge + edit action SHALL be on the right. SectionHeader SHALL use a flex row with space-between alignment.

#### Scenario: Layout
- **WHEN** SectionHeader renders with all props
- **THEN** icon and title are left-aligned, badge and edit are right-aligned

### Requirement: SectionHeader title renders as h2 or h3
The `title` prop SHALL render as an `h2` by default. A `level` prop (2 or 3) SHALL allow callers to adjust the heading level for correct document outline.

#### Scenario: Default heading level
- **WHEN** no `level` prop is provided
- **THEN** title renders as `h2`

#### Scenario: Custom heading level
- **WHEN** `level={3}` is provided
- **THEN** title renders as `h3`
