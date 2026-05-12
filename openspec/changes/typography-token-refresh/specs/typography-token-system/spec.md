## ADDED Requirements

### Requirement: Typography family tokens are limited to UI and technical text
The typography token system SHALL expose `font-family.sans` for interface text and `font-family.mono` for technical text.

#### Scenario: Display font is absent
- **WHEN** `tokens.css` is generated from `tokens.json`
- **THEN** it does not include `--font-family-display`
- **AND** no workbench typography recipe references `fontFamily: 'display'`

### Requirement: Typography size scale supports current components
The typography token system SHALL expose size tokens for dense labels, captions, UI text, body text, headings, metrics, and rare large display text.

#### Scenario: Metric values use a size token
- **WHEN** metric components render large numeric values
- **THEN** they use `--font-size-3xl` rather than hardcoded `32px`

#### Scenario: Dense labels use a size token
- **WHEN** table stages, tiny badges, copy buttons, and swatch labels render
- **THEN** they use `--font-size-2xs` rather than hardcoded `10px`

### Requirement: Typography rhythm is tokenized
The typography token system SHALL include line-height tokens for compact controls, display headings, tight headings, snug data rows, normal copy, and relaxed documentation copy.

#### Scenario: Data row copy uses snug rhythm
- **WHEN** controls, table cells, helper text, and compact metric copy render
- **THEN** they use `--line-height-snug` rather than hardcoded `1.4`

#### Scenario: Button and pill labels use no extra leading
- **WHEN** button-like controls render
- **THEN** they use `--line-height-none` rather than hardcoded `1`

### Requirement: Typography spacing is tokenized
The typography token system SHALL include letter-spacing tokens for normal text, uppercase caps labels, and wide section/category labels.

#### Scenario: Uppercase UI labels use caps spacing
- **WHEN** copy buttons, icon metadata, changelog labels, or small uppercase labels render
- **THEN** they use `--letter-spacing-caps` or `--letter-spacing-wide` rather than hardcoded em values

### Requirement: Typography documentation matches the component set
The workbench Tokens typography page SHALL document recipes for the currently exported components and workbench surfaces.

#### Scenario: Type styles are shown for component needs
- **WHEN** the user opens the Typography token page
- **THEN** it shows recipes for page title, page description, section title, control label, control text, helper text, table header, table cell, table meta, metric value, metric label, and code
- **AND** it does not show a Bitcount or display font recipe
