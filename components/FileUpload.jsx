import { useId, useRef, useState } from 'react';
import './FileUpload.css';

/**
 * FileUpload — drag-and-drop file dropzone with click-to-browse fallback.
 *
 * Stays presentational: emits selected File objects via onChange. Hosting code
 * is responsible for actual upload progress and persistence.
 *
 * Props:
 *   value:        controlled File[] (uncontrolled if omitted)
 *   defaultValue: initial File[]
 *   onChange:     (files: File[]) => void
 *   multiple:     boolean — allow more than one file (default false)
 *   accept:       string — native accept attribute (e.g., "image/*,.pdf")
 *   maxSize:      bytes — files larger than this are rejected
 *   disabled:     boolean
 *   label, helperText, error: standard field chrome
 *   hint:         primary helper line shown inside the dropzone (default
 *                  "Drag files here or click to browse")
 *
 * Usage:
 *   <FileUpload label="Attachments" multiple onChange={setFiles} />
 */
export function FileUpload({
  value,
  defaultValue,
  onChange,
  multiple = false,
  accept,
  maxSize,
  disabled = false,
  label,
  helperText,
  error = false,
  hint = 'Drag files here or click to browse',
  id,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const describedById = `${inputId}-desc`;
  const inputRef = useRef(null);

  const [internal, setInternal] = useState(defaultValue || []);
  const files = value !== undefined ? value : internal;

  const [dragOver, setDragOver] = useState(false);
  const [rejectionMsg, setRejectionMsg] = useState(null);

  const errorText = typeof error === 'string' ? error : rejectionMsg;
  const hasError = Boolean(error) || Boolean(rejectionMsg);
  const message = errorText || helperText;

  const update = (next) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const ingest = (incoming) => {
    setRejectionMsg(null);
    let next = Array.from(incoming);
    if (maxSize) {
      const tooLarge = next.find((f) => f.size > maxSize);
      if (tooLarge) {
        setRejectionMsg(`"${tooLarge.name}" exceeds the ${formatBytes(maxSize)} limit.`);
        next = next.filter((f) => f.size <= maxSize);
      }
    }
    if (!multiple) next = next.slice(0, 1);
    const merged = multiple ? [...files, ...next] : next;
    update(merged);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    if (e.dataTransfer.files?.length) ingest(e.dataTransfer.files);
  };

  const remove = (index) => {
    update(files.filter((_, i) => i !== index));
  };

  const wrapperClasses = [
    'nos-fileupload',
    dragOver ? 'nos-fileupload--dragover' : '',
    hasError ? 'nos-fileupload--error' : '',
    disabled ? 'nos-fileupload--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="nos-field">
      {label && <label htmlFor={inputId} className="nos-field__label">{label}</label>}
      <div
        className={wrapperClasses}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        aria-describedby={message ? describedById : undefined}
        aria-invalid={hasError || undefined}
        {...rest}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="nos-fileupload__native"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={(e) => e.target.files?.length && ingest(e.target.files)}
          tabIndex={-1}
        />
        <div className="nos-fileupload__icon">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v3a3 3 0 01-3 3H6a3 3 0 01-3-3v-3" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <div className="nos-fileupload__hint">{hint}</div>
        {accept && <div className="nos-fileupload__sub">{accept}</div>}
        {maxSize && <div className="nos-fileupload__sub">Max {formatBytes(maxSize)}</div>}
      </div>

      {files.length > 0 && (
        <ul className="nos-fileupload__list">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="nos-fileupload__item">
              <span className="nos-fileupload__item-name">{file.name}</span>
              <span className="nos-fileupload__item-meta">{formatBytes(file.size)}</span>
              {!disabled && (
                <button
                  type="button"
                  className="nos-fileupload__item-remove"
                  aria-label={`Remove ${file.name}`}
                  onClick={(e) => { e.stopPropagation(); remove(i); }}
                >
                  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M3 3l6 6M9 3l-6 6" />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {message && (
        <div id={describedById} className={`nos-field__message ${hasError ? 'nos-field__message--error' : ''}`}>
          {message}
        </div>
      )}
    </div>
  );
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
