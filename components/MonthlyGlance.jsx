import { DashboardCard } from './DashboardCard.jsx';
import './MonthlyGlance.css';

/**
 * MonthlyGlance — dashboard card showing monthly metrics in a stat grid.
 *
 * Renders a 2-column (configurable) grid of stats, separated by dividers
 * between rows. Each stat supports an optional delta or status badge.
 *
 * Props:
 *   title        — card header label. Defaults to "Monthly Glance".
 *   stats        — Array<{
 *                    id?:    string
 *                    label:  string
 *                    value:  string
 *                    badge?: {
 *                      type: 'delta' | 'status'
 *                      text: string
 *                      tone: 'success' | 'warning' | 'danger' | 'info'
 *                    }
 *                  }>
 *   cols         — stats per row. Defaults to 2.
 *   onTitleClick — if provided, renders chevron on title (period selector)
 *   onExpand     — passed to DashboardCard
 *   onMore       — passed to DashboardCard
 */
export function MonthlyGlance({
  title = 'Monthly Glance',
  stats = [],
  cols = 2,
  onTitleClick,
  onExpand,
  onMore,
  ...rest
}) {
  // Split stats into rows of `cols` length
  const rows = [];
  for (let i = 0; i < stats.length; i += cols) {
    rows.push(stats.slice(i, i + cols));
  }

  return (
    <DashboardCard
      title={title}
      onTitleClick={onTitleClick}
      onExpand={onExpand}
      onMore={onMore}
      {...rest}
    >
      <div className="nos-mg">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`nos-mg__row${rowIdx < rows.length - 1 ? ' nos-mg__row--divided' : ''}`}
          >
            {row.map((stat, statIdx) => (
              <StatCell key={stat.id ?? `${rowIdx}-${statIdx}`} {...stat} />
            ))}
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

function StatCell({ label, value, badge }) {
  const statusBadge = badge?.type === 'status' ? badge : null;
  const deltaBadge = badge?.type === 'delta' ? badge : null;

  return (
    <div className="nos-mg__stat">
      <div className="nos-mg__label-row">
        <span className="nos-mg__label">{label}</span>
        {statusBadge && (
          <span className={`nos-mg__badge nos-mg__badge--status nos-mg__badge--${statusBadge.tone}`}>
            <span className="nos-mg__badge-dot" aria-hidden="true">·</span>
            {statusBadge.text}
          </span>
        )}
      </div>
      <div className="nos-mg__value-row">
        <span className="nos-mg__value">{value}</span>
        {deltaBadge && (
          <span className={`nos-mg__badge nos-mg__badge--delta nos-mg__badge--${deltaBadge.tone}`}>
            {deltaBadge.text}
          </span>
        )}
      </div>
    </div>
  );
}
