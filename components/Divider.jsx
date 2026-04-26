import './Divider.css';

/**
 * Divider — visual separator between groups of content.
 *
 * Props:
 *   orientation: "horizontal" | "vertical"   (default "horizontal")
 *   variant:     "solid" | "dashed"          (default "solid")
 *   spacing:     "none" | "sm" | "md" | "lg" (default "md")
 *   label:       string | node — when provided, renders centered text on the line
 *   align:       "start" | "center" | "end"  (default "center"; only with label)
 *
 * Usage:
 *   <Divider />
 *   <Divider label="OR" />
 *   <Divider orientation="vertical" />
 */
export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  spacing = 'md',
  label,
  align = 'center',
  className = '',
  ...rest
}) {
  const classes = [
    'nos-divider',
    `nos-divider--${orientation}`,
    `nos-divider--${variant}`,
    `nos-divider--space-${spacing}`,
    label ? `nos-divider--with-label nos-divider--align-${align}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (orientation === 'vertical' || !label) {
    return <div className={classes} role="separator" aria-orientation={orientation} {...rest} />;
  }

  return (
    <div className={classes} role="separator" {...rest}>
      <span className="nos-divider__line" aria-hidden="true" />
      <span className="nos-divider__label">{label}</span>
      <span className="nos-divider__line" aria-hidden="true" />
    </div>
  );
}
