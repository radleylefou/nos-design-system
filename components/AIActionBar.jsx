import './AIActionBar.css';

function SparkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8.5 2.5L9.75 6.25L13.5 7.5L9.75 8.75L8.5 12.5L7.25 8.75L3.5 7.5L7.25 6.25L8.5 2.5Z" fill="currentColor" opacity="0.85" />
      <path d="M3.25 1.75L3.85 3.4L5.5 4L3.85 4.6L3.25 6.25L2.65 4.6L1 4L2.65 3.4L3.25 1.75Z" fill="currentColor" />
    </svg>
  );
}

/**
 * AIActionBar — success-tinted inline action row for document AI actions.
 *
 * Props:
 *   label     — label prefix, defaults to "AI Actions:"
 *   actions   — array of { label, onClick, disabled }
 *   icon      — optional JSX icon; defaults to spark icon
 *   className — optional class appended to the root
 *   ...rest   — forwarded to the root <div>
 */
export function AIActionBar({
  label = 'AI Actions:',
  actions = [],
  icon = <SparkIcon />,
  className = '',
  ...rest
}) {
  const cls = ['nos-ai-action-bar', className].filter(Boolean).join(' ');

  return (
    <div className={cls} role="group" aria-label={label.replace(/:$/, '')} {...rest}>
      {icon && <span className="nos-ai-action-bar__icon">{icon}</span>}
      {label && <span className="nos-ai-action-bar__label">{label}</span>}
      {actions.length > 0 && (
        <div className="nos-ai-action-bar__actions">
          {actions.map((action, index) => (
            <button
              type="button"
              className="nos-ai-action-bar__action"
              onClick={action.onClick}
              disabled={action.disabled}
              key={`${action.label}-${index}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
