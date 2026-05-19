import { useId } from 'react';
import { Field } from './Field.jsx';
import './Textarea.css';

/**
 * Textarea — multi-line text field using the shared Field label and control chrome.
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
  const feedbackId = error || helperText ? `${ta}-feedback` : undefined;

  const fieldCls = [
    'nos-field',
    'nos-field--textarea',
    hasError ? 'nos-field--error' : '',
    disabled ? 'nos-field--disabled' : '',
  ].filter(Boolean).join(' ');

  return (
    <Field
      className={className}
      label={label}
      htmlFor={ta}
      helperText={helperText}
      error={error}
      feedbackId={feedbackId}
    >
      <div className={fieldCls}>
        <textarea
          id={ta}
          rows={rows}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={feedbackId}
          className="nos-field__control nos-field__control--textarea"
          style={{ resize }}
          {...rest}
        />
      </div>
    </Field>
  );
}
