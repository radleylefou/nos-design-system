## ADDED Requirements

### Requirement: SideNavigation renders the NOS sidebar shell
SideNavigation SHALL render a fixed-width vertical navigation shell matching the Figma Sidebar frame: dark brand background, 260px default width, header slot, scrollable content region, and footer/account slot.

#### Scenario: Shell with slots
- **WHEN** `logo`, `notification`, `children`, and `account` are provided
- **THEN** the logo and notification render in the header, children render in the main nav region, and account renders at the bottom

#### Scenario: Children only
- **WHEN** only children are provided
- **THEN** the shell still renders a valid vertical navigation container without header or footer content

### Requirement: SideNavigation uses token-based styling
SideNavigation SHALL use CSS custom properties for all color, spacing, radius, typography, and sizing values. The background SHALL use the updated brand token structure, with `--color-brand-950` as the default background source.

#### Scenario: Token compliance
- **WHEN** SideNavigation CSS is inspected
- **THEN** hardcoded color, spacing, radius, and typography values are not used

### Requirement: SideNavigation exposes navigation landmark semantics
SideNavigation SHALL render a `nav` landmark with an accessible label. The default label SHALL be "Primary navigation" and may be overridden with `ariaLabel`.

#### Scenario: Default accessible label
- **WHEN** `ariaLabel` is omitted
- **THEN** the rendered `nav` has an accessible name of "Primary navigation"

#### Scenario: Custom accessible label
- **WHEN** `ariaLabel="NOS navigation"` is provided
- **THEN** the rendered `nav` uses that accessible name

### Requirement: SideNavigation remains presentational
SideNavigation SHALL NOT perform route matching, API calls, auth lookups, or global state management. Consumers provide active states and callbacks.

#### Scenario: Active state ownership
- **WHEN** a child SideNavItem is active
- **THEN** that state is provided by the consumer, not inferred by SideNavigation
