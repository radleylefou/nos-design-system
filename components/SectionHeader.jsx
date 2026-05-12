import { StatusPill } from './StatusPill.jsx';
import './SectionHeader.css';

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
 *   onEdit    — optional callback; renders an "Edit" button when provided
 *   className — optional class appended to the root
 *   ...rest   — forwarded to the root <div>
 */
export function SectionHeader({
  title,
  level = 2,
  icon,
  status,
  onEdit,
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
          {status && <StatusPill variant={status} />}
          {onEdit && (
            <button
              type="button"
              className="nos-section-header__edit"
              onClick={onEdit}
            >
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
}
