import { StatusPill } from './StatusPill.jsx';
import './PageHeader.css';

/**
 * PageHeader — page-level header shell for NOS document and detail pages.
 *
 * Props:
 *   title       — required heading text (renders as h1)
 *   subtitle    — optional descriptive text below the title
 *   status      — optional StatusPill variant ('draft' | 'in-progress' | 'reviewed' | 'approved' | 'pending')
 *   statusLabel — optional StatusPill label override
 *   meta        — optional plain-text metadata string (e.g. "Last edited by Alex Rivera · 2h ago")
 *   metaItems   — optional array of metadata strings; overrides meta splitting
 *   actions     — optional ReactNode rendered after status in the right slot
 *   ...rest     — forwarded to the root <header>
 */
export function PageHeader({
  title,
  subtitle,
  status,
  statusLabel,
  meta,
  metaItems,
  actions,
  className = '',
  ...rest
}) {
  const cls = ['nos-page-header', className].filter(Boolean).join(' ');
  const metadata = metaItems ?? (meta ? meta.split('·').map((item) => item.trim()).filter(Boolean) : []);
  const hasSide = metadata.length > 0 || status || actions;

  return (
    <header className={cls} {...rest}>
      <div className="nos-page-header__content">
        <div className="nos-page-header__copy">
          <h1 className="nos-page-header__title">{title}</h1>
          {subtitle && <p className="nos-page-header__subtitle">{subtitle}</p>}
        </div>

        {hasSide && (
          <div className="nos-page-header__side">
            {metadata.length > 0 && (
              <div className="nos-page-header__meta" aria-label="Page metadata">
                {metadata.map((item, index) => (
                  <span className="nos-page-header__meta-item" key={`${item}-${index}`}>
                    {index > 0 && <span className="nos-page-header__meta-dot" aria-hidden="true" />}
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            )}
            {status && <StatusPill variant={status} label={statusLabel} />}
            {actions && <div className="nos-page-header__actions">{actions}</div>}
          </div>
        )}
      </div>
    </header>
  );
}
