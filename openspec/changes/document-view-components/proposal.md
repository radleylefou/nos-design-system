## Why

NOS tools frequently display structured, reviewable content (proposals, solution definitions, discovery docs) but the design system has no components for this pattern — teams resort to ad-hoc compositions or reuse DashboardCard inappropriately. The Document View pattern needs first-class primitives so it can be built consistently across all NOS apps.

## What Changes

- **Restore `StatusPill`** — deleted in scaffold cleanup; needs to be rebuilt token-aligned with variants: `draft`, `in-progress`, `reviewed`, `approved`, `pending`
- **Add `PageHeader`** — page-level shell: title + optional subtitle + optional StatusPill + optional meta string ("Last edited by…")
- **Add `PageTabs`** — underline-style horizontal tab bar for document navigation (3–7 items); distinct from `SegmentedControl` which is for compact toggles in modals/forms
- **Add `DescriptionList`** — read-only display primitive: pairs of uppercase label + paragraph value; renders as `dl`
- **Add `DocumentSection`** — card shell for document content sections: header area, body children, divider-separated footer children
- **Add `SectionHeader`** — icon slot + title + optional StatusPill + optional edit action; used as the header slot of a DocumentSection
- **Add `AssistBar`** — secondary action row with a label prefix and ghost-style action links; for AI-adjacent or meta actions; visually muted, never competes with primary actions

## Capabilities

### New Capabilities

- `status-pill`: Lifecycle status badge component with semantic tone mapping
- `page-header`: Page-level title/subtitle/meta header shell
- `page-tabs`: Document-navigation tab bar with underline active state
- `description-list`: Read-only labeled content display (dl/dt/dd)
- `document-section`: Card shell for document content sections
- `section-header`: Header row for document sections (icon + title + badge + edit)
- `assist-bar`: Muted secondary action bar with label prefix

### Modified Capabilities

## Impact

- `components/index.js` — 7 new exports
- `workbench/nav.js` — new entries under a "Document" category
- `workbench/demos/` — demo files for each new component
- `rules/rules.md` — Layout Patterns section added (already done)
- No breaking changes to existing components
