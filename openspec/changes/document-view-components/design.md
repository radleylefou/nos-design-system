## Context

NOS has three existing layout modes with dedicated components (Dashboard, Data Table, Form/Modal) but no primitives for the Document View pattern — structured, reviewable content organized into sections with lifecycle states. The wireframe for Solution Definition (and similar screens across NOS tools) exposes this gap clearly.

The deleted `StatusPill` component needs restoration. All new components follow the same conventions as the rest of the system: plain JSX, CSS custom properties only, no external dependencies.

## Goals / Non-Goals

**Goals:**
- Deliver a composable set of Document View primitives that work together and independently
- Keep each component presentational — no workflow logic, no status transitions inside the components
- Use semantic HTML throughout (dl/dt/dd for DescriptionList, nav+role for PageTabs, etc.)
- Ensure all new components are workbench-documented with realistic demos

**Non-Goals:**
- Implementing any specific NOS app screen (Solution Definition is the *reference*, not the output)
- Adding edit/inline-editing behavior — components are display-oriented
- Workflow state machine logic (Draft → Reviewed → Approved transitions belong in consuming apps)

## Decisions

### D1: DocumentSection footer as children (not a named prop)
The wireframe shows two different footer flavors: review/approve buttons, and AI action bars. Rather than a `footer` prop slot, the footer is a freeform `footer` prop accepting any React children, separated from body by a divider. This keeps the shell flexible without coupling it to specific action patterns.

**Alternative considered:** Named `actions` prop accepting an array of button configs. Rejected — too prescriptive, breaks for non-button footer content (AssistBar, custom widgets).

### D2: PageTabs as a standalone component, not a SegmentedControl variant
SegmentedControl uses pill/toggle visual language appropriate for compact option switching inside forms. PageTabs uses underline active states and is semantically a `nav` landmark with `role="tablist"`. Different HTML semantics + different visual language = different component.

**Alternative considered:** `variant="tabs"` on SegmentedControl. Rejected — would complicate an already-working component and conflate two distinct UI patterns.

### D3: StatusPill maps variants to semantic tokens
`draft` → neutral (no color emphasis), `in-progress` → warning tone, `reviewed` → info tone, `approved` → success tone, `pending` → neutral muted. This uses existing `--color-semantic-*` tokens, requiring no new token additions.

### D4: SectionHeader is a separate component, not baked into DocumentSection
Some document screens may want a section header without the full card shell (e.g., inline section titles in a long-scroll layout). Keeping them separate makes both more reusable.

### D5: AssistBar uses ghost-link visual treatment, not Button ghost variant
The AI Actions pattern is visually lighter than even a ghost button — it's closer to an inline text link with a distinctive label prefix. Using a dedicated AssistBar component (with `--color-brand-*` or muted neutral text for links) makes this contrast intentional and easy to override without touching Button.

### D6: DescriptionList renders as `dl` / `dt` / `dd`
Semantically correct for labeled content pairs. The `dt` renders as an uppercase label using CSS text-transform; `dd` renders body text. No JavaScript logic needed — purely presentational HTML + CSS.

## Risks / Trade-offs

- **StatusPill variant naming** — "in-progress" vs "inProgress" vs "inprogress" needs to be consistent. Using kebab-case (`in-progress`) aligns with how variants are typically expressed as CSS modifier classes (e.g., `--in-progress`). Risk of inconsistency with other components that use camelCase in JS. → Mitigation: document in JSDoc clearly; the CSS class uses the raw variant string.

- **DocumentSection + SectionHeader coupling** — while they're separate components, in practice they'll almost always be used together. If SectionHeader API changes, DocumentSection demos break. → Mitigation: treat them as a logical unit in documentation; version them together.

- **PageTabs accessibility** — tab bars require `role="tablist"`, `role="tab"`, `aria-selected`, and keyboard navigation (arrow keys). Omitting keyboard nav would be a regression vs. SegmentedControl. → Mitigation: implement full keyboard nav (ArrowLeft/Right, Home/End) in PageTabs.

## Open Questions

- Should `AssistBar` accept a custom label (e.g., "AI Actions:", "Quick actions:") or hardcode the label style and let the consumer pass anything? Leaning toward a `label` prop with default styling.
- Should `PageHeader` accept a `breadcrumb` slot for future use? Probably not for v1 — YAGNI.
