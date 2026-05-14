## ADDED Requirements

### Requirement: Document tab bar renders underline navigation
The document tab bar SHALL render horizontal tabs with a shared bottom divider and an underline on the active tab. It SHALL NOT use pill, segmented, or filled selected states.

#### Scenario: Active tab display
- **WHEN** a tab is active
- **THEN** it displays a brand-colored underline and stronger label weight while inactive tabs remain muted

### Requirement: Document tab bar supports accessible tab semantics
The document tab bar SHALL expose tablist semantics, set `aria-selected` on tabs, and support keyboard navigation with ArrowLeft, ArrowRight, Home, and End.

#### Scenario: Keyboard navigation
- **WHEN** focus is inside the document tab bar and the user presses ArrowRight
- **THEN** focus and active selection move to the next tab

### Requirement: Document tab bar preserves Figma spacing through tokens
The document tab bar SHALL use tokenized spacing to approximate the Figma 40px row height, 24px gap between tabs, and 2px active underline.

#### Scenario: Tab row spacing
- **WHEN** five document tabs are rendered
- **THEN** the tabs fit in a single 40px navigation row with tokenized padding and gap values
