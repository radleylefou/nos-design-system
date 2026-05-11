## ADDED Requirements

### Requirement: TableHeader renders a title with optional subtext
The component SHALL render a title (14px medium, neutral-700) in the header left area. When `subtext` is provided it SHALL render below the title in smaller dimmer text (12px regular, neutral-500).

#### Scenario: Title only
- **WHEN** only `title` is provided
- **THEN** title renders in the header left area; no subtext line is shown

#### Scenario: Title with subtext
- **WHEN** `title` and `subtext` are provided
- **THEN** title appears on top, subtext below, both left-aligned

### Requirement: TableHeader renders an optional search input
When `search` config is provided, the component SHALL render a search input (240px, 34px tall, brand-100 border, 6px radius) with a search icon on the left and a "/" keyboard shortcut badge on the right.

#### Scenario: Search renders when config provided
- **WHEN** `search={{ value, onChange }}` is passed
- **THEN** search input renders between the title area and the action buttons

#### Scenario: Search absent when not configured
- **WHEN** `search` prop is omitted
- **THEN** no search input is rendered in the header

#### Scenario: Search calls onChange on input
- **WHEN** user types in the search field
- **THEN** `search.onChange(newValue)` is called with the current input string

### Requirement: TableHeader renders variable action buttons
The component SHALL render zero or more action buttons from the `actions` array. Each action renders as a ghost-style button with an optional icon and a text label.

#### Scenario: Actions render in order
- **WHEN** `actions` array has multiple entries
- **THEN** buttons render left-to-right in the provided order on the right side of the header

#### Scenario: No actions renders no buttons
- **WHEN** `actions` is empty or omitted
- **THEN** no action buttons are rendered; header right area is empty

#### Scenario: Action onClick fires
- **WHEN** an action button is clicked
- **THEN** its `onClick` callback is invoked

### Requirement: TableHeader uses brand-tinted surface background
The header container SHALL use `--color-brand-50` as its background color and a 1px `--color-brand-50` bottom border, matching the existing table header pattern.

#### Scenario: Header background
- **WHEN** component renders
- **THEN** the outer container has brand-50 background

### Requirement: TableHeader is used by PipelineTable and RecentTimeEntries
After refactor, both `PipelineTable` and `RecentTimeEntries` SHALL delegate their header rendering to `TableHeader`. The public prop APIs of both components remain unchanged.

#### Scenario: PipelineTable delegates to TableHeader
- **WHEN** PipelineTable renders with `onSearch`, `onFilterBy`, `onExport`
- **THEN** TableHeader receives `search` config and two action entries; toolbar appearance is identical to before refactor

#### Scenario: RecentTimeEntries delegates to TableHeader
- **WHEN** RecentTimeEntries renders with `title` and `onViewAll`
- **THEN** TableHeader receives `title` and one action entry for "View All"; header appearance is identical to before refactor
