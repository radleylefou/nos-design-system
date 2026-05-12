import { StatusPill } from './StatusPill.jsx';
import './PageHeader.css';

/**
 * PageHeader — page-level header shell for NOS document and detail pages.
 *
 * Props:
 *   title     — required heading text (renders as h1)
 *   subtitle  — optional descriptive text below the title
 *   status    — optional StatusPill variant ('draft' | 'in-progress' | 'reviewed' | 'approved' | 'pending')
 *   meta      — optional plain-text metadata string (e.g. "Last edited by Alex · 2h ago")
 *   ...rest   — forwarded to the root <header>
 */
export function PageHeader({ title, subtitle, status, meta, className = '', ...rest }) {
  const cls = ['nos-page-header', className].filter(Boolean).join(' ');

  return (
    <header className={cls} {...rest}>
      <div className="nos-page-header__title-row">
        <h1 className="nos-page-header__title">{title}</h1>
        {status && <StatusPill variant={status} />}
      </div>
      {subtitle && <p className="nos-page-header__subtitle">{subtitle}</p>}
      {meta && <p className="nos-page-header__meta">{meta}</p>}
    </header>
  );
}
