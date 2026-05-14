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
import { Overlay } from '../../components/Overlay.jsx';
import { Modal, ModalShell } from '../../components/Modal.jsx';
import { Input } from '../../components/Input.jsx';
import { Textarea } from '../../components/Textarea.jsx';
import { Select } from '../../components/Select.jsx';
import { Checkbox } from '../../components/Checkbox.jsx';
import { SegmentedControl } from '../../components/SegmentedControl.jsx';
import { Field, FieldRow } from '../../components/Field.jsx';
import { ChoiceGroup } from '../../components/ChoiceGroup.jsx';
import { Callout } from '../../components/Callout.jsx';
import { DashboardCard } from '../../components/DashboardCard.jsx';
import { NeedsAttention } from '../../components/NeedsAttention.jsx';
import { WeeklyPacing } from '../../components/WeeklyPacing.jsx';
import { MonthlyGlance } from '../../components/MonthlyGlance.jsx';
import { TableHeader } from '../../components/TableHeader.jsx';
import { TableCellText, TableCellSubtext, TableCellIcon, TableCellLink, TableCellActions } from '../../components/TableCell.jsx';
import { RecentTimeEntries } from '../../components/RecentTimeEntries.jsx';
import { PipelineTable } from '../../components/PipelineTable.jsx';
import { PIPELINE_COLUMNS } from '../../components/pipelineColumns.js';
import { StatusPill } from '../../components/StatusPill.jsx';
import { PageHeader } from '../../components/PageHeader.jsx';
import { DocumentBreadcrumbs } from '../../components/DocumentBreadcrumbs.jsx';
import { PageTabs } from '../../components/PageTabs.jsx';
import { DescriptionList } from '../../components/DescriptionList.jsx';
import { SectionHeader } from '../../components/SectionHeader.jsx';
import { DocumentSection } from '../../components/DocumentSection.jsx';
import { AssistBar } from '../../components/AssistBar.jsx';
import { DocumentOutcomeList } from '../../components/DocumentOutcomeList.jsx';
import { DocumentMetricCard } from '../../components/DocumentMetricCard.jsx';
import { AIActionBar } from '../../components/AIActionBar.jsx';
import { SideNavigation } from '../../components/SideNavigation.jsx';
import { SideNavSection } from '../../components/SideNavSection.jsx';
import { SideNavItem } from '../../components/SideNavItem.jsx';
import { SideNavSearch } from '../../components/SideNavSearch.jsx';
import { SideNavNotificationButton } from '../../components/SideNavNotificationButton.jsx';
import { SideNavAccount } from '../../components/SideNavAccount.jsx';
import { DemoStage } from './DemoStage.jsx';
import './ModalFormDemos.css';
import './DocumentWorkspaceDemos.css';
import './SideNavDemos.css';

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

function UserCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="7" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.75 13.25C6.3 11.85 7.4 11.1 9 11.1C10.6 11.1 11.7 11.85 12.25 13.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function OpportunityIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.75 6.75L12.25 11.25M12.25 6.75L5.75 11.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.4" />
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

function BrandMarkIcon() {
  return (
    <svg width="40" height="34" viewBox="0 0 40 34" fill="none" aria-hidden="true">
      <path d="M20 32L3 2.5L37 2.5L20 32Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 32L20 12L3 2.5M20 12L37 2.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 6.5C5 4.6 6.25 3.25 8 3.25C9.75 3.25 11 4.6 11 6.5V9.25L12.25 11H3.75L5 9.25V6.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M6.75 12.25C7 12.75 7.4 13 8 13C8.6 13 9 12.75 9.25 12.25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 7.25L8 2.75L13.5 7.25V13.25H10V9.5H6V13.25H2.5V7.25Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 4.75V8L10.25 9.25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 1.75V3.25M8 12.75V14.25M1.75 8H3.25M12.75 8H14.25M3.6 3.6L4.65 4.65M11.35 11.35L12.4 12.4M12.4 3.6L11.35 4.65M4.65 11.35L3.6 12.4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2.5" y="4" width="11" height="8" rx="1.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2.5 6.5H13.5M4.5 10H7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 3L6.75 5.4L5.75 6.55C6.45 8 8 9.55 9.45 10.25L10.6 9.25L13 11C12.8 12.2 11.75 13 10.5 13C6.35 13 3 9.65 3 5.5C3 4.25 3.8 3.2 5 3Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6.75 7.5C8.13 7.5 9.25 6.38 9.25 5C9.25 3.62 8.13 2.5 6.75 2.5C5.37 2.5 4.25 3.62 4.25 5C4.25 6.38 5.37 7.5 6.75 7.5Z" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2.5 13C2.85 10.8 4.4 9.5 6.75 9.5C9.1 9.5 10.65 10.8 11 13M10.25 7.5C11.4 7.5 12.25 6.6 12.25 5.5C12.25 4.4 11.4 3.5 10.25 3.5M12.25 13C12.1 11.65 11.45 10.75 10.35 10.25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 12.5V8.5M6.5 12.5V5.5M9.5 12.5V7M12.5 12.5V3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function StructureIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3.5V6.5M8 9.5V12.5M5 6.5H11M4 12.5H12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <rect x="6.25" y="2" width="3.5" height="3" rx="0.75" stroke="currentColor" strokeWidth="1.25" />
      <rect x="2.25" y="11" width="3.5" height="3" rx="0.75" stroke="currentColor" strokeWidth="1.25" />
      <rect x="10.25" y="11" width="3.5" height="3" rx="0.75" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function ChevronsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M6.25 7.25L9 4.5L11.75 7.25M6.25 10.75L9 13.5L11.75 10.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 2.5V5.5M12 2.5V5.5M3 7.5H15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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

function PageTabsDemo() {
  const [active, setActive] = useState('overview');
  return (
    <PageTabs
      tabs={[
        { id: 'overview', label: 'Overview' },
        { id: 'pain-points', label: 'Pain Points' },
        { id: 'wish-list', label: 'Solution Wish List' },
        { id: 'user-groups', label: 'User Groups' },
        { id: 'tech-needs', label: 'Technology Needs' },
      ]}
      activeTab={active}
      onTabChange={setActive}
    />
  );
}

function DocumentSectionDemo() {
  return (
    <DocumentSection
      header={
        <SectionHeader
          icon={<UserCircleIcon />}
          title="Introduction"
          status="draft"
          onEdit={() => {}}
        />
      }
      footer={
        <>
          <Button variant="secondary" size="sm">Mark as Reviewed</Button>
          <Button size="sm">Approve</Button>
        </>
      }
    >
      <DescriptionList
        items={[
          { label: 'Client Profile', value: 'Acme Health Systems is a regional healthcare network operating 23 outpatient clinics across the Pacific Northwest, serving approximately 180,000 patients annually.' },
          { label: 'Organizational Context', value: 'Acme Health is in the midst of a digital transformation initiative focused on operational efficiency and patient experience.' },
          { label: 'Engagement Origin', value: 'This engagement originated from a discovery workshop identifying referral intake as the highest-impact bottleneck in patient access.' },
        ]}
      />
    </DocumentSection>
  );
}

const documentTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'pain-points', label: 'Pain Points' },
  { id: 'wish-list', label: 'Solution Wish List' },
  { id: 'user-groups', label: 'User Groups' },
  { id: 'tech-needs', label: 'Technology Needs' },
];

const outcomeItems = [
  'Reduce average intake time from 14 minutes to under 6 minutes per referral',
  'Eliminate demographic data entry errors through automated EHR reconciliation',
  'Surface incomplete referrals before scheduling, reducing patient friction',
  'Establish HIPAA-compliant audit trail for all intake decisions',
];

function DocumentMetricGrid() {
  return (
    <div className="demo-document-metric-grid">
      <DocumentMetricCard
        label="Annual Cost Savings"
        value="$840K"
        delta="+4% vs Mar"
        supportingText="Reduced intake FTE"
      />
      <DocumentMetricCard
        label="Error Reduction"
        value="88%"
        supportingText="Fewer data entry errors"
      />
      <DocumentMetricCard
        label="Patient Satisfaction"
        value="+1.3 pts"
        delta="+0.3%"
        supportingText="CSAT improvement"
      />
    </div>
  );
}

function DocumentWorkspaceDemo() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="demo-document-workspace">
      <DocumentBreadcrumbs
        onBack={() => {}}
        items={[
          { label: 'Engagements', onClick: () => {} },
          { label: 'Acme Health Systems', onClick: () => {} },
          { label: 'Clinical Intake Automation Platform', current: true },
        ]}
      />

      <div className="demo-document-workspace__header">
        <PageHeader
          title="Solution Definition"
          subtitle="Comprehensive problem framing, scope, and solution design for the engagement."
          metaItems={['Last edited by Alex Rivera', '2d ago']}
          status="in-progress"
        />
        <PageTabs tabs={documentTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <DocumentSection
        header={<SectionHeader icon={<UserCircleIcon />} title="Introduction" status="draft" onEdit={() => {}} />}
        footer={(
          <>
            <Button variant="secondary" size="sm">Mark As Reviewed</Button>
            <Button size="sm">Approve</Button>
          </>
        )}
      >
        <DescriptionList
          items={[
            { label: 'Client Profile', value: 'Acme Health Systems is a regional healthcare network operating 23 outpatient clinics across the Pacific Northwest, serving approximately 180,000 patients annually. The organization employs 450 clinical staff and 120 administrative personnel.' },
            { label: 'Organizational Context', value: 'Acme Health is in the midst of a digital transformation initiative focused on operational efficiency and patient experience. The organization recently completed an Epic EHR implementation and is now addressing downstream workflow inefficiencies.' },
            { label: 'Engagement Origin', value: 'This engagement originated from a discovery workshop identifying referral intake as the highest-impact bottleneck in patient access. The VP of Operations championed this initiative following a 6-month pilot study quantifying the operational cost.' },
          ]}
        />
      </DocumentSection>

      <DocumentSection
        header={<SectionHeader icon={<OpportunityIcon />} title="Opportunity Statement" status="draft" onEdit={() => {}} />}
        footer={(
          <AIActionBar
            actions={[
              { label: 'Calculate ROI', onClick: () => {} },
              { label: 'Add Benefits', onClick: () => {} },
            ]}
          />
        )}
      >
        <DescriptionList
          items={[
            { label: 'Strategic Value', value: "Automating referral intake enables Acme Health to scale patient access without proportional headcount growth, directly supporting the organization's 3-year growth plan to expand from 23 to 35 clinics." },
          ]}
        />
        <div className="demo-document-content-group">
          <p className="demo-document-content-label">Expected Outcomes</p>
          <DocumentOutcomeList items={outcomeItems} />
        </div>
        <div className="demo-document-content-group">
          <p className="demo-document-content-label">Quantified Benefits</p>
          <DocumentMetricGrid />
        </div>
      </DocumentSection>
    </div>
  );
}

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

function ChoiceGroupDemo() {
  const [value, setValue] = useState('billable');
  return (
    <ChoiceGroup
      ariaLabel="Entry type"
      value={value}
      onChange={setValue}
      options={[
        { label: 'Billable', value: 'billable' },
        { label: 'Non-Billable', value: 'non-billable' },
        { label: 'Internal', value: 'internal' },
        { label: 'Other', value: 'other' },
      ]}
    />
  );
}

function InteractiveOverlayDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Show Overlay</Button>
      <Overlay open={open} onClick={() => setOpen(false)}>
        <div className="demo-overlay-panel">
          <h3>Overlay content</h3>
          <p>Click the scrim to close this centered surface.</p>
          <Button size="sm" onClick={() => setOpen(false)}>Close</Button>
        </div>
      </Overlay>
    </>
  );
}

function InteractiveModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Time Entry"
        description="Track time by selecting a task or project. Hours sync to the related SOW."
        footer={(
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Submit Entry</Button>
          </>
        )}
      >
        <TimeEntryModalContent />
      </Modal>
    </>
  );
}

function DateFieldButton() {
  return (
    <button className="demo-date-field" type="button">
      <span className="demo-date-field__primary">Today</span>
      <span className="demo-date-field__dot" aria-hidden="true" />
      <span>Tuesday, Apr 28</span>
      <CalendarIcon />
    </button>
  );
}

function HoursPresetGroup() {
  const [value, setValue] = useState('1:00');
  const options = ['0:15', '0:30', '1:00', '2:00', '00:00'];
  return (
    <div className="demo-hours-group" role="group" aria-label="Hours presets">
      {options.map((option) => (
        <button
          className={`demo-hours-group__item${value === option ? ' demo-hours-group__item--active' : ''}`}
          key={option}
          type="button"
          onClick={() => setValue(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function TimeEntryModalContent() {
  const [mode, setMode] = useState('task');
  const [entryType, setEntryType] = useState('billable');

  return (
    <div className="demo-time-entry">
      <SegmentedControl
        ariaLabel="Entry kind"
        options={[
          { label: 'Task', value: 'task', icon: <TaskIcon /> },
          { label: 'Project', value: 'project', icon: <FolderIcon /> },
        ]}
        value={mode}
        onChange={setMode}
      />

      <div className="demo-time-entry__divider" />

      <Select
        label="Search Task"
        defaultValue="branding"
        options={[
          { label: 'Branding & Design', value: 'branding' },
          { label: 'Sales Design Work', value: 'sales' },
          { label: 'UXUI Design & Branding', value: 'uxui' },
        ]}
      />

      <Callout tone="success">
        Your hours will be logged to <strong>RIA Branding & Website</strong> → SOW#4 → Radiology Imaging Associates
      </Callout>

      <Field label="Entry Type">
        <ChoiceGroup
          ariaLabel="Entry type"
          value={entryType}
          onChange={setEntryType}
          options={[
            { label: 'Billable', value: 'billable' },
            { label: 'Non-Billable', value: 'non-billable' },
            { label: 'Internal', value: 'internal' },
            { label: 'Other', value: 'other' },
          ]}
        />
      </Field>

      <FieldRow columns={2}>
        <Field label="Hours">
          <HoursPresetGroup />
        </Field>
        <Field label="Date">
          <DateFieldButton />
        </Field>
      </FieldRow>

      <Textarea label="Description" placeholder="What did you work on?" rows={4} resize="none" />
    </div>
  );
}

const mainSideNavItems = [
  { label: 'Home', icon: <HomeIcon />, active: true },
  { label: 'Guidance', icon: <CalendarIcon /> },
  { label: 'Time Entry', icon: <ClockIcon /> },
  { label: 'PTO', icon: <SunIcon /> },
  { label: 'Expenses', icon: <CreditCardIcon /> },
  { label: 'Meetings', icon: <PhoneIcon /> },
];

const platformSideNavItems = [
  { label: 'CRM', icon: <UsersIcon /> },
  { label: 'Demand Planning', icon: <AnalyticsIcon /> },
  { label: 'Project Management', icon: <StructureIcon /> },
];

function DemoAccountAvatar() {
  return <span className="demo-side-nav-avatar">MO</span>;
}

function SideNavigationDemo({ compact = false }) {
  return (
    <SideNavigation
      className={compact ? 'demo-side-nav-preview' : ''}
      logo={<BrandMarkIcon />}
      notification={<SideNavNotificationButton icon={<BellIcon />} unread />}
      account={(
        <SideNavAccount
          avatar={<DemoAccountAvatar />}
          name="Maya Ortiz"
          supportingText="maya.ortiz@nymbl.app"
          menuIcon={<ChevronsIcon />}
        />
      )}
    >
      <SideNavSearch icon={<SearchIcon />} shortcut="⌘ K" />
      <SideNavSection title="Main">
        {mainSideNavItems.map((item) => (
          <SideNavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={item.active}
          />
        ))}
      </SideNavSection>
      <SideNavSection title="Platform">
        {platformSideNavItems.map((item) => (
          <SideNavItem key={item.label} icon={item.icon} label={item.label} />
        ))}
      </SideNavSection>
    </SideNavigation>
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

  // ── Overlays ─────────────────────────────────────────────────────────────

  Overlay: {
    description: 'Full-viewport scrim that centers modal or popup content.',
    preview: () => <Button variant="secondary" size="sm">Show Overlay</Button>,
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Interactive overlay" render={() => <InteractiveOverlayDemo />} />
        <DemoStage label="Scrim token reference">
          <div className="demo-overlay-reference">
            <span>--overlay-scrim</span>
          </div>
        </DemoStage>
      </div>
    ),
  },

  Modal: {
    description: 'Centered dialog shell with overlay, header, body, close action, and footer slot.',
    preview: () => (
      <div className="demo-modal-preview">
        <ModalShell
          title="Time Entry"
          description="Track time by selecting a task or project."
          footer={<Button size="sm">Submit</Button>}
        >
          <Callout tone="success">Hours sync to the related SOW.</Callout>
        </ModalShell>
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Static ModalShell — Figma size and chrome" fullWidth>
          <ModalShell
            title="Time Entry"
            description="Track time by selecting a task or project. Hours sync to the related SOW."
            footer={(
              <>
                <Button variant="secondary">Cancel</Button>
                <Button>Submit Entry</Button>
              </>
            )}
          >
            <TimeEntryModalContent />
          </ModalShell>
        </DemoStage>
        <DemoStage label="Interactive Modal" render={() => <InteractiveModalDemo />} />
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
            <Input label="Full name" placeholder="Maya Ortiz" />
          </div>
        </DemoStage>
        <DemoStage label="With helper text">
          <div style={{ width: 320 }}>
            <Input label="Email" type="email" placeholder="maya.ortiz@nymbl.app" helperText="We'll only use this for account notifications." />
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
    description: 'Multi-line text field using the shared form field chrome.',
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
    description: 'Pill group for mutually exclusive options. Brand-tinted container with optional icons per option.',
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

  Field: {
    description: 'Shared label, control, helper, and error wrapper for composed form controls.',
    preview: () => (
      <div style={{ width: 360 }}>
        <Field label="Entry Type">
          <ChoiceGroupDemo />
        </Field>
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="With select control">
          <div style={{ width: 360 }}>
            <Select
              label="Search Task"
              helperText="Hours sync to the related SOW."
              defaultValue="branding"
              options={[
                { label: 'Branding & Design', value: 'branding' },
                { label: 'Sales Design Work', value: 'sales' },
              ]}
            />
          </div>
        </DemoStage>
        <DemoStage label="With custom choice control">
          <Field label="Entry Type">
            <ChoiceGroupDemo />
          </Field>
        </DemoStage>
        <DemoStage label="Error state">
          <div style={{ width: 360 }}>
            <Select label="Project" error="Choose a project before submitting." placeholder="Choose project" options={[{ label: 'RIA Branding', value: 'ria' }]} />
          </div>
        </DemoStage>
      </div>
    ),
  },

  FieldRow: {
    description: 'Responsive field grouping for two- and three-column modal form layouts.',
    preview: () => (
      <FieldRow columns={2}>
        <Input label="Hours" size="sm" defaultValue="1:00" />
        <Input label="Date" size="sm" defaultValue="Today" />
      </FieldRow>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Two-column modal row" fullWidth>
          <FieldRow columns={2}>
            <Field label="Hours"><HoursPresetGroup /></Field>
            <Field label="Date"><DateFieldButton /></Field>
          </FieldRow>
        </DemoStage>
        <DemoStage label="Three-column row" fullWidth>
          <FieldRow columns={3}>
            <Input label="Client" defaultValue="RIA" />
            <Input label="Project" defaultValue="SOW#4" />
            <Input label="Hours" defaultValue="7.00h" />
          </FieldRow>
        </DemoStage>
      </div>
    ),
  },

  ChoiceGroup: {
    description: 'Single-select outlined pill group for entry types and compact form choices.',
    preview: () => <ChoiceGroupDemo />,
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Entry Type — Time Entry modal" render={() => <ChoiceGroupDemo />} />
        <DemoStage label="With icons">
          <ChoiceGroup
            ariaLabel="Object type"
            value="task"
            onChange={() => {}}
            options={[
              { label: 'Task', value: 'task', icon: <TaskIcon /> },
              { label: 'Project', value: 'project', icon: <FolderIcon /> },
            ]}
          />
        </DemoStage>
        <DemoStage label="Disabled option">
          <ChoiceGroup
            ariaLabel="Entry type disabled"
            value="billable"
            onChange={() => {}}
            options={[
              { label: 'Billable', value: 'billable' },
              { label: 'Non-Billable', value: 'non-billable' },
              { label: 'Internal', value: 'internal', disabled: true },
            ]}
          />
        </DemoStage>
      </div>
    ),
  },

  // ── Feedback ─────────────────────────────────────────────────────────────

  Callout: {
    description: 'Compact inline guidance box for success, info, warning, danger, and brand messages.',
    preview: () => (
      <Callout tone="success">Hours will be logged to <strong>RIA Branding</strong>.</Callout>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Success — Figma green box" fullWidth>
          <Callout tone="success">
            Your hours will be logged to <strong>RIA Branding & Website</strong> → SOW#4 → Radiology Imaging Associates
          </Callout>
        </DemoStage>
        <DemoStage label="Tones">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
            <Callout tone="info">This entry is linked to the active project.</Callout>
            <Callout tone="warning">Hours exceed the remaining weekly target.</Callout>
            <Callout tone="danger">This project is not available for time entry.</Callout>
            <Callout tone="brand">Use project mode to log non-task work.</Callout>
          </div>
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

  // ── Document View ─────────────────────────────────────────────────────────

  DocumentBreadcrumbs: {
    description: 'Back action plus breadcrumb trail for document workspaces.',
    preview: () => (
      <DocumentBreadcrumbs
        onBack={() => {}}
        items={['Engagements', 'Acme Health Systems', 'Solution Definition']}
      />
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Back action + breadcrumbs" fullWidth>
          <DocumentBreadcrumbs
            onBack={() => {}}
            items={[
              { label: 'Engagements', onClick: () => {} },
              { label: 'Acme Health Systems', onClick: () => {} },
              { label: 'Clinical Intake Automation Platform', current: true },
            ]}
          />
        </DemoStage>
        <DemoStage label="Breadcrumbs only" fullWidth>
          <DocumentBreadcrumbs items={['Documents', 'Solution Definition', 'Overview']} />
        </DemoStage>
      </div>
    ),
  },

  StatusPill: {
    description: 'Mixed-case lifecycle state badge with outlined semantic tone variants.',
    preview: () => (
      <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap', alignItems: 'center' }}>
        <StatusPill variant="draft" />
        <StatusPill variant="in-progress" />
        <StatusPill variant="reviewed" />
        <StatusPill variant="approved" />
        <StatusPill variant="pending" />
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="All variants">
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <StatusPill variant="draft" />
            <StatusPill variant="in-progress" />
            <StatusPill variant="reviewed" />
            <StatusPill variant="approved" />
            <StatusPill variant="pending" />
          </div>
        </DemoStage>
        <DemoStage label="Custom label override">
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <StatusPill variant="reviewed" label="Under Review" />
            <StatusPill variant="in-progress" label="Active" />
            <StatusPill variant="approved" label="Signed Off" />
          </div>
        </DemoStage>
      </div>
    ),
  },

  PageHeader: {
    description: 'Page-level title shell with subtitle, metadata, status, and action slot.',
    preview: () => (
      <PageHeader
        title="Solution Definition"
        status="in-progress"
        subtitle="Comprehensive problem framing, scope, and solution design."
      />
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Title only" fullWidth>
          <PageHeader title="Solution Definition" />
        </DemoStage>
        <DemoStage label="With status" fullWidth>
          <PageHeader title="Solution Definition" status="in-progress" />
        </DemoStage>
        <DemoStage label="Full — title, subtitle, status, meta" fullWidth>
          <PageHeader
            title="Solution Definition"
            status="in-progress"
            subtitle="Comprehensive problem framing, scope, and solution design for the engagement."
            meta="Last edited by Alex Rivera · 2d ago"
          />
        </DemoStage>
        <DemoStage label="With action slot" fullWidth>
          <PageHeader
            title="Discovery Report"
            status="approved"
            subtitle="Stakeholder interviews and technical assessment findings."
            metaItems={['Last edited by Jordan Lee', '1d ago']}
            actions={<Button variant="secondary" size="sm">Export</Button>}
          />
        </DemoStage>
      </div>
    ),
  },

  PageTabs: {
    description: 'Underline-style horizontal tab bar for document section navigation (3–7 tabs).',
    preview: () => (
      <PageTabs
        tabs={[
          { id: 'overview', label: 'Overview' },
          { id: 'pain-points', label: 'Pain Points' },
          { id: 'wish-list', label: 'Solution Wish List' },
        ]}
        activeTab="overview"
        onTabChange={() => {}}
      />
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Interactive — 5 tabs" fullWidth render={() => <PageTabsDemo />} />
        <DemoStage label="3 tabs" fullWidth>
          <PageTabs
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'details', label: 'Details' },
              { id: 'history', label: 'History' },
            ]}
            activeTab="overview"
            onTabChange={() => {}}
          />
        </DemoStage>
      </div>
    ),
  },

  DescriptionList: {
    description: 'Read-only labeled content display — uppercase labels above paragraph values.',
    preview: () => (
      <DescriptionList
        items={[
          { label: 'Client', value: 'Acme Health Systems' },
          { label: 'Engagement', value: 'Referral Intake Automation' },
        ]}
      />
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Two items" fullWidth>
          <DescriptionList
            items={[
              { label: 'Client Profile', value: 'Acme Health Systems is a regional healthcare network operating 23 outpatient clinics across the Pacific Northwest, serving approximately 180,000 patients annually.' },
              { label: 'Engagement Origin', value: 'This engagement originated from a discovery workshop identifying referral intake as the highest-impact bottleneck in patient access.' },
            ]}
          />
        </DemoStage>
        <DemoStage label="Three items" fullWidth>
          <DescriptionList
            items={[
              { label: 'Client', value: 'Acme Health Systems' },
              { label: 'Industry', value: 'Healthcare / Regional Network' },
              { label: 'Scope', value: '23 outpatient clinics, ~180,000 patients annually' },
            ]}
          />
        </DemoStage>
      </div>
    ),
  },

  SectionHeader: {
    description: 'Header row for document sections — icon, title, optional status pill, and edit action.',
    preview: () => (
      <SectionHeader
        icon={<ClipboardIcon />}
        title="Introduction"
        status="draft"
        onEdit={() => {}}
      />
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Title only" fullWidth>
          <SectionHeader title="Problem Statement" />
        </DemoStage>
        <DemoStage label="With icon and status" fullWidth>
          <SectionHeader icon={<ClipboardIcon />} title="Introduction" status="draft" />
        </DemoStage>
        <DemoStage label="Full — icon, title, status, edit" fullWidth>
          <SectionHeader icon={<ClipboardIcon />} title="Introduction" status="draft" onEdit={() => {}} />
        </DemoStage>
        <DemoStage label="Reviewed state" fullWidth>
          <SectionHeader icon={<TaskIcon />} title="Problem Statement" status="reviewed" onEdit={() => {}} />
        </DemoStage>
        <DemoStage label="Approved state" fullWidth>
          <SectionHeader title="Executive Summary" status="approved" />
        </DemoStage>
      </div>
    ),
  },

  DocumentSection: {
    description: 'Tinted document shell with header, inset body surface, and optional actions.',
    preview: () => (
      <DocumentSection
        header={<SectionHeader title="Introduction" status="draft" />}
      >
        <DescriptionList
          items={[{ label: 'Client Profile', value: 'Acme Health Systems is a regional healthcare network.' }]}
        />
      </DocumentSection>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Header + body + footer" fullWidth render={() => <DocumentSectionDemo />} />
        <DemoStage label="With AI action bar" fullWidth>
          <DocumentSection
            header={<SectionHeader icon={<TaskIcon />} title="Problem Statement" status="reviewed" onEdit={() => {}} />}
            footer={
              <AIActionBar
                actions={[
                  { label: 'Regenerate', onClick: () => {} },
                  { label: 'Expand Metrics', onClick: () => {} },
                ]}
              />
            }
          >
            <DescriptionList
              items={[
                { label: 'Problem', value: "Acme Health's intake teams spend an average of 14 minutes per patient manually transcribing referral documents, creating bottlenecks that delay care across 23 clinics." },
              ]}
            />
          </DocumentSection>
        </DemoStage>
        <DemoStage label="Body only — no header or footer" fullWidth>
          <DocumentSection>
            <DescriptionList
              items={[
                { label: 'Notes', value: 'No stakeholders assigned yet.' },
              ]}
            />
          </DocumentSection>
        </DemoStage>
      </div>
    ),
  },

  DocumentOutcomeList: {
    description: 'Divider-separated document outcome rows with status icon and body copy.',
    preview: () => <DocumentOutcomeList items={outcomeItems.slice(0, 2)} />,
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Expected outcomes" fullWidth>
          <DocumentOutcomeList items={outcomeItems} />
        </DemoStage>
      </div>
    ),
  },

  DocumentMetricCard: {
    description: 'Quantified benefit card for document body metrics and deltas.',
    preview: () => (
      <DocumentMetricCard
        label="Annual Cost Savings"
        value="$840K"
        delta="+4% vs Mar"
        supportingText="Reduced intake FTE"
      />
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Three-card benefit row" fullWidth>
          <DocumentMetricGrid />
        </DemoStage>
        <DemoStage label="Without delta" fullWidth>
          <div style={{ maxWidth: 320 }}>
            <DocumentMetricCard label="Error Reduction" value="88%" supportingText="Fewer data entry errors" />
          </div>
        </DemoStage>
      </div>
    ),
  },

  AssistBar: {
    description: 'Muted secondary action row with an optional label prefix — for AI-adjacent or meta actions.',
    preview: () => (
      <AssistBar
        label="AI Actions:"
        actions={[
          { label: 'Regenerate', onClick: () => {} },
          { label: 'Expand with metrics', onClick: () => {} },
        ]}
      />
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="With label prefix">
          <AssistBar
            label="AI Actions:"
            actions={[
              { label: 'Regenerate', onClick: () => {} },
              { label: 'Expand with metrics', onClick: () => {} },
            ]}
          />
        </DemoStage>
        <DemoStage label="Without label">
          <AssistBar
            actions={[
              { label: 'Copy link', onClick: () => {} },
              { label: 'Export as PDF', onClick: () => {} },
              { label: 'Archive', onClick: () => {} },
            ]}
          />
        </DemoStage>
        <DemoStage label="Single action">
          <AssistBar
            label="Quick action:"
            actions={[{ label: 'Mark as reviewed', onClick: () => {} }]}
          />
        </DemoStage>
      </div>
    ),
  },

  AIActionBar: {
    description: 'Success-tinted document action row for AI-assisted content actions.',
    preview: () => (
      <AIActionBar
        actions={[
          { label: 'Calculate ROI', onClick: () => {} },
          { label: 'Add Benefits', onClick: () => {} },
        ]}
      />
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="AI Actions row" fullWidth>
          <AIActionBar
            actions={[
              { label: 'Calculate ROI', onClick: () => {} },
              { label: 'Add Benefits', onClick: () => {} },
            ]}
          />
        </DemoStage>
        <DemoStage label="Full document workspace" fullWidth render={() => <DocumentWorkspaceDemo />} />
      </div>
    ),
  },

  // ── Navigation ───────────────────────────────────────────────────────────

  SideNavigation: {
    description: 'Dark NOS app sidebar shell with header, grouped nav content, and account footer slots.',
    preview: () => (
      <div className="demo-side-nav-card-scale">
        <SideNavigationDemo compact />
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Figma sidebar composition">
          <SideNavigationDemo />
        </DemoStage>
        <DemoStage label="Shell with custom slots">
          <SideNavigation
            className="demo-side-nav-mid"
            logo={<BrandMarkIcon />}
            notification={<SideNavNotificationButton icon={<BellIcon />} />}
            account={<SideNavAccount avatar={<DemoAccountAvatar />} name="Lena Park" supportingText="Operations Lead" menuIcon={<ChevronsIcon />} />}
          >
            <SideNavSearch icon={<SearchIcon />} shortcut="/" label="Find page" />
            <SideNavSection title="Workspace">
              <SideNavItem icon={<HomeIcon />} label="Overview" active />
              <SideNavItem icon={<AnalyticsIcon />} label="Reports" />
              <SideNavItem icon={<UsersIcon />} label="Team" />
            </SideNavSection>
          </SideNavigation>
        </DemoStage>
      </div>
    ),
  },

  SideNavSection: {
    description: 'Labeled sidebar group for related navigation items.',
    preview: () => (
      <div className="demo-side-nav-surface">
        <SideNavSection title="Main">
          <SideNavItem icon={<HomeIcon />} label="Home" active />
          <SideNavItem icon={<CalendarIcon />} label="Guidance" />
        </SideNavSection>
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="With title">
          <div className="demo-side-nav-surface">
            <SideNavSection title="Main">
              <SideNavItem icon={<HomeIcon />} label="Home" active />
              <SideNavItem icon={<CalendarIcon />} label="Guidance" />
              <SideNavItem icon={<ClockIcon />} label="Time Entry" />
            </SideNavSection>
          </div>
        </DemoStage>
        <DemoStage label="Without title">
          <div className="demo-side-nav-surface">
            <SideNavSection>
              <SideNavItem icon={<UsersIcon />} label="CRM" />
              <SideNavItem icon={<AnalyticsIcon />} label="Demand Planning" />
            </SideNavSection>
          </div>
        </DemoStage>
      </div>
    ),
  },

  SideNavItem: {
    description: 'Single sidebar navigation row with icon, active, hover, focus, link, and disabled states.',
    preview: () => (
      <div className="demo-side-nav-surface">
        <SideNavItem icon={<HomeIcon />} label="Home" active />
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="States">
          <div className="demo-side-nav-surface">
            <SideNavItem icon={<HomeIcon />} label="Active item" active />
            <SideNavItem icon={<CalendarIcon />} label="Default item" />
            <SideNavItem icon={<ClockIcon />} label="Disabled item" disabled />
          </div>
        </DemoStage>
        <DemoStage label="Link semantics">
          <div className="demo-side-nav-surface">
            <SideNavItem href="#side-nav-link" icon={<StructureIcon />} label="Project Management" />
          </div>
        </DemoStage>
      </div>
    ),
  },

  SideNavSearch: {
    description: 'Sidebar search and command trigger with optional shortcut badge.',
    preview: () => (
      <div className="demo-side-nav-surface">
        <SideNavSearch icon={<SearchIcon />} shortcut="⌘ K" />
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Default">
          <div className="demo-side-nav-surface">
            <SideNavSearch icon={<SearchIcon />} shortcut="⌘ K" />
          </div>
        </DemoStage>
        <DemoStage label="Without shortcut">
          <div className="demo-side-nav-surface">
            <SideNavSearch icon={<SearchIcon />} label="Search projects" />
          </div>
        </DemoStage>
        <DemoStage label="Disabled">
          <div className="demo-side-nav-surface">
            <SideNavSearch icon={<SearchIcon />} shortcut="/" disabled />
          </div>
        </DemoStage>
      </div>
    ),
  },

  SideNavNotificationButton: {
    description: 'Icon-only sidebar notification trigger with optional unread dot.',
    preview: () => (
      <div className="demo-side-nav-surface demo-side-nav-surface--inline">
        <SideNavNotificationButton icon={<BellIcon />} unread />
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Unread">
          <div className="demo-side-nav-surface demo-side-nav-surface--inline">
            <SideNavNotificationButton icon={<BellIcon />} unread />
          </div>
        </DemoStage>
        <DemoStage label="Default and disabled">
          <div className="demo-side-nav-surface demo-side-nav-surface--inline">
            <SideNavNotificationButton icon={<BellIcon />} />
            <SideNavNotificationButton icon={<BellIcon />} disabled />
          </div>
        </DemoStage>
      </div>
    ),
  },

  SideNavAccount: {
    description: 'Sidebar account footer trigger with avatar, primary text, supporting text, and menu affordance.',
    preview: () => (
      <div className="demo-side-nav-surface">
        <SideNavAccount avatar={<DemoAccountAvatar />} name="Maya Ortiz" supportingText="maya.ortiz@nymbl.app" menuIcon={<ChevronsIcon />} />
      </div>
    ),
    detail: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <DemoStage label="Full account row">
          <div className="demo-side-nav-surface">
            <SideNavAccount avatar={<DemoAccountAvatar />} name="Maya Ortiz" supportingText="maya.ortiz@nymbl.app" menuIcon={<ChevronsIcon />} />
          </div>
        </DemoStage>
        <DemoStage label="Name only">
          <div className="demo-side-nav-surface">
            <SideNavAccount avatar={<span className="demo-side-nav-avatar">RS</span>} name="Riley Stone" menuIcon={<ChevronsIcon />} />
          </div>
        </DemoStage>
        <DemoStage label="Disabled">
          <div className="demo-side-nav-surface">
            <SideNavAccount avatar={<span className="demo-side-nav-avatar">AK</span>} name="Avery Kim" supportingText="Strategy Team" disabled menuIcon={<ChevronsIcon />} />
          </div>
        </DemoStage>
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
