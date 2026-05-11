import { useId } from 'react';
import './Select.css';

/**
 * Select — native single-select dropdown wrapped in the shared .nos-field chrome.
 *
 * Props:
 *   label       — text label rendered above the field
 *   helperText  — neutral hint rendered below the field
 *   error       — string; when present, switches to the error state and replaces helperText
 *   options     — array of { value, label } items
 *   placeholder — optional placeholder rendered as a disabled first option
 *   size        — 'sm' | 'md'
 *   disabled    — disables the field
 *   id          — explicit id; otherwise auto-generated for label association
 *   ...rest     — forwarded to <select> (value, defaultValue, onChange, name, etc.)
 */
export function Select({
  label,
  helperText,
  error,
  options = [],
  placeholder,
  size = 'md',
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const autoId = useId();
  const selectId = id || autoId;
  const hasError = Boolean(error);

  const fieldCls = [
    'nos-field',
    'nos-field--select',
    `nos-field--${size}`,
    hasError ? 'nos-field--error' : '',
    disabled ? 'nos-field--disabled' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={`nos-input${className ? ' ' + className : ''}`}>
      {label && (
        <label className="nos-input__label" htmlFor={selectId}>{label}</label>
      )}
      <div className={fieldCls}>
        <select
          id={selectId}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          className="nos-field__control nos-field__control--select"
          defaultValue={rest.value === undefined && rest.defaultValue === undefined && placeholder ? '' : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled hidden>{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="nos-field__icon nos-field__icon--trailing" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {(error || helperText) && (
        <p className={`nos-input__hint${hasError ? ' nos-input__hint--error' : ''}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
