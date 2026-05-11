## ADDED Requirements

### Requirement: Card header supports a standardized action icon row
The Card component SHALL accept a `actions` prop — an array of icon button descriptors — rendered right-aligned in the card header. Standard actions from the Figma are `expand` (arrow-up-right) and `overflow` (ellipsis/more). The actions slot SHALL be optional; existing cards without it are unaffected.

#### Scenario: Expand and overflow actions rendered
- **WHEN** `actions={[{ icon: "external", onClick: fn }, { icon: "more", onClick: fn }]}` is passed
- **THEN** two icon buttons appear right-aligned in the card header area

#### Scenario: No actions prop
- **WHEN** no `actions` prop is provided
- **THEN** the card header renders normally with no action icons

### Requirement: Card header supports a dropdown trigger on the title
The Card component SHALL accept a `titleDropdown` boolean prop. When true, a chevron-down icon is rendered inline after the title text, indicating the title is interactive (e.g. for period/scope switching).

#### Scenario: Dropdown indicator shown
- **WHEN** `titleDropdown={true}` is passed
- **THEN** a chevron-down icon appears immediately after the title

#### Scenario: No dropdown indicator
- **WHEN** `titleDropdown` is omitted or false
- **THEN** no chevron appears after the title
