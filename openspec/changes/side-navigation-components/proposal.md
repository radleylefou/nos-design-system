## Why

NOS apps share a consistent left navigation pattern, but the design system does not yet expose reusable side navigation primitives. The Figma `Sidebar` frame (`230:1361`) defines the target shell, item, search, section, notification, and account footer treatments, so this change formalizes them as first-class components before app teams rebuild the pattern ad hoc.

## What Changes

- Add a composed `SideNavigation` shell that renders the fixed-width dark sidebar with header, scrollable section stack, and footer slots.
- Add `SideNavSection` for labeled nav groups such as "Main" and "Platform".
- Add `SideNavItem` for individual navigation rows with icon slot, label, active/default/hover/focus/disabled states, and click/link semantics.
- Add `SideNavSearch` for the 34px search/command trigger shown near the top of the sidebar.
- Add `SideNavNotificationButton` for the header bell affordance with optional unread dot.
- Add `SideNavAccount` for the footer account row with avatar, name, supporting text, and menu affordance.
- Add/update tokens only where current semantic tokens do not cover the Figma values, using the updated brand ramp as source of truth.
- Add workbench documentation and demos for the composed sidebar and each base primitive.

## Capabilities

### New Capabilities

- `side-navigation`: Full side navigation shell and composition rules.
- `side-nav-section`: Labeled grouping primitive for navigation item collections.
- `side-nav-item`: Individual navigation row with icon, label, and interaction states.
- `side-nav-search`: Search/command trigger used inside the side navigation.
- `side-nav-notification`: Header icon button with unread indicator state.
- `side-nav-account`: Footer account/user trigger with avatar and text.

### Modified Capabilities

<!-- none -->

## Impact

- `components/SideNavigation.jsx` / `.css`
- `components/SideNavSection.jsx` / `.css`
- `components/SideNavItem.jsx` / `.css`
- `components/SideNavSearch.jsx` / `.css`
- `components/SideNavNotificationButton.jsx` / `.css`
- `components/SideNavAccount.jsx` / `.css`
- `components/index.js` exports
- `tokens/tokens.json` and generated `tokens/tokens.css` if sidebar-specific semantic tokens are required
- `workbench/nav.js` and `workbench/demos/` entries under a navigation/layout category
- No external dependencies and no routing/state-management additions
