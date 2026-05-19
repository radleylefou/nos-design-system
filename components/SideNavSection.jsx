import './SideNavSection.css';

/**
 * SideNavSection — labeled group of side navigation items.
 *
 * Props:
 *   title      — optional group label such as "Main" or "Platform"
 *   children   — SideNavItem nodes or custom navigation content
 *   className  — optional class appended to the root
 *   ...rest    — forwarded to root section
 */
export function SideNavSection({
  title,
  children,
  className = '',
  ...rest
}) {
  const cls = ['nos-side-nav-section', className].filter(Boolean).join(' ');
  const labelId = title ? `side-nav-section-${slugify(title)}` : undefined;

  return (
    <section className={cls} aria-labelledby={labelId} {...rest}>
      {title && (
        <div className="nos-side-nav-section__label" id={labelId}>
          {title}
        </div>
      )}
      <div className="nos-side-nav-section__items">
        {children}
      </div>
    </section>
  );
}

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
