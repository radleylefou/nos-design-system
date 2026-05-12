import './Field.css';

/**
 * Field — shared label, control, helper, and error wrapper.
 *
 * Props:
 *   label       — label text
 *   htmlFor     — id of the associated control
 *   helperText  — neutral helper copy
 *   error       — error copy; replaces helperText visually
 *   feedbackId  — id applied to helper/error copy for aria-describedby
 *   required    — shows required state on label
 *   children    — form control or control group
 *   className   — optional class appended to the root
 *   ...rest     — forwarded to root element
 */
export function Field({
  label,
  htmlFor,
  helperText,
  error,
  feedbackId,
  required = false,
  children,
  className = '',
  ...rest
}) {
  const hasError = Boolean(error);
  const cls = ['nos-form-field', hasError ? 'nos-form-field--error' : '', className].filter(Boolean).join(' ');

  return (
    <div className={cls} data-invalid={hasError || undefined} {...rest}>
      {label && (
        <label className="nos-form-field__label" htmlFor={htmlFor}>
          {label}
          {required && <span className="nos-form-field__required" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="nos-form-field__control">
        {children}
      </div>
      {(error || helperText) && (
        <p className="nos-form-field__feedback" id={feedbackId}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

/**
 * FieldRow — responsive field grouping for modal and form layouts.
 *
 * Props:
 *   columns    — number of equal desktop columns: 1 | 2 | 3
 *   children   — field content
 *   className  — optional class appended to the root
 *   ...rest    — forwarded to root element
 */
export function FieldRow({
  columns = 2,
  children,
  className = '',
  ...rest
}) {
  const cls = ['nos-field-row', `nos-field-row--${columns}`, className].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}
