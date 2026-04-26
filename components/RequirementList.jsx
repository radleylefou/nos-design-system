import { StatusPill } from './StatusPill.jsx';
import './RequirementList.css';

/**
 * RequirementList — structured list of requirements with status and ownership.
 *
 * Composition:
 *   <RequirementList>
 *     <RequirementList.Item number="1.1" status="approved" owner="R. Lefou">
 *       The system shall export data as CSV.
 *     </RequirementList.Item>
 *   </RequirementList>
 *
 * Props — RequirementList:
 *   children:  RequirementList.Item elements
 *   numbered:  boolean — show auto-incrementing row numbers (default: false)
 *   className
 *
 * Props — RequirementList.Item:
 *   number:    string | number — explicit requirement number (e.g. "2.1.4")
 *   status:    string          — passed to StatusPill
 *   owner:     string          — assignee display name
 *   priority:  "high" | "medium" | "low"
 *   selected:  boolean
 *   onClick:   function
 *   actions:   ReactNode       — trailing action slot
 *   children:  requirement text
 */
export function RequirementList({ children, className = '', ...rest }) {
  return (
    <div
      className={['nos-req-list', className].filter(Boolean).join(' ')}
      role="list"
      {...rest}
    >
      {children}
    </div>
  );
}

function RequirementItem({
  number,
  status,
  owner,
  priority,
  selected = false,
  onClick,
  actions,
  children,
  className = '',
  ...rest
}) {
  const classes = [
    'nos-req-item',
    selected ? 'nos-req-item--selected' : '',
    onClick ? 'nos-req-item--clickable' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role="listitem"
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(e); } : undefined}
      {...rest}
    >
      {number !== undefined && (
        <span className="nos-req-item__number">{number}</span>
      )}

      <span className="nos-req-item__body">
        {priority && <PriorityDot priority={priority} />}
        <span className="nos-req-item__text">{children}</span>
      </span>

      <span className="nos-req-item__meta">
        {owner && <span className="nos-req-item__owner">{owner}</span>}
        {status && <StatusPill status={status} size="sm" />}
      </span>

      {actions && (
        <span className="nos-req-item__actions" onClick={(e) => e.stopPropagation()}>
          {actions}
        </span>
      )}
    </div>
  );
}

function PriorityDot({ priority }) {
  return (
    <span
      className={`nos-req-item__priority nos-req-item__priority--${priority}`}
      aria-label={`${priority} priority`}
      title={`${priority} priority`}
    />
  );
}

RequirementList.Item = RequirementItem;
