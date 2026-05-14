import './DocumentOutcomeList.css';

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="5.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.25 8.15L7.1 10L10.75 6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * DocumentOutcomeRow — icon + text row for outcomes inside document sections.
 *
 * Props:
 *   children  — row copy
 *   icon      — optional JSX icon; defaults to check-circle
 *   tone      — 'success' | 'neutral'
 *   className — optional class appended to the row
 *   ...rest   — forwarded to the root <li>
 */
export function DocumentOutcomeRow({
  children,
  icon = <CheckCircleIcon />,
  tone = 'success',
  className = '',
  ...rest
}) {
  const cls = ['nos-document-outcome-row', `nos-document-outcome-row--${tone}`, className].filter(Boolean).join(' ');

  return (
    <li className={cls} {...rest}>
      {icon && <span className="nos-document-outcome-row__icon">{icon}</span>}
      <span className="nos-document-outcome-row__text">{children}</span>
    </li>
  );
}

/**
 * DocumentOutcomeList — divider-separated list of document outcome rows.
 *
 * Props:
 *   items     — array of strings or { label, icon, tone }
 *   children  — optional custom DocumentOutcomeRow children
 *   className — optional class appended to the list
 *   ...rest   — forwarded to the root <ul>
 */
export function DocumentOutcomeList({ items = [], children, className = '', ...rest }) {
  const cls = ['nos-document-outcome-list', className].filter(Boolean).join(' ');

  return (
    <ul className={cls} {...rest}>
      {children || items.map((item, index) => {
        const row = typeof item === 'string' ? { label: item } : item;
        return (
          <DocumentOutcomeRow key={`${row.label}-${index}`} icon={row.icon} tone={row.tone}>
            {row.label}
          </DocumentOutcomeRow>
        );
      })}
    </ul>
  );
}
