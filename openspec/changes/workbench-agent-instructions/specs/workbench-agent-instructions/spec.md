## ADDED Requirements

### Requirement: Instructions is a top-level workbench area
The workbench SHALL expose a top-level `Instructions` area before `Components` in the primary sidebar.

#### Scenario: Instructions appears in primary navigation
- **WHEN** the workbench sidebar renders
- **THEN** `Instructions` is visible as a primary item before `Components`

#### Scenario: Instructions navigates to the page
- **WHEN** the user selects `Instructions`
- **THEN** the main workbench area renders the Instructions page

### Requirement: Instructions page provides an AppGen starter prompt
The Instructions page SHALL provide a copyable starter prompt that tells AppGen tools to use the hosted workbench first and source files second.

#### Scenario: Starter prompt references current workbench host
- **WHEN** the Instructions page renders in a browser
- **THEN** the starter prompt includes the current `window.location.origin` as the hosted workbench reference

#### Scenario: Starter prompt can be copied
- **WHEN** the user activates the copy prompt control
- **THEN** the prompt text is written to the clipboard

### Requirement: Instructions page exposes source references
The Instructions page SHALL list the core reference files agents need to use NOS correctly.

#### Scenario: Source references render
- **WHEN** the Instructions page renders
- **THEN** it lists `DESIGN.md`, `rules/rules.md`, `AGENTS.md`, `CLAUDE.md`, `tokens/tokens.json`, `tokens/base.css`, and `components/index.js`

#### Scenario: Source paths can be copied
- **WHEN** the user activates a reference copy control
- **THEN** the related path is written to the clipboard

### Requirement: DESIGN.md provides a high-level NOS design brief
The repo SHALL include a root-level `DESIGN.md` for agent-facing design direction.

#### Scenario: Design brief is separate from internal skill context
- **WHEN** an agent reads `DESIGN.md`
- **THEN** it describes the NOS design system at a high level
- **AND** it does not present `.impeccable.md` as the public design-system brief
