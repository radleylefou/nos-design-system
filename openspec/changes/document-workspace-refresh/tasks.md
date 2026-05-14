## 1. Specification And Token Decisions

- [x] 1.1 Validate this proposal against the Figma central frame and update requirements if new central-area details are discovered.
- [x] 1.2 Confirm no new typography scale tokens are needed after browser visual review.
- [x] 1.3 Map all badge, section, metric, tab, and AI action colors to existing CSS custom properties.

## 2. Header And Navigation Components

- [x] 2.1 Refresh `PageHeader` to support left title/subtitle content with right-aligned metadata, status, and action slots.
- [x] 2.2 Add breadcrumb/back affordance support either as a new `DocumentBreadcrumbs` component or an optional header companion.
- [x] 2.3 Refresh `PageTabs` spacing, active color, underline, and divider treatment to match the document workspace tab bar.
- [x] 2.4 Update Document workbench demos to show the full header plus tab pattern using placeholder names.

## 3. Badge And Section Components

- [x] 3.1 Refresh `StatusPill` or add a lifecycle badge primitive with mixed-case, 14px, outlined badge styling.
- [x] 3.2 Refresh `SectionHeader` to match the 52px document section header with icon/title left and badge/edit action right.
- [x] 3.3 Refresh `DocumentSection` to use the tinted outer shell, 4px inset, white rounded body, and optional footer/body action areas.
- [x] 3.4 Preserve backwards-compatible props where feasible.

## 4. Document Body Primitives

- [x] 4.1 Refresh `DescriptionList` spacing, 10px uppercase label treatment, and 14px body copy for document body content.
- [x] 4.2 Add an outcome/check row primitive for icon + text rows with optional separators.
- [x] 4.3 Add `DocumentMetricCard` with label, value, optional delta, and supporting copy.
- [x] 4.4 Refresh `AssistBar` or add `AIActionBar` for the success-tinted AI Actions row.

## 5. Workbench And Verification

- [x] 5.1 Register all new components in `components/index.js`.
- [x] 5.2 Add or update workbench demos and ensure the components appear under the correct sidebar categories.
- [x] 5.3 Run `npx openspec validate document-workspace-refresh`.
- [x] 5.4 Run `npm run build`.
- [x] 5.5 Verify the updated document workspace in the browser at the local workbench URL.
