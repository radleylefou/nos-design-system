// Workbench navigation structure.
// To add a component: add it to the relevant COMPONENT_CATEGORIES entry.
// Hidden categories (no components) are automatically suppressed by the Sidebar.

export const COMPONENT_CATEGORIES = [
  { label: 'Foundations', description: 'Core building blocks — buttons, inputs, cards, and inline elements used throughout every NOS app.', components: ['Button', 'Input', 'Card', 'Badges & Status', 'Kbd'] },
  { label: 'Modules',     description: 'High-level composed modules like metric dashboards and navigation shells.', components: ['Metrics', 'SideNav'] },
  { label: 'Forms',       description: 'The full range of form controls — selects, checkboxes, date pickers, tag inputs, and more.', components: ['Select', 'Textarea', 'Checkbox', 'RadioGroup', 'Switch', 'NumberInput', 'Combobox', 'TagInput', 'Date Pickers', 'FileUpload', 'FieldGroup'] },
  { label: 'Layout',      description: 'Structural components that organize content — tabs, dividers, accordions, and stepped flows.', components: ['Tabs', 'Divider', 'Accordion', 'Stepper'] },
  { label: 'Feedback',    description: 'Communicate status and system state — loading states, alerts, and banners.', components: ['LoadingGrid', 'Alerts & Banners'] },
  { label: 'Overlay',     description: 'Contextual layers that float above content — popovers and menus.', components: ['Popover & Menu'] },
  { label: 'Data Display', description: 'Components for presenting information — tables, avatars, progress indicators, and stat blocks.', components: ['Table', 'Avatar', 'Progress', 'StatBlock'] },
  { label: 'NOS Domain',  description: 'Domain-specific components purpose-built for NOS Scope Manager and related apps.', components: ['HierarchyTree', 'RequirementList', 'Timeline', 'CommentThread'] },
];

export const TOKEN_CATEGORIES = ['Color', 'Typography', 'Spacing', 'Radius', 'Shadow', 'Border'];
