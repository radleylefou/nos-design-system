import './Metrics.css';

/**
 * Metrics — summary module for a compact set of numeric KPIs.
 *
 * Props:
 *   title:    optional module heading
 *   items:    array of { label, value, unit, trend? } metric objects
 *             trend: { direction: 'up'|'down', label: string }
 *   variant:  'default' | 'featured' — featured uses brand bg with white text
 *   as:       HTML tag to render for the module shell (default: "section")
 *   children: optional custom metric content; used instead of items when provided
 *
 * Usage:
 *   <Metrics
 *     title="April 2026"
 *     items={[
 *       { label: 'True Capacity', value: '0.00', unit: 'hrs' },
 *       { label: 'Total Guidance', value: '115.00', unit: 'hrs', trend: { direction: 'up', label: '+12%' } },
 *     ]}
 *   />
 */
export function Metrics({
  title,
  items = [],
  variant = 'default',
  as: Tag = 'section',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'nos-metrics',
    `nos-metrics--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...rest}>
      {title && (
        <header className="nos-metrics__header">
          <h2 className="nos-metrics__title">{title}</h2>
        </header>
      )}
      <div className="nos-metrics__grid">
        {children || items.map((item, index) => (
          <MetricItem
            key={`${item.label}-${index}`}
            label={item.label}
            value={item.value}
            unit={item.unit}
            trend={item.trend}
          />
        ))}
      </div>
    </Tag>
  );
}

function MetricItem({
  label,
  value,
  unit,
  trend,
  className = '',
  ...rest
}) {
  const classes = ['nos-metrics__item', className].filter(Boolean).join(' ');

  return (
    <article className={classes} {...rest}>
      <div className="nos-metrics__label">{label}</div>
      <div className="nos-metrics__reading">
        <span className="nos-metrics__value">{value}</span>
        {unit && <span className="nos-metrics__unit">{unit}</span>}
      </div>
      {trend && (
        <div className={`nos-metrics__trend nos-metrics__trend--${trend.direction}`}>
          {trend.direction === 'up' ? '↑' : '↓'} {trend.label}
        </div>
      )}
    </article>
  );
}

Metrics.Item = MetricItem;
