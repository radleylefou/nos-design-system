import './StatBlock.css';

/**
 * StatBlock — single-metric display tile for dashboards and detail headers.
 *
 * Where Metrics renders a row of KPIs as a unit, StatBlock is composable —
 * use one in a Card, several in a grid, or alongside other content.
 *
 * Props:
 *   label:    string | node — small uppercase label
 *   value:    string | number — the headline number
 *   unit:     string | node — units suffix (smaller, muted)
 *   delta:    { direction: "up" | "down" | "flat", label: string }
 *   trend:    "positive" | "negative" | "neutral" — overrides direction-derived tone
 *   helper:   string | node — secondary line (e.g., "vs last week")
 *   icon:     leading icon node
 *   align:    "start" | "center" | "end"   (default "start")
 *
 * Usage:
 *   <StatBlock label="Revenue" value="$48,210" delta={{ direction: 'up', label: '+12.4%' }} />
 */
export function StatBlock({
  label,
  value,
  unit,
  delta,
  trend,
  helper,
  icon,
  align = 'start',
  className = '',
  ...rest
}) {
  const tone =
    trend ||
    (delta?.direction === 'up' ? 'positive'
      : delta?.direction === 'down' ? 'negative'
      : 'neutral');

  const classes = [
    'nos-stat',
    `nos-stat--align-${align}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {(label || icon) && (
        <div className="nos-stat__head">
          {icon && <span className="nos-stat__icon">{icon}</span>}
          {label && <span className="nos-stat__label">{label}</span>}
        </div>
      )}
      <div className="nos-stat__row">
        <span className="nos-stat__value">{value}</span>
        {unit && <span className="nos-stat__unit">{unit}</span>}
        {delta && (
          <span className={`nos-stat__delta nos-stat__delta--${tone}`}>
            <DeltaGlyph direction={delta.direction} />
            {delta.label}
          </span>
        )}
      </div>
      {helper && <div className="nos-stat__helper">{helper}</div>}
    </div>
  );
}

function DeltaGlyph({ direction }) {
  if (direction === 'flat') {
    return (
      <svg viewBox="0 0 12 12" width="10" height="10" fill="none" aria-hidden="true">
        <path d="M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  const isUp = direction === 'up';
  return (
    <svg viewBox="0 0 12 12" width="10" height="10" fill="none" aria-hidden="true">
      <path
        d={isUp ? 'M3 7.5L6 4l3 3.5' : 'M3 4.5L6 8l3-3.5'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
