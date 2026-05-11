import { DashboardCard } from './DashboardCard.jsx';
import { Button } from './Button.jsx';
import './WeeklyPacing.css';

/**
 * WeeklyPacing — dashboard card showing weekly hours against target.
 *
 * Displays a hero value, segmented pacing bar (logged / today / remaining),
 * projection metadata, and an AI-generated insight footer.
 *
 * Props:
 *   title          — card header label. Defaults to "Weekly Pacing".
 *   value          — current logged hours display, e.g. "26.5h"
 *   target         — target label (right-aligned), e.g. "40h logged"
 *   loggedCount    — number of filled bars in the pacing chart
 *   totalCount     — total bar count (unused visually, available for consumers)
 *   projected      — projected total string, e.g. "41.2h"
 *   targetDayLabel — target day label, e.g. "Wed"
 *   insight        — { prefix, emphasis, suffix } mixed-weight insight text
 *   onViewReport   — if provided, renders a "View Report" link
 *   onTitleClick   — if provided, renders chevron on title (period selector)
 *   onExpand       — passed to DashboardCard
 *   onMore         — passed to DashboardCard
 */
export function WeeklyPacing({
  title = 'Weekly Pacing',
  value,
  target,
  loggedCount = 0,
  totalCount,
  projected,
  targetDayLabel,
  insight,
  onViewReport,
  onTitleClick,
  onExpand,
  onMore,
  ...rest
}) {
  const loggedBars = Array.from({ length: loggedCount });

  return (
    <DashboardCard
      title={title}
      onTitleClick={onTitleClick}
      onExpand={onExpand}
      onMore={onMore}
      {...rest}
    >
      <div className="nos-wp">
        {/* Hero row */}
        <div className="nos-wp__hero">
          <span className="nos-wp__value">{value}</span>
          {target && <span className="nos-wp__target">{target}</span>}
        </div>

        {/* Pacing bar */}
        <div className="nos-wp__bar-track" aria-hidden="true">
          {loggedBars.map((_, i) => (
            <span key={i} className="nos-wp__bar-segment nos-wp__bar-segment--logged" />
          ))}
          <span className="nos-wp__bar-segment nos-wp__bar-segment--today" />
          <span className="nos-wp__bar-segment nos-wp__bar-segment--remaining" />
        </div>

        {/* Meta row */}
        {(projected || targetDayLabel) && (
          <div className="nos-wp__meta">
            {projected && <span className="nos-wp__meta-left">Projected: {projected}</span>}
            {targetDayLabel && <span className="nos-wp__meta-right">Target line at {targetDayLabel}</span>}
          </div>
        )}

        {/* Divider */}
        {insight && <div className="nos-wp__divider" aria-hidden="true" />}

        {/* Insight row */}
        {insight && (
          <div className="nos-wp__insight">
            <div className="nos-wp__insight-left">
              <SparkleIcon />
              <p className="nos-wp__insight-text">
                {insight.prefix && <span className="nos-wp__insight-regular">{insight.prefix}</span>}
                {insight.emphasis && <span className="nos-wp__insight-emphasis">{insight.emphasis}</span>}
                {insight.suffix && <span className="nos-wp__insight-regular">{insight.suffix}</span>}
              </p>
            </div>
            {onViewReport && (
              <Button variant="link" trailingIcon={<ArrowRightIcon />} onClick={onViewReport}>
                View Report
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardCard>
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

function SparkleIcon() {
  return (
    <svg
      className="nos-wp__sparkle"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 0L8.05 5.25L13.3 7L8.05 8.75L7 14L5.95 8.75L0.7 7L5.95 5.25L7 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
