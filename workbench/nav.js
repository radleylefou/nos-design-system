// Workbench navigation structure.
// To add a component: add it to the relevant COMPONENT_CATEGORIES entry.
// Hidden categories (no components) are automatically suppressed by the Sidebar.

export const COMPONENT_CATEGORIES = [
  { label: 'Foundations', components: ['Button', 'Input', 'Card', 'Badge', 'Kbd'] },
  { label: 'Modules',     components: ['Metrics', 'SideNav'] },
  { label: 'Forms',        components: ['Select', 'Textarea', 'Checkbox', 'RadioGroup', 'Switch', 'NumberInput', 'Combobox', 'TagInput', 'DatePicker', 'DateRangePicker', 'FileUpload', 'FieldGroup'] },
  { label: 'Layout',       components: ['Tabs', 'Divider', 'Accordion', 'Stepper'] },
  { label: 'Feedback',     components: ['LoadingGrid', 'Alert', 'Banner'] },
  { label: 'Overlay',      components: ['Popover', 'Menu'] },
  { label: 'Data Display', components: ['Table', 'Avatar', 'ProgressBar', 'ProgressRing', 'StatBlock'] },
  { label: 'NOS Domain',   components: ['StatusPill', 'HierarchyTree', 'RequirementList', 'Timeline', 'CommentThread'] },
];

export const TOKEN_CATEGORIES = ['Color', 'Typography', 'Spacing', 'Radius', 'Shadow', 'Border'];
