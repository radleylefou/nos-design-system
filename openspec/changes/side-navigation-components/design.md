## Context

The Figma link was readable through the Figma API. Node `230:1361` resolves to a frame named `Sidebar`, sized `260x1000`, with two top-level children:

- `Sidebar Nav` (`260x580`) containing the logo/bell header, search field, section labels, and nav item groups.
- `Account` (`260x70`) pinned visually at the bottom of the frame.

Important measured values from the frame:

- Sidebar background: `#120D35`, which matches the updated `color.brand.950` token.
- Header: `260x80`, horizontal, padding `24px 20px`, logo at `39.25x34`, bell `16x16`, unread dot `6x6` in amber.
- Search: container width `260`, internal field `240x34`, radius `6px`, padding left `10px`, right `8px`, gap `10px`, fill `white @ 10%`.
- Search shortcut: `29x18`, radius `4px`, padding `2px 4px`, fill `white @ 10%`, stroke `neutral.400`.
- Section labels: `14px/19.6px`, regular, muted `neutral.200`, section label row `52px` tall with `16px 20px` padding.
- Nav groups: vertical, gap `8px`, horizontal inset `10px`.
- Nav items: `240x34`, radius `6px`, gap `10px`, padding left `10px`, right `8px`; active fill `white @ 10%`, default background matches sidebar.
- Nav item labels: `14px/19.6px`, regular, white.
- Account footer: `260x70`, padding `16px`, gap `8px`; avatar `38x38`, radius `8px`; name `14px/19.6px` medium white; email `12px/16.8px` regular muted.

## Goals / Non-Goals

**Goals:**
- Create reusable presentational primitives for NOS app side navigation.
- Preserve Figma dimensions and visual rhythm while expressing values through existing or new CSS custom properties.
- Support data-driven composition in consuming apps without requiring routing libraries.
- Document states for each base primitive: default, active, hover, focus-visible, disabled, and optional unread/user states where relevant.
- Keep icon and logo rendering as slots so downstream apps can use the NOS icon system without this change coupling to a specific icon package.

**Non-Goals:**
- Replacing the workbench authoring sidebar in this change.
- Adding responsive collapse/drawer behavior for mobile.
- Adding router integration or location matching logic.
- Adding popover/menu behavior for the account row or notification button.
- Creating new icon glyphs unless existing icon tokens/components are insufficient during implementation.

## Decisions

### D1: Use a composed shell plus base primitives

`SideNavigation` should provide the 260px dark shell, header/content/footer structure, and slots. `SideNavSection`, `SideNavItem`, `SideNavSearch`, `SideNavNotificationButton`, and `SideNavAccount` remain independently documented so apps can compose custom sidebars without copying CSS.

### D2: Slots over config-only APIs

The shell should accept `logo`, `notification`, `children`, and `account` slots rather than forcing one large config object. This keeps the component presentational and flexible. `SideNavSection` can accept `title` plus children; `SideNavItem` can accept a label and icon slot.

### D3: Items support both button and link semantics

`SideNavItem` should render an anchor when `href` is provided and a button otherwise. Consumers still control navigation behavior with `onClick`, but the design system handles visual state and accessibility attributes.

### D4: Use existing brand and alpha tokens first

The sidebar background maps to `--color-brand-950`. Active/search surfaces map to `--color-white-alpha-10`. Muted text maps to `--color-neutral-200`; shortcut border maps to `--color-neutral-400`; footer/account white text maps to `--fg-inverse`.

If semantic aliases are added, prefer names like `--side-nav-bg`, `--side-nav-item-active-bg`, and `--side-nav-muted-fg` generated from `tokens.json` rather than hardcoded component values.

### D5: Search is a command trigger, not a full Input

The Figma search row is a sidebar command/search launcher with a shortcut badge, not a general text input. `SideNavSearch` should render as a button by default with an accessible label and optional `shortcut` prop. If a real text input is needed later, it should be a separate mode or component.

### D6: Account is a trigger row, not an auth component

`SideNavAccount` displays avatar/name/supporting text and a menu affordance. It does not own user data fetching, auth state, or menu popover behavior. It calls `onClick` or renders as a button/link based on props.

## Risks / Trade-offs

- **Token surface area:** Adding too many side-nav aliases could clutter `tokens.json`. Prefer existing tokens unless a repeated semantic role is hard to read in component CSS.
- **Icon ownership:** Figma references icons by name, but this repo has its own icon token system. Keep icons as ReactNode slots to avoid forcing a dependency.
- **Interaction behavior:** Search, notification, and account are likely to open command palettes or menus in real apps. This pass should expose trigger components only, avoiding global state or popover logic.
- **Workbench duplication:** The current workbench sidebar is an authoring UI with different needs. Do not replace it automatically; document the new side nav separately first.

## Open Questions

- Should `SideNavigation` expose a `width` prop for compact variants, or should v1 hardcode the Figma `260px` width?
- Should the unread notification dot use `color.dataviz.amber.400` or a semantic notification token?
- Should `SideNavSearch` accept `value` and render an input mode now, or stay as a command trigger for v1?
