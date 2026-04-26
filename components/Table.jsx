import { useMemo, useState } from 'react';
import './Table.css';

/**
 * Table — data grid for browsing and acting on records.
 *
 * Props:
 *   columns:   array of {
 *                key,                       — unique column id
 *                header,                    — string | node
 *                accessor,                  — (row) => value, defaults to row[key]
 *                render,                    — (value, row) => node, optional custom cell
 *                align,                     — "left" | "center" | "right"  (default "left")
 *                width,                     — CSS width for the column
 *                sortable,                  — boolean
 *              }
 *   data:        array of row objects
 *   getRowKey:   (row, index) => key, defaults to row.id ?? index
 *   onRowClick:  (row) => void — entire row becomes interactive when set
 *   selectable:  boolean — adds a leading checkbox column
 *   selectedKeys: array of selected row keys (controlled)
 *   onSelectChange: (nextKeys) => void
 *   density:     "compact" | "default" | "comfortable"   (default "default")
 *   stickyHeader: boolean
 *   emptyState:  node — rendered when data is empty
 *   loading:     boolean — renders a loading row overlay
 *   sort:        { key, direction } controlled sort state
 *   defaultSort: { key, direction } uncontrolled initial sort
 *   onSortChange: (next) => void
 *
 * Usage:
 *   <Table
 *     columns={[
 *       { key: 'name', header: 'Name', sortable: true },
 *       { key: 'status', header: 'Status', render: (v) => <Badge>{v}</Badge> },
 *     ]}
 *     data={rows}
 *   />
 */
export function Table({
  columns = [],
  data = [],
  getRowKey,
  onRowClick,
  selectable = false,
  selectedKeys,
  onSelectChange,
  density = 'default',
  stickyHeader = false,
  emptyState = 'No records to show.',
  loading = false,
  sort,
  defaultSort,
  onSortChange,
  className = '',
  ...rest
}) {
  const [internalSort, setInternalSort] = useState(defaultSort || null);
  const activeSort = sort !== undefined ? sort : internalSort;

  const resolveRowKey = (row, index) =>
    getRowKey ? getRowKey(row, index) : row?.id ?? index;

  const rows = useMemo(() => {
    if (!activeSort?.key) return data;
    const column = columns.find((c) => c.key === activeSort.key);
    if (!column) return data;
    const accessor = column.accessor || ((row) => row[column.key]);
    const sorted = [...data].sort((a, b) => {
      const av = accessor(a);
      const bv = accessor(b);
      if (av === bv) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') return av - bv;
      return String(av).localeCompare(String(bv), undefined, { numeric: true });
    });
    return activeSort.direction === 'desc' ? sorted.reverse() : sorted;
  }, [data, columns, activeSort]);

  const cycleSort = (key) => {
    let next;
    if (!activeSort || activeSort.key !== key) {
      next = { key, direction: 'asc' };
    } else if (activeSort.direction === 'asc') {
      next = { key, direction: 'desc' };
    } else {
      next = null;
    }
    if (sort === undefined) setInternalSort(next);
    onSortChange?.(next);
  };

  const allKeys = rows.map(resolveRowKey);
  const selectedSet = new Set(selectedKeys || []);
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selectedSet.has(k));
  const someSelected = !allSelected && allKeys.some((k) => selectedSet.has(k));

  const toggleAll = () => {
    if (!onSelectChange) return;
    onSelectChange(allSelected ? [] : allKeys);
  };

  const toggleRow = (key) => {
    if (!onSelectChange) return;
    const next = new Set(selectedSet);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    onSelectChange(Array.from(next));
  };

  const tableClasses = [
    'nos-table',
    `nos-table--${density}`,
    stickyHeader ? 'nos-table--sticky' : '',
    onRowClick ? 'nos-table--row-clickable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const colSpan = columns.length + (selectable ? 1 : 0);

  return (
    <div className="nos-table__scroll">
      <table className={tableClasses} {...rest}>
        <thead>
          <tr>
            {selectable && (
              <th className="nos-table__cell nos-table__cell--select" scope="col">
                <input
                  type="checkbox"
                  className="nos-table__checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={toggleAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((column) => {
              const isSorted = activeSort?.key === column.key;
              const direction = isSorted ? activeSort.direction : null;
              const headerClasses = [
                'nos-table__cell',
                'nos-table__cell--head',
                `nos-table__cell--${column.align || 'left'}`,
                column.sortable ? 'nos-table__cell--sortable' : '',
                isSorted ? 'nos-table__cell--sorted' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <th
                  key={column.key}
                  scope="col"
                  className={headerClasses}
                  style={column.width ? { width: column.width } : undefined}
                  aria-sort={isSorted ? (direction === 'asc' ? 'ascending' : 'descending') : undefined}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className="nos-table__sort"
                      onClick={() => cycleSort(column.key)}
                    >
                      <span>{column.header}</span>
                      <SortGlyph direction={direction} />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr className="nos-table__row nos-table__row--loading">
              <td className="nos-table__cell" colSpan={colSpan}>
                Loading…
              </td>
            </tr>
          )}
          {!loading && rows.length === 0 && (
            <tr className="nos-table__row nos-table__row--empty">
              <td className="nos-table__cell" colSpan={colSpan}>
                {emptyState}
              </td>
            </tr>
          )}
          {!loading && rows.map((row, index) => {
            const key = resolveRowKey(row, index);
            const isSelected = selectedSet.has(key);
            const rowClasses = [
              'nos-table__row',
              isSelected ? 'nos-table__row--selected' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <tr
                key={key}
                className={rowClasses}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {selectable && (
                  <td
                    className="nos-table__cell nos-table__cell--select"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      className="nos-table__checkbox"
                      checked={isSelected}
                      onChange={() => toggleRow(key)}
                      aria-label="Select row"
                    />
                  </td>
                )}
                {columns.map((column) => {
                  const accessor = column.accessor || ((r) => r[column.key]);
                  const value = accessor(row);
                  return (
                    <td
                      key={column.key}
                      className={`nos-table__cell nos-table__cell--${column.align || 'left'}`}
                    >
                      {column.render ? column.render(value, row) : value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SortGlyph({ direction }) {
  return (
    <span className="nos-table__sort-glyph" aria-hidden="true">
      <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
        <path
          d="M3 5l3-3 3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={direction === 'asc' ? 1 : 0.35}
        />
        <path
          d="M3 7l3 3 3-3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={direction === 'desc' ? 1 : 0.35}
        />
      </svg>
    </span>
  );
}
