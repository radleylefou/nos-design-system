import { Badge } from './Badge.jsx';

/**
 * StatusPill — Badge preset for the canonical NOS scope statuses.
 *
 * Enforces consistent labeling and color mapping so individual screens
 * cannot drift. Add new statuses here, not at the call site.
 *
 * Props:
 *   status:  "draft" | "in-review" | "approved" | "archived" | "rejected"
 *   size:    "sm" | "md"   (default: "md")
 *   dot:     boolean       (default: true)
 *
 * Usage:
 *   <StatusPill status="approved" />
 *   <StatusPill status="in-review" size="sm" />
 */

const STATUS_MAP = {
  draft:       { variant: 'neutral', label: 'Draft' },
  'in-review': { variant: 'info',    label: 'In Review' },
  approved:    { variant: 'success', label: 'Approved' },
  archived:    { variant: 'neutral', label: 'Archived' },
  rejected:    { variant: 'error',   label: 'Rejected' },
};

export function StatusPill({ status, size = 'md', dot = true, ...rest }) {
  const config = STATUS_MAP[status] || { variant: 'neutral', label: status };

  return (
    <Badge variant={config.variant} size={size} dot={dot} {...rest}>
      {config.label}
    </Badge>
  );
}

export const STATUS_OPTIONS = Object.keys(STATUS_MAP);
