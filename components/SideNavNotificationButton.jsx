import './SideNavNotificationButton.css';

/**
 * SideNavNotificationButton — icon-only notification trigger for side nav.
 *
 * Props:
 *   icon       — icon ReactNode
 *   unread     — renders the unread indicator dot
 *   ariaLabel  — accessible label, defaults to "Notifications"
 *   disabled   — disables the button
 *   className  — optional class appended to the root
 *   ...rest    — forwarded to <button>
 */
export function SideNavNotificationButton({
  icon,
  unread = false,
  ariaLabel = 'Notifications',
  disabled = false,
  className = '',
  ...rest
}) {
  const cls = ['nos-side-nav-notification', unread ? 'nos-side-nav-notification--unread' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={cls} type="button" aria-label={ariaLabel} disabled={disabled} {...rest}>
      <span className="nos-side-nav-notification__icon" aria-hidden="true">{icon}</span>
      {unread && <span className="nos-side-nav-notification__dot" aria-hidden="true" />}
    </button>
  );
}
