/**
 * TableHeader — Reusable toolbar/header row for NOS tables.
 *
 * Renders a brand-50 background header with a title area on the left,
 * optional search input in the middle, and optional action buttons on the right.
 *
 * Props:
 *   title    {string}   Header title text (required).
 *   subtext  {string}   Optional smaller text below the title.
 *   search   {object}   Optional search config: { value, onChange }.
 *                         Renders a 240px search input with icon and "/" kbd badge.
 *   actions  {Array}    Optional action buttons: [{ label, icon?, onClick }].
 *                         Each renders as a ghost-style button.
 */

import { Button } from './Button.jsx';
import './TableHeader.css';

// ── Icons ──────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

// ── Component ──────────────────────────────────────────────────────────────

export function TableHeader({ title, subtext, search, actions = [] }) {
  return (
    <div className="nos-th">
      {/* Title area */}
      <div className="nos-th__title-area">
        <span className="nos-th__title">{title}</span>
        {subtext && <span className="nos-th__subtext">{subtext}</span>}
      </div>

      {/* Search input */}
      {search && (
        <div className="nos-th__search">
          <span className="nos-th__search-icon"><SearchIcon /></span>
          <input
            type="text"
            className="nos-th__search-input"
            placeholder="Search"
            value={search.value ?? ''}
            onChange={search.onChange ? (e) => search.onChange(e.target.value) : undefined}
            readOnly={!search.onChange}
            aria-label="Search"
          />
          <span className="nos-th__kbd" aria-hidden="true">/</span>
        </div>
      )}

      {/* Action buttons */}
      {actions.length > 0 && (
        <div className="nos-th__actions">
          {actions.map((action, i) => (
            <Button
              key={i}
              variant="ghost"
              size="sm"
              leadingIcon={action.icon}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
