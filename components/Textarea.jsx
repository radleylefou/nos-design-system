import { useId } from 'react';
import './Textarea.css';

/**
 * Textarea — multi-line text field. Reuses the .nos-field chrome from Input.
 *
 * Props:
 *   label       — text label rendered above the field
 *   helperText  — neutral hint rendered below the field
 *   error       — string; when present, switches to the error state and replaces helperText
 *   resize      — 'vertical' (default) | 'none' — controls textarea resize behavior
 *   rows        — number of visible rows (default 3)
 *   disabled    — disables the field
 *   id          — explicit id; otherwise auto-generated for label association
 *   ...rest     — forwarded to <textarea>
 */
export function Textarea({
  label,
  helperText,
  error,
  resize = 'vertical',
  rows = 3,
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const autoId = useId();
  const ta = id || autoId;
  const hasError = Boolean(error);

  const fieldCls = [
    'nos-field',
    'nos-field--textarea',
    hasError ? 'nos-field--error' : '',
    disabled ? 'nos-field--disabled' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={`nos-input${className ? ' ' + className : ''}`}>
      {label && (
        <label className="nos-input__label" htmlFor={ta}>{label}</label>
      )}
      <div className={fieldCls}>
        <textarea
          id={ta}
          rows={rows}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          className="nos-field__control nos-field__control--textarea"
          style={{ resize }}
          {...rest}
        />
      </div>
      {(error || helperText) && (
        <p className={`nos-input__hint${hasError ? ' nos-input__hint--error' : ''}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
