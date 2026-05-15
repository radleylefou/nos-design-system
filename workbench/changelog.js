// NOS Design System — changelog.
// Each release has a version, date (ISO), summary, and a list of entries.
// Entry types: 'new' | 'changed' | 'fixed' | 'removed'
// Tags map to component/token names shown as pills.

export const RELEASES = [
  {
    version: '0.4.0',
    date: '2026-04-25',
    summary: 'Icons system, token-driven icon catalog, Button icon toggles.',
    entries: [
      { type: 'new',     text: 'Icons page in the workbench with search, size/stroke controls, and category chips.', tags: ['Icons'] },
      { type: 'new',     text: 'Token-driven icon catalog — icons defined in tokens.json and auto-built into React components.', tags: ['Tokens', 'Icons'] },
      { type: 'new',     text: 'Changelog page in the workbench sidebar.', tags: ['Workbench'] },
      { type: 'changed', text: 'Button playground leading/trailing icon controls changed from dropdown selects to toggles (IconPlus / IconArrowRight defaults).', tags: ['Button', 'Playground'] },
      { type: 'changed', text: 'Token categories expanded: Shadow and Border added to the Tokens sidebar.', tags: ['Tokens'] },
      { type: 'changed', text: 'Nav expanded with Data Display components (Table, Avatar, ProgressBar, ProgressRing, StatBlock) and Form extensions (DatePicker, Combobox, TagInput, NumberInput, FileUpload, FieldGroup).', tags: ['Workbench'] },
    ],
  },
  {
    version: '0.3.0',
    date: '2026-04-24',
    summary: 'Brand color shift, LoadingGrid overhaul, Playground expansion, Metrics rework.',
    entries: [
      { type: 'changed', text: 'Brand default action color shifted from brand-600 (#2729AB) to brand-500 (#393BD2) across all semantic tokens — primary bg, fg-brand, border-focus, shadow-focus ring.', tags: ['Tokens', 'Button'] },
      { type: 'changed', text: 'Button super variant sizing aligned to the large size. Hover state updated. Super button border bumped to brand-400 to stay distinct from the new bg.', tags: ['Button'] },
      { type: 'changed', text: 'LoadingGrid cell palette switched from neutral grays to brand-blue shades (brand-100 rest → brand-400 fill → brand-600 accent). Inverse variant uses brand-900/300/200.', tags: ['LoadingGrid'] },
      { type: 'fixed',   text: 'LoadingGrid phase-delay stutter at fast speed: delays now expressed as fractions of the cycle duration instead of fixed ms, keeping phases evenly spread at any speed.', tags: ['LoadingGrid'] },
      { type: 'changed', text: 'LoadingGrid cycle durations lengthened (slow: 1600ms, normal: 1280ms, fast: 960ms). Pulse easing changed to ease-in-out for a symmetric breathe feel.', tags: ['LoadingGrid'] },
      { type: 'new',     text: 'LoadingGrid playground (Loading Lab) added with full prop controls and live preview.', tags: ['LoadingGrid', 'Playground'] },
      { type: 'new',     text: 'Playground expanded to cover all components: Input, Select, Textarea, Checkbox, RadioGroup, Switch, Tabs, Card, Badge, Metrics, SideNav.', tags: ['Playground'] },
      { type: 'changed', text: 'Metrics component refactored into individual metric cards.', tags: ['Metrics'] },
      { type: 'new',     text: 'Neutral 25 and 75 tokens added to fill in the low-end neutral ramp.', tags: ['Tokens'] },
      { type: 'changed', text: 'Sidebar navigation refined — brand mark, section structure, and panel hierarchy polished.', tags: ['Workbench'] },
    ],
  },
  {
    version: '0.2.0',
    date: '2026-04-22',
    summary: 'Button super variant, micro-interactions, form layout improvements.',
    entries: [
      { type: 'new',     text: 'Button "super" variant — elevated primary with brand glow, sheen shimmer, and reserved for single headline actions per view.', tags: ['Button'] },
      { type: 'new',     text: 'Button active-press scale micro-interaction (scale 0.97).', tags: ['Button'] },
      { type: 'new',     text: 'Card interactive hover lift (translateY -1px).', tags: ['Card'] },
      { type: 'new',     text: 'Checkbox checkmark scale-in animation on check.', tags: ['Checkbox'] },
      { type: 'new',     text: 'Select chevron rotation on focus-within.', tags: ['Select'] },
      { type: 'new',     text: 'Switch thumb centering fixed; translate uses a CSS custom property for smooth combined transform.', tags: ['Switch'] },
      { type: 'new',     text: 'Tabs sliding indicator — JS-measured, absolutely-positioned div that animates left/width on tab change.', tags: ['Tabs'] },
      { type: 'new',     text: 'Global prefers-reduced-motion override in base.css.', tags: ['Tokens'] },
      { type: 'changed', text: 'RadioGroup option gap and label spacing refined.', tags: ['RadioGroup'] },
      { type: 'changed', text: 'Select, Textarea, Checkbox, RadioGroup, Switch, Tabs layout pass — height normalization, spacing rhythm, focus ring consistency.', tags: ['Select', 'Textarea', 'Checkbox', 'RadioGroup', 'Switch', 'Tabs'] },
      { type: 'new',     text: 'Motion tokens added: --duration-instant/fast/base/slow and --easing-standard/decelerate/accelerate.', tags: ['Tokens'] },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-04-22',
    summary: 'Initial build — component library, token system, and workbench.',
    entries: [
      { type: 'new', text: 'Token system: color (brand, neutral, semantic), typography, spacing (4pt scale), radius, shadow, border.', tags: ['Tokens'] },
      { type: 'new', text: 'Button — variants: primary, secondary, ghost, danger. Sizes: sm, md, lg. Loading spinner and icon slots.', tags: ['Button'] },
      { type: 'new', text: 'Input — with label, helper text, error, leading/trailing icon, all sizes.', tags: ['Input'] },
      { type: 'new', text: 'Select — custom chevron indicator, all sizes.', tags: ['Select'] },
      { type: 'new', text: 'Textarea — auto-grow option, resize control.', tags: ['Textarea'] },
      { type: 'new', text: 'Checkbox — indeterminate state, error state.', tags: ['Checkbox'] },
      { type: 'new', text: 'RadioGroup — horizontal and vertical layouts.', tags: ['RadioGroup'] },
      { type: 'new', text: 'Switch — accessible checkbox-backed toggle.', tags: ['Switch'] },
      { type: 'new', text: 'Tabs — controlled tab panel with accessible markup.', tags: ['Tabs'] },
      { type: 'new', text: 'Card — default and interactive variants.', tags: ['Card'] },
      { type: 'new', text: 'Badge — semantic color variants and sizes.', tags: ['Badge'] },
      { type: 'new', text: 'LoadingGrid — animated pulse grid for loading states.', tags: ['LoadingGrid'] },
      { type: 'new', text: 'Metrics — summary stat display.', tags: ['Metrics'] },
      { type: 'new', text: 'SideNav — full application nav shell with header, sections, items, and footer.', tags: ['SideNav'] },
      { type: 'new', text: 'Workbench — component docs, token viewer, playground.', tags: ['Workbench'] },
    ],
  },
];

// Tag → bg/text color pair for pill styling.
export const TAG_COLORS = {
  Button:      { bg: 'var(--color-brand-50)',           text: 'var(--color-brand-700)' },
  Input:       { bg: 'var(--color-brand-50)',           text: 'var(--color-brand-700)' },
  Select:      { bg: 'var(--color-brand-50)',           text: 'var(--color-brand-700)' },
  Textarea:    { bg: 'var(--color-brand-50)',           text: 'var(--color-brand-700)' },
  Checkbox:    { bg: 'var(--color-brand-50)',           text: 'var(--color-brand-700)' },
  RadioGroup:  { bg: 'var(--color-brand-50)',           text: 'var(--color-brand-700)' },
  Switch:      { bg: 'var(--color-brand-50)',           text: 'var(--color-brand-700)' },
  Tabs:        { bg: 'var(--color-brand-50)',           text: 'var(--color-brand-700)' },
  Card:        { bg: 'var(--color-brand-50)',           text: 'var(--color-brand-700)' },
  Badge:       { bg: 'var(--color-brand-50)',           text: 'var(--color-brand-700)' },
  LoadingGrid: { bg: 'var(--color-brand-50)',           text: 'var(--color-brand-700)' },
  Metrics:     { bg: 'var(--color-brand-50)',           text: 'var(--color-brand-700)' },
  SideNav:     { bg: 'var(--color-brand-50)',           text: 'var(--color-brand-700)' },
  Icons:       { bg: 'var(--color-brand-50)',           text: 'var(--color-brand-700)' },
  Tokens:      { bg: 'var(--wb-neutral-100)',        text: 'var(--wb-neutral-700)' },
  Playground:  { bg: 'var(--wb-neutral-100)',        text: 'var(--wb-neutral-700)' },
  Workbench:   { bg: 'var(--wb-neutral-100)',        text: 'var(--wb-neutral-700)' },
};

export const ENTRY_TYPE_META = {
  new:     { label: 'New',     color: 'var(--color-semantic-success-600)' },
  changed: { label: 'Changed', color: 'var(--color-brand-500)' },
  fixed:   { label: 'Fixed',   color: 'var(--color-semantic-warning-600)' },
  removed: { label: 'Removed', color: 'var(--color-semantic-error-600)' },
};
