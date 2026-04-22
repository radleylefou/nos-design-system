import { useId } from 'react';
import './Checkbox.css';

/**
 * Checkbox — compact binary input with label and optional helper/error text.
 *
 * Props:
 *   label:      string | node
 *   helperText: string | node
 *   error:      string | boolean — when truthy the field renders in the error state.
 *                                  If a string is given it replaces helperText.
 *   disabled:   boolean
 *   All other props pass through to the underlying checkbox <input>.
 *
 * Usage:
 *   <Checkbox label="Include archived records" />
 *   <Checkbox label="Confirm approval" error="Approval is required" />
 */
export function Checkbox({
  label,
  helperText,
  error = false,
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const checkboxId = id || generatedId;
  const describedById = `${checkboxId}-desc`;

  const errorText = typeof error === 'string' ? error : null;
  const hasError = Boolean(error);
  const message = errorText || helperText;

  const classes = [
    'nos-checkbox',
    hasError ? 'nos-checkbox--error' : '',
    disabled ? 'nos-checkbox--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <label className="nos-checkbox__row" htmlFor={checkboxId}>
        <input
          id={checkboxId}
          className="nos-checkbox__control"
          type="checkbox"
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? describedById : undefined}
          {...rest}
        />
        <span className="nos-checkbox__copy">
          {label && <span className="nos-checkbox__label">{label}</span>}
          {message && (
            <span
              id={describedById}
              className={`nos-checkbox__message ${hasError ? 'nos-checkbox__message--error' : ''}`}
            >
              {message}
            </span>
          )}
        </span>
      </label>
    </div>
  );
}
