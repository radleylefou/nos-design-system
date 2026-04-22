import { useId } from 'react';
import './Input.css';

/**
 * Input — single-line text field, optionally wrapped with a label and helper/error text.
 *
 * Props:
 *   label:      string | node
 *   helperText: string | node
 *   error:      string | boolean — when truthy the field renders in the error state.
 *                                  If a string is given it replaces helperText.
 *   size:       "sm" | "md" | "lg"    (default: "md")
 *   leadingIcon, trailingIcon: ReactNode
 *   disabled:   boolean
 *   All other props pass through to the underlying <input>.
 *
 * Usage:
 *   <Input label="Email" type="email" placeholder="user@example.com" />
 *   <Input label="API key" error="Invalid key" />
 */
export function Input({
  label,
  helperText,
  error = false,
  size = 'md',
  leadingIcon,
  trailingIcon,
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const describedById = `${inputId}-desc`;

  const errorText = typeof error === 'string' ? error : null;
  const hasError = Boolean(error);
  const message = errorText || helperText;

  const wrapperClasses = [
    'nos-input',
    `nos-input--${size}`,
    hasError ? 'nos-input--error' : '',
    disabled ? 'nos-input--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="nos-field">
      {label && (
        <label htmlFor={inputId} className="nos-field__label">
          {label}
        </label>
      )}
      <div className={wrapperClasses}>
        {leadingIcon && <span className="nos-input__icon nos-input__icon--leading">{leadingIcon}</span>}
        <input
          id={inputId}
          className="nos-input__control"
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? describedById : undefined}
          {...rest}
        />
        {trailingIcon && <span className="nos-input__icon nos-input__icon--trailing">{trailingIcon}</span>}
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
