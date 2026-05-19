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
    label: 'Overlays',
    description: 'Modal and popup surfaces that sit above the page.',
    components: ['Overlay', 'Modal'],
  },
  {
    label: 'Form Controls',
    description: 'Inputs, selects, field layouts, and choice primitives.',
    components: ['Input', 'Textarea', 'Select', 'Checkbox', 'SegmentedControl', 'Field', 'FieldRow', 'ChoiceGroup'],
  },
  {
    label: 'Feedback',
    description: 'Inline system messages, callouts, and status guidance.',
    components: ['Callout', 'StatusPill'],
  },
  {
    label: 'Document',
    description: 'Page shells, section cards, and display primitives for document and detail views.',
    components: ['DocumentBreadcrumbs', 'PageHeader', 'PageTabs', 'DescriptionList', 'SectionHeader', 'DocumentSection', 'DocumentOutcomeList', 'DocumentMetricCard', 'AssistBar', 'AIActionBar'],
  },
  {
    label: 'Navigation',
    description: 'Application navigation shells, sidebar items, and account/search triggers.',
    components: ['SideNavigation', 'SideNavSection', 'SideNavItem', 'SideNavSearch', 'SideNavNotificationButton', 'SideNavAccount'],
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
