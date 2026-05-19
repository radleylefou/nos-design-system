import { StatusPill } from './StatusPill.jsx';
import './SectionHeader.css';

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M11.25 2.75L13.25 4.75L6 12H4V10L11.25 2.75Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.75 4.25L11.75 6.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * SectionHeader — header row for document content sections.
 *
 * Layout: icon + title on the left; optional StatusPill + Edit action on the right.
 * Intended for use inside DocumentSection's header slot.
 *
 * Props:
 *   title     — required heading text
 *   level     — heading element level: 2 | 3 (default: 2)
 *   icon      — optional JSX node rendered before the title
 *   status    — optional StatusPill variant
 *   statusLabel — optional StatusPill label override
 *   statusSurface — StatusPill surface, defaults to 'white' for grey section headers
 *   onEdit    — optional callback; renders an "Edit" button when provided
 *   editLabel — accessible label for the edit button
 *   className — optional class appended to the root
 *   ...rest   — forwarded to the root <div>
 */
export function SectionHeader({
  title,
  level = 2,
  icon,
  status,
  statusLabel,
  statusSurface = 'white',
  onEdit,
  editLabel = 'Edit section',
  className = '',
  ...rest
}) {
  const cls = ['nos-section-header', className].filter(Boolean).join(' ');
  const Heading = `h${level}`;

  return (
    <div className={cls} {...rest}>
      <div className="nos-section-header__left">
        {icon && <span className="nos-section-header__icon" aria-hidden="true">{icon}</span>}
        <Heading className="nos-section-header__title">{title}</Heading>
      </div>
      {(status || onEdit) && (
        <div className="nos-section-header__right">
          {status && <StatusPill variant={status} label={statusLabel} surface={statusSurface} />}
          {onEdit && (
            <button
              type="button"
              className="nos-section-header__edit"
              onClick={onEdit}
              aria-label={editLabel}
              title={editLabel}
            >
              <EditIcon />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
