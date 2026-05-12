import './Callout.css';

function SuccessIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2.5L9.4 6.6L13.5 8L9.4 9.4L8 13.5L6.6 9.4L2.5 8L6.6 6.6L8 2.5Z" fill="currentColor" opacity="0.85" />
      <path d="M3.25 2.25L3.8 3.7L5.25 4.25L3.8 4.8L3.25 6.25L2.7 4.8L1.25 4.25L2.7 3.7L3.25 2.25Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Callout — compact inline feedback and guidance message.
 *
 * Props:
 *   tone       — 'success' | 'info' | 'warning' | 'danger' | 'brand'
 *   icon       — optional JSX icon; default icon is used for success tone
 *   children   — message content
 *   className  — optional class appended to the root
 *   ...rest    — forwarded to the root element
 */
export function Callout({
  tone = 'info',
  icon,
  children,
  className = '',
  ...rest
}) {
  const cls = ['nos-callout', `nos-callout--${tone}`, className].filter(Boolean).join(' ');
  const renderedIcon = icon || (tone === 'success' ? <SuccessIcon /> : null);

  return (
    <div className={cls} role="status" {...rest}>
      {renderedIcon && <span className="nos-callout__icon">{renderedIcon}</span>}
      <div className="nos-callout__content">{children}</div>
    </div>
  );
}
