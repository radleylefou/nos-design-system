import './StatusPill.css';

/**
 * StatusPill — compact badge indicating an object's lifecycle state.
 *
 * Props:
 *   variant  — lifecycle/status key; sets default label and tone
 *   tone     — optional color tone override: 'neutral' | 'brand' | 'info' | 'success' | 'warning' | 'danger' | 'orange' | 'amber'
 *   surface  — 'tint' | 'white'; tint uses a light colored fill, white is for grey headers
 *   label    — optional override text; defaults to a capitalized form of the variant
 *   ...rest  — forwarded to the root <span>
 */
export function StatusPill({
  variant = 'draft',
  tone,
  surface = 'tint',
  label,
  className = '',
  ...rest
}) {
  const defaultLabels = {
    'draft': 'Draft',
    'in-progress': 'In Progress',
    'reviewed': 'Reviewed',
    'approved': 'Approved',
    'pending': 'Pending',
    'neutral': 'Neutral',
    'brand': 'Brand',
    'info': 'Info',
    'success': 'Success',
    'warning': 'Warning',
    'danger': 'Danger',
    'orange': 'Orange',
    'amber': 'Amber',
  };
  const defaultTones = {
    'draft': 'orange',
    'in-progress': 'amber',
    'reviewed': 'info',
    'approved': 'success',
    'pending': 'neutral',
    'neutral': 'neutral',
    'brand': 'brand',
    'info': 'info',
    'success': 'success',
    'warning': 'warning',
    'danger': 'danger',
    'orange': 'orange',
    'amber': 'amber',
  };

  const displayLabel = label ?? defaultLabels[variant] ?? variant;
  const visualTone = tone ?? defaultTones[variant] ?? 'neutral';
  const cls = [
    'nos-status-pill',
    `nos-status-pill--${visualTone}`,
    `nos-status-pill--surface-${surface}`,
    `nos-status-pill--variant-${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={cls} {...rest}>
      {displayLabel}
    </span>
  );
}
