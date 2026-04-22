import './Button.css';

/**
 * Button — primary interactive control.
 *
 * Props:
 *   variant:  "primary" | "secondary" | "ghost" | "danger"   (default: "primary")
 *   size:     "sm" | "md" | "lg"                             (default: "md")
 *   disabled: boolean
 *   loading:  boolean   — shows a spinner and blocks clicks
 *   leadingIcon, trailingIcon: ReactNode
 *   children: label content
 *
 * Usage:
 *   <Button variant="primary" onClick={save}>Save changes</Button>
 *   <Button variant="ghost" size="sm" leadingIcon={<PlusIcon />}>Add</Button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  children,
  className = '',
  type = 'button',
  ...rest
}) {
  const classes = [
    'nos-button',
    `nos-button--${variant}`,
    `nos-button--${size}`,
    loading ? 'nos-button--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="nos-button__spinner" aria-hidden="true" />}
      {!loading && leadingIcon && <span className="nos-button__icon">{leadingIcon}</span>}
      <span className="nos-button__label">{children}</span>
      {!loading && trailingIcon && <span className="nos-button__icon">{trailingIcon}</span>}
    </button>
  );
}
