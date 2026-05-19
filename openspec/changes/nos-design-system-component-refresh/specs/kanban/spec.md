## ADDED Requirements

### Requirement: KanbanBoard renders horizontally scrollable stage columns
The KanbanBoard component SHALL accept a `columns` array and render each as a fixed-width vertical column. Columns SHALL scroll horizontally when they overflow the container. Each column SHALL be visually separated.

#### Scenario: Multiple columns rendered
- **WHEN** `columns` contains 4 stage objects
- **THEN** 4 columns are rendered side by side with horizontal scroll when needed

#### Scenario: Empty column renders correctly
- **WHEN** a column has zero cards
- **THEN** the column header still renders and the body is empty

### Requirement: KanbanBoard column header shows stage name, count, and probability
Each column header SHALL display: a probability percentage pill (e.g. "5%"), the stage name (e.g. "Stalled"), and the card count in parentheses (e.g. "(14)"). The header SHALL include an add-card icon button.

#### Scenario: Header content rendered
- **WHEN** a column has `{ probability: 5, label: "Stalled", cards: [...14 items] }`
- **THEN** the header shows "5%", "Stalled (14)", and a "+" button

### Requirement: KanbanCard displays deal summary
The KanbanCard component SHALL accept and display: `company` (bold title), `date` (muted secondary), `amount` (right-aligned), `dealType` (uppercase tag/badge, small), and `assignee` (avatar + name).

#### Scenario: All fields rendered
- **WHEN** a card has all fields populated
- **THEN** company, date, amount, deal type badge, and assignee row all render

#### Scenario: Card is navigable
- **WHEN** the card has an `onOpen` callback
- **THEN** a chevron-right icon appears and clicking the card triggers `onOpen`

### Requirement: KanbanBoard column headers use category-consistent accent colors
Each column's header probability pill and accent SHALL use a color associated with that column's `category` prop, consistent with CategoryStatCard tinting.

#### Scenario: Stalled column uses neutral/muted accent
- **WHEN** a column has `category="neutral"`
- **THEN** the probability pill uses a neutral/muted color scheme

#### Scenario: Discovery column uses info accent
- **WHEN** a column has `category="info"`
- **THEN** the probability pill uses the info color token
