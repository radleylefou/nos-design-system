/**
 * DEMOS — component demo registry.
 *
 * Maps componentId (string, must match entry in COMPONENT_CATEGORIES) to
 * an object with optional render functions and metadata:
 *
 *   {
 *     description?: string         — short one-liner shown on component cards
 *     preview?:     () => JSX      — minimal render for the card preview sandbox
 *     detail?:      () => JSX      — full documentation/demo view (level 3)
 *   }
 *
 * Cards render a placeholder if `preview` is missing.
 * The detail view renders a stub if `detail` is missing.
 */

import { useState } from 'react';
import { Button } from '../../components/Button.jsx';
import { Input } from '../../components/Input.jsx';
import { Textarea } from '../../components/Textarea.jsx';
import { Select } from '../../components/Select.jsx';
import { Checkbox } from '../../components/Checkbox.jsx';
import { SegmentedControl } from '../../components/SegmentedControl.jsx';
import { DashboardCard } from '../../components/DashboardCard.jsx';
import { NeedsAttention } from '../../components/NeedsAttention.jsx';
import { WeeklyPacing } from '../../components/WeeklyPacing.jsx';
import { MonthlyGlance } from '../../components/MonthlyGlance.jsx';
import { TableHeader } from '../../components/TableHeader.jsx';
import { TableCellText, TableCellSubtext, TableCellIcon, TableCellLink, TableCellActions } from '../../components/TableCell.jsx';
import { RecentTimeEntries } from '../../components/RecentTimeEntries.jsx';
import { PipelineTable } from '../../components/PipelineTable.jsx';
import { PIPELINE_COLUMNS } from '../../components/pipelineColumns.js';
import { DemoStage } from './DemoStage.jsx';

// ── NeedsAttention sample data ─────────────────────────────────────────────

const naItems = [
  {
    tone: 'danger',
    title: '2 days missing time',
    subtitle: 'Apr 23, Apr 24',
    action: { label: 'Log Time' },
  },
  {
    tone: 'warning',
    title: 'Over capacity next week',
    subtitle: '48h booked vs 40h target',
  },
  {
    tone: 'brand',
    title: 'RIA - SOW#4 is 91% used',
    subtitle: '$8.5K of $9K, 9 days left',
  },
];

// ── RecentTimeEntries sample data ─────────────────────────────────────────

const rteRows = [
  {
    task: 'Branding & Design',
    demand: 'RIA Branding & Website Project',
    client: 'Radiology Imaging Associates (RIA)',
    project: 'SOW#4 - RIA Branding & Website Project',
    hours: '7.00h',
  },
  {
    task: 'Sales Design Work',
    demand: 'Internal Sales Design Support',
    client: 'Nymbl Internal',
    project: 'Sales Design Support',
    hours: '8.50h',
  },
  {
    task: 'UXUI Design & Branding',
    demand: 'Radiology - Scaled Delivery - SOW#4',
    client: 'Radiology Imaging Associates (RIA)',
    project: 'RIA - Fax Auto SOW#3',
    hours: '9.00h',
  },
];

// ── PipelineTable sample data ──────────────────────────────────────────────

const pipelineRows = [
  { account: 'Wentworth Institute of Technology', deal: 'SOW#1 - Constituent Cultivation Pipeline', stage: '5% - Stalled', owner: 'Steve Smith', platform: 'Full Stack', total: '$60,000' },
  { account: 'Blue Square Alliance (FCAS)', deal: 'Sentiment Analysis Data Warehouse', stage: '5% - Stalled', owner: 'Steve Smith', platform: 'Full Stack', total: '$250,000' },
  { account: 'Gamma Solutions', deal: 'Valet Business Operating System', stage: '5% - Stalled', owner: 'Steve Smith', platform: 'Full Stack', total: '$385,000' },
  { account: 'Radiology Imaging Associates (RIA)', deal: 'Data Lake / Chatbot', stage: '5% - Stalled', owner: 'Marcos Bosche', platform: 'Full Stack', total: '$24,000' },
  { account: 'Community Concierge Services LLC', deal: '13 Week Forecast', stage: '98% - Waiting MSA', owner: 'Marcos Bosche', platform: 'Full Stack', total: '$30,000' },
];

// ── MonthlyGlance sample data ──────────────────────────────────────────────

const mgStats = [
  { label: 'Billable', value: '82%', badge: { type: 'delta', text: '+4% vs Mar', tone: 'success' } },
  { label: 'PTO Left', value: '11.5d' },
  { label: 'Active SOWs', value: '5' },
  { label: 'Expenses', value: '$1,320', badge: { type: 'status', text: '1 Pending', tone: 'warning' } },
];

// ── Shared demo icons ─────────────────────────────────────────────────────

function ClipboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="4" y="3" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M6.5 3V2.5C6.5 2 7 1.5 7.5 1.5H10.5C11 1.5 11.5 2 11.5 2.5V3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M6.5 7.5H11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M6.5 10H10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 4H12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M3.5 7H10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M5 10H9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2V8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M4.5 6L7 8.5L9.5 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 11H11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2.5V11.5M2.5 7H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7H11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M8 4L11 7L8 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.25" />
      <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 4.5C2 3.95 2.45 3.5 3 3.5H5.5L6.75 4.75H11C11.55 4.75 12 5.2 12 5.75V10C12 10.55 11.55 11 11 11H3C2.45 11 2 10.55 2 10V4.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

function TaskIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="3" y="2.5" width="8" height="9" rx="1.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 5.5H9M5 7.5H8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

// ── CellRow — mock table row context for cell demos ───────────────────────

function CellRow({ children }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      height: 52,
      padding: '0 var(--spacing-4)',
      background: '#ffffff',
      border: '1px solid var(--color-brand-100)',
      borderRadius: 6,
      fontFamily: 'var(--font-family-sans)',
    }}>
      {children}
    </div>
  );
}

// ── Stateful wrappers for controlled demos ─────────────────────────────────

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  return <Checkbox label="Include archived records" checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
}

function SegmentedDemo() {
  const [val, setVal] = useState('task');
  return (
    <SegmentedControl
      ariaLabel="Entry kind"
      options={[
        { label: 'Task',    value: 'task',    icon: <TaskIcon /> },
        { label: 'Project', value: 'project', icon: <FolderIcon /> },
      ]}
      value={val}
      onChange={setVal}
    />
  );
}

export const DEMOS = {
  // ── Actions ───────────────────────────────────────────────────────────────

  Button: {
    description: 'Action control — primary, secondary, ghost, soft, link, and icon variants.',
    preview: () => (
      <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary" size="sm">Primary</Button>
        <Button variant="secondary" size="sm">Secondary</Button>
        <Button variant="ghost" size="sm">Ghost</Button>
        <Button variant="soft" size="sm">Soft</Button>
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Variants">
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="soft">Soft</Button>
            <Button variant="link" trailingIcon={<ArrowRightIcon />}>Link</Button>
            <Button variant="ghost" leadingIcon={<FilterIcon />} aria-label="Icon" />
          </div>
        </DemoStage>
        <DemoStage label="Sizes">
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', alignItems: 'center' }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button variant="secondary" size="sm">Small</Button>
            <Button variant="secondary" size="md">Medium</Button>
          </div>
        </DemoStage>
        <DemoStage label="With icons">
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button leadingIcon={<PlusIcon />}>Time Entry</Button>
            <Button variant="secondary" leadingIcon={<FilterIcon />}>Filter</Button>
            <Button variant="soft" size="sm" leadingIcon={<PlusIcon />}>Note</Button>
            <Button variant="ghost" leadingIcon={<ExportIcon />} aria-label="Export" />
          </div>
        </DemoStage>
        <DemoStage label="Disabled">
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button disabled>Primary</Button>
            <Button variant="secondary" disabled>Secondary</Button>
            <Button variant="ghost" disabled>Ghost</Button>
            <Button variant="soft" disabled>Soft</Button>
          </div>
        </DemoStage>
      </div>
    ),
  },

  // ── Form Controls ─────────────────────────────────────────────────────────

  Input: {
    description: 'Single-line text field with label, helper text, error state, and icon slots.',
    preview: () => (
      <div style={{ width: 220 }}>
        <Input placeholder="Enter value…" size="sm" />
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Default">
          <div style={{ width: 320 }}>
            <Input label="Full name" placeholder="Carol Chen" />
          </div>
        </DemoStage>
        <DemoStage label="With helper text">
          <div style={{ width: 320 }}>
            <Input label="Email" type="email" placeholder="carol@nymbl.app" helperText="We'll only use this for account notifications." />
          </div>
        </DemoStage>
        <DemoStage label="Error state">
          <div style={{ width: 320 }}>
            <Input label="Project name" placeholder="My Project" error="Project name is required." />
          </div>
        </DemoStage>
        <DemoStage label="With icons">
          <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <Input label="Search" leadingIcon={<SearchIcon />} placeholder="Search tasks…" />
            <Input label="Owner" trailingIcon={<FolderIcon />} placeholder="Assign to…" />
          </div>
        </DemoStage>
        <DemoStage label="Sizes">
          <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium" />
          </div>
        </DemoStage>
        <DemoStage label="Disabled">
          <div style={{ width: 320 }}>
            <Input label="Read-only field" defaultValue="Locked value" disabled />
          </div>
        </DemoStage>
      </div>
    ),
  },

  Textarea: {
    description: 'Multi-line text field, shares chrome with Input.',
    preview: () => (
      <div style={{ width: 220 }}>
        <Textarea placeholder="What did you work on?" rows={2} />
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Default">
          <div style={{ width: 380 }}>
            <Textarea label="Description" placeholder="What did you work on?" />
          </div>
        </DemoStage>
        <DemoStage label="Error state">
          <div style={{ width: 380 }}>
            <Textarea label="Notes" error="Notes are required for this entry." />
          </div>
        </DemoStage>
        <DemoStage label="No resize">
          <div style={{ width: 380 }}>
            <Textarea label="Fixed height" resize="none" rows={4} placeholder="This field won't resize." />
          </div>
        </DemoStage>
        <DemoStage label="Disabled">
          <div style={{ width: 380 }}>
            <Textarea label="Archived note" defaultValue="This was a completed task." disabled />
          </div>
        </DemoStage>
      </div>
    ),
  },

  Select: {
    description: 'Native single-select dropdown with NOS field chrome.',
    preview: () => (
      <div style={{ width: 200 }}>
        <Select
          size="sm"
          placeholder="Choose…"
          options={[
            { label: 'Full Stack', value: 'full-stack' },
            { label: 'Frontend', value: 'frontend' },
            { label: 'Backend', value: 'backend' },
          ]}
        />
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Default">
          <div style={{ width: 320 }}>
            <Select
              label="Platform"
              placeholder="Choose platform"
              options={[
                { label: 'Full Stack', value: 'full-stack' },
                { label: 'Frontend', value: 'frontend' },
                { label: 'Backend', value: 'backend' },
                { label: 'Data & AI', value: 'data' },
              ]}
            />
          </div>
        </DemoStage>
        <DemoStage label="With helper text">
          <div style={{ width: 320 }}>
            <Select
              label="Entry Type"
              placeholder="Select type"
              helperText="Determines how this entry is billed."
              options={[
                { label: 'Billable', value: 'billable' },
                { label: 'Non-Billable', value: 'non-billable' },
                { label: 'Internal', value: 'internal' },
              ]}
            />
          </div>
        </DemoStage>
        <DemoStage label="Error state">
          <div style={{ width: 320 }}>
            <Select
              label="Stage"
              placeholder="Select stage"
              error="Please select a stage."
              options={[
                { label: '5% - Stalled', value: '5-stalled' },
                { label: '25% - Scope & Demo', value: '25-scope' },
                { label: '90% - Contracting', value: '90-contracting' },
              ]}
            />
          </div>
        </DemoStage>
        <DemoStage label="Disabled">
          <div style={{ width: 320 }}>
            <Select
              label="Locked field"
              disabled
              defaultValue="full-stack"
              options={[{ label: 'Full Stack', value: 'full-stack' }]}
            />
          </div>
        </DemoStage>
      </div>
    ),
  },

  Checkbox: {
    description: 'Binary input with label, helper text, and error state.',
    preview: () => <Checkbox label="Include archived records" defaultChecked />,
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Default (controlled)" render={() => <CheckboxDemo />} />
        <DemoStage label="Pre-checked with helper">
          <Checkbox label="Sync to calendar" defaultChecked helperText="Events will appear in your connected calendar." />
        </DemoStage>
        <DemoStage label="Error state">
          <Checkbox label="I confirm this entry is accurate" error="You must confirm before submitting." />
        </DemoStage>
        <DemoStage label="Disabled">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
            <Checkbox label="Disabled unchecked" disabled />
            <Checkbox label="Disabled checked" disabled defaultChecked />
          </div>
        </DemoStage>
      </div>
    ),
  },

  SegmentedControl: {
    description: 'Pill group for mutually exclusive options. Brand-tinted container, icon per option, check icon when active.',
    preview: () => (
      <SegmentedControl
        ariaLabel="Entry kind"
        options={[
          { label: 'Task',    value: 'task',    icon: <TaskIcon /> },
          { label: 'Project', value: 'project', icon: <FolderIcon /> },
        ]}
        defaultValue="task"
      />
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Task / Project — Time Entry modal" render={() => <SegmentedDemo />} />
        <DemoStage label="Without icons">
          <SegmentedControl
            ariaLabel="View mode"
            options={[
              { label: 'List', value: 'list' },
              { label: 'Board', value: 'board' },
              { label: 'Calendar', value: 'cal' },
            ]}
            defaultValue="list"
          />
        </DemoStage>
        <DemoStage label="Sizes">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', alignItems: 'flex-start' }}>
            {['sm', 'md'].map((size) => (
              <SegmentedControl
                key={size}
                size={size}
                ariaLabel={`Size ${size}`}
                options={[
                  { label: 'Billable',     value: 'billable' },
                  { label: 'Non-Billable', value: 'nonbillable' },
                  { label: 'Internal',     value: 'internal' },
                ]}
                defaultValue="billable"
              />
            ))}
          </div>
        </DemoStage>
        <DemoStage label="Disabled">
          <SegmentedControl
            disabled
            ariaLabel="Disabled"
            options={[
              { label: 'Task',    value: 'task',    icon: <TaskIcon /> },
              { label: 'Project', value: 'project', icon: <FolderIcon /> },
            ]}
            value="task"
          />
        </DemoStage>
      </div>
    ),
  },

  // ── Metrics ───────────────────────────────────────────────────────────────

  DashboardCard: {
    description: 'Thin chrome shell providing card header and inner slot for dashboard components.',
    preview: () => (
      <DashboardCard title="Weekly Pacing">
        <div style={{ padding: 'var(--spacing-4)', color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-sm)' }}>
          Card content goes here
        </div>
      </DashboardCard>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage
          label="Title only"
          render={() => (
            <DashboardCard title="Weekly Pacing">
              <div style={{ padding: 'var(--spacing-4)', color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-sm)' }}>
                Card body content
              </div>
            </DashboardCard>
          )}
        />
        <DemoStage
          label="With chevron (title click)"
          render={() => (
            <DashboardCard title="This Week" onTitleClick={() => {}}>
              <div style={{ padding: 'var(--spacing-4)', color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-sm)' }}>
                Card body content
              </div>
            </DashboardCard>
          )}
        />
        <DemoStage
          label="With all header actions"
          render={() => (
            <DashboardCard
              title="Monthly Glance"
              onTitleClick={() => {}}
              onExpand={() => {}}
              onMore={() => {}}
            >
              <div style={{ padding: 'var(--spacing-4)', color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-sm)' }}>
                Card body content
              </div>
            </DashboardCard>
          )}
        />
      </div>
    ),
  },

  NeedsAttention: {
    description: 'Surface card listing items that require user follow-up.',
    preview: () => (
      <NeedsAttention items={naItems.map(({ action, ...rest }) => rest)} />
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage
          label="Default — three tones with inline action"
          render={() => (
            <NeedsAttention items={naItems} onExpand={() => {}} onMore={() => {}} />
          )}
        />
        <DemoStage
          label="Without header actions"
          render={() => <NeedsAttention items={naItems.slice(0, 2)} />}
        />
        <DemoStage
          label="Single tone"
          render={() => (
            <NeedsAttention
              title="Warnings"
              items={[
                { tone: 'warning', title: 'Over capacity next week', subtitle: '48h booked vs 40h target' },
                { tone: 'warning', title: 'Two clients pending review', subtitle: 'Approve before Friday' },
              ]}
            />
          )}
        />
      </div>
    ),
  },

  WeeklyPacing: {
    description: 'Pacing card showing logged hours vs weekly target with projection.',
    preview: () => (
      <WeeklyPacing
        value="26.5h"
        target="/ 40h logged"
        loggedCount={16}
        projected="41.2h"
        targetDayLabel="Wed"
        insight={{ prefix: "You're trending ", emphasis: '+1.2h', suffix: ' over target.' }}
      />
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage
          label="Default — with insight and View Report"
          render={() => (
            <WeeklyPacing
              value="26.5h"
              target="/ 40h logged"
              loggedCount={26}
              projected="41.2h"
              targetDayLabel="Wed"
              insight={{ prefix: "You're trending ", emphasis: '+1.2h', suffix: ' over target.' }}
              onViewReport={() => {}}
              onTitleClick={() => {}}
              onExpand={() => {}}
              onMore={() => {}}
            />
          )}
        />
        <DemoStage
          label="On track"
          render={() => (
            <WeeklyPacing
              value="20h"
              target="/ 40h logged"
              loggedCount={12}
              projected="40h"
              targetDayLabel="Wed"
              insight={{ prefix: "You're on track for ", emphasis: '40h', suffix: ' this week.' }}
              onTitleClick={() => {}}
            />
          )}
        />
        <DemoStage
          label="Minimal — no insight"
          render={() => (
            <WeeklyPacing value="12h" target="/ 40h logged" loggedCount={8} />
          )}
        />
      </div>
    ),
  },

  MonthlyGlance: {
    description: 'Monthly metrics card with stat grid and delta/status badges.',
    preview: () => <MonthlyGlance stats={mgStats} />,
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage
          label="Default — 2×2 grid with badges"
          render={() => (
            <MonthlyGlance stats={mgStats} onTitleClick={() => {}} onExpand={() => {}} onMore={() => {}} />
          )}
        />
        <DemoStage
          label="No badges"
          render={() => (
            <MonthlyGlance
              stats={[
                { label: 'Billable', value: '82%' },
                { label: 'PTO Left', value: '11.5d' },
                { label: 'Active SOWs', value: '5' },
                { label: 'Expenses', value: '$1,320' },
              ]}
              onTitleClick={() => {}}
            />
          )}
        />
        <DemoStage
          label="Single row"
          render={() => (
            <MonthlyGlance
              title="Quick Stats"
              stats={[
                { label: 'Billable', value: '82%', badge: { type: 'delta', text: '+4% vs Mar', tone: 'success' } },
                { label: 'Active SOWs', value: '5' },
              ]}
            />
          )}
        />
      </div>
    ),
  },

  // ── Tables ────────────────────────────────────────────────────────────────

  TableHeader: {
    description: 'Reusable table toolbar with title, optional search, and variable action buttons.',
    preview: () => (
      <div style={{ width: 480, border: '1px solid var(--color-brand-50)', borderRadius: 8, overflow: 'hidden' }}>
        <TableHeader title="Pipeline" subtext="5 active deals" search={{ value: '' }} />
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage
          label="Title only"
          render={() => (
            <div style={{ width: 480, border: '1px solid var(--color-brand-50)', borderRadius: 8, overflow: 'hidden' }}>
              <TableHeader title="Recent Time Entries" />
            </div>
          )}
        />
        <DemoStage
          label="Title with subtext"
          render={() => (
            <div style={{ width: 480, border: '1px solid var(--color-brand-50)', borderRadius: 8, overflow: 'hidden' }}>
              <TableHeader title="Active Projects" subtext="Showing 12 of 48" />
            </div>
          )}
        />
        <DemoStage
          label="With search"
          render={() => (
            <div style={{ width: 480, border: '1px solid var(--color-brand-50)', borderRadius: 8, overflow: 'hidden' }}>
              <TableHeader title="Pipeline" search={{ value: '', onChange: () => {} }} />
            </div>
          )}
        />
        <DemoStage
          label="With actions"
          render={() => (
            <div style={{ width: 480, border: '1px solid var(--color-brand-50)', borderRadius: 8, overflow: 'hidden' }}>
              <TableHeader
                title="Recent Time Entries"
                actions={[
                  { label: 'Export', icon: <ExportIcon />, onClick: () => {} },
                  { label: 'Add Entry', icon: <PlusIcon />, onClick: () => {} },
                ]}
              />
            </div>
          )}
        />
        <DemoStage
          label="Fully loaded — title, subtext, search, actions"
          render={() => (
            <div style={{ width: 600, border: '1px solid var(--color-brand-50)', borderRadius: 8, overflow: 'hidden' }}>
              <TableHeader
                title="Pipeline"
                subtext="5 active deals"
                search={{ value: '', onChange: () => {} }}
                actions={[
                  { label: 'Filter By', icon: <FilterIcon />, onClick: () => {} },
                  { label: 'Export', icon: <ExportIcon />, onClick: () => {} },
                ]}
              />
            </div>
          )}
        />
      </div>
    ),
  },

  TableCell: {
    description: 'Table cell primitives — Text, Subtext, Icon, Link, and Actions variants.',
    preview: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', fontFamily: 'var(--font-family-sans)' }}>
        <TableCellText text="Plain text value" />
        <TableCellSubtext text="Primary label" subtext="Secondary detail" />
        <TableCellIcon icon={<ClipboardIcon />} text="Task name" />
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="TableCellText — plain single-line text" render={() => (
          <CellRow><TableCellText text="Wentworth Institute of Technology" /></CellRow>
        )} />
        <DemoStage label="TableCellSubtext — primary + secondary stacked" render={() => (
          <CellRow><TableCellSubtext text="RIA Branding & Website Project" subtext="Radiology Imaging Associates (RIA)" /></CellRow>
        )} />
        <DemoStage label="TableCellIcon — icon + text" render={() => (
          <CellRow><TableCellIcon icon={<ClipboardIcon />} text="Branding & Design" /></CellRow>
        )} />
        <DemoStage label="TableCellLink — text with chevron (clickable)" render={() => (
          <CellRow><TableCellLink text="5% - Stalled" onClick={() => {}} /></CellRow>
        )} />
        <DemoStage label="TableCellLink — text only (no onClick)" render={() => (
          <CellRow><TableCellLink text="Full Stack" /></CellRow>
        )} />
        <DemoStage label="TableCellActions — +Note and external link" render={() => (
          <CellRow><TableCellActions onNote={() => {}} onOpenLink={() => {}} /></CellRow>
        )} />
      </div>
    ),
  },

  TableExamples: {
    description: 'Full table examples — PipelineTable and RecentTimeEntries at full width.',
    preview: () => (
      <div style={{ width: '100%', border: '1px solid var(--color-brand-50)', borderRadius: 8, overflow: 'hidden' }}>
        <TableHeader title="Table Examples" subtext="PipelineTable · RecentTimeEntries" />
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="PipelineTable — full width with all callbacks" fullWidth render={() => (
          <PipelineTable
            columns={PIPELINE_COLUMNS}
            rows={pipelineRows}
            onSearch={() => {}}
            onFilterBy={() => {}}
            onExport={() => {}}
            onNote={() => {}}
            onOpenLink={() => {}}
            onCellClick={() => {}}
          />
        )} />
        <DemoStage label="RecentTimeEntries — full width with View All" fullWidth render={() => (
          <RecentTimeEntries rows={rteRows} onViewAll={() => {}} />
        )} />
      </div>
    ),
  },
};
