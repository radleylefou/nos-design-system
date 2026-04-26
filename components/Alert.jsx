import { useState } from 'react';
import './Alert.css';

/**
 * Alert — inline contextual message for page sections.
 * Banner — full-width strip for page-level notices.
 *
 * Props (both):
 *   variant:     "info" | "success" | "warning" | "error"  (default: "info")
 *   title:       string
 *   children:    description content
 *   dismissable: boolean  (default: false)
 *   onDismiss:   function — called after dismiss animation; also fires when
 *                           the component self-manages dismissal
 *   icon:        ReactNode — override the default variant icon
 *   actions:     ReactNode — trailing action buttons
 *   className
 *
 * Usage:
 *   <Alert variant="warning" title="Scope is in draft">
 *     Submit for review to unlock approval.
 *   </Alert>
 *
 *   <Banner variant="error" title="Action required" dismissable>
 *     3 requirements are missing owners.
 *   </Banner>
 */

const VARIANT_META = {
  info:    { icon: InfoIcon },
  success: { icon: CheckIcon },
  warning: { icon: WarningIcon },
  error:   { icon: ErrorIcon },
};

function AlertBase({
  variant = 'info',
  title,
  children,
  dismissable = false,
  onDismiss,
  icon,
  actions,
  className = '',
  baseClass,
  ...rest
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const meta = VARIANT_META[variant] || VARIANT_META.info;
  const IconComponent = meta.icon;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className={[baseClass, `${baseClass}--${variant}`, className].filter(Boolean).join(' ')}
      role="alert"
      {...rest}
    >
      <span className={`${baseClass}__icon`} aria-hidden="true">
        {icon || <IconComponent />}
      </span>

      <div className={`${baseClass}__body`}>
        {title && <div className={`${baseClass}__title`}>{title}</div>}
        {children && <div className={`${baseClass}__desc`}>{children}</div>}
        {actions && <div className={`${baseClass}__actions`}>{actions}</div>}
      </div>

      {dismissable && (
        <button
          type="button"
          className={`${baseClass}__dismiss`}
          aria-label="Dismiss"
          onClick={handleDismiss}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

export function Alert(props) {
  return <AlertBase {...props} baseClass="nos-alert" />;
}

export function Banner(props) {
  return <AlertBase {...props} baseClass="nos-banner" />;
}

/* ── Icons ────────────────────────────────────────────────────────── */

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 7.5v4" />
      <circle cx="8" cy="5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M5.5 8l2 2 3-3.5" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7.1 2.3L1 13h14L8.9 2.3a1 1 0 00-1.8 0z" />
      <path d="M8 6.5v3" />
      <circle cx="8" cy="11.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M6 6l4 4M10 6l-4 4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}
