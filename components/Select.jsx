import { useId } from 'react';
import './Select.css';

/**
 * Select — native single-select dropdown with NOS field chrome.
 *
 * Props:
 *   label:      string | node
 *   helperText: string | node
 *   error:      string | boolean — when truthy the field renders in the error state.
 *                                  If a string is given it replaces helperText.
 *   size:       "sm" | "md" | "lg"    (default: "md")
 *   options:    array of { label, value, disabled }
 *   placeholder: optional disabled first option
 *   disabled:   boolean
 *   children:   custom <option> nodes; used instead of options when provided
 *   All other props pass through to the underlying <select>.
 *
 * Usage:
 *   <Select label="Region" placeholder="Choose region" options={regions} />
 *   <Select label="Status" error="Select a status" />
 */
export function Select({
  label,
  helperText,
  error = false,
  size = 'md',
  options = [],
  placeholder,
  disabled = false,
  id,
  className = '',
  children,
  ...rest
}) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const describedById = `${selectId}-desc`;

  const errorText = typeof error === 'string' ? error : null;
  const hasError = Boolean(error);
  const message = errorText || helperText;

  const wrapperClasses = [
    'nos-select',
    `nos-select--${size}`,
    hasError ? 'nos-select--error' : '',
    disabled ? 'nos-select--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="nos-field">
      {label && (
        <label htmlFor={selectId} className="nos-field__label">
          {label}
        </label>
      )}
      <div className={wrapperClasses}>
        <select
          id={selectId}
          className="nos-select__control"
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? describedById : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children || options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <span className="nos-select__indicator" aria-hidden="true" />
      </div>
      {message && (
        <div
          id={describedById}
          className={`nos-field__message ${hasError ? 'nos-field__message--error' : ''}`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
