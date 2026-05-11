## ADDED Requirements

### Requirement: Button supports an xs size
The Button component SHALL accept `size="xs"` producing a button 26px tall with ~10px horizontal padding and 12px font size. This is used for inline row actions in dense table contexts (e.g. "+ Note").

#### Scenario: xs size renders at correct dimensions
- **WHEN** `size="xs"` is passed
- **THEN** the button renders at 26px height with proportionally smaller padding and text

#### Scenario: xs size compatible with all variants
- **WHEN** `size="xs"` is combined with `variant="secondary"` or `variant="ghost"`
- **THEN** the correct variant styles apply at the xs dimensions
