## ADDED Requirements

### Requirement: Motion Uses Shared Tokens
The NOS design system SHALL define and consume shared duration and easing tokens for component motion.

#### Scenario: Component CSS uses motion values
- **WHEN** a design-system component declares a transition or animation
- **THEN** the timing and easing values SHALL reference CSS custom properties from the token system rather than raw millisecond values or generic `ease`

#### Scenario: Tokens are regenerated
- **WHEN** motion tokens are added or changed in `tokens/tokens.json`
- **THEN** `tokens/tokens.css` SHALL be regenerated before the change is considered complete

### Requirement: Motion Tokens Are Semantic
The NOS design system SHALL expose a small semantic motion token set for smooth, tasteful, and subtle component animation.

#### Scenario: Motion duration tokens exist
- **WHEN** the motion token layer is implemented
- **THEN** it SHALL expose `--motion-duration-feedback: 120ms`, `--motion-duration-state: 180ms`, `--motion-duration-entry: 220ms`, and `--motion-duration-exit: 160ms`

#### Scenario: Motion easing tokens exist
- **WHEN** the motion token layer is implemented
- **THEN** it SHALL expose `--motion-easing-standard: cubic-bezier(0.25, 1, 0.5, 1)`, `--motion-easing-enter: cubic-bezier(0.16, 1, 0.3, 1)`, and `--motion-easing-exit: cubic-bezier(0.3, 0, 1, 1)`

### Requirement: Reduced Motion Is Respected
The NOS design system SHALL provide a reduced-motion fallback for component animations and transitions.

#### Scenario: User prefers reduced motion
- **WHEN** the browser reports `prefers-reduced-motion: reduce`
- **THEN** NOS component animations SHALL be disabled or shortened to effectively immediate state changes without removing the final visual state

### Requirement: Motion Is State-Driven
NOS component motion SHALL be tied to interaction, selection, validation, entry, or feedback states.

#### Scenario: Static content renders
- **WHEN** static reading components such as document text, metric cards, description lists, or table copy render
- **THEN** they SHALL NOT animate by default

#### Scenario: Interactive control changes state
- **WHEN** a button, choice control, tab, checkbox, side navigation item, field, or modal changes state
- **THEN** the component MAY animate color, border, shadow, opacity, or transform to clarify that state change

### Requirement: Button Motion Is Subtle
NOS buttons SHALL provide tactile feedback without decorative motion.

#### Scenario: Button hover state
- **WHEN** a user hovers an enabled button
- **THEN** the button SHALL transition background-color, border-color, color, and optional box-shadow using `--motion-duration-state` and `--motion-easing-standard`

#### Scenario: Button active press
- **WHEN** a user presses an enabled button
- **THEN** the button SHALL use at most `transform: translateY(1px) scale(0.99)` with `--motion-duration-feedback` and SHALL return to rest without bounce or overshoot

### Requirement: Overlay And Modal Motion Is Restrained
NOS overlay and modal components SHALL enter smoothly while preserving focus and layout.

#### Scenario: Overlay appears
- **WHEN** an overlay is mounted
- **THEN** the scrim SHALL animate opacity from `0` to `1` using `--motion-duration-entry` and `--motion-easing-enter`

#### Scenario: Modal appears
- **WHEN** a modal is mounted
- **THEN** the modal SHALL animate opacity from `0` to `1` and transform from `translateY(6px) scale(0.995)` to `translateY(0) scale(1)` using `--motion-duration-entry` and `--motion-easing-enter`

### Requirement: Form Motion Preserves Control Stability
NOS form controls SHALL use motion to clarify focus, validation, and selection without moving the field layout.

#### Scenario: Field focus or validation changes
- **WHEN** Input, Textarea, Select, or Field focus/error state changes
- **THEN** border-color, box-shadow, color, and background-color SHALL transition using `--motion-duration-state` and `--motion-easing-standard`

#### Scenario: Field interaction occurs
- **WHEN** a user focuses, edits, or validates a text field
- **THEN** the field SHALL NOT scale, shake, translate, or otherwise move

#### Scenario: Checkbox selection changes
- **WHEN** a checkbox selection state changes
- **THEN** its box background and border SHALL transition using `--motion-duration-state`, and its check icon SHALL animate opacity `0` to `1` plus scale `0.85` to `1` using `--motion-duration-feedback`

### Requirement: Selection Motion Preserves Measured Layout
NOS selection controls SHALL animate selected states while preserving their measured dimensions.

#### Scenario: Page tab changes state
- **WHEN** a PageTabs tab becomes selected or unselected
- **THEN** label color and underline or border-color SHALL transition using `--motion-duration-state`, while the tab row remains `40px` tall and the underline remains `2px`

#### Scenario: Segmented or choice option changes state
- **WHEN** SegmentedControl or ChoiceGroup selection changes
- **THEN** background-color, border-color, color, and icon opacity SHALL transition using `--motion-duration-state`

#### Scenario: Selection option is pressed
- **WHEN** a selected-control option is actively pressed
- **THEN** it MAY use at most `transform: translateY(1px)` on the pressed item and SHALL NOT animate container width, height, padding, or gap

### Requirement: Side Navigation Motion Is Quiet
NOS side navigation primitives SHALL use motion only to acknowledge interaction.

#### Scenario: Side nav item hover or focus changes
- **WHEN** SideNavItem, SideNavSearch, SideNavAccount, or SideNavNotificationButton hover/focus state changes
- **THEN** color, background-color, and opacity SHALL transition using `--motion-duration-state` and `--motion-easing-standard`

#### Scenario: Side nav item is pressed
- **WHEN** a side navigation command surface is actively pressed
- **THEN** it MAY use at most `translateY(1px)` or `scale(0.995)` and SHALL preserve row height, alignment, and text position after release

### Requirement: Lightweight Action Motion Is Textual
NOS lightweight action affordances SHALL animate action feedback without animating passive surfaces.

#### Scenario: Inline action changes state
- **WHEN** Callout, AIActionBar, AssistBar, DocumentBreadcrumbs back action, DashboardCard icon control, or section edit action hover/focus/active state changes
- **THEN** text/icon color SHALL transition using `--motion-duration-state`, and active press MAY use `translateY(1px)`

#### Scenario: Passive surface renders
- **WHEN** a Callout, AIActionBar, AssistBar, or document section surface renders
- **THEN** the surface itself SHALL NOT animate by default

### Requirement: Motion Preserves Layout
NOS component motion SHALL NOT animate layout-affecting properties.

#### Scenario: Component animates feedback
- **WHEN** a component provides hover, active, selected, validation, entry, or exit feedback
- **THEN** it SHALL avoid animating width, height, padding, margin, top, left, or other properties that shift neighboring layout

#### Scenario: Component uses transform motion
- **WHEN** a component uses transform motion for feedback
- **THEN** it SHALL use only subtle translate or scale values specified by this spec and SHALL NOT use bounce, elastic, rotation, parallax, blur, or decorative looping animation

### Requirement: Selected Components Receive Motion
The motion pass SHALL target selected NOS design-system components where motion improves feedback.

#### Scenario: Motion target list is implemented
- **WHEN** the motion pass is implemented
- **THEN** it SHALL evaluate and update Button, Overlay, Modal, Checkbox, Field/Input/Textarea/Select, PageTabs, SegmentedControl, ChoiceGroup, SideNavItem, SideNavSearch, SideNavAccount, SideNavNotificationButton, DocumentBreadcrumbs back action, DashboardCard icon controls, Callout actions, and AIActionBar actions as applicable

#### Scenario: Out-of-scope components are encountered
- **WHEN** a component is primarily static content or workbench-only chrome
- **THEN** it SHALL remain out of scope for default motion
