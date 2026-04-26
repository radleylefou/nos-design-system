import './Progress.css';

/**
 * ProgressBar — linear progress indicator for determinate or indeterminate work.
 *
 * Props:
 *   value:       0–100, current progress (omit or set null for indeterminate)
 *   max:         number, defaults to 100
 *   variant:     "brand" | "success" | "warning" | "error"   (default "brand")
 *   size:        "sm" | "md" | "lg"                          (default "md")
 *   label:       string | node — rendered above the bar
 *   showValue:   boolean — render numeric value alongside the label
 *   formatValue: (value, max) => string, defaults to "{n}%"
 *
 * Usage:
 *   <ProgressBar label="Uploading" value={42} showValue />
 *   <ProgressBar />   // indeterminate
 */
export function ProgressBar({
  value = null,
  max = 100,
  variant = 'brand',
  size = 'md',
  label,
  showValue = false,
  formatValue,
  className = '',
  ...rest
}) {
  const indeterminate = value == null;
  const clamped = indeterminate ? 0 : Math.max(0, Math.min(value, max));
  const pct = (clamped / max) * 100;
  const display = formatValue ? formatValue(clamped, max) : `${Math.round(pct)}%`;

  const classes = [
    'nos-progress',
    `nos-progress--${variant}`,
    `nos-progress--${size}`,
    indeterminate ? 'nos-progress--indeterminate' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {(label || showValue) && (
        <div className="nos-progress__head">
          {label && <span className="nos-progress__label">{label}</span>}
          {showValue && !indeterminate && <span className="nos-progress__value">{display}</span>}
        </div>
      )}
      <div
        className="nos-progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : clamped}
        aria-label={typeof label === 'string' ? label : undefined}
      >
        <div
          className="nos-progress__fill"
          style={indeterminate ? undefined : { width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/**
 * ProgressRing — circular progress indicator. Same value model as ProgressBar.
 *
 * Props:
 *   value:    0–max, current progress
 *   max:      number, defaults to 100
 *   size:     pixel diameter (default 48)
 *   thickness: stroke width in px (default 4)
 *   variant:  "brand" | "success" | "warning" | "error"   (default "brand")
 *   label:    optional centered label — falsy renders the percentage
 *
 * Usage:
 *   <ProgressRing value={62} />
 *   <ProgressRing value={3} max={5} label="3/5" />
 */
export function ProgressRing({
  value = 0,
  max = 100,
  size = 48,
  thickness = 4,
  variant = 'brand',
  label,
  className = '',
  ...rest
}) {
  const clamped = Math.max(0, Math.min(value, max));
  const pct = (clamped / max) * 100;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const center = size / 2;

  const classes = ['nos-ring', `nos-ring--${variant}`, className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={clamped}
      {...rest}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="nos-ring__track"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={thickness}
          fill="none"
        />
        <circle
          className="nos-ring__fill"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={thickness}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <span className="nos-ring__label">{label ?? `${Math.round(pct)}%`}</span>
    </div>
  );
}
