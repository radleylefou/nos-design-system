import './Badge.css';

/**
 * Badge — compact status/tag label.
 *
 * Props:
 *   variant: "neutral" | "brand" | "success" | "warning" | "error" | "info"   (default: "neutral")
 *   size:    "sm" | "md"                                                     (default: "md")
 *   dot:     boolean — renders a leading status dot
 *   children: label content
 *
 * Usage:
 *   <Badge variant="success" dot>Active</Badge>
 *   <Badge variant="brand">New</Badge>
 */
export function Badge({
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'nos-badge',
    `nos-badge--${variant}`,
    `nos-badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {dot && <span className="nos-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
