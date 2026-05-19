import { useEffect, useId } from 'react';
import { Overlay } from './Overlay.jsx';
import './Modal.css';

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5 5L13 13M13 5L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * ModalShell — reusable centered dialog surface.
 *
 * Props:
 *   title        — modal heading
 *   description  — supporting copy beneath the title
 *   onClose      — renders a close button and calls it on click
 *   footer       — optional footer content aligned to the end
 *   size         — 'sm' | 'md' | 'lg'
 *   children     — modal body content
 *   className    — optional class appended to the shell
 *   ...rest      — forwarded to the shell element
 */
export function ModalShell({
  title,
  description,
  onClose,
  footer,
  size = 'md',
  children,
  className = '',
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...rest
}) {
  const autoId = useId();
  const titleId = ariaLabelledBy || `${autoId}-title`;
  const descId = ariaDescribedBy || `${autoId}-description`;

  const cls = [
    'nos-modal',
    `nos-modal--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <section
      className={cls}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descId : undefined}
      {...rest}
    >
      {(title || description || onClose) && (
        <header className="nos-modal__header">
          <div className="nos-modal__heading">
            {title && <h2 className="nos-modal__title" id={titleId}>{title}</h2>}
            {description && <p className="nos-modal__description" id={descId}>{description}</p>}
          </div>
          {onClose && (
            <button className="nos-modal__close" type="button" aria-label="Close modal" onClick={onClose}>
              <CloseIcon />
            </button>
          )}
        </header>
      )}
      <div className="nos-modal__body">
        {children}
      </div>
      {footer && (
        <footer className="nos-modal__footer">
          {footer}
        </footer>
      )}
    </section>
  );
}

/**
 * Modal — composed overlay and dialog shell.
 *
 * Props:
 *   open          — renders the modal when true
 *   onOpenChange  — called with false when scrim, close button, or Escape closes
 *   closeOnScrim  — allow scrim click dismissal
 *   closeOnEscape — allow Escape key dismissal
 *   ...rest       — forwarded to ModalShell
 */
export function Modal({
  open = false,
  onOpenChange,
  closeOnScrim = true,
  closeOnEscape = true,
  ...rest
}) {
  useEffect(() => {
    if (!open || !closeOnEscape) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onOpenChange?.(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEscape, onOpenChange, open]);

  const close = () => onOpenChange?.(false);

  return (
    <Overlay open={open} onClick={closeOnScrim ? close : undefined}>
      <ModalShell {...rest} onClose={rest.onClose || close} />
    </Overlay>
  );
}
