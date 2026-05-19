## ADDED Requirements

### Requirement: Document section shell renders tinted outer surface and inset body
The document section shell SHALL render a tinted outer container with rounded corners and an inset white body surface. The outer shell SHALL provide the section background; the body surface SHALL contain document content.

#### Scenario: Section shell anatomy
- **WHEN** a document section renders with header and body content
- **THEN** the header sits on the tinted outer shell and the body appears as an inset white rounded surface

### Requirement: Document section shell supports header controls
The document section shell SHALL support a header region with an optional icon, title, lifecycle badge, and edit action. Header controls SHALL align horizontally with the title group on the left and actions on the right.

#### Scenario: Header with badge and edit action
- **WHEN** icon, title, badge, and edit action are provided
- **THEN** the icon and title render on the left while the badge and edit action render on the right

### Requirement: Document section shell supports body actions
The document section shell SHALL allow buttons, AI action rows, or other secondary actions to appear inside or after the body content without imposing workflow logic.

#### Scenario: Body with review actions
- **WHEN** document content and review buttons are rendered in the body
- **THEN** the section displays the actions after the content using tokenized spacing

### Requirement: Document section shell uses existing radius and spacing tokens
The document section shell SHALL use existing radius and spacing tokens to approximate the Figma 16px outer radius, 14px body radius, 4px inset, 20px body padding, and 32px section gap.

#### Scenario: Token-only section styling
- **WHEN** the section CSS is inspected
- **THEN** colors, spacing, radius, typography, shadows, and borders are expressed through CSS custom properties
