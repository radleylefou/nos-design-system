## ADDED Requirements

### Requirement: SideNavItem renders a single navigation row
SideNavItem SHALL render a 34px-tall row with an optional leading icon and visible label. It accepts `icon`, `label`, `active`, `disabled`, `href`, `onClick`, and `className` props.

#### Scenario: Basic item
- **WHEN** `label="Home"` and an icon are provided
- **THEN** the item renders the icon and label in one horizontal row

#### Scenario: Label only
- **WHEN** no icon is provided
- **THEN** the label still renders with correct alignment

### Requirement: SideNavItem supports link and button semantics
SideNavItem SHALL render as an anchor when `href` is provided and as a button when `href` is omitted.

#### Scenario: Href provided
- **WHEN** `href="/home"` is provided
- **THEN** SideNavItem renders an anchor with that href

#### Scenario: Href omitted
- **WHEN** `href` is omitted
- **THEN** SideNavItem renders a button and calls `onClick` when clicked

### Requirement: SideNavItem exposes active state
SideNavItem SHALL accept an `active` boolean. When active, it uses the Figma active treatment: white-alpha surface, inverse foreground, and current page/accessibility state.

#### Scenario: Active item
- **WHEN** `active={true}` is provided
- **THEN** the item renders with the active background and indicates current state with `aria-current="page"` when link-like

#### Scenario: Inactive item
- **WHEN** `active` is false
- **THEN** the item renders on the dark sidebar background without the active surface fill

### Requirement: SideNavItem supports interaction states
SideNavItem SHALL define default, hover, focus-visible, active, and disabled states using CSS tokens.

#### Scenario: Disabled item
- **WHEN** `disabled={true}` is provided
- **THEN** the item is not interactive and renders with disabled styling

#### Scenario: Keyboard focus
- **WHEN** the item receives keyboard focus
- **THEN** it shows the system focus ring or a sidebar-appropriate tokenized focus treatment
