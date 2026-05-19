## ADDED Requirements

### Requirement: SideNavNotificationButton renders an icon trigger
SideNavNotificationButton SHALL render an icon-only button suitable for the sidebar header notification affordance. It accepts `icon`, `unread`, `ariaLabel`, `onClick`, and `disabled` props.

#### Scenario: Default notification button
- **WHEN** an icon and `ariaLabel="Notifications"` are provided
- **THEN** an icon-only button renders with that accessible name

### Requirement: SideNavNotificationButton supports unread state
SideNavNotificationButton SHALL render a small unread indicator dot when `unread={true}`.

#### Scenario: Unread notification
- **WHEN** `unread={true}` is provided
- **THEN** a 6px unread dot renders near the icon

#### Scenario: No unread notification
- **WHEN** `unread` is false or omitted
- **THEN** no unread dot renders

### Requirement: SideNavNotificationButton supports interaction states
SideNavNotificationButton SHALL support hover, focus-visible, and disabled states using CSS tokens.

#### Scenario: Disabled notification button
- **WHEN** `disabled={true}` is provided
- **THEN** the button is not interactive and renders disabled styling
