## MODIFIED Requirements

### Requirement: Brand color ramp values
The brand primitive ramp SHALL use the following exact hex values in `tokens.json`. Stop 300 is interpolated from 200 and 400.

| Stop | Value   |
|------|---------|
| 50   | #F7F6FF |
| 100  | #EEECFF |
| 200  | #D8D9FF |
| 300  | #B5B9FC |
| 400  | #9DA0FC |
| 500  | #6A6CE3 |
| 600  | #5D58E2 |
| 700  | #5547EB |
| 800  | #4D35D5 |
| 900  | #2C1F7F |
| 950  | #120D35 |

#### Scenario: Brand stops match Figma values
- **WHEN** `tokens.json` brand scale is read
- **THEN** each stop matches the hex value in the table above

### Requirement: border.brand-alpha rgba base updated
The `border.brand-alpha` token group SHALL use `rgba(106, 108, 227, …)` as the base (matching new brand-500 `#6A6CE3`).

#### Scenario: Brand alpha rgba base
- **WHEN** `--border-brand-alpha-10` is inspected
- **THEN** its value is `rgba(106, 108, 227, 0.10)`

### Requirement: shadow.focus uses new brand-600
The `shadow.focus` token SHALL embed `#5D58E2` (new brand-600).

#### Scenario: Focus shadow color
- **WHEN** `--shadow-focus` is inspected
- **THEN** the outer ring color is `#5D58E2`

### Requirement: tokens.css reflects all updates
After `npm run tokens`, all `--color-brand-*` custom properties SHALL match the new ramp values.

#### Scenario: CSS cascade
- **WHEN** `tokens.css` is regenerated
- **THEN** `--color-brand-500` equals `#6A6CE3`
