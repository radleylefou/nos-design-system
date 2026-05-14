## ADDED Requirements

### Requirement: SideNavAccount renders account identity
SideNavAccount SHALL render an account trigger row with avatar, primary name, supporting text, and optional menu affordance.

#### Scenario: Full account row
- **WHEN** `avatar`, `name="Maya Ortiz"`, `supportingText="maya.ortiz@nymbl.app"`, and `menuIcon` are provided
- **THEN** all account elements render in a horizontal row matching the sidebar footer rhythm

#### Scenario: Name only
- **WHEN** only `name` is provided
- **THEN** the row renders with the name and no supporting text

### Requirement: SideNavAccount supports trigger semantics
SideNavAccount SHALL render as a button when `href` is omitted and as an anchor when `href` is provided.

#### Scenario: Button account trigger
- **WHEN** `href` is omitted and `onClick` is provided
- **THEN** clicking the row calls `onClick`

#### Scenario: Link account trigger
- **WHEN** `href="/account"` is provided
- **THEN** the row renders as an anchor

### Requirement: SideNavAccount matches Figma footer sizing
SideNavAccount SHALL match the Figma footer treatment: 70px outer footer rhythm, 38px avatar, 8px avatar radius, 14px medium name, and 12px muted supporting text.

#### Scenario: Footer sizing
- **WHEN** SideNavAccount renders inside SideNavigation
- **THEN** it aligns to the bottom footer slot and preserves the measured account row rhythm

### Requirement: SideNavAccount supports disabled and focus states
SideNavAccount SHALL support default, hover, focus-visible, and disabled states using CSS tokens.

#### Scenario: Disabled account trigger
- **WHEN** `disabled={true}` is provided
- **THEN** the trigger is not interactive and renders disabled styling
