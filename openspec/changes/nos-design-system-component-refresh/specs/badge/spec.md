## ADDED Requirements

### Requirement: Badge supports a subtle tinted variant
The Badge component SHALL accept `variant="subtle"` which renders the badge with a light tinted background and matching text color derived from the `color` prop, without a border. This is used for stage probability labels ("5%", "10%") in Kanban column headers.

#### Scenario: Subtle variant renders tinted background without border
- **WHEN** `variant="subtle"` is passed
- **THEN** the badge has a tinted background, colored text, and no visible border

#### Scenario: Subtle variant with neutral color
- **WHEN** `variant="subtle"` and `color="neutral"` are passed
- **THEN** badge renders with a neutral-100 background and neutral-700 text
