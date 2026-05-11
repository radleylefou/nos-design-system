import { useId } from 'react';
import './Input.css';

/**
 * Input — single-line text field for NOS forms.
 *
 * Shares its field chrome with Textarea and Select: white surface, neutral border,
 * brand focus ring. Renders an optional label above and helper / error text below.
 *
 * Props:
 *   label         — text label rendered above the field
 *   helperText    — neutral hint rendered below the field
 *   error         — string; when present, switches the field to the error state and
 *                   renders the message below (replacing helperText)
 *   leadingIcon   — JSX node rendered inside the field at the leading edge
 *   trailingIcon  — JSX node rendered inside the field at the trailing edge
 *   size          — 'sm' | 'md'
 *   disabled      — disables the field
 *   id            — explicit id; otherwise auto-generated for label association
 *   ...rest       — forwarded to <input>
 */
export function Input({
  label,
  helperText,
  error,
  leadingIcon,
  trailingIcon,
  size = 'md',
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const hasError = Boolean(error);

  const fieldCls = [
    'nos-field',
    `nos-field--${size}`,
    hasError ? 'nos-field--error' : '',
    disabled ? 'nos-field--disabled' : '',
    leadingIcon ? 'nos-field--has-leading' : '',
    trailingIcon ? 'nos-field--has-trailing' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={`nos-input${className ? ' ' + className : ''}`}>
      {label && (
        <label className="nos-input__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={fieldCls}>
        {leadingIcon && (
          <span className="nos-field__icon nos-field__icon--leading" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          className="nos-field__control"
          {...rest}
        />
        {trailingIcon && (
          <span className="nos-field__icon nos-field__icon--trailing" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </div>
      {(error || helperText) && (
        <p className={`nos-input__hint${hasError ? ' nos-input__hint--error' : ''}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
