import './DashboardCard.css';

/**
 * DashboardCard — thin chrome shell for NOS dashboard summary cards.
 *
 * Provides the outer brand-tinted wrapper, header row (title + optional
 * chevron/icons), and inner white card slot. Does not impose inner layout.
 *
 * Props:
 *   title        — header label (required)
 *   onTitleClick — if provided, renders a chevron (⌄) after the title
 *   onExpand     — if provided, renders ↗ icon button in header
 *   onMore       — if provided, renders ⋯ icon button in header
 *   children     — rendered inside the white inner card with no imposed padding
 *   ...rest      — spread onto the root <section>
 */
export function DashboardCard({ title, onTitleClick, onExpand, onMore, children, ...rest }) {
  return (
    <section className="nos-dc" {...rest}>
      <header className="nos-dc__header">
        <div className="nos-dc__title-group">
          <h3 className="nos-dc__title">{title}</h3>
          {onTitleClick && (
            <button
              type="button"
              className="nos-dc__chevron"
              onClick={onTitleClick}
              aria-label="Change period"
            >
              <ChevronDownIcon />
            </button>
          )}
        </div>
        <div className="nos-dc__actions">
          {onExpand && (
            <button
              type="button"
              className="nos-dc__icon-btn"
              onClick={onExpand}
              aria-label="Open"
            >
              <ArrowUpRightIcon />
            </button>
          )}
          {onMore && (
            <button
              type="button"
              className="nos-dc__icon-btn"
              onClick={onMore}
              aria-label="More options"
            >
              <EllipsisIcon />
            </button>
          )}
        </div>
      </header>
      <div className="nos-dc__body">{children}</div>
    </section>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5 11L11 5M11 5H6M11 5V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EllipsisIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="3.5" cy="8" r="1.25" fill="currentColor" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" />
      <circle cx="12.5" cy="8" r="1.25" fill="currentColor" />
    </svg>
  );
}
