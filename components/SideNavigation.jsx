import './SideNavigation.css';

/**
 * SideNavigation — fixed-width NOS app navigation shell.
 *
 * Provides the dark brand sidebar structure from the NOS Figma sidebar:
 * header slot, scrollable navigation content, and footer/account slot.
 *
 * Props:
 *   logo          — ReactNode rendered in the header start slot
 *   notification  — ReactNode rendered in the header end slot
 *   account       — ReactNode rendered in the footer slot
 *   ariaLabel     — accessible label for the nav landmark
 *   className     — optional class appended to the root
 *   children      — SideNavSection / custom nav content
 *   ...rest       — forwarded to <nav>
 */
export function SideNavigation({
  logo,
  notification,
  account,
  ariaLabel = 'Primary navigation',
  className = '',
  children,
  ...rest
}) {
  const cls = ['nos-side-nav', className].filter(Boolean).join(' ');

  return (
    <nav className={cls} aria-label={ariaLabel} {...rest}>
      {(logo || notification) && (
        <div className="nos-side-nav__header">
          <div className="nos-side-nav__logo">{logo}</div>
          {notification && (
            <div className="nos-side-nav__notification">{notification}</div>
          )}
        </div>
      )}
      <div className="nos-side-nav__content">
        {children}
      </div>
      {account && (
        <div className="nos-side-nav__footer">
          {account}
        </div>
      )}
    </nav>
  );
}
