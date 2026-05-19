## ADDED Requirements

### Requirement: ModalShell renders Figma-aligned dialog chrome
The `ModalShell` component SHALL render a white modal surface with title, optional description, close action, body content, and optional footer.

#### Scenario: Header content appears
- **WHEN** `title` and `description` are provided
- **THEN** the title and description render at the top of the shell
- **AND** a close button appears when `onClose` is provided

#### Scenario: Footer content appears
- **WHEN** `footer` is provided
- **THEN** footer content renders aligned to the end of the modal

### Requirement: Modal composes overlay and shell
The `Modal` component SHALL render `Overlay` plus `ModalShell` when open.

#### Scenario: Modal is open
- **WHEN** `open={true}`
- **THEN** the overlay and shell render together

#### Scenario: Close action changes open state
- **WHEN** the close button or scrim is activated
- **THEN** `onOpenChange(false)` is called
