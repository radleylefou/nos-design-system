/**
 * PipelineTable — Full-width data table with search, toolbar, and per-row actions.
 *
 * Manages its own card chrome (white bg, brand-50 border, 14px radius).
 * The table scrolls horizontally when container is narrower than column widths.
 *
 * Props:
 *   columns      {Array}    Column defs: { key, label, cellType, width? }
 *                             cellType: 'text' | 'link' | 'subtext'
 *   rows         {Array}    Row data objects keyed to match column keys.
 *   searchValue  {string}   Controlled value for search input.
 *   onSearch     {Function} Called with new value as user types.
 *   onFilterBy   {Function} Called when "Filter By" is clicked.
 *   onExport     {Function} Called when "Export" is clicked.
 *   onNote       {Function} Called with row data when "+Note" is clicked.
 *   onOpenLink   {Function} Called with row data when external-link icon is clicked.
 *   onCellClick  {Function} Called with (row, colKey) when a 'link' cell is clicked.
 */

import { TableHeader } from './TableHeader.jsx';
import { TableCellText, TableCellSubtext, TableCellLink, TableCellActions } from './TableCell.jsx';
import { PIPELINE_COLUMNS } from './pipelineColumns.js';
import './PipelineTable.css';

// ── Icons ─────────────────────────────────────────────────────────────────

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4H14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M4 8H12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M6 12H10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2V10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M5 7L8 10L11 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13H13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

// ── Cell dispatcher ───────────────────────────────────────────────────────

function renderCell(colDef, row, onCellClick) {
  const { key, cellType } = colDef;
  const value = row[key];

  switch (cellType) {
    case 'link':
      return (
        <TableCellLink
          text={value}
          onClick={onCellClick ? () => onCellClick(row, key) : undefined}
        />
      );
    case 'subtext': {
      const subtextKey = colDef.subtextKey ?? `${key}Sub`;
      return (
        <TableCellSubtext
          text={value}
          subtext={row[subtextKey]}
        />
      );
    }
    case 'text':
    default:
      return <TableCellText text={value} />;
  }
}

// ── Component ─────────────────────────────────────────────────────────────

export function PipelineTable({
  columns = PIPELINE_COLUMNS,
  rows = [],
  searchValue = '',
  onSearch,
  onFilterBy,
  onExport,
  onNote,
  onOpenLink,
  onCellClick,
  ...rest
}) {
  const toolbarActions = [
    ...(onFilterBy ? [{ label: 'Filter By', icon: <FilterIcon />, onClick: onFilterBy }] : []),
    ...(onExport ? [{ label: 'Export', icon: <ExportIcon />, onClick: onExport }] : []),
  ];

  return (
    <div className="nos-pt" {...rest}>
      <TableHeader
        search={{ value: searchValue, onChange: onSearch }}
        actions={toolbarActions}
      />

      {/* Scrollable table */}
      <div className="nos-pt__scroll">
        <table className="nos-pt__table">
          <thead>
            <tr className="nos-pt__col-header-row">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="nos-pt__col-header"
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.label}
                </th>
              ))}
              {(onNote || onOpenLink) && (
                <th className="nos-pt__col-header nos-pt__col-header--actions" />
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id ?? i}
                className={`nos-pt__row${i === rows.length - 1 ? ' nos-pt__row--last' : ''}`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="nos-pt__cell">
                    {renderCell(col, row, onCellClick)}
                  </td>
                ))}
                {(onNote || onOpenLink) && (
                  <td className="nos-pt__cell nos-pt__cell--actions">
                    <TableCellActions
                      onNote={onNote ? () => onNote(row) : undefined}
                      onOpenLink={onOpenLink ? () => onOpenLink(row) : undefined}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
