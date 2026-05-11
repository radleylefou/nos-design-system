## Context

The workbench currently has a flat nav with page-scoped category names ("Dashboard", "Data") and a DemoStage that renders each component on two surfaces (dark + white). As the component library expands, this model doesn't scale — categories need to reflect component type, not where they're used in a product. The DemoStage dark surface is overhead with no practical value for NOS's white-bg apps. Tables need a shared header component so every NOS table gets consistent toolbar patterns without re-implementing them.

## Goals / Non-Goals

**Goals:**
- Rename categories to reflect component type (Metrics, Tables)
- Extract `TableHeader` as a first-class reusable component
- Refactor both table components to use `TableHeader`
- Add `DashboardCard` as a documented page in Metrics
- Replace per-component table nav entries with compound reference pages (TableHeader, TableCell, TableExamples)
- Simplify DemoStage: white surface only, with `fullWidth` mode for tables

**Non-Goals:**
- Changes to component visual design or token usage
- Adding sorting, filtering, or pagination to tables
- Responsive/mobile layout for tables
- Changes to the Tokens, Icons, or Playground workbench sections

## Decisions

### D1: TableHeader as an extracted component, not just documentation
Rationale: Both PipelineTable and RecentTimeEntries already implement a toolbar/header row, but with different markup, different props, and different CSS. Extracting `TableHeader` eliminates duplication and gives future NOS tables a single consistent pattern to adopt. The component is composed by the parent table, not embedded invisibly — making it independently usable and documentable.

The `actions` prop is an array of `{ label, icon, onClick }` objects. This keeps the API declarative and avoids a render-prop pattern for the common case. The search field is a separate opt-in config object `{ value, onChange }` rather than baked into actions, since it has special rendering (icon + input + kbd badge) that differs from a button action.

### D2: DemoStage white-only
Rationale: The dark surface was added to test components against dark page backgrounds. NOS apps are white-bg throughout; the dark surface test is never relevant. Removing it halves the visual noise in every detail view.

The `fullWidth` prop renders the component at 100% of the detail pane width instead of the current ~440px card width. Tables use this. All other components use the default centered/padded layout.

### D3: Compound demo pages for table sub-components
Rationale: TableCell variants (5 types) and table column headers don't need individual nav cards — they're reference material. A single "TableCell" page showing all variants is cleaner. "TableExamples" shows two full tables together so designers/devs can compare them in context.

PipelineTable and RecentTimeEntries are removed from the top-level nav (they're shown on TableExamples) but remain fully exported components — no breaking change to the component API.

### D4: TableHeader owns search + kbd badge rendering
Both PipelineTable and RecentTimeEntries currently implement their own search/header markup. After refactor, TableHeader owns this entirely. PipelineTable passes `search={{ value, onChange }}` and `actions={[...]}` to TableHeader; RecentTimeEntries passes `title` and `actions={[{ label: 'View All', icon: <ArrowUpRight />, onClick }]}`.

## Risks / Trade-offs

- [PipelineTable/RecentTimeEntries refactor] → These components change internally but their public prop APIs stay identical. Mitigation: keep all existing props, just delegate header rendering to TableHeader.
- [TableExamples page is not a standalone component] → The "TableExamples" nav entry maps to a demo-only page (no corresponding component file). Mitigation: clearly name it as a reference page in the demo description; it's a workbench concept, not exported.
- [DemoStage fullWidth affects layout] → Wide tables inside a constrained detail pane may still clip on small screens. Mitigation: wrap the fullWidth surface in `overflow-x: auto`.
