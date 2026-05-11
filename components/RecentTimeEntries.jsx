/**
 * RecentTimeEntries — Card-framed compact table showing recent time log entries.
 *
 * Manages its own card chrome (white bg, brand-50 border, 14px radius).
 * Does NOT use DashboardCard — the table extends edge-to-edge inside.
 *
 * Props:
 *   title       {string}   Card header title. Default: "Recent Time Entries"
 *   columns     {Array}    Column definitions: { key, label, cellType, width? }
 *                            cellType: 'icon' | 'subtext' | 'text' | 'hours'
 *   rows        {Array}    Row data objects keyed to match column keys.
 *                            icon cell: { task: string, icon?: JSX }
 *                            subtext cell: { demand: string, client: string }
 *                            text cell: { project: string }
 *                            hours cell: { hours: string }
 *   onViewAll   {Function} Called when "View All ↗" link is clicked.
 */

import { TableHeader } from './TableHeader.jsx';
import { TableCellText, TableCellSubtext, TableCellIcon } from './TableCell.jsx';
import './RecentTimeEntries.css';

// ── Clipboard icon ────────────────────────────────────────────────────────

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

function ArrowUpRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 11L11 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M5 3H11V9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Cell dispatcher ───────────────────────────────────────────────────────

function renderCell(colDef, row) {
  const { key, cellType } = colDef;

  switch (cellType) {
    case 'icon':
      return (
        <TableCellIcon
          icon={row.icon ?? <ClipboardIcon />}
          text={row[key]}
        />
      );
    case 'subtext': {
      const subtextKey = colDef.subtextKey ?? `${key}Sub`;
      return (
        <TableCellSubtext
          text={row[key]}
          subtext={row[subtextKey]}
        />
      );
    }
    case 'hours':
    case 'text':
    default:
      return <TableCellText text={row[key]} />;
  }
}

// ── Component ─────────────────────────────────────────────────────────────

const DEFAULT_COLUMNS = [
  { key: 'task',    label: 'Task',    cellType: 'icon' },
  { key: 'demand',  label: 'Demand',  cellType: 'subtext', subtextKey: 'client' },
  { key: 'project', label: 'Project', cellType: 'text' },
  { key: 'hours',   label: 'Hours',   cellType: 'hours', width: 71 },
];

export function RecentTimeEntries({
  title = 'Recent Time Entries',
  columns = DEFAULT_COLUMNS,
  rows = [],
  onViewAll,
  ...rest
}) {
  const headerActions = onViewAll
    ? [{ label: 'View All', icon: <ArrowUpRightIcon />, onClick: onViewAll }]
    : [];

  return (
    <div className="nos-rte" {...rest}>
      <TableHeader title={title} actions={headerActions} />

      {/* Table */}
      <table className="nos-rte__table">
        <thead>
          <tr className="nos-rte__col-header-row">
            {columns.map((col) => (
              <th
                key={col.key}
                className="nos-rte__col-header"
                style={col.width ? { width: col.width } : undefined}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id ?? i}
              className={`nos-rte__row${i === rows.length - 1 ? ' nos-rte__row--last' : ''}`}
            >
              {columns.map((col) => (
                <td key={col.key} className="nos-rte__cell">
                  {renderCell(col, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
