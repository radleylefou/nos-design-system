import './SideNavSearch.css';

/**
 * SideNavSearch — sidebar search / command trigger.
 *
 * This is a command launcher-style trigger, not a text input. Apps can use
 * `onClick` to open search, command palette, or a modal.
 *
 * Props:
 *   label      — visible label, defaults to "Search"
 *   shortcut   — optional shortcut string such as "⌘ K"
 *   icon       — optional leading icon ReactNode
 *   disabled   — disables the trigger
 *   className  — optional class appended to the root
 *   ...rest    — forwarded to <button>
 */
export function SideNavSearch({
  label = 'Search',
  shortcut,
  icon,
  disabled = false,
  className = '',
  ...rest
}) {
  const cls = ['nos-side-nav-search', className].filter(Boolean).join(' ');

  return (
    <div className="nos-side-nav-search-wrap">
      <button className={cls} type="button" disabled={disabled} {...rest}>
        <span className="nos-side-nav-search__body">
          {icon && <span className="nos-side-nav-search__icon" aria-hidden="true">{icon}</span>}
          <span className="nos-side-nav-search__label">{label}</span>
        </span>
        {shortcut && <span className="nos-side-nav-search__shortcut">{shortcut}</span>}
      </button>
    </div>
  );
}
