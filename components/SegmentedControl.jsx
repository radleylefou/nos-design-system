import { useState } from 'react';
import './SegmentedControl.css';

/**
 * SegmentedControl — pill group for mutually exclusive options.
 *
 * Visual model (from Time Entry modal Task/Project toggle):
 *   • Outer container uses the brand-50 surface (same token as DashboardCard).
 *   • Inactive pills are transparent with neutral text and the option's icon.
 *   • The active pill is lifted on a white surface with a brand-tinted border,
 *     brand-500 text, and a built-in check icon that replaces the option icon.
 *
 * Supports controlled (value + onChange) or uncontrolled (defaultValue) usage.
 *
 * Props:
 *   options       — array of { value, label, icon? }
 *   value         — controlled selected value
 *   defaultValue  — initial value for uncontrolled usage
 *   onChange      — (value) => void
 *   size          — 'sm' | 'md'
 *   disabled      — disables the entire control
 *   ariaLabel     — accessible name for the role="radiogroup" container
 */
export function SegmentedControl({
  options = [],
  value,
  defaultValue,
  onChange,
  size = 'md',
  disabled = false,
  ariaLabel,
  className = '',
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value);
  const current = isControlled ? value : internal;

  function select(next) {
    if (disabled || next === current) return;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  const rootCls = [
    'nos-seg',
    `nos-seg--${size}`,
    disabled ? 'nos-seg--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div role="radiogroup" aria-label={ariaLabel} className={rootCls}>
      {options.map((opt) => {
        const active = opt.value === current;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            className={`nos-seg__pill${active ? ' nos-seg__pill--active' : ''}`}
            onClick={() => select(opt.value)}
          >
            <span className="nos-seg__icon" aria-hidden="true">
              {active ? <CheckIcon /> : opt.icon}
            </span>
            <span className="nos-seg__label">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M4.5 7L6.25 8.75L9.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
