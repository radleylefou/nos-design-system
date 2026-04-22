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
  Metrics,
  SideNav,
} from '../../components/index.js';
import './ComponentsPage.css';

/**
 * ComponentsPage — review/authoring view for a single component.
 * Each section has an independent "Show / Hide code" toggle.
 */
export function ComponentsPage({ componentId }) {
  const entry = DEMOS[componentId];

  if (!entry) {
    return (
      <div className="wb-page">
        <div className="wb-page__header">
          <div className="wb-page__eyebrow">Component</div>
          <h1 className="wb-page__title">{componentId}</h1>
          <p className="wb-page__subtitle">No demo registered yet for this component.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wb-page">
      <div className="wb-page__header">
        <div className="wb-page__eyebrow">{entry.type || 'Component'}</div>
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
    description: 'Primary interactive control. Four variants, three sizes, loading state, and icon slots.',
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

  Badge: {
    description: 'Compact status/tag label. Six semantic variants, optional leading dot.',
    sections: [
      {
        title: 'Variants',
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
        title: 'With status dot',
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
