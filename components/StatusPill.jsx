import './StatusPill.css';

/**
 * StatusPill — compact badge indicating an object's lifecycle state.
 *
 * Props:
 *   variant  — 'draft' | 'in-progress' | 'reviewed' | 'approved' | 'pending'
 *   label    — optional override text; defaults to a capitalised form of the variant
 *   ...rest  — forwarded to the root <span>
 */
export function StatusPill({ variant = 'draft', label, className = '', ...rest }) {
  const defaultLabels = {
    'draft': 'Draft',
    'in-progress': 'In Progress',
    'reviewed': 'Reviewed',
    'approved': 'Approved',
    'pending': 'Pending',
  };

  const displayLabel = label ?? defaultLabels[variant] ?? variant;
  const cls = ['nos-status-pill', `nos-status-pill--${variant}`, className].filter(Boolean).join(' ');

  return (
    <span className={cls} {...rest}>
      {displayLabel}
    </span>
  );
}
