import { useId } from 'react';
import './Textarea.css';

/**
 * Textarea — multi-line text field matching the NOS Input field pattern.
 *
 * Props:
 *   label:      string | node
 *   helperText: string | node
 *   error:      string | boolean — when truthy the field renders in the error state.
 *                                  If a string is given it replaces helperText.
 *   size:       "sm" | "md" | "lg"      (default: "md")
 *   resize:     "none" | "vertical"     (default: "vertical")
 *   disabled:   boolean
 *   All other props pass through to the underlying <textarea>.
 *
 * Usage:
 *   <Textarea label="Notes" placeholder="Add context..." />
 *   <Textarea label="Reason" error="Reason is required" />
 */
export function Textarea({
  label,
  helperText,
  error = false,
  size = 'md',
  resize = 'vertical',
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const describedById = `${textareaId}-desc`;

  const errorText = typeof error === 'string' ? error : null;
  const hasError = Boolean(error);
  const message = errorText || helperText;

  const controlClasses = [
    'nos-textarea',
    `nos-textarea--${size}`,
    `nos-textarea--resize-${resize}`,
    hasError ? 'nos-textarea--error' : '',
    disabled ? 'nos-textarea--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="nos-field">
      {label && (
        <label htmlFor={textareaId} className="nos-field__label">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={controlClasses}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={message ? describedById : undefined}
        {...rest}
      />
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
