import './SideNavItem.css';

/**
 * SideNavItem — individual item row in the NOS side navigation.
 *
 * Renders as an anchor when `href` is provided and as a button otherwise.
 *
 * Props:
 *   icon       — optional leading icon ReactNode
 *   label      — visible item label
 *   active     — applies current/selected visual state
 *   disabled   — disables button items and marks link items inert
 *   href       — optional link target; when present renders <a>
 *   onClick    — click handler
 *   className  — optional class appended to the root
 *   ...rest    — forwarded to the rendered element
 */
export function SideNavItem({
  icon,
  label,
  active = false,
  disabled = false,
  href,
  onClick,
  className = '',
  ...rest
}) {
  const cls = [
    'nos-side-nav-item',
    active ? 'nos-side-nav-item--active' : '',
    disabled ? 'nos-side-nav-item--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && <span className="nos-side-nav-item__icon" aria-hidden="true">{icon}</span>}
      <span className="nos-side-nav-item__label">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        className={cls}
        href={disabled ? undefined : href}
        aria-current={active ? 'page' : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? preventInteraction : onClick}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={cls}
      type="button"
      disabled={disabled}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
}

function preventInteraction(event) {
  event.preventDefault();
}
