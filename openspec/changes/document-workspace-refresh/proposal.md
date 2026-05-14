## Why

The new Solution Definition Figma frame updates the central document workspace beyond the earlier document primitives. NOS needs these patterns captured as specs before implementation so the workbench and downstream apps share one token-aligned source of truth for document authoring, review, and generated content workflows.

## What Changes

- Refresh the document workspace header pattern with breadcrumbs, optional back action, title/subtitle copy, right-aligned metadata, lifecycle badge, and action slots.
- Refresh document tabs to match the Figma underline tab bar: 40px row, 24px item gap, active neutral label, and brand underline.
- Refresh lifecycle status badges from tiny uppercase pills to mixed-case outlined badges used for document states such as `Draft` and `In Progress`.
- Refresh document sections into a two-layer shell: tinted outer section, structured header row, white rounded body, and optional body actions.
- Add document content primitives for uppercase micro-label content blocks and check-list outcome rows.
- Add metric cards for quantified document benefits: label, prominent value, optional positive/negative delta, and supporting copy.
- Refresh AssistBar into the green-tinted AI action row shown in the document body.
- Use existing tokens wherever possible. No new typography scale tokens are proposed at this stage; Figma's 23px title maps to `--font-size-2xl`, and 13px AI/action text maps to the existing `--font-size-sm` or `--font-size-xs` depending on density.

## Capabilities

### New Capabilities

- `document-workspace-header`: Page-level document header, breadcrumb/back affordance, metadata, status, and action-slot behavior.
- `document-tab-bar`: Updated underline tab navigation for document sections.
- `lifecycle-status-badge`: Mixed-case outlined status badge pattern for document lifecycle states.
- `document-section-shell`: Updated nested document section shell with tinted container, header, body, and footer/action areas.
- `document-content-primitives`: Read-only document content blocks, uppercase labels, paragraph copy, and outcome/check rows.
- `document-metric-card`: Quantified benefit card pattern for label/value/delta/supporting text.
- `ai-action-bar`: Success-tinted inline AI action row for generated or assisted document actions.

### Modified Capabilities

- None in `openspec/specs/` yet. Existing document component work is currently represented as an active change, so this proposal adds fresh capability specs that can become the archived source of truth.

## Impact

- Affected components likely include `PageHeader`, `PageTabs`, `StatusPill`, `DocumentSection`, `SectionHeader`, `DescriptionList`, and `AssistBar`.
- New components likely include `DocumentMetricCard` and a small outcome/check row primitive, unless they can be cleanly expressed through existing document primitives.
- Workbench navigation and demos must be updated under Document and Feedback categories.
- Token impact is expected to be minimal. Existing neutral, brand, semantic success, dataviz amber/orange, spacing, radius, and typography tokens cover the Figma frame.
