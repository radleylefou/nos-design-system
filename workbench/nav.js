// Workbench navigation structure.
// To add a component: add it to the relevant COMPONENT_CATEGORIES entry.
// Hidden categories (no components) are automatically suppressed by the Sidebar.

export const COMPONENT_CATEGORIES = [
  {
    label: 'Actions',
    description: 'Buttons and interactive trigger elements.',
    components: ['Button'],
  },
  {
    label: 'Form Controls',
    description: 'Inputs, selects, and other form primitives.',
    components: ['Input', 'Textarea', 'Select', 'Checkbox', 'SegmentedControl'],
  },
  {
    label: 'Metrics',
    description: 'Summary and stat components for dashboard and overview pages.',
    components: ['DashboardCard', 'NeedsAttention', 'WeeklyPacing', 'MonthlyGlance'],
  },
  {
    label: 'Tables',
    description: 'Data table primitives, headers, and full table examples.',
    components: ['TableHeader', 'TableCell', 'TableExamples'],
  },
];

export const TOKEN_CATEGORIES = ['Color', 'Typography', 'Spacing', 'Radius', 'Shadow', 'Border'];
