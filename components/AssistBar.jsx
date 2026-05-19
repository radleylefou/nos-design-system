import './AssistBar.css';

/**
 * AssistBar — muted secondary action row with an optional label prefix.
 *
 * Used for AI-adjacent or meta actions (e.g. "AI Actions: Regenerate · Expand with metrics").
 * Visually lighter than ghost buttons — never competes with primary actions.
 *
 * Props:
 *   label    — optional prefix string (e.g. "AI Actions:"); omit to show only actions
 *   actions  — array of { label: string, onClick: () => void }
 *   className — optional class appended to the root
 *   ...rest  — forwarded to the root <div>
 */
export function AssistBar({ label, actions = [], className = '', ...rest }) {
  const cls = ['nos-assist-bar', className].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>
      {label && <span className="nos-assist-bar__label">{label}</span>}
      <div className="nos-assist-bar__actions">
        {actions.map((action, i) => (
          <button
            key={i}
            type="button"
            className="nos-assist-bar__action"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
