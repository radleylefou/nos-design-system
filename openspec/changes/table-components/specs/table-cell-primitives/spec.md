## ADDED Requirements

### Requirement: TableCellText renders plain text
The component SHALL render a single line of text styled as 14px medium `--color-neutral-700`.

#### Scenario: Renders text prop
- **WHEN** `text` prop is provided
- **THEN** the cell renders the text in 14px medium neutral-700

### Requirement: TableCellSubtext renders stacked primary and secondary text
The component SHALL render a primary text (14px medium neutral-700) above a secondary subtext (12px regular neutral-500).

#### Scenario: Renders both lines
- **WHEN** `text` and `subtext` props are provided
- **THEN** primary text appears on top, subtext appears below in smaller dimmer style

#### Scenario: Omits subtext line when not provided
- **WHEN** only `text` prop is provided and `subtext` is omitted
- **THEN** only the primary text line is rendered

### Requirement: TableCellIcon renders an icon followed by text
The component SHALL render an 18×18 icon element to the left of a text label (14px medium neutral-700) with 10px gap.

#### Scenario: Icon and text side by side
- **WHEN** `icon` (JSX) and `text` props are provided
- **THEN** icon and text render in a row with 10px gap

### Requirement: TableCellLink renders text with a navigable chevron
The component SHALL render text (14px medium neutral-700) followed by a small `>` chevron indicator (neutral-400) that signals the cell is navigable.

#### Scenario: Renders text with chevron
- **WHEN** `text` and `onClick` props are provided
- **THEN** text and chevron `>` render in a row; clicking triggers `onClick`

#### Scenario: Chevron absent without onClick
- **WHEN** `onClick` is not provided
- **THEN** chevron is not rendered

### Requirement: TableCellActions renders row action controls
The component SHALL render a "+Note" outlined button (brand-500 border/text, small) and an external-link icon button side by side.

#### Scenario: Renders Note button and link icon
- **WHEN** `onNote` and `onOpenLink` callbacks are provided
- **THEN** "+Note" button and external-link icon button render in a row

#### Scenario: Calls callbacks on interaction
- **WHEN** "+Note" is clicked
- **THEN** `onNote()` is called; when link icon is clicked `onOpenLink()` is called
