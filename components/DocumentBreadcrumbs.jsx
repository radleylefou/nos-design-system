import './DocumentBreadcrumbs.css';

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * DocumentBreadcrumbs — back action plus breadcrumb trail for document pages.
 *
 * Props:
 *   items     — array of strings or { label, href, onClick, current }
 *   onBack    — optional callback; renders a 32px back button when provided
 *   backLabel — accessible label for the back button
 *   className — optional class appended to the root
 *   ...rest   — forwarded to the root <nav>
 */
export function DocumentBreadcrumbs({
  items = [],
  onBack,
  backLabel = 'Go back',
  className = '',
  ...rest
}) {
  const cls = ['nos-document-breadcrumbs', className].filter(Boolean).join(' ');

  return (
    <nav className={cls} aria-label="Breadcrumb" {...rest}>
      {onBack && (
        <button
          type="button"
          className="nos-document-breadcrumbs__back"
          onClick={onBack}
          aria-label={backLabel}
          title={backLabel}
        >
          <ArrowLeftIcon />
        </button>
      )}

      <ol className="nos-document-breadcrumbs__list">
        {items.map((item, index) => {
          const crumb = typeof item === 'string' ? { label: item } : item;
          const isCurrent = crumb.current ?? index === items.length - 1;
          const content = crumb.href ? (
            <a className="nos-document-breadcrumbs__link" href={crumb.href}>
              {crumb.label}
            </a>
          ) : crumb.onClick ? (
            <button type="button" className="nos-document-breadcrumbs__button" onClick={crumb.onClick}>
              {crumb.label}
            </button>
          ) : (
            <span>{crumb.label}</span>
          );

          return (
            <li
              className={`nos-document-breadcrumbs__item${isCurrent ? ' nos-document-breadcrumbs__item--current' : ''}`}
              key={`${crumb.label}-${index}`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {index > 0 && <span className="nos-document-breadcrumbs__separator" aria-hidden="true">/</span>}
              {content}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
