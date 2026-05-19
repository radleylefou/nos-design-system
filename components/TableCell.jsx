/**
 * TableCell — Reusable table cell primitives for NOS data tables.
 *
 * Exports:
 *   TableCellText     — plain single-line text cell
 *   TableCellSubtext  — stacked primary text + secondary subtext
 *   TableCellIcon     — 18px icon + text side by side
 *   TableCellLink     — text + ">" chevron indicating a navigable cell
 *   TableCellActions  — "+Note" outlined button + external-link icon button
 *
 * Usage: pass as children or render inside table column slots.
 * Each component is intentionally minimal — no padding, no border;
 * the parent table/row provides all layout context.
 */

import { Button } from './Button.jsx';
import './TableCell.css';

// ── Icons ─────────────────────────────────────────────────────────────────

function ChevronRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M5.5 2.5H2.5C2 2.5 1.5 3 1.5 3.5V11.5C1.5 12 2 12.5 2.5 12.5H10.5C11 12.5 11.5 12 11.5 11.5V8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M8 1.5H12.5V6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 1.5L6.5 7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

// ── TableCellText ─────────────────────────────────────────────────────────

/**
 * Plain single-line text cell.
 * @param {{ text: string, className?: string }} props
 */
export function TableCellText({ text, className = '', ...rest }) {
  return (
    <span className={`nos-tc nos-tc--text ${className}`} {...rest}>
      {text}
    </span>
  );
}

// ── TableCellSubtext ──────────────────────────────────────────────────────

/**
 * Stacked primary text + secondary subtext.
 * @param {{ text: string, subtext?: string, className?: string }} props
 */
export function TableCellSubtext({ text, subtext, className = '', ...rest }) {
  return (
    <span className={`nos-tc nos-tc--subtext ${className}`} {...rest}>
      <span className="nos-tc__primary">{text}</span>
      {subtext && <span className="nos-tc__secondary">{subtext}</span>}
    </span>
  );
}

// ── TableCellIcon ─────────────────────────────────────────────────────────

/**
 * 18px icon node + text label side by side.
 * @param {{ icon: JSX.Element, text: string, className?: string }} props
 */
export function TableCellIcon({ icon, text, className = '', ...rest }) {
  return (
    <span className={`nos-tc nos-tc--icon ${className}`} {...rest}>
      <span className="nos-tc__icon" aria-hidden="true">{icon}</span>
      <span className="nos-tc__primary">{text}</span>
    </span>
  );
}

// ── TableCellLink ─────────────────────────────────────────────────────────

/**
 * Text + ">" chevron indicating a navigable cell.
 * Chevron is only rendered when onClick is provided.
 * @param {{ text: string, onClick?: () => void, className?: string }} props
 */
export function TableCellLink({ text, onClick, className = '', ...rest }) {
  return (
    <span
      className={`nos-tc nos-tc--link ${onClick ? 'nos-tc--clickable' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
      {...rest}
    >
      <span className="nos-tc__primary">{text}</span>
      {onClick && (
        <span className="nos-tc__chevron">
          <ChevronRightIcon />
        </span>
      )}
    </span>
  );
}

// ── TableCellActions ──────────────────────────────────────────────────────

/**
 * "+Note" outlined brand button + external-link icon button.
 * @param {{ onNote?: () => void, onOpenLink?: () => void, className?: string }} props
 */
export function TableCellActions({ onNote, onOpenLink, className = '', ...rest }) {
  return (
    <span className={`nos-tc nos-tc--actions ${className}`} {...rest}>
      <Button
        variant="soft"
        size="sm"
        leadingIcon={<PlusNoteIcon />}
        onClick={onNote}
      >
        Note
      </Button>
      <Button
        variant="ghost"
        size="sm"
        leadingIcon={<ExternalLinkIcon />}
        aria-label="Open in new tab"
        onClick={onOpenLink}
      />
    </span>
  );
}

function PlusNoteIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
