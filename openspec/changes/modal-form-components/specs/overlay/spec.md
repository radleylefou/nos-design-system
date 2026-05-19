## ADDED Requirements

### Requirement: Overlay renders a centered scrim
The `Overlay` component SHALL render children centered over a full-viewport scrim when `open` is true.

#### Scenario: Open overlay displays content
- **WHEN** `open={true}` and children are provided
- **THEN** the overlay renders a full-viewport scrim
- **AND** centers children horizontally and vertically

#### Scenario: Closed overlay renders nothing
- **WHEN** `open={false}`
- **THEN** no overlay markup is rendered

### Requirement: Overlay supports scrim click callbacks
The `Overlay` component SHALL call `onClick` when the scrim is clicked directly.

#### Scenario: Scrim is clicked
- **WHEN** the user clicks the overlay background
- **THEN** `onClick` is called

#### Scenario: Child content is clicked
- **WHEN** the user clicks inside overlay children
- **THEN** the click does not trigger the scrim callback
