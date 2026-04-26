import { useId, useRef, useState } from 'react';
import './TagInput.css';

/**
 * TagInput — multi-value text input that emits an array of strings.
 *
 * Tags are added by typing and pressing Enter, Tab, or comma. Backspace on an
 * empty input removes the last tag.
 *
 * Props:
 *   value:        string[] — controlled tag list
 *   defaultValue: string[] — uncontrolled initial list
 *   onChange:     (tags: string[]) => void
 *   label, helperText, error, placeholder, size, disabled — standard field chrome
 *   maxTags:      number — caps how many tags can be added
 *   validate:     (candidate: string) => boolean — reject when false
 *   separators:   array of keys/chars that commit a tag (default: Enter, Tab, ",")
 *
 * Usage:
 *   <TagInput label="Recipients" defaultValue={['ada@nymbl.io']} />
 */
export function TagInput({
  value,
  defaultValue,
  onChange,
  label,
  helperText,
  error = false,
  placeholder = 'Add tag…',
  size = 'md',
  disabled = false,
  maxTags,
  validate,
  separators = ['Enter', 'Tab', ','],
  id,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const describedById = `${inputId}-desc`;
  const inputRef = useRef(null);

  const [internal, setInternal] = useState(defaultValue || []);
  const tags = value !== undefined ? value : internal;

  const [draft, setDraft] = useState('');

  const errorText = typeof error === 'string' ? error : null;
  const hasError = Boolean(error);
  const message = errorText || helperText;

  const update = (next) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const commit = (candidate) => {
    const trimmed = candidate.trim();
    if (!trimmed) return;
    if (tags.includes(trimmed)) { setDraft(''); return; }
    if (maxTags != null && tags.length >= maxTags) return;
    if (validate && !validate(trimmed)) return;
    update([...tags, trimmed]);
    setDraft('');
  };

  const remove = (tag) => {
    update(tags.filter((t) => t !== tag));
  };

  const handleKey = (e) => {
    if (separators.includes(e.key)) {
      if (draft.trim()) {
        e.preventDefault();
        commit(draft);
      }
    } else if (e.key === 'Backspace' && !draft && tags.length) {
      e.preventDefault();
      update(tags.slice(0, -1));
    }
  };

  const handleChange = (e) => {
    const v = e.target.value;
    if (separators.includes(',') && v.endsWith(',')) {
      commit(v.slice(0, -1));
    } else {
      setDraft(v);
    }
  };

  const wrapperClasses = [
    'nos-taginput',
    `nos-taginput--${size}`,
    hasError ? 'nos-taginput--error' : '',
    disabled ? 'nos-taginput--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const atMax = maxTags != null && tags.length >= maxTags;

  return (
    <div className="nos-field">
      {label && <label htmlFor={inputId} className="nos-field__label">{label}</label>}
      <div
        className={wrapperClasses}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <span key={tag} className="nos-taginput__tag">
            <span className="nos-taginput__tag-label">{tag}</span>
            {!disabled && (
              <button
                type="button"
                className="nos-taginput__tag-remove"
                aria-label={`Remove ${tag}`}
                onClick={(e) => { e.stopPropagation(); remove(tag); }}
              >
                <svg viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" />
                </svg>
              </button>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          id={inputId}
          className="nos-taginput__input"
          value={draft}
          placeholder={tags.length === 0 ? placeholder : ''}
          disabled={disabled || atMax}
          onChange={handleChange}
          onKeyDown={handleKey}
          onBlur={() => draft.trim() && commit(draft)}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? describedById : undefined}
          {...rest}
        />
      </div>
      {message && (
        <div id={describedById} className={`nos-field__message ${hasError ? 'nos-field__message--error' : ''}`}>
          {message}
        </div>
      )}
    </div>
  );
}
