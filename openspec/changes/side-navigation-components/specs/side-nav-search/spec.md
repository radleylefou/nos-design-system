## ADDED Requirements

### Requirement: SideNavSearch renders a search command trigger
SideNavSearch SHALL render the sidebar search/command trigger with leading icon, label text, and optional shortcut badge. It is a trigger by default, not a text input.

#### Scenario: Search with shortcut
- **WHEN** `label="Search"` and `shortcut="⌘ K"` are provided
- **THEN** the trigger renders the label and shortcut badge

#### Scenario: Search without shortcut
- **WHEN** shortcut is omitted
- **THEN** the trigger renders without a shortcut badge

### Requirement: SideNavSearch matches Figma dimensions
SideNavSearch SHALL render as a 34px-tall field inside the sidebar with 6px radius, white-alpha background, 10px item gap, and shortcut badge styling.

#### Scenario: Default sizing
- **WHEN** SideNavSearch renders in SideNavigation
- **THEN** it visually matches the 240x34 Figma search field rhythm

### Requirement: SideNavSearch supports disabled and focus states
SideNavSearch SHALL support default, hover, focus-visible, and disabled states using CSS tokens.

#### Scenario: Disabled search trigger
- **WHEN** `disabled={true}` is provided
- **THEN** the trigger is not interactive and renders disabled styling

#### Scenario: Focused search trigger
- **WHEN** the trigger receives keyboard focus
- **THEN** it shows a visible focus treatment

### Requirement: SideNavSearch is accessible
SideNavSearch SHALL have a meaningful accessible name and SHALL call `onClick` when activated.

#### Scenario: Activation
- **WHEN** the user clicks or presses Enter/Space on the trigger
- **THEN** `onClick` is called
