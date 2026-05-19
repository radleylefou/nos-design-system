## 1. Tokens

- [x] 1.1 Audit current brand token structure and confirm `color.brand.950` maps to the Figma sidebar background
- [x] 1.2 Add semantic side-nav aliases only if they improve readability and reuse
- [x] 1.3 Regenerate `tokens/tokens.css` after any token changes

## 2. SideNavigation shell

- [x] 2.1 Create `components/SideNavigation.jsx` with `logo`, `notification`, `children`, `account`, `ariaLabel`, and `className` props
- [x] 2.2 Create `components/SideNavigation.css` matching the 260px Figma shell and dark brand background
- [x] 2.3 Export `SideNavigation` from `components/index.js`

## 3. SideNavSection

- [x] 3.1 Create `components/SideNavSection.jsx` with `title`, `children`, and optional `className`
- [x] 3.2 Create `components/SideNavSection.css` for section label rhythm and group spacing
- [x] 3.3 Export `SideNavSection` from `components/index.js`

## 4. SideNavItem

- [x] 4.1 Create `components/SideNavItem.jsx` with `icon`, `label`, `active`, `disabled`, `href`, `onClick`, and `className`
- [x] 4.2 Render an anchor when `href` is provided and a button otherwise
- [x] 4.3 Implement default, active, hover, focus-visible, and disabled styling
- [x] 4.4 Export `SideNavItem` from `components/index.js`

## 5. SideNavSearch

- [x] 5.1 Create `components/SideNavSearch.jsx` as a command/search trigger with `label`, `shortcut`, `icon`, `onClick`, and `disabled`
- [x] 5.2 Create `components/SideNavSearch.css` for the 240x34 field and shortcut badge states
- [x] 5.3 Export `SideNavSearch` from `components/index.js`

## 6. SideNavNotificationButton

- [x] 6.1 Create `components/SideNavNotificationButton.jsx` with `icon`, `unread`, `ariaLabel`, `onClick`, and `disabled`
- [x] 6.2 Create `components/SideNavNotificationButton.css` for icon, hover/focus, and unread dot state
- [x] 6.3 Export `SideNavNotificationButton` from `components/index.js`

## 7. SideNavAccount

- [x] 7.1 Create `components/SideNavAccount.jsx` with `avatar`, `name`, `supportingText`, `menuIcon`, `href`, `onClick`, and `disabled`
- [x] 7.2 Create `components/SideNavAccount.css` matching the 70px footer and account text treatment
- [x] 7.3 Export `SideNavAccount` from `components/index.js`

## 8. Workbench documentation

- [x] 8.1 Add a composed Figma-style sidebar demo using all primitives
- [x] 8.2 Add state demos for SideNavItem, SideNavSearch, SideNavNotificationButton, and SideNavAccount
- [x] 8.3 Register new components in `workbench/nav.js` under the correct category

## 9. Verification

- [x] 9.1 Run `npx openspec validate side-navigation-components`
- [x] 9.2 Run `npm run build`
- [x] 9.3 Use browser screenshots to compare the composed demo with the Figma reference
