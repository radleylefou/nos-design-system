import { useId } from 'react';
import './Checkbox.css';

/**
 * Checkbox — binary input with an inline label.
 *
 * Renders a custom-styled box driven by a hidden native <input type="checkbox">.
 * Supports controlled (checked + onChange) and uncontrolled (defaultChecked) usage.
 *
 * Props:
 *   label       — inline label rendered to the right of the box
 *   helperText  — neutral hint rendered below
 *   error       — string; when present, switches the box to the error state and replaces helperText
 *   disabled    — disables the input
 *   id          — explicit id; otherwise auto-generated for label association
 *   ...rest     — forwarded to <input>
 */
export function Checkbox({
  label,
  helperText,
  error,
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const hasError = Boolean(error);
  const feedbackId = error || helperText ? `${inputId}-feedback` : undefined;

  const rootCls = [
    'nos-checkbox',
    hasError ? 'nos-checkbox--error' : '',
    disabled ? 'nos-checkbox--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootCls}>
      <label className="nos-checkbox__row" htmlFor={inputId}>
        <input
          id={inputId}
          type="checkbox"
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={feedbackId}
          className="nos-checkbox__input"
          {...rest}
        />
        <span className="nos-checkbox__box" aria-hidden="true">
          <svg className="nos-checkbox__check" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {label && <span className="nos-checkbox__label">{label}</span>}
      </label>
      {(error || helperText) && (
        <p id={feedbackId} className={`nos-checkbox__hint${hasError ? ' nos-checkbox__hint--error' : ''}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
