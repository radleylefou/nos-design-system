import './SideNavAccount.css';

/**
 * SideNavAccount — footer account trigger for NOS side navigation.
 *
 * Renders as an anchor when `href` is provided and as a button otherwise.
 *
 * Props:
 *   avatar         — avatar ReactNode or image element
 *   name           — primary user/account name
 *   supportingText — secondary text, usually email or role
 *   menuIcon       — optional trailing menu affordance
 *   href           — optional link target; when present renders <a>
 *   onClick        — click handler
 *   disabled       — disables button items and marks link items inert
 *   className      — optional class appended to the root
 *   ...rest        — forwarded to rendered element
 */
export function SideNavAccount({
  avatar,
  name,
  supportingText,
  menuIcon,
  href,
  onClick,
  disabled = false,
  className = '',
  ...rest
}) {
  const cls = ['nos-side-nav-account', disabled ? 'nos-side-nav-account--disabled' : '', className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {avatar && <span className="nos-side-nav-account__avatar">{avatar}</span>}
      <span className="nos-side-nav-account__identity">
        <span className="nos-side-nav-account__name">{name}</span>
        {supportingText && <span className="nos-side-nav-account__supporting">{supportingText}</span>}
      </span>
      {menuIcon && <span className="nos-side-nav-account__menu" aria-hidden="true">{menuIcon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        className={cls}
        href={disabled ? undefined : href}
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
    <button className={cls} type="button" disabled={disabled} onClick={onClick} {...rest}>
      {content}
    </button>
  );
}

function preventInteraction(event) {
  event.preventDefault();
}
