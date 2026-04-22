import './SideNav.css';

/**
 * SideNav — application-level navigation shell for NOS apps.
 *
 * Dark-surface component. Uses brand color ramp tokens for its own
 * background — not the standard semantic surface tokens.
 *
 * Composition:
 *   <SideNav>
 *     <SideNav.Header logo={<svg/>} brand="nymbl" />
 *     <SideNav.Section>
 *       <SideNav.Item icon={<svg/>} active>Home</SideNav.Item>
 *       <SideNav.Item icon={<svg/>}>Guidance</SideNav.Item>
 *     </SideNav.Section>
 *     <SideNav.Section label="Tools" divider>
 *       <SideNav.Item>CRM</SideNav.Item>
 *     </SideNav.Section>
 *     <SideNav.Footer name="Team Member" email="member@example.com" avatar={<img/>} />
 *   </SideNav>
 *
 * Props — SideNav:
 *   children, className
 *
 * Props — SideNav.Header:
 *   logo:   ReactNode — mark/icon rendered in the badge circle
 *   brand:  string   — brand name text
 *
 * Props — SideNav.Section:
 *   label:  string   — optional small label above the section
 *   divider: boolean — render a dividing rule above the section
 *
 * Props — SideNav.Item:
 *   icon:    ReactNode — leading icon slot
 *   active:  boolean  — selected/current state
 *   onClick: function
 *
 * Props — SideNav.Footer:
 *   name:   string
 *   email:  string
 *   avatar: ReactNode — custom avatar element; falls back to initials
 *   onAction: function — chevron button click
 */
export function SideNav({ children, className = '', ...rest }) {
  const classes = ['nos-sidenav', className].filter(Boolean).join(' ');
  return (
    <nav className={classes} {...rest}>
      {children}
    </nav>
  );
}

/* ── Header ───────────────────────────────────────────────────────── */

function SideNavHeader({ logo, brand, className = '', ...rest }) {
  const classes = ['nos-sidenav__header', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {logo && (
        <div className="nos-sidenav__logo-badge" aria-hidden="true">
          {logo}
        </div>
      )}
      {brand && <span className="nos-sidenav__brand">{brand}</span>}
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */

function SideNavSection({ children, label, divider = false, className = '', ...rest }) {
  const classes = [
    'nos-sidenav__section',
    divider ? 'nos-sidenav__section--divider' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {label && <div className="nos-sidenav__section-label">{label}</div>}
      {children}
    </div>
  );
}

/* ── Item ─────────────────────────────────────────────────────────── */

function SideNavItem({ children, icon, active = false, onClick, className = '', ...rest }) {
  const classes = [
    'nos-sidenav__item',
    active ? 'nos-sidenav__item--active' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
      {...rest}
    >
      {icon && (
        <span className="nos-sidenav__item-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="nos-sidenav__item-label">{children}</span>
    </button>
  );
}

/* ── Footer ───────────────────────────────────────────────────────── */

function SideNavFooter({ name, email, avatar, onAction, className = '', ...rest }) {
  const classes = ['nos-sidenav__footer', className].filter(Boolean).join(' ');

  const initials = name
    ? name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <div className={classes} {...rest}>
      <div className="nos-sidenav__footer-avatar" aria-hidden="true">
        {avatar || initials}
      </div>
      <div className="nos-sidenav__footer-info">
        {name  && <div className="nos-sidenav__footer-name">{name}</div>}
        {email && <div className="nos-sidenav__footer-email">{email}</div>}
      </div>
      {onAction && (
        <button
          type="button"
          className="nos-sidenav__footer-action"
          onClick={onAction}
          aria-label="Account options"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M5 6l3-3 3 3M5 10l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}

SideNav.Header  = SideNavHeader;
SideNav.Section = SideNavSection;
SideNav.Item    = SideNavItem;
SideNav.Footer  = SideNavFooter;
