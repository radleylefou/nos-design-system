import { useState } from 'react';
import {
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
  RadioGroup,
  Switch,
  Tabs,
  Card,
  Badge,
  LoadingGrid,
  Metrics,
  SideNav,
  Table,
  Avatar,
  ProgressBar,
  ProgressRing,
  StatBlock,
  Divider,
  DatePicker,
  DateRangePicker,
  Combobox,
  TagInput,
  NumberInput,
  FileUpload,
  FieldGroup,
  // Batch 5 — NOS domain
  StatusPill,
  HierarchyTree,
  RequirementList,
  Timeline,
  CommentThread,
  Stepper,
  // Batch 6 — polish & overlay
  Popover,
  Menu,
  Accordion,
  Alert,
  Banner,
  Kbd,
} from '../../components/index.js';
import './ComponentsPage.css';

/**
 * ComponentsPage — review/authoring view for a single component.
 * Each section has an independent "Show / Hide code" toggle.
 */
export function ComponentsPage({ componentId, categoryId, onNavigate }) {
  const entry = DEMOS[componentId];

  if (!entry) {
    return (
      <div className="wb-page">
        <div className="wb-page__header">
          {categoryId && onNavigate ? (
            <button
              type="button"
              className="wb-page__eyebrow wb-eyebrow-link"
              onClick={() => onNavigate({ section: 'component', categoryId })}
            >
              {categoryId}
            </button>
          ) : (
            categoryId && <div className="wb-page__eyebrow">{categoryId}</div>
          )}
          <h1 className="wb-page__title">{componentId}</h1>
          <p className="wb-page__subtitle">
            No demo registered for this component yet. Select another component from the sidebar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="wb-page">
      <div className="wb-page__header">
        {categoryId && onNavigate ? (
          <button
            type="button"
            className="wb-page__eyebrow wb-eyebrow-link"
            onClick={() => onNavigate({ section: 'component', categoryId })}
          >
            {categoryId}
          </button>
        ) : (
          categoryId && <div className="wb-page__eyebrow">{categoryId}</div>
        )}
        <h1 className="wb-page__title">{componentId}</h1>
        <p className="wb-page__subtitle">{entry.description}</p>
      </div>
      {entry.sections.map((section) => (
        <DemoSection key={section.title} section={section} />
      ))}
    </div>
  );
}

function DemoSection({ section }) {
  const [showCode, setShowCode] = useState(false);

  return (
    <section className="wb-section">
      <div className="wb-section__header">
        <h2 className="wb-section__title">{section.title}</h2>
        {section.code && (
          <button
            type="button"
            className="wb-code-toggle"
            onClick={() => setShowCode((v) => !v)}
          >
            {showCode ? 'Hide code' : 'Show code'}
          </button>
        )}
      </div>
      <div className={`wb-demo ${section.demoClassName || ''}`}>{section.render()}</div>
      {showCode && section.code && (
        <pre className="wb-code-block"><code>{section.code.trim()}</code></pre>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Demo registry
// ---------------------------------------------------------------------------

const DEMOS = {
  Button: {
    description: 'Primary interactive control. Five variants, three sizes, loading state, and icon slots.',
    sections: [
      {
        title: 'Variants',
        render: () => (
          <>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </>
        ),
        code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`,
      },
      {
        title: 'Super',
        render: () => (
          <Button
            variant="super"
            leadingIcon={
              <svg viewBox="0 0 18 18" width="18" height="18" fill="none" aria-hidden="true">
                <path d="M9 3.75v10.5M3.75 9h10.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            }
          >
            Time Entry
          </Button>
        ),
        code: `<Button variant="super" leadingIcon={<PlusIcon />}>
  Time Entry
</Button>`,
      },
      {
        title: 'Sizes',
        render: () => (
          <>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </>
        ),
        code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
      },
      {
        title: 'States',
        render: () => (
          <>
            <Button>Default</Button>
            <Button loading>Saving…</Button>
            <Button disabled>Disabled</Button>
          </>
        ),
        code: `<Button>Default</Button>
<Button loading>Saving…</Button>
<Button disabled>Disabled</Button>`,
      },
    ],
  },

  Input: {
    description: 'Single-line text field with optional label, helper text, error state, and icon slots.',
    sections: [
      {
        title: 'Variants',
        render: () => (
          <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%', maxWidth: 360 }}>
            <Input label="Email" type="email" placeholder="user@example.com" />
            <Input label="API key" placeholder="nos_••••••••" helperText="Generated from account settings." />
          </div>
        ),
        code: `<Input label="Email" type="email" placeholder="user@example.com" />
<Input
  label="API key"
  placeholder="nos_••••••••"
  helperText="Generated from account settings."
/>`,
      },
      {
        title: 'Sizes',
        render: () => (
          <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 360 }}>
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium" />
            <Input size="lg" placeholder="Large" />
          </div>
        ),
        code: `<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`,
      },
      {
        title: 'States',
        render: () => (
          <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 360 }}>
            <Input label="Error" defaultValue="not-an-email" error="Enter a valid email address." />
            <Input label="Disabled" placeholder="Read-only" disabled />
          </div>
        ),
        code: `<Input label="Error" defaultValue="not-an-email" error="Enter a valid email address." />
<Input label="Disabled" placeholder="Read-only" disabled />`,
      },
    ],
  },

  Select: {
    description: 'Single-select dropdown with label, helper text, error state, disabled state, and native option rendering.',
    sections: [
      {
        title: 'Variants',
        render: () => (
          <div className="wb-demo-grid">
            <Select
              label="Region"
              defaultValue=""
              placeholder="Choose region"
              options={[
                { label: 'North America', value: 'na' },
                { label: 'Europe', value: 'eu' },
                { label: 'Asia Pacific', value: 'apac' },
              ]}
              helperText="Used for reporting rollups."
            />
            <Select
              label="Priority"
              defaultValue="standard"
              options={[
                { label: 'Standard', value: 'standard' },
                { label: 'Expedite', value: 'expedite' },
                { label: 'Hold', value: 'hold' },
              ]}
            />
          </div>
        ),
        code: `<Select
  label="Region"
  defaultValue=""
  placeholder="Choose region"
  options={[
    { label: 'North America', value: 'na' },
    { label: 'Europe', value: 'eu' },
    { label: 'Asia Pacific', value: 'apac' },
  ]}
  helperText="Used for reporting rollups."
/>`,
      },
      {
        title: 'States',
        render: () => (
          <div className="wb-demo-grid">
            <Select
              label="Required status"
              defaultValue=""
              placeholder="Select status"
              error="Select a status before continuing."
              options={[
                { label: 'Draft', value: 'draft' },
                { label: 'Approved', value: 'approved' },
              ]}
            />
            <Select
              label="Locked account"
              defaultValue="enterprise"
              disabled
              options={[
                { label: 'Enterprise', value: 'enterprise' },
                { label: 'Team', value: 'team' },
              ]}
              helperText="Managed by account settings."
            />
          </div>
        ),
        code: `<Select label="Required status" error="Select a status before continuing." />
<Select label="Locked account" disabled helperText="Managed by account settings." />`,
      },
    ],
  },

  Textarea: {
    description: 'Multi-line text input matching Input field behavior, including helper text, error, disabled, and size variants.',
    sections: [
      {
        title: 'Variants',
        render: () => (
          <div className="wb-demo-grid">
            <Textarea
              label="Review notes"
              placeholder="Add context for the finance team..."
              helperText="Visible to internal reviewers."
            />
            <Textarea
              label="Compact note"
              size="sm"
              placeholder="Short internal note"
              resize="none"
            />
          </div>
        ),
        code: `<Textarea
  label="Review notes"
  placeholder="Add context for the finance team..."
  helperText="Visible to internal reviewers."
/>`,
      },
      {
        title: 'States',
        render: () => (
          <div className="wb-demo-grid">
            <Textarea
              label="Reason"
              defaultValue=""
              error="Reason is required for rejected requests."
            />
            <Textarea
              label="System note"
              defaultValue="Generated from the source record."
              disabled
            />
          </div>
        ),
        code: `<Textarea label="Reason" error="Reason is required for rejected requests." />
<Textarea label="System note" defaultValue="Generated from the source record." disabled />`,
      },
    ],
  },

  Checkbox: {
    description: 'Compact binary input for opt-in flags, confirmations, and row-level settings.',
    sections: [
      {
        title: 'Variants',
        render: () => (
          <div className="wb-demo-grid">
            <Checkbox
              label="Include archived records"
              helperText="Archived records appear in exports only."
            />
            <Checkbox
              label="Notify owners"
              helperText="Send a summary when this change is saved."
              defaultChecked
            />
          </div>
        ),
        code: `<Checkbox
  label="Include archived records"
  helperText="Archived records appear in exports only."
/>
<Checkbox label="Notify owners" defaultChecked />`,
      },
      {
        title: 'States',
        render: () => (
          <div className="wb-demo-grid">
            <Checkbox
              label="Confirm approval"
              error="Approval confirmation is required."
            />
            <Checkbox
              label="Locked by policy"
              helperText="Controlled by workspace permissions."
              disabled
            />
          </div>
        ),
        code: `<Checkbox label="Confirm approval" error="Approval confirmation is required." />
<Checkbox label="Locked by policy" disabled />`,
      },
    ],
  },

  RadioGroup: {
    description: 'Mutually exclusive option group with vertical and horizontal layouts.',
    sections: [
      {
        title: 'Variants',
        render: () => (
          <div className="wb-demo-grid">
            <RadioGroup
              label="Approval path"
              defaultValue="manager"
              options={[
                { label: 'Manager review', value: 'manager', helperText: 'Routes to the direct manager.' },
                { label: 'Finance review', value: 'finance', helperText: 'Routes to finance operations.' },
                { label: 'Auto approve', value: 'auto', helperText: 'Applies only to low-risk changes.' },
              ]}
            />
            <RadioGroup
              label="Density"
              orientation="horizontal"
              defaultValue="balanced"
              options={[
                { label: 'Compact', value: 'compact' },
                { label: 'Balanced', value: 'balanced' },
                { label: 'Relaxed', value: 'relaxed' },
              ]}
            />
          </div>
        ),
        code: `<RadioGroup
  label="Approval path"
  defaultValue="manager"
  options={[
    { label: 'Manager review', value: 'manager' },
    { label: 'Finance review', value: 'finance' },
    { label: 'Auto approve', value: 'auto' },
  ]}
/>`,
      },
      {
        title: 'States',
        render: () => (
          <div className="wb-demo-grid">
            <RadioGroup
              label="Required path"
              error="Choose an approval path."
              options={[
                { label: 'Manager review', value: 'manager' },
                { label: 'Finance review', value: 'finance' },
              ]}
            />
            <RadioGroup
              label="Locked mode"
              defaultValue="standard"
              disabled
              options={[
                { label: 'Standard', value: 'standard' },
                { label: 'Restricted', value: 'restricted' },
              ]}
              helperText="Managed at the workspace level."
            />
          </div>
        ),
        code: `<RadioGroup label="Required path" error="Choose an approval path." options={options} />
<RadioGroup label="Locked mode" disabled options={options} />`,
      },
    ],
  },

  Switch: {
    description: 'On/off setting control for immediate preferences and binary configuration.',
    sections: [
      {
        title: 'Variants',
        render: () => (
          <div className="wb-demo-grid">
            <Switch
              label="Auto-approve guidance"
              helperText="Applies to low-risk guidance updates."
            />
            <Switch
              label="Sync with CRM"
              helperText="Push approved changes to connected records."
              defaultChecked
            />
          </div>
        ),
        code: `<Switch
  label="Auto-approve guidance"
  helperText="Applies to low-risk guidance updates."
/>
<Switch label="Sync with CRM" defaultChecked />`,
      },
      {
        title: 'States',
        render: () => (
          <div className="wb-demo-grid">
            <Switch
              label="Disabled off"
              helperText="Unavailable for this workspace."
              disabled
            />
            <Switch
              label="Disabled on"
              helperText="Required by policy."
              defaultChecked
              disabled
            />
          </div>
        ),
        code: `<Switch label="Disabled off" disabled />
<Switch label="Disabled on" defaultChecked disabled />`,
      },
    ],
  },

  Card: {
    description: 'Surface container for grouping related content. Header, Body, and Footer sub-components.',
    sections: [
      {
        title: 'Variants',
        render: () => (
          <div style={{ display: 'grid', gap: 'var(--spacing-4)', gridTemplateColumns: 'repeat(3, 1fr)', width: '100%' }}>
            <Card padding="sm">Default</Card>
            <Card variant="muted" padding="sm">Muted</Card>
            <Card variant="outlined" padding="sm">Outlined</Card>
          </div>
        ),
        code: `<Card>Default</Card>
<Card variant="muted">Muted</Card>
<Card variant="outlined">Outlined</Card>`,
      },
      {
        title: 'With header and footer',
        render: () => (
          <Card style={{ width: '100%', maxWidth: 420 }}>
            <Card.Header>
              <span>Internal Pipeline</span>
              <Badge variant="success" dot>Active</Badge>
            </Card.Header>
            <Card.Body>
              Internal data pipeline feeding the analytics lake. Owned by the platform team.
            </Card.Body>
            <Card.Footer>
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button size="sm">Open</Button>
            </Card.Footer>
          </Card>
        ),
        code: `<Card>
  <Card.Header>
    <span>Internal Pipeline</span>
    <Badge variant="success" dot>Active</Badge>
  </Card.Header>
  <Card.Body>
    Internal data pipeline feeding the analytics lake.
  </Card.Body>
  <Card.Footer>
    <Button variant="ghost" size="sm">Cancel</Button>
    <Button size="sm">Open</Button>
  </Card.Footer>
</Card>`,
      },
    ],
  },

  'Badges & Status': {
    description: 'Compact metadata labels and canonical NOS status pills. Use Badge for generic labels, and StatusPill when the value is a standard scope status.',
    sections: [
      {
        title: 'When to use which',
        render: () => (
          <div className="wb-demo-grid wb-demo-grid--wide">
            <div className="wb-demo-panel">
              <h3>Badge</h3>
              <p>Use for generic tags, small labels, health states, and inline metadata where the caller controls the visible text.</p>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
                <Badge variant="brand">New</Badge>
                <Badge variant="info" dot>Beta</Badge>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
            <div className="wb-demo-panel">
              <h3>StatusPill</h3>
              <p>Use for canonical NOS scope statuses. The component owns the label and semantic color mapping.</p>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
                <StatusPill status="draft" />
                <StatusPill status="in-review" />
                <StatusPill status="approved" />
              </div>
            </div>
          </div>
        ),
        code: `<Badge variant="brand">New</Badge>
<Badge variant="info" dot>Beta</Badge>
<StatusPill status="in-review" />`,
      },
      {
        title: 'Badge variants',
        render: () => (
          <>
            <Badge>Neutral</Badge>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </>
        ),
        code: `<Badge>Neutral</Badge>
<Badge variant="brand">Brand</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>`,
      },
      {
        title: 'Badge with status dot',
        render: () => (
          <>
            <Badge dot>Idle</Badge>
            <Badge variant="success" dot>Active</Badge>
            <Badge variant="warning" dot>Degraded</Badge>
            <Badge variant="error" dot>Down</Badge>
          </>
        ),
        code: `<Badge dot>Idle</Badge>
<Badge variant="success" dot>Active</Badge>
<Badge variant="warning" dot>Degraded</Badge>
<Badge variant="error" dot>Down</Badge>`,
      },
      {
        title: 'StatusPill statuses',
        render: () => (
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <StatusPill status="draft" />
            <StatusPill status="in-review" />
            <StatusPill status="approved" />
            <StatusPill status="rejected" />
            <StatusPill status="archived" />
          </div>
        ),
        code: `<StatusPill status="draft" />
<StatusPill status="in-review" />
<StatusPill status="approved" />
<StatusPill status="rejected" />
<StatusPill status="archived" />`,
      },
      {
        title: 'StatusPill size and dot',
        render: () => (
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <StatusPill status="draft" size="sm" />
            <StatusPill status="in-review" size="sm" />
            <StatusPill status="approved" dot={false} />
            <StatusPill status="rejected" dot={false} />
          </div>
        ),
        code: `<StatusPill status="approved" size="sm" />
<StatusPill status="rejected" dot={false} />`,
      },
      {
        title: 'StatusPill in context',
        render: () => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', width: '100%', maxWidth: 560 }}>
            {[
              { name: 'Atlas Data Migration', status: 'in-review', client: 'Nymbl Internal' },
              { name: 'Onboarding Revamp v2', status: 'approved', client: 'TechCorp Ltd.' },
              { name: 'Legacy SDK Sunset', status: 'draft', client: 'Nymbl Internal' },
              { name: 'Compliance Audit 2025', status: 'rejected', client: 'Acme Industries' },
              { name: 'Billing Pipeline v3', status: 'archived', client: 'Cloudworks Inc.' },
            ].map(({ name, status, client }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--spacing-3) var(--spacing-4)', background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--fg-default)' }}>{name}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--fg-subtle)' }}>{client}</div>
                </div>
                <StatusPill status={status} size="sm" />
              </div>
            ))}
          </div>
        ),
        code: `// In a scope list row:
<StatusPill status={scope.status} size="sm" />`,
      },
    ],
  },

  LoadingGrid: {
    type: 'Feedback',
    description: 'Deterministic pixel-grid loader for NOS async states. Pattern, grid size, speed, density, accent ratio, cell size, gap, and theme are all prop-driven.',
    sections: [
      {
        title: 'Patterns',
        render: () => (
          <div style={{ display: 'grid', gap: 'var(--spacing-5)', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', width: '100%' }}>
            <LoadingGrid pattern="scatter" label="Loading scatter pattern" />
            <LoadingGrid pattern="wave" label="Loading wave pattern" />
            <LoadingGrid pattern="ripple" label="Loading ripple pattern" />
            <LoadingGrid pattern="scan" label="Loading scan pattern" />
          </div>
        ),
        code: `<LoadingGrid pattern="scatter" label="Loading data" />
<LoadingGrid pattern="wave" label="Loading data" />
<LoadingGrid pattern="ripple" label="Loading data" />
<LoadingGrid pattern="scan" label="Loading data" />`,
      },
      {
        title: 'Grid size and density',
        render: () => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', flexWrap: 'wrap' }}>
            <LoadingGrid gridSize={4} density="sparse" cellSize="lg" label="Loading compact grid" />
            <LoadingGrid gridSize={5} density="balanced" label="Loading balanced grid" />
            <LoadingGrid gridSize={6} density="dense" cellSize="sm" gap="xs" label="Loading dense grid" />
          </div>
        ),
        code: `<LoadingGrid gridSize={4} density="sparse" cellSize="lg" />
<LoadingGrid gridSize={5} density="balanced" />
<LoadingGrid gridSize={6} density="dense" cellSize="sm" gap="xs" />`,
      },
      {
        title: 'Theme and motion controls',
        render: () => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', flexWrap: 'wrap' }}>
            <LoadingGrid pattern="wave" speed="fast" accentRatio="high" label="Syncing guidance" />
            <LoadingGrid pattern="scan" variant="inverse" speed="slow" label="Loading dark preview" />
            <LoadingGrid pattern="ripple" paused decorative />
          </div>
        ),
        code: `<LoadingGrid pattern="wave" speed="fast" accentRatio="high" label="Syncing guidance" />
<LoadingGrid pattern="scan" variant="inverse" speed="slow" label="Loading dark preview" />
<LoadingGrid pattern="ripple" paused decorative />`,
      },
    ],
  },

  Tabs: {
    description: 'Dense tab navigation for switching between related admin page sections without leaving the current view.',
    sections: [
      {
        title: 'Variants',
        demoClassName: 'wb-demo--module',
        render: () => (
          <Tabs
            ariaLabel="Account sections"
            defaultValue="overview"
            tabs={[
              {
                label: 'Overview',
                value: 'overview',
                content: (
                  <div className="wb-demo-panel">
                    <h3>Overview</h3>
                    <p>High-signal summary of account ownership, status, and recent operating context.</p>
                  </div>
                ),
              },
              {
                label: 'Activity',
                value: 'activity',
                content: (
                  <div className="wb-demo-panel">
                    <h3>Activity</h3>
                    <p>Latest guidance changes, approvals, exports, and reviewer comments.</p>
                  </div>
                ),
              },
              {
                label: 'Settings',
                value: 'settings',
                content: (
                  <div className="wb-demo-panel">
                    <h3>Settings</h3>
                    <p>Configuration flags and account-level defaults for this workspace.</p>
                  </div>
                ),
              },
              { label: 'Audit', value: 'audit', content: null, disabled: true },
            ]}
          />
        ),
        code: `<Tabs
  ariaLabel="Account sections"
  defaultValue="overview"
  tabs={[
    { label: 'Overview', value: 'overview', content: <Overview /> },
    { label: 'Activity', value: 'activity', content: <Activity /> },
    { label: 'Settings', value: 'settings', content: <Settings /> },
    { label: 'Audit', value: 'audit', disabled: true },
  ]}
/>`,
      },
      {
        title: 'Sizes',
        demoClassName: 'wb-demo--module',
        render: () => (
          <div className="wb-demo-grid wb-demo-grid--wide">
            <Tabs
              size="sm"
              ariaLabel="Small tabs"
              tabs={[
                { label: 'Open', value: 'open', content: <div className="wb-demo-panel">Open records</div> },
                { label: 'Pending', value: 'pending', content: <div className="wb-demo-panel">Pending records</div> },
                { label: 'Closed', value: 'closed', content: <div className="wb-demo-panel">Closed records</div> },
              ]}
            />
          </div>
        ),
        code: `<Tabs
  size="sm"
  tabs={[
    { label: 'Open', value: 'open', content: <Open /> },
    { label: 'Pending', value: 'pending', content: <Pending /> },
    { label: 'Closed', value: 'closed', content: <Closed /> },
  ]}
/>`,
      },
    ],
  },

  Metrics: {
    type: 'Module',
    description: 'KPI summary module. Numbers are the hero — 44px bold, tight-tracked, tabular. Label recedes at 11px uppercase. No nested cards.',
    sections: [
      {
        title: 'Default',
        demoClassName: 'wb-demo--module',
        render: () => (
          <Metrics
            title="Guidance Overview — April 2026"
            items={[
              { label: 'True Capacity', value: '0.00', unit: 'hrs' },
              { label: 'Total Guidance', value: '115.00', unit: 'hrs' },
              { label: 'Utilisation', value: '73', unit: '%', trend: { direction: 'up', label: '+4.2%' } },
              { label: 'Overdue', value: '3', unit: 'items', trend: { direction: 'down', label: '−1' } },
            ]}
          />
        ),
        code: `<Metrics
  title="Guidance Overview — April 2026"
  items={[
    { label: 'True Capacity', value: '0.00', unit: 'hrs' },
    { label: 'Total Guidance', value: '115.00', unit: 'hrs' },
    { label: 'Utilisation', value: '73', unit: '%', trend: { direction: 'up', label: '+4.2%' } },
    { label: 'Overdue', value: '3', unit: 'items', trend: { direction: 'down', label: '−1' } },
  ]}
/>`,
      },
      {
        title: 'Featured',
        demoClassName: 'wb-demo--module',
        render: () => (
          <Metrics
            variant="featured"
            title="Pipeline — Q2 2026"
            items={[
              { label: 'Open Deals', value: '24', trend: { direction: 'up', label: '+3' } },
              { label: 'Avg. Close', value: '18', unit: 'days' },
              { label: 'Win Rate', value: '61', unit: '%', trend: { direction: 'up', label: '+7%' } },
            ]}
          />
        ),
        code: `<Metrics
  variant="featured"
  title="Pipeline — Q2 2026"
  items={[
    { label: 'Open Deals', value: '24', trend: { direction: 'up', label: '+3' } },
    { label: 'Avg. Close', value: '18', unit: 'days' },
    { label: 'Win Rate', value: '61', unit: '%', trend: { direction: 'up', label: '+7%' } },
  ]}
/>`,
      },
    ],
  },

  SideNav: {
    type: 'Module',
    description: 'Application-level navigation shell for NOS apps. Dark-surface component built on brand color tokens. Composes Header, Section, Item, and Footer sub-components.',
    sections: [
      {
        title: 'Anatomy',
        demoClassName: 'wb-demo--module wb-demo--sidenav-full',
        render: () => (
          <SideNavDemo />
        ),
        code: `<SideNav>
  <SideNav.Header logo={<NymblIcon />} brand="nymbl" />
  <SideNav.Section>
    <SideNav.Item icon={<HomeIcon />} active>Home</SideNav.Item>
    <SideNav.Item icon={<CalendarIcon />}>Guidance</SideNav.Item>
    <SideNav.Item icon={<ClockIcon />}>Time Entry</SideNav.Item>
    <SideNav.Item icon={<SunIcon />}>PTO</SideNav.Item>
    <SideNav.Item icon={<DollarIcon />}>Expenses</SideNav.Item>
    <SideNav.Item icon={<PhoneIcon />}>Meetings</SideNav.Item>
  </SideNav.Section>
  <SideNav.Section divider>
    <SideNav.Item>CRM</SideNav.Item>
    <SideNav.Item>Demand Planning</SideNav.Item>
    <SideNav.Item>Project Management</SideNav.Item>
  </SideNav.Section>
  <SideNav.Footer name="Team Member" email="member@example.com" onAction={() => {}} />
</SideNav>`,
      },
      {
        title: 'Item states',
        render: () => (
          <div style={{ background: 'var(--color-brand-900)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-3)', display: 'flex', flexDirection: 'column', width: 240 }}>
            <SideNav.Item icon={<IconHome />} active>Home (active)</SideNav.Item>
            <SideNav.Item icon={<IconCalendar />}>Guidance (default)</SideNav.Item>
            <SideNav.Item icon={<IconClock />}>Time Entry (default)</SideNav.Item>
          </div>
        ),
        code: `<SideNav.Item icon={<Icon />} active>Home</SideNav.Item>
<SideNav.Item icon={<Icon />}>Guidance</SideNav.Item>`,
      },
    ],
  },

  /* ────────────────  Data Display  ──────────────── */

  Table: {
    type: 'Data Display',
    description: 'Sortable data grid with selection, density modes, and a sticky-header option for browsing records.',
    sections: [
      {
        title: 'Default',
        render: () => <TableDemo />,
        code: `<Table
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'owner', header: 'Owner' },
    { key: 'status', header: 'Status', render: (v) => <Badge variant={statusTone[v]}>{v}</Badge> },
    { key: 'updated', header: 'Updated', sortable: true, align: 'right' },
  ]}
  data={rows}
  onRowClick={openRow}
/>`,
      },
      {
        title: 'Selectable',
        render: () => <SelectableTableDemo />,
        code: `<Table
  columns={columns}
  data={rows}
  selectable
  selectedKeys={selected}
  onSelectChange={setSelected}
/>`,
      },
      {
        title: 'Density',
        render: () => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%' }}>
            <Table density="compact" columns={DEMO_TABLE_COLUMNS} data={DEMO_TABLE_ROWS.slice(0, 3)} />
            <Table density="comfortable" columns={DEMO_TABLE_COLUMNS} data={DEMO_TABLE_ROWS.slice(0, 3)} />
          </div>
        ),
        code: `<Table density="compact" columns={cols} data={rows} />
<Table density="comfortable" columns={cols} data={rows} />`,
      },
      {
        title: 'Empty and loading',
        render: () => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%' }}>
            <Table columns={DEMO_TABLE_COLUMNS} data={[]} emptyState="No scopes yet — start by creating one." />
            <Table columns={DEMO_TABLE_COLUMNS} data={DEMO_TABLE_ROWS} loading />
          </div>
        ),
        code: `<Table columns={cols} data={[]} emptyState="No scopes yet — start by creating one." />
<Table columns={cols} data={rows} loading />`,
      },
    ],
  },

  Avatar: {
    type: 'Data Display',
    description: 'Person, account, or entity badge. Image, initials, or icon — with optional status dot and grouped overflow.',
    sections: [
      {
        title: 'Sizes',
        render: () => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <Avatar size="xs" name="Ada Lovelace" />
            <Avatar size="sm" name="Ada Lovelace" />
            <Avatar size="md" name="Ada Lovelace" />
            <Avatar size="lg" name="Ada Lovelace" />
            <Avatar size="xl" name="Ada Lovelace" />
          </div>
        ),
        code: `<Avatar size="xs" name="Ada Lovelace" />
<Avatar size="sm" name="Ada Lovelace" />
<Avatar size="md" name="Ada Lovelace" />
<Avatar size="lg" name="Ada Lovelace" />
<Avatar size="xl" name="Ada Lovelace" />`,
      },
      {
        title: 'Tones',
        render: () => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <Avatar name="Ada Lovelace" />
            <Avatar name="Grace Hopper" />
            <Avatar name="Linus Torvalds" />
            <Avatar name="Margaret Hamilton" />
            <Avatar name="Donald Knuth" />
            <Avatar name="Anonymous" variant="neutral" />
          </div>
        ),
        code: `<Avatar name="Ada Lovelace" />              {/* deterministic tone */}
<Avatar name="Anonymous" variant="neutral" />`,
      },
      {
        title: 'With status',
        render: () => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <Avatar name="Ada Lovelace" status="online" />
            <Avatar name="Grace Hopper" status="busy" />
            <Avatar name="Linus Torvalds" status="away" />
            <Avatar name="Margaret Hamilton" status="offline" />
          </div>
        ),
        code: `<Avatar name="Ada Lovelace" status="online" />
<Avatar name="Grace Hopper" status="busy" />`,
      },
      {
        title: 'Square + icon',
        render: () => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <Avatar shape="square" name="Acme Co." />
            <Avatar shape="square" name="Globex" variant="brand" />
            <Avatar
              shape="square"
              name="Files"
              variant="neutral"
              icon={
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 4a1 1 0 011-1h4l1.5 2H13a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" />
                </svg>
              }
            />
          </div>
        ),
        code: `<Avatar shape="square" name="Acme Co." />
<Avatar shape="square" icon={<FolderIcon />} name="Files" variant="neutral" />`,
      },
      {
        title: 'Group with overflow',
        render: () => (
          <Avatar.Group max={3}>
            <Avatar name="Ada Lovelace" />
            <Avatar name="Grace Hopper" />
            <Avatar name="Linus Torvalds" />
            <Avatar name="Margaret Hamilton" />
            <Avatar name="Donald Knuth" />
            <Avatar name="Tim Berners-Lee" />
          </Avatar.Group>
        ),
        code: `<Avatar.Group max={3}>
  <Avatar name="Ada Lovelace" />
  <Avatar name="Grace Hopper" />
  <Avatar name="Linus Torvalds" />
  <Avatar name="Margaret Hamilton" />
  <Avatar name="Donald Knuth" />
</Avatar.Group>`,
      },
    ],
  },

  Progress: {
    type: 'Data Display',
    description: 'Linear and circular progress indicators for determinate completion, compact KPIs, and indeterminate work.',
    sections: [
      {
        title: 'When to use which',
        render: () => (
          <div className="wb-demo-grid wb-demo-grid--wide">
            <div className="wb-demo-panel">
              <h3>ProgressBar</h3>
              <p>Use for uploads, imports, setup tasks, quota meters, and other horizontal completion states with room for labels.</p>
              <ProgressBar label="Uploading scope.pdf" value={42} showValue />
            </div>
            <div className="wb-demo-panel">
              <h3>ProgressRing</h3>
              <p>Use for compact KPI cards, dense dashboards, and circular meters where the value needs to sit in a small footprint.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                <ProgressRing value={62} />
                <ProgressRing value={3} max={5} label="3/5" />
              </div>
            </div>
          </div>
        ),
        code: `<ProgressBar label="Uploading scope.pdf" value={42} showValue />
<ProgressRing value={62} />
<ProgressRing value={3} max={5} label="3/5" />`,
      },
      {
        title: 'ProgressBar sizes',
        render: () => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: 360 }}>
            <ProgressBar size="sm" value={32} />
            <ProgressBar size="md" value={62} />
            <ProgressBar size="lg" value={84} />
          </div>
        ),
        code: `<ProgressBar size="sm" value={32} />
<ProgressBar size="md" value={62} />
<ProgressBar size="lg" value={84} />`,
      },
      {
        title: 'ProgressBar with label and value',
        render: () => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: 360 }}>
            <ProgressBar label="Uploading scope.pdf" value={42} showValue />
            <ProgressBar label="Generating preview" value={87} showValue variant="success" />
            <ProgressBar label="Quota usage" value={94} showValue variant="warning" />
            <ProgressBar label="Failed deploy" value={60} showValue variant="error" />
          </div>
        ),
        code: `<ProgressBar label="Uploading scope.pdf" value={42} showValue />
<ProgressBar label="Quota usage" value={94} showValue variant="warning" />`,
      },
      {
        title: 'ProgressBar indeterminate',
        render: () => (
          <div style={{ width: '100%', maxWidth: 360 }}>
            <ProgressBar label="Syncing…" />
          </div>
        ),
        code: `<ProgressBar label="Syncing…" />   // value omitted = indeterminate`,
      },
      {
        title: 'ProgressRing sizes and tones',
        render: () => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-5)' }}>
            <ProgressRing value={32} />
            <ProgressRing value={62} size={64} thickness={6} />
            <ProgressRing value={87} size={80} thickness={8} variant="success" />
            <ProgressRing value={94} size={64} thickness={6} variant="warning" />
            <ProgressRing value={3} max={5} label="3/5" size={64} thickness={6} />
          </div>
        ),
        code: `<ProgressRing value={62} size={64} thickness={6} />
<ProgressRing value={3} max={5} label="3/5" />`,
      },
    ],
  },

  StatBlock: {
    type: 'Data Display',
    description: 'Single-metric tile. Use one in a Card or several in a grid; pair with Metrics module for full KPI rows.',
    sections: [
      {
        title: 'Default',
        render: () => (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--spacing-5)', width: '100%' }}>
            <StatBlock label="Active Scopes" value="124" delta={{ direction: 'up', label: '+12' }} helper="vs last month" />
            <StatBlock label="Avg. cycle time" value="4.2" unit="days" delta={{ direction: 'down', label: '−0.8d' }} trend="positive" helper="Faster than Q1" />
            <StatBlock label="Awaiting review" value="6" delta={{ direction: 'flat', label: 'No change' }} helper="3 over 7 days" />
          </div>
        ),
        code: `<StatBlock label="Active Scopes" value="124" delta={{ direction: 'up', label: '+12' }} />
<StatBlock label="Avg. cycle time" value="4.2" unit="days" delta={{ direction: 'down', label: '−0.8d' }} trend="positive" />`,
      },
      {
        title: 'Inside cards',
        render: () => (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--spacing-4)', width: '100%' }}>
            <Card>
              <Card.Body>
                <StatBlock label="Revenue" value="$48,210" delta={{ direction: 'up', label: '+12.4%' }} helper="vs last month" />
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <StatBlock label="Refunds" value="$1,240" delta={{ direction: 'up', label: '+3.1%' }} trend="negative" helper="3 refunds this week" />
              </Card.Body>
            </Card>
          </div>
        ),
        code: `<Card><Card.Body>
  <StatBlock label="Revenue" value="$48,210" delta={{ direction: 'up', label: '+12.4%' }} />
</Card.Body></Card>`,
      },
      {
        title: 'Alignment',
        render: () => (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--spacing-4)', width: '100%' }}>
            <StatBlock align="start"  label="Start" value="42" />
            <StatBlock align="center" label="Center" value="42" />
            <StatBlock align="end"    label="End" value="42" />
          </div>
        ),
        code: `<StatBlock align="start"  label="Start" value="42" />
<StatBlock align="center" label="Center" value="42" />
<StatBlock align="end"    label="End" value="42" />`,
      },
    ],
  },

  Divider: {
    type: 'Layout',
    description: 'Horizontal or vertical separator with optional inline label.',
    sections: [
      {
        title: 'Horizontal',
        render: () => (
          <div style={{ width: '100%' }}>
            <p style={{ margin: 0, color: 'var(--fg-muted)' }}>Section A</p>
            <Divider />
            <p style={{ margin: 0, color: 'var(--fg-muted)' }}>Section B</p>
          </div>
        ),
        code: `<Divider />`,
      },
      {
        title: 'With label',
        render: () => (
          <div style={{ width: '100%' }}>
            <Divider label="Today" />
            <Divider label="Yesterday" align="start" />
            <Divider label="OR" variant="dashed" />
          </div>
        ),
        code: `<Divider label="Today" />
<Divider label="Yesterday" align="start" />
<Divider label="OR" variant="dashed" />`,
      },
      {
        title: 'Vertical',
        render: () => (
          <div style={{ display: 'inline-flex', alignItems: 'center', height: 24, color: 'var(--fg-muted)' }}>
            <span>Draft</span>
            <Divider orientation="vertical" />
            <span>3 reviewers</span>
            <Divider orientation="vertical" />
            <span>Updated 2h ago</span>
          </div>
        ),
        code: `<span>Draft</span>
<Divider orientation="vertical" />
<span>3 reviewers</span>`,
      },
    ],
  },

  /* ────────────────  Forms (extended)  ──────────────── */

  'Date Pickers': {
    description: 'Single-date and date-range controls that share calendar behavior and exchange ISO date strings.',
    sections: [
      {
        title: 'When to use which',
        render: () => (
          <div className="wb-demo-grid wb-demo-grid--wide">
            <div className="wb-demo-panel">
              <h3>DatePicker</h3>
              <p>Use when the workflow needs exactly one date, such as a due date, reminder date, or scheduled review.</p>
              <DatePicker label="Due date" defaultValue="2026-04-25" />
            </div>
            <div className="wb-demo-panel">
              <h3>DateRangePicker</h3>
              <p>Use when the workflow needs a start and end boundary, such as reporting windows and project phases.</p>
              <DateRangePicker label="Reporting window" />
            </div>
          </div>
        ),
        code: `<DatePicker label="Due date" value={due} onChange={setDue} />
<DateRangePicker label="Reporting window" value={range} onChange={setRange} />`,
      },
      {
        title: 'DatePicker default',
        render: () => <DatePickerDemo />,
        code: `<DatePicker label="Due date" value={due} onChange={setDue} />`,
      },
      {
        title: 'DatePicker states',
        render: () => (
          <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%', maxWidth: 320 }}>
            <DatePicker label="With helper" helperText="We'll send a reminder 24h before." />
            <DatePicker label="Error" error="Choose a future date." />
            <DatePicker label="Disabled" disabled defaultValue="2026-04-25" />
          </div>
        ),
        code: `<DatePicker label="With helper" helperText="We'll send a reminder 24h before." />
<DatePicker label="Error" error="Choose a future date." />
<DatePicker label="Disabled" disabled defaultValue="2026-04-25" />`,
      },
      {
        title: 'DateRangePicker default',
        render: () => <DateRangePickerDemo />,
        code: `<DateRangePicker label="Reporting window" value={range} onChange={setRange} />`,
      },
    ],
  },

  Combobox: {
    description: 'Searchable single-select with keyboard navigation.',
    sections: [
      {
        title: 'Default',
        render: () => <ComboboxDemo />,
        code: `<Combobox
  label="Owner"
  options={users}
  value={owner}
  onChange={setOwner}
/>`,
      },
      {
        title: 'With descriptions',
        render: () => (
          <div style={{ width: '100%', maxWidth: 360 }}>
            <Combobox
              label="Project"
              placeholder="Search projects…"
              options={[
                { value: 'p1', label: 'Atlas Migration', description: 'Q2 — Engineering' },
                { value: 'p2', label: 'Onboarding Revamp', description: 'Q2 — Growth' },
                { value: 'p3', label: 'Billing v2', description: 'Q3 — Finance' },
                { value: 'p4', label: 'Compliance Audit', description: 'Ongoing — Legal', disabled: true },
              ]}
            />
          </div>
        ),
        code: `<Combobox
  label="Project"
  options={[
    { value: 'p1', label: 'Atlas Migration', description: 'Q2 — Engineering' },
    ...
  ]}
/>`,
      },
    ],
  },

  TagInput: {
    description: 'Multi-value text input. Tags committed on Enter, Tab, or comma.',
    sections: [
      {
        title: 'Default',
        render: () => (
          <div style={{ width: '100%', maxWidth: 480 }}>
            <TagInput label="Recipients" defaultValue={['ada@nymbl.io', 'grace@nymbl.io']} />
          </div>
        ),
        code: `<TagInput label="Recipients" defaultValue={['ada@nymbl.io', 'grace@nymbl.io']} />`,
      },
      {
        title: 'With validation and cap',
        render: () => (
          <div style={{ width: '100%', maxWidth: 480 }}>
            <TagInput
              label="Tags"
              helperText="Up to 5 lowercase tags."
              maxTags={5}
              validate={(v) => /^[a-z0-9-]+$/.test(v)}
              defaultValue={['scope', 'q2']}
            />
          </div>
        ),
        code: `<TagInput
  label="Tags"
  maxTags={5}
  validate={(v) => /^[a-z0-9-]+$/.test(v)}
/>`,
      },
    ],
  },

  NumberInput: {
    description: 'Numeric field with stepper buttons, clamping, and prefix/suffix slots.',
    sections: [
      {
        title: 'Default',
        render: () => <NumberInputDemo />,
        code: `<NumberInput label="Quantity" min={0} step={1} value={qty} onChange={setQty} />`,
      },
      {
        title: 'With affixes',
        render: () => (
          <div style={{ display: 'grid', gap: 'var(--spacing-4)', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', maxWidth: 480 }}>
            <NumberInput label="Hours" suffix="hrs" step={0.5} precision={2} defaultValue={8} />
            <NumberInput label="Budget" prefix="$" step={100} defaultValue={2400} />
          </div>
        ),
        code: `<NumberInput label="Hours" suffix="hrs" step={0.5} precision={2} defaultValue={8} />
<NumberInput label="Budget" prefix="$" step={100} defaultValue={2400} />`,
      },
      {
        title: 'States',
        render: () => (
          <div style={{ display: 'grid', gap: 'var(--spacing-3)', maxWidth: 240 }}>
            <NumberInput label="Disabled" disabled defaultValue={5} />
            <NumberInput label="Error" error="Must be greater than 0." defaultValue={0} min={0} />
          </div>
        ),
        code: `<NumberInput label="Disabled" disabled defaultValue={5} />
<NumberInput label="Error" error="Must be greater than 0." defaultValue={0} />`,
      },
    ],
  },

  FileUpload: {
    description: 'Drag-and-drop dropzone with click-to-browse. Emits File objects; upload logic stays with the host.',
    sections: [
      {
        title: 'Default',
        render: () => <FileUploadDemo />,
        code: `<FileUpload label="Attachments" multiple onChange={setFiles} />`,
      },
      {
        title: 'Constrained',
        render: () => (
          <div style={{ width: '100%', maxWidth: 480 }}>
            <FileUpload
              label="Cover image"
              accept="image/*"
              maxSize={2 * 1024 * 1024}
              hint="Drop a PNG or JPG (max 2 MB)"
            />
          </div>
        ),
        code: `<FileUpload
  label="Cover image"
  accept="image/*"
  maxSize={2 * 1024 * 1024}
/>`,
      },
    ],
  },

  // ── Batch 6 — Polish & Overlay ─────────────────────────────────────

  Kbd: {
    type: 'Foundation',
    description: 'Keyboard key display. Renders single keys or chord combinations with a distinct physical key appearance.',
    sections: [
      {
        title: 'Single keys',
        render: () => (
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>⌥</Kbd>
            <Kbd>Ctrl</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>Tab</Kbd>
            <Kbd>K</Kbd>
          </div>
        ),
        code: `<Kbd>⌘</Kbd>
<Kbd>Enter</Kbd>
<Kbd>Esc</Kbd>`,
      },
      {
        title: 'Chord combinations',
        render: () => (
          <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Kbd>{['⌘', 'K']}</Kbd>
            <Kbd>{['⌘', 'S']}</Kbd>
            <Kbd>{['⌘', '⇧', 'P']}</Kbd>
            <Kbd>{['Ctrl', 'Z']}</Kbd>
          </div>
        ),
        code: `<Kbd>{['⌘', 'K']}</Kbd>
<Kbd>{['⌘', '⇧', 'P']}</Kbd>`,
      },
      {
        title: 'Convenience aliases',
        render: () => (
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Kbd.Cmd />
            <Kbd.Ctrl />
            <Kbd.Shift />
            <Kbd.Alt />
            <Kbd.Enter />
            <Kbd.Esc />
          </div>
        ),
        code: `<Kbd.Cmd />
<Kbd.Ctrl />
<Kbd.Shift />
<Kbd.Alt />
<Kbd.Enter />
<Kbd.Esc />`,
      },
      {
        title: 'Size: sm',
        render: () => (
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Kbd size="sm">{['⌘', 'K']}</Kbd>
            <Kbd size="sm">Enter</Kbd>
            <Kbd size="sm">Esc</Kbd>
          </div>
        ),
        code: `<Kbd size="sm">{['⌘', 'K']}</Kbd>`,
      },
      {
        title: 'In context',
        render: () => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
            {[
              { label: 'Quick open', chord: ['⌘', 'K'] },
              { label: 'Save scope', chord: ['⌘', 'S'] },
              { label: 'Command palette', chord: ['⌘', '⇧', 'P'] },
              { label: 'Dismiss', chord: ['Esc'] },
            ].map(({ label, chord }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-2) var(--spacing-3)', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)' }}>
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--fg-default)' }}>{label}</span>
                <Kbd size="sm">{chord.length === 1 ? chord[0] : chord}</Kbd>
              </div>
            ))}
          </div>
        ),
        code: `<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span>Quick open</span>
  <Kbd size="sm">{['⌘', 'K']}</Kbd>
</div>`,
      },
    ],
  },

  'Alerts & Banners': {
    type: 'Feedback',
    description: 'Contextual system messages for inline page feedback and full-width page-level notices.',
    sections: [
      {
        title: 'When to use which',
        render: () => (
          <div className="wb-demo-grid wb-demo-grid--wide">
            <div className="wb-demo-panel">
              <h3>Alert</h3>
              <p>Use inside page content, cards, and forms when the message belongs to a specific section or action.</p>
              <Alert variant="warning" title="Effort estimate missing">
                3 requirements don't have hours logged.
              </Alert>
            </div>
            <div className="wb-demo-panel">
              <h3>Banner</h3>
              <p>Use for page-level announcements, broad system state, and messages that should span the available content width.</p>
              <Banner variant="info" title="Maintenance window tonight">
                NOS will be offline from 11 PM – 1 AM.
              </Banner>
            </div>
          </div>
        ),
        code: `<Alert variant="warning" title="Effort estimate missing">
  3 requirements don't have hours logged.
</Alert>
<Banner variant="info" title="Maintenance window tonight">
  NOS will be offline from 11 PM – 1 AM.
</Banner>`,
      },
      {
        title: 'Alert variants',
        render: () => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 560 }}>
            <Alert variant="info" title="Scope under review">
              This scope has been submitted and is awaiting approval from the project lead.
            </Alert>
            <Alert variant="success" title="Scope approved">
              All requirements have been reviewed and the scope has been marked as approved.
            </Alert>
            <Alert variant="warning" title="Effort estimate missing">
              3 requirements don't have hours logged. Update them before the review deadline.
            </Alert>
            <Alert variant="error" title="Submission blocked">
              The scope cannot be submitted while requirements are in a rejected state.
            </Alert>
          </div>
        ),
        code: `<Alert variant="info" title="Scope under review">
  This scope has been submitted and is awaiting approval.
</Alert>
<Alert variant="success" title="Scope approved">
  All requirements have been reviewed.
</Alert>
<Alert variant="warning" title="Effort estimate missing">
  3 requirements don't have hours logged.
</Alert>
<Alert variant="error" title="Submission blocked">
  Cannot submit while requirements are rejected.
</Alert>`,
      },
      {
        title: 'Alert dismissable',
        render: () => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 560 }}>
            <Alert variant="info" title="New template available" dismissable>
              A new scope template for compliance workflows has been added. Apply it from the Templates tab.
            </Alert>
            <Alert variant="warning" title="Review deadline approaching" dismissable>
              The Q2 compliance scope is due for review in 2 days.
            </Alert>
          </div>
        ),
        code: `<Alert variant="info" title="New template available" dismissable>
  A new scope template has been added.
</Alert>`,
      },
      {
        title: 'Alert title only',
        render: () => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 560 }}>
            <Alert variant="success" title="Scope saved successfully." dismissable />
            <Alert variant="error" title="Failed to submit — try again." dismissable />
          </div>
        ),
        code: `<Alert variant="success" title="Scope saved successfully." dismissable />`,
      },
      {
        title: 'Banner variants',
        render: () => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
            <Banner variant="info" title="Maintenance window tonight">
              NOS will be offline from 11 PM – 1 AM for scheduled maintenance. Save your work before then.
            </Banner>
            <Banner variant="success" title="Q2 scopes have been published">
              All approved scopes for Q2 are now visible to stakeholders.
            </Banner>
            <Banner variant="warning" title="Data export is temporarily unavailable">
              The export service is degraded. Engineering is investigating.
            </Banner>
            <Banner variant="error" title="Sync failure detected">
              Changes made in the last 10 minutes may not have been saved. Please refresh and verify.
            </Banner>
          </div>
        ),
        code: `<Banner variant="info" title="Maintenance window tonight">
  NOS will be offline from 11 PM – 1 AM.
</Banner>`,
      },
      {
        title: 'Banner dismissable',
        render: () => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
            <Banner variant="info" title="Welcome back, Alex." dismissable>
              You have 3 scopes pending review and 1 comment awaiting response.
            </Banner>
          </div>
        ),
        code: `<Banner variant="info" title="Welcome back, Alex." dismissable>
  You have 3 scopes pending review.
</Banner>`,
      },
    ],
  },

  Accordion: {
    type: 'Layout',
    description: 'Collapsible content sections for progressive disclosure of related information.',
    sections: [
      {
        title: 'Default (single open)',
        render: () => (
          <div style={{ width: '100%', maxWidth: 560 }}>
            <Accordion>
              <Accordion.Item title="Scope overview" defaultOpen>
                This scope covers the end-to-end data migration from the legacy Atlas system to the new NOS platform. All L1–L3 requirements must be reviewed before submission.
              </Accordion.Item>
              <Accordion.Item title="Requirements">
                Twelve functional requirements have been identified across three capability areas: data ingestion, transformation, and validation. Six are currently approved.
              </Accordion.Item>
              <Accordion.Item title="Acceptance criteria">
                All records must be migrated with zero data loss. Post-migration audit report required within 5 business days.
              </Accordion.Item>
              <Accordion.Item title="Out of scope">
                Legacy system decommission, user training, and downstream API changes are not included in this scope.
              </Accordion.Item>
            </Accordion>
          </div>
        ),
        code: `<Accordion>
  <Accordion.Item title="Scope overview" defaultOpen>
    This scope covers the end-to-end data migration…
  </Accordion.Item>
  <Accordion.Item title="Requirements">
    Twelve functional requirements have been identified…
  </Accordion.Item>
</Accordion>`,
      },
      {
        title: 'Multiple open',
        render: () => (
          <div style={{ width: '100%', maxWidth: 560 }}>
            <Accordion multiple>
              <Accordion.Item title="Data ingestion" defaultOpen>
                Raw records are pulled from the Atlas export via SFTP. Batch jobs run nightly at 2 AM.
              </Accordion.Item>
              <Accordion.Item title="Transformation rules" defaultOpen>
                Field mappings follow the NOS canonical schema. Date fields are normalized to ISO 8601.
              </Accordion.Item>
              <Accordion.Item title="Validation & QA">
                Each batch is validated against checksum totals. Failures trigger an alert to the data team.
              </Accordion.Item>
            </Accordion>
          </div>
        ),
        code: `<Accordion multiple>
  <Accordion.Item title="Data ingestion" defaultOpen>…</Accordion.Item>
  <Accordion.Item title="Transformation rules" defaultOpen>…</Accordion.Item>
  <Accordion.Item title="Validation & QA">…</Accordion.Item>
</Accordion>`,
      },
      {
        title: 'Disabled item',
        render: () => (
          <div style={{ width: '100%', maxWidth: 560 }}>
            <Accordion>
              <Accordion.Item title="Published requirements">
                Six requirements are currently approved and published to the client portal.
              </Accordion.Item>
              <Accordion.Item title="Locked history" disabled>
                Audit history is locked pending compliance review.
              </Accordion.Item>
            </Accordion>
          </div>
        ),
        code: `<Accordion.Item title="Locked history" disabled>
  Audit history is locked pending compliance review.
</Accordion.Item>`,
      },
    ],
  },

  'Popover & Menu': {
    type: 'Overlay',
    description: 'Anchored overlay primitives for custom panels and contextual action menus.',
    sections: [
      {
        title: 'When to use which',
        render: () => (
          <div className="wb-demo-grid wb-demo-grid--wide">
            <div className="wb-demo-panel">
              <h3>Popover</h3>
              <p>Use when the panel content is custom: details, compact forms, rich previews, or non-menu controls.</p>
              <Popover
                trigger={<Button variant="outline" size="sm">Scope info</Button>}
                content={<div style={{ padding: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', color: 'var(--fg-subtle)' }}>Custom detail content.</div>}
              />
            </div>
            <div className="wb-demo-panel">
              <h3>Menu</h3>
              <p>Use for a list of actions anchored to a trigger. Menu builds on Popover and adds item semantics.</p>
              <Menu
                trigger={<Button variant="outline" size="sm">Scope actions</Button>}
                items={[
                  { label: 'Open scope', onClick: () => {} },
                  { label: 'Duplicate', onClick: () => {} },
                  { separator: true },
                  { label: 'Archive scope', variant: 'danger', onClick: () => {} },
                ]}
              />
            </div>
          </div>
        ),
        code: `<Popover trigger={<Button>Scope info</Button>} content={<div>Custom detail content.</div>} />
<Menu
  trigger={<Button>Scope actions</Button>}
  items={[
    { label: 'Open scope', onClick: () => {} },
    { separator: true },
    { label: 'Archive scope', variant: 'danger', onClick: () => {} },
  ]}
/>`,
      },
      {
        title: 'Popover basic',
        render: () => (
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
            <Popover
              trigger={<Button variant="outline" size="sm">Scope info</Button>}
              content={
                <div style={{ padding: 'var(--spacing-3)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', minWidth: 220 }}>
                  <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--fg-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scope details</div>
                  {[['Client', 'Nymbl Internal'], ['Created', 'Apr 3, 2025'], ['Modified', 'Apr 24, 2025'], ['Status', 'In Review']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
                      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--fg-subtle)' }}>{k}</span>
                      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--fg-default)', fontWeight: 'var(--font-weight-medium)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              }
            />
            <Popover
              placement="bottom-end"
              trigger={<Button variant="outline" size="sm">Placement: bottom-end</Button>}
              content={<div style={{ padding: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', color: 'var(--fg-subtle)' }}>Anchored to the right edge of the trigger.</div>}
            />
          </div>
        ),
        code: `<Popover
  trigger={<Button>Scope info</Button>}
  content={<div>Panel content</div>}
/>`,
      },
      {
        title: 'Popover placements',
        render: () => (
          <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap', justifyContent: 'center', padding: 'var(--spacing-6) 0' }}>
            {['bottom-start', 'bottom', 'bottom-end', 'top-start', 'top', 'top-end'].map((p) => (
              <Popover
                key={p}
                placement={p}
                trigger={<Button variant="ghost" size="sm">{p}</Button>}
                content={<div style={{ padding: 'var(--spacing-2) var(--spacing-3)', fontSize: 'var(--font-size-sm)', color: 'var(--fg-subtle)' }}>Placed {p}</div>}
              />
            ))}
          </div>
        ),
        code: `<Popover placement="top-start" trigger={<Button>Open</Button>} content={<div>…</div>} />`,
      },
      {
        title: 'Menu items array',
        render: () => (
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
            <Menu
              trigger={<Button variant="outline" size="sm">Scope actions</Button>}
              items={[
                { label: 'Open scope', onClick: () => {} },
                { label: 'Duplicate', onClick: () => {} },
                { label: 'Export as PDF', onClick: () => {} },
                { separator: true },
                { label: 'Archive scope', variant: 'danger', onClick: () => {} },
              ]}
            />
            <Menu
              trigger={<Button variant="ghost" size="sm">···</Button>}
              items={[
                { label: 'Edit requirement', onClick: () => {} },
                { label: 'Change status', onClick: () => {} },
                { separator: true },
                { label: 'Remove', variant: 'danger', onClick: () => {} },
              ]}
            />
          </div>
        ),
        code: `<Menu
  trigger={<Button variant="outline" size="sm">Scope actions</Button>}
  items={[
    { label: 'Open scope', onClick: () => {} },
    { label: 'Duplicate', onClick: () => {} },
    { separator: true },
    { label: 'Archive scope', variant: 'danger', onClick: () => {} },
  ]}
/>`,
      },
      {
        title: 'Menu compound custom items',
        render: () => (
          <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
            <Menu trigger={<Button variant="outline" size="sm">Assign owner</Button>}>
              <Menu.Item onClick={() => {}}>Ada Lovelace</Menu.Item>
              <Menu.Item onClick={() => {}}>Grace Hopper</Menu.Item>
              <Menu.Item onClick={() => {}}>Margaret Hamilton</Menu.Item>
              <Menu.Separator />
              <Menu.Item onClick={() => {}}>Unassign</Menu.Item>
            </Menu>
          </div>
        ),
        code: `<Menu trigger={<Button>Assign owner</Button>}>
  <Menu.Item onClick={() => {}}>Ada Lovelace</Menu.Item>
  <Menu.Item onClick={() => {}}>Grace Hopper</Menu.Item>
  <Menu.Separator />
  <Menu.Item onClick={() => {}}>Unassign</Menu.Item>
</Menu>`,
      },
      {
        title: 'Menu disabled items',
        render: () => (
          <Menu
            trigger={<Button variant="outline" size="sm">Status change</Button>}
            items={[
              { label: 'Set to Draft', onClick: () => {} },
              { label: 'Submit for review', onClick: () => {} },
              { label: 'Approve', disabled: true, onClick: () => {} },
              { label: 'Reject', disabled: true, onClick: () => {} },
              { separator: true },
              { label: 'Archive', variant: 'danger', onClick: () => {} },
            ]}
          />
        ),
        code: `<Menu
  trigger={<Button>Status change</Button>}
  items={[
    { label: 'Submit for review', onClick: () => {} },
    { label: 'Approve', disabled: true, onClick: () => {} },
  ]}
/>`,
      },
    ],
  },

  // ── Batch 5 — NOS Domain ───────────────────────────────────────────

  HierarchyTree: {
    type: 'NOS Domain',
    description: 'Collapsible L1/L2/L3 tree for representing scope structure, capability breakdown, and requirement nesting.',
    sections: [
      {
        title: 'Scope hierarchy',
        render: () => (
          <div style={{ width: '100%', maxWidth: 560 }}>
            <HierarchyTree>
              <HierarchyTree.Node label="Data Migration" meta={<Badge variant="info" size="sm" dot>In Review</Badge>}>
                <HierarchyTree.Node label="Ingestion" meta={<span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--fg-subtle)' }}>40 hrs</span>}>
                  <HierarchyTree.Node label="SFTP batch job setup" leaf meta={<Badge variant="success" size="sm" dot>Approved</Badge>} />
                  <HierarchyTree.Node label="Schema validation rules" leaf meta={<Badge variant="neutral" size="sm" dot>Draft</Badge>} />
                </HierarchyTree.Node>
                <HierarchyTree.Node label="Transformation" meta={<span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--fg-subtle)' }}>24 hrs</span>}>
                  <HierarchyTree.Node label="Field mapping to NOS schema" leaf meta={<Badge variant="success" size="sm" dot>Approved</Badge>} />
                  <HierarchyTree.Node label="Date normalization (ISO 8601)" leaf meta={<Badge variant="success" size="sm" dot>Approved</Badge>} />
                </HierarchyTree.Node>
                <HierarchyTree.Node label="Validation & QA" meta={<span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--fg-subtle)' }}>16 hrs</span>}>
                  <HierarchyTree.Node label="Checksum verification" leaf meta={<Badge variant="error" size="sm" dot>Rejected</Badge>} />
                </HierarchyTree.Node>
              </HierarchyTree.Node>
            </HierarchyTree>
          </div>
        ),
        code: `<HierarchyTree>
  <HierarchyTree.Node label="Data Migration">
    <HierarchyTree.Node label="Ingestion">
      <HierarchyTree.Node label="SFTP batch job setup" leaf />
    </HierarchyTree.Node>
  </HierarchyTree.Node>
</HierarchyTree>`,
      },
      {
        title: 'Selected and disabled',
        render: () => (
          <div style={{ width: '100%', maxWidth: 480 }}>
            <HierarchyTree>
              <HierarchyTree.Node label="Onboarding Revamp" defaultExpanded>
                <HierarchyTree.Node label="User registration flow" leaf selected />
                <HierarchyTree.Node label="Email verification" leaf />
                <HierarchyTree.Node label="SSO integration" leaf disabled />
              </HierarchyTree.Node>
            </HierarchyTree>
          </div>
        ),
        code: `<HierarchyTree.Node label="User registration flow" leaf selected />
<HierarchyTree.Node label="SSO integration" leaf disabled />`,
      },
    ],
  },

  RequirementList: {
    type: 'NOS Domain',
    description: 'Structured list of scope requirements with status, priority, owner, and action slots.',
    sections: [
      {
        title: 'Basic list',
        render: () => (
          <div style={{ width: '100%', maxWidth: 680 }}>
            <RequirementList>
              <RequirementList.Item number="1.1" status="approved" priority="high" owner="A. Lovelace">
                The system shall export all scope records to CSV with full field fidelity.
              </RequirementList.Item>
              <RequirementList.Item number="1.2" status="in-review" priority="high" owner="G. Hopper">
                All data transformations must be idempotent and re-runnable without side effects.
              </RequirementList.Item>
              <RequirementList.Item number="1.3" status="draft" priority="medium" owner="M. Hamilton">
                The migration log shall be retained for a minimum of 90 days in the audit trail.
              </RequirementList.Item>
              <RequirementList.Item number="1.4" status="rejected" priority="low" owner="D. Knuth">
                Legacy record IDs should be preserved as a secondary identifier in the NOS schema.
              </RequirementList.Item>
              <RequirementList.Item number="1.5" status="approved" priority="medium" owner="A. Lovelace">
                A post-migration validation report must be generated and reviewed within 5 business days.
              </RequirementList.Item>
            </RequirementList>
          </div>
        ),
        code: `<RequirementList>
  <RequirementList.Item number="1.1" status="approved" priority="high" owner="A. Lovelace">
    The system shall export all scope records to CSV with full field fidelity.
  </RequirementList.Item>
</RequirementList>`,
      },
      {
        title: 'With actions slot',
        render: () => (
          <div style={{ width: '100%', maxWidth: 680 }}>
            <RequirementList>
              {[
                { num: '2.1', text: 'User authentication must support SSO via SAML 2.0.', status: 'approved', priority: 'high', owner: 'G. Hopper' },
                { num: '2.2', text: 'Session tokens must expire after 8 hours of inactivity.', status: 'in-review', priority: 'medium', owner: 'M. Hamilton' },
                { num: '2.3', text: 'All API endpoints must require bearer token authentication.', status: 'draft', priority: 'high', owner: 'A. Lovelace' },
              ].map(({ num, text, status, priority, owner }) => (
                <RequirementList.Item
                  key={num}
                  number={num}
                  status={status}
                  priority={priority}
                  owner={owner}
                  actions={
                    <Menu
                      trigger={<Button variant="ghost" size="sm">···</Button>}
                      items={[
                        { label: 'Edit', onClick: () => {} },
                        { label: 'Change status', onClick: () => {} },
                        { separator: true },
                        { label: 'Remove', variant: 'danger', onClick: () => {} },
                      ]}
                    />
                  }
                >
                  {text}
                </RequirementList.Item>
              ))}
            </RequirementList>
          </div>
        ),
        code: `<RequirementList.Item
  number="2.1"
  status="approved"
  priority="high"
  owner="G. Hopper"
  actions={<Menu trigger={<Button size="sm">···</Button>} items={[…]} />}
>
  User authentication must support SSO via SAML 2.0.
</RequirementList.Item>`,
      },
    ],
  },

  Timeline: {
    type: 'NOS Domain',
    description: 'Vertical activity feed for change logs, audit trails, and event histories.',
    sections: [
      {
        title: 'Scope activity',
        render: () => (
          <div style={{ width: '100%', maxWidth: 480 }}>
            <Timeline>
              <Timeline.Item actor="R. Lefou" action="changed status to" highlight="In Review" timestamp="2h ago" />
              <Timeline.Item actor="A. Lovelace" action="approved requirement" highlight="1.4 — Legacy ID preservation" timestamp="1d ago" />
              <Timeline.Item actor="G. Hopper" action="added comment on" highlight="Requirement 1.2" timestamp="2d ago" />
              <Timeline.Item actor="M. Hamilton" action="rejected requirement" highlight="1.4" timestamp="3d ago">
                Rejection reason: ID conflicts with existing NOS schema — needs redesign.
              </Timeline.Item>
              <Timeline.Item actor="System" action="scope created" highlight="Atlas Data Migration" timestamp="Apr 3, 2025" />
            </Timeline>
          </div>
        ),
        code: `<Timeline>
  <Timeline.Item
    actor="R. Lefou"
    action="changed status to"
    highlight="In Review"
    timestamp="2h ago"
  />
  <Timeline.Item actor="System" action="scope created" highlight="Atlas Data Migration" timestamp="Apr 3, 2025" />
</Timeline>`,
      },
      {
        title: 'With body content',
        render: () => (
          <div style={{ width: '100%', maxWidth: 480 }}>
            <Timeline>
              <Timeline.Item actor="A. Smith" action="left a comment" timestamp="1d ago">
                <div style={{ marginTop: 'var(--spacing-2)', padding: 'var(--spacing-3)', background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', fontSize: 'var(--font-size-sm)', color: 'var(--fg-default)', lineHeight: 'var(--line-height-relaxed)' }}>
                  "The acceptance criteria for requirement 1.3 needs to be more specific about the retention policy — 90 days from migration date or from creation date?"
                </div>
              </Timeline.Item>
              <Timeline.Item actor="R. Lefou" action="updated effort estimate" highlight="from 40 hrs to 52 hrs" timestamp="3d ago" />
              <Timeline.Item actor="A. Lovelace" action="added team member" highlight="Grace Hopper" timestamp="5d ago" />
            </Timeline>
          </div>
        ),
        code: `<Timeline.Item actor="A. Smith" action="left a comment" timestamp="1d ago">
  <div>Comment body content…</div>
</Timeline.Item>`,
      },
    ],
  },

  CommentThread: {
    type: 'NOS Domain',
    description: 'Threaded review comments for in-scope discussions, requirement feedback, and resolution tracking.',
    sections: [
      {
        title: 'Thread with replies',
        render: () => <CommentThreadDemo />,
        code: `<CommentThread onSubmit={(text) => console.log(text)}>
  <CommentThread.Comment author="R. Lefou" timestamp="2d ago" onResolve={() => {}}>
    The acceptance criterion for req 1.3 is ambiguous.
    <CommentThread.Reply author="A. Lovelace" timestamp="1d ago">
      I've updated the text — retention is from migration date.
    </CommentThread.Reply>
  </CommentThread.Comment>
</CommentThread>`,
      },
      {
        title: 'Resolved thread',
        render: () => (
          <div style={{ width: '100%', maxWidth: 480 }}>
            <CommentThread>
              <CommentThread.Comment author="G. Hopper" timestamp="5d ago" resolved>
                Should we add a rollback requirement to the migration scope?
                <CommentThread.Reply author="A. Lovelace" timestamp="4d ago">
                  Good catch — added as requirement 1.6.
                </CommentThread.Reply>
                <CommentThread.Reply author="G. Hopper" timestamp="4d ago">
                  Confirmed, looks good.
                </CommentThread.Reply>
              </CommentThread.Comment>
            </CommentThread>
          </div>
        ),
        code: `<CommentThread.Comment author="G. Hopper" timestamp="5d ago" resolved>
  Should we add a rollback requirement?
</CommentThread.Comment>`,
      },
    ],
  },

  Stepper: {
    type: 'Layout',
    description: 'Multi-step progress indicator for sequential flows like scope creation and submission wizards.',
    sections: [
      {
        title: 'Horizontal',
        render: () => <StepperDemo orientation="horizontal" />,
        code: `<Stepper
  steps={[
    { label: 'Scope details' },
    { label: 'Requirements', description: 'Add L1–L3 items' },
    { label: 'Team & effort' },
    { label: 'Review & submit' },
  ]}
  currentStep={1}
  onStepClick={(i) => setStep(i)}
/>`,
      },
      {
        title: 'Vertical',
        render: () => <StepperDemo orientation="vertical" />,
        code: `<Stepper
  orientation="vertical"
  steps={[…]}
  currentStep={2}
/>`,
      },
      {
        title: 'Size: sm',
        render: () => (
          <Stepper
            size="sm"
            steps={[
              { label: 'Details' },
              { label: 'Requirements' },
              { label: 'Review' },
            ]}
            currentStep={1}
          />
        ),
        code: `<Stepper size="sm" steps={[…]} currentStep={1} />`,
      },
    ],
  },

  FieldGroup: {
    type: 'Form layout',
    description: 'Semantic grouping of related fields with shared title, description, and consistent column layout.',
    sections: [
      {
        title: 'Single column',
        render: () => (
          <div style={{ width: '100%', maxWidth: 520 }}>
            <FieldGroup title="Identity" description="Used in headers, exports, and audit trails.">
              <Input label="Full name" defaultValue="Ada Lovelace" />
              <Input label="Email" type="email" defaultValue="ada@nymbl.io" />
            </FieldGroup>
          </div>
        ),
        code: `<FieldGroup title="Identity" description="Used in headers, exports, and audit trails.">
  <Input label="Full name" />
  <Input label="Email" type="email" />
</FieldGroup>`,
      },
      {
        title: 'Two columns + actions',
        render: () => (
          <div style={{ width: '100%', maxWidth: 720 }}>
            <FieldGroup
              title="Billing address"
              description="Where invoices are sent."
              columns={2}
              actions={<Button size="sm" variant="ghost">Copy from shipping</Button>}
            >
              <Input label="Street" />
              <Input label="Apt / Suite" />
              <Input label="City" />
              <Input label="Postal code" />
              <FieldGroup.Row>
                <Input label="Notes for the courier" />
              </FieldGroup.Row>
            </FieldGroup>
          </div>
        ),
        code: `<FieldGroup title="Billing address" columns={2} actions={<Button size="sm" variant="ghost">Copy from shipping</Button>}>
  <Input label="Street" />
  <Input label="Apt / Suite" />
  <Input label="City" />
  <Input label="Postal code" />
  <FieldGroup.Row>
    <Input label="Notes for the courier" />
  </FieldGroup.Row>
</FieldGroup>`,
      },
    ],
  },
};

/* ── Demo helpers ─────────────────────────────────────────────────── */

function SideNavDemo() {
  const [active, setActive] = useState('Home');
  const mainItems = ['Home', 'Guidance', 'Time Entry', 'PTO', 'Expenses', 'Meetings'];
  const moreItems = ['CRM', 'Demand Planning', 'Project Management'];
  const icons = {
    'Home': <IconHome />, 'Guidance': <IconCalendar />, 'Time Entry': <IconClock />,
    'PTO': <IconSun />, 'Expenses': <IconDollar />, 'Meetings': <IconPhone />,
  };
  return (
    <SideNav style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <SideNav.Header logo={<NymblMark />} brand="nymbl" />
      <SideNav.Section>
        {mainItems.map((item) => (
          <SideNav.Item key={item} icon={icons[item]} active={active === item} onClick={() => setActive(item)}>
            {item}
          </SideNav.Item>
        ))}
      </SideNav.Section>
      <SideNav.Section divider>
        {moreItems.map((item) => (
          <SideNav.Item key={item} active={active === item} onClick={() => setActive(item)}>
            {item}
          </SideNav.Item>
        ))}
      </SideNav.Section>
      <SideNav.Footer name="Team Member" email="member@example.com" onAction={() => {}} />
    </SideNav>
  );
}

/* Inline SVG icons for the demo — replace with your icon library in production */
const NymblMark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" />
    <polyline points="12,2 12,22" />
    <line x1="2" y1="8" x2="22" y2="8" />
    <line x1="2" y1="16" x2="22" y2="16" />
  </svg>
);
const IconHome = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7.5L9 2l7 5.5V16a1 1 0 01-1 1H3a1 1 0 01-1-1V7.5z" />
    <path d="M7 17V11h4v6" />
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="14" height="14" rx="2" />
    <line x1="6" y1="1" x2="6" y2="5" />
    <line x1="12" y1="1" x2="12" y2="5" />
    <line x1="2" y1="8" x2="16" y2="8" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="9" r="7" />
    <polyline points="9,5 9,9 12,11" />
  </svg>
);
const IconSun = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="9" r="3" />
    <line x1="9" y1="1" x2="9" y2="3" /><line x1="9" y1="15" x2="9" y2="17" />
    <line x1="1" y1="9" x2="3" y2="9" /><line x1="15" y1="9" x2="17" y2="9" />
    <line x1="3.2" y1="3.2" x2="4.6" y2="4.6" /><line x1="13.4" y1="13.4" x2="14.8" y2="14.8" />
    <line x1="14.8" y1="3.2" x2="13.4" y2="4.6" /><line x1="4.6" y1="13.4" x2="3.2" y2="14.8" />
  </svg>
);
const IconDollar = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="1" x2="9" y2="17" />
    <path d="M13 4H7a3 3 0 000 6h4a3 3 0 010 6H5" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2h3l1.5 4-2 1.2a10 10 0 004.3 4.3L11 9.5l4 1.5v3a1 1 0 01-1 1A15 15 0 012 3a1 1 0 011-1z" />
  </svg>
);

/* ── Batch 2 / 3 demo helpers ─────────────────────────────────────── */

const STATUS_TONE = {
  Draft: 'neutral',
  'In Review': 'warning',
  Approved: 'success',
  Archived: 'neutral',
  Rejected: 'error',
};

const DEMO_TABLE_COLUMNS = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'owner', header: 'Owner' },
  {
    key: 'status',
    header: 'Status',
    render: (v) => <Badge variant={STATUS_TONE[v]} dot>{v}</Badge>,
  },
  { key: 'updated', header: 'Updated', sortable: true, align: 'right' },
];

const DEMO_TABLE_ROWS = [
  { id: 1, name: 'Atlas Migration', owner: 'Ada Lovelace',     status: 'In Review', updated: 'Apr 24' },
  { id: 2, name: 'Onboarding Revamp', owner: 'Grace Hopper',   status: 'Draft',     updated: 'Apr 22' },
  { id: 3, name: 'Billing v2',      owner: 'Linus Torvalds',   status: 'Approved',  updated: 'Apr 19' },
  { id: 4, name: 'Compliance Audit', owner: 'Margaret Hamilton', status: 'Rejected', updated: 'Apr 11' },
  { id: 5, name: 'Sunset legacy SDK', owner: 'Donald Knuth',   status: 'Archived',  updated: 'Mar 30' },
];

function TableDemo() {
  return (
    <Table
      columns={DEMO_TABLE_COLUMNS}
      data={DEMO_TABLE_ROWS}
      defaultSort={{ key: 'updated', direction: 'desc' }}
      onRowClick={() => {}}
    />
  );
}

function SelectableTableDemo() {
  const [selected, setSelected] = useState([1, 3]);
  return (
    <Table
      columns={DEMO_TABLE_COLUMNS}
      data={DEMO_TABLE_ROWS}
      selectable
      selectedKeys={selected}
      onSelectChange={setSelected}
    />
  );
}

function DatePickerDemo() {
  const [value, setValue] = useState(null);
  return (
    <div style={{ width: '100%', maxWidth: 320 }}>
      <DatePicker label="Due date" value={value} onChange={setValue} placeholder="Pick a date" />
    </div>
  );
}

function DateRangePickerDemo() {
  const [range, setRange] = useState({ start: null, end: null });
  return (
    <div style={{ width: '100%', maxWidth: 360 }}>
      <DateRangePicker label="Reporting window" value={range} onChange={setRange} />
    </div>
  );
}

function ComboboxDemo() {
  const [owner, setOwner] = useState(null);
  const options = [
    { value: 'ada',    label: 'Ada Lovelace' },
    { value: 'grace',  label: 'Grace Hopper' },
    { value: 'linus',  label: 'Linus Torvalds' },
    { value: 'maggie', label: 'Margaret Hamilton' },
    { value: 'don',    label: 'Donald Knuth' },
    { value: 'tim',    label: 'Tim Berners-Lee' },
  ];
  return (
    <div style={{ width: '100%', maxWidth: 360 }}>
      <Combobox label="Owner" options={options} value={owner} onChange={setOwner} placeholder="Search owners…" />
    </div>
  );
}

function NumberInputDemo() {
  const [value, setValue] = useState(1);
  return (
    <div style={{ width: 200 }}>
      <NumberInput label="Quantity" min={0} step={1} value={value} onChange={setValue} />
    </div>
  );
}

function FileUploadDemo() {
  const [files, setFiles] = useState([]);
  return (
    <div style={{ width: '100%', maxWidth: 480 }}>
      <FileUpload label="Attachments" multiple value={files} onChange={setFiles} />
    </div>
  );
}

/* ── Batch 5 & 6 interactive helpers ─────────────────────────────── */

function CommentThreadDemo() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'R. Lefou',
      timestamp: '2d ago',
      text: 'The acceptance criterion for requirement 1.3 is ambiguous — does "90 days" mean from migration date or from record creation date?',
      resolved: false,
      replies: [
        { id: 11, author: 'A. Lovelace', timestamp: '1d ago', text: "Good catch. I've updated the text — retention is from migration date, aligned with the compliance team's guidance." },
      ],
    },
    {
      id: 2,
      author: 'D. Knuth',
      timestamp: '4d ago',
      text: 'Requirement 1.4 seems low-priority but could block the downstream CRM integration. Suggest bumping to high.',
      resolved: false,
      replies: [],
    },
  ]);

  const handleSubmit = (text) => {
    setComments((prev) => [
      ...prev,
      { id: Date.now(), author: 'You', timestamp: 'just now', text, resolved: false, replies: [] },
    ]);
  };

  const handleResolve = (id) => {
    setComments((prev) => prev.map((c) => c.id === id ? { ...c, resolved: !c.resolved } : c));
  };

  return (
    <div style={{ width: '100%', maxWidth: 480 }}>
      <CommentThread onSubmit={handleSubmit} placeholder="Add a comment on this requirement…">
        {comments.map((c) => (
          <CommentThread.Comment
            key={c.id}
            author={c.author}
            timestamp={c.timestamp}
            resolved={c.resolved}
            onResolve={() => handleResolve(c.id)}
          >
            {c.text}
            {c.replies.map((r) => (
              <CommentThread.Reply key={r.id} author={r.author} timestamp={r.timestamp}>
                {r.text}
              </CommentThread.Reply>
            ))}
          </CommentThread.Comment>
        ))}
      </CommentThread>
    </div>
  );
}

function StepperDemo({ orientation }) {
  const [step, setStep] = useState(1);
  const steps = [
    { label: 'Scope details', description: 'Name, client, and description' },
    { label: 'Requirements', description: 'Add L1–L3 items' },
    { label: 'Team & effort', description: 'Assign owners and hours' },
    { label: 'Review & submit', description: 'Final check before approval' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%' }}>
      <Stepper steps={steps} currentStep={step} orientation={orientation} onStepClick={setStep} />
      <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
        <Button size="sm" variant="outline" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Button>
        <Button size="sm" disabled={step === steps.length - 1} onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>Next</Button>
      </div>
    </div>
  );
}
