import './FieldGroup.css';

/**
 * FieldGroup — semantic grouping of related form fields with a shared title,
 * optional description, and consistent spacing.
 *
 * Use to break long forms into scannable sections (e.g., "Identity", "Billing
 * address", "Notifications"). Renders a `<fieldset>` for accessibility.
 *
 * Props:
 *   title:       string | node — section heading
 *   description: string | node — supporting copy
 *   columns:     1 | 2 | 3 — grid columns for the inner field layout (default 1)
 *   gap:         "sm" | "md" | "lg" — spacing between fields (default "md")
 *   actions:     node — right-aligned controls in the section header
 *   children:    field components
 *
 * Subcomponents:
 *   FieldGroup.Row — full-width grid row inside a multi-column group
 *
 * Usage:
 *   <FieldGroup title="Identity" description="Used in headers and exports.">
 *     <Input label="Full name" />
 *     <Input label="Email" />
 *   </FieldGroup>
 */
export function FieldGroup({
  title,
  description,
  columns = 1,
  gap = 'md',
  actions,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'nos-fieldgroup',
    `nos-fieldgroup--cols-${columns}`,
    `nos-fieldgroup--gap-${gap}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <fieldset className={classes} {...rest}>
      {(title || description || actions) && (
        <div className="nos-fieldgroup__head">
          <div className="nos-fieldgroup__heading">
            {title && <legend className="nos-fieldgroup__title">{title}</legend>}
            {description && <p className="nos-fieldgroup__description">{description}</p>}
          </div>
          {actions && <div className="nos-fieldgroup__actions">{actions}</div>}
        </div>
      )}
      <div className="nos-fieldgroup__body">{children}</div>
    </fieldset>
  );
}

function FieldGroupRow({ className = '', children, ...rest }) {
  const classes = ['nos-fieldgroup__row', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

FieldGroup.Row = FieldGroupRow;
