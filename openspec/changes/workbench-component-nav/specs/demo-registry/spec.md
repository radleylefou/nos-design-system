## ADDED Requirements

### Requirement: Demo registry maps componentId to render functions
The file `workbench/demos/index.js` SHALL export a plain object `DEMOS` keyed by component name (matching the string used in `COMPONENT_CATEGORIES[n].components`). Each entry SHALL optionally contain `preview` and `detail` render functions.

#### Scenario: Registry exports DEMOS object
- **WHEN** `workbench/demos/index.js` is imported
- **THEN** it exports a named `DEMOS` constant that is a plain object

#### Scenario: Registry starts empty on scaffold
- **WHEN** no components have been built yet
- **THEN** DEMOS is an empty object `{}` and no errors are thrown

### Requirement: Preview function renders a minimal component instance
When provided, the `preview` function for a component SHALL return a JSX element suitable for rendering inside a small fixed-height container. It SHALL be self-contained (no external state, no required context providers beyond what the workbench already provides).

#### Scenario: Preview function returns renderable JSX
- **WHEN** `DEMOS['Button'].preview()` is called
- **THEN** it returns a valid React element that renders without errors

### Requirement: Detail function renders the full component documentation view
When provided, the `detail` function SHALL return the full documentation and demo view shown in level 3 of the component browser. It SHALL include at minimum: a live interactive demo, a props/API table, and usage notes.

#### Scenario: Detail function returns full doc view
- **WHEN** `DEMOS['Button'].detail()` is called
- **THEN** it returns a React element containing the component demo and documentation

### Requirement: Missing registry entries do not cause errors
If a componentId is not present in DEMOS, or if a required function (preview/detail) is missing from an entry, the workbench SHALL render a graceful fallback rather than throwing.

#### Scenario: Missing preview falls back to placeholder
- **WHEN** a card renders for a component not in DEMOS
- **THEN** a placeholder element renders in the preview area, no runtime error

#### Scenario: Missing detail falls back to empty state
- **WHEN** the component detail view is requested for a component not in DEMOS
- **THEN** an empty/stub state renders with the component name visible, no runtime error
