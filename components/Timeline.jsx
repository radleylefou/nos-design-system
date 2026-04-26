import './Timeline.css';

/**
 * Timeline / ActivityFeed — vertical log of timestamped events.
 *
 * Composition:
 *   <Timeline>
 *     <Timeline.Item
 *       actor="R. Lefou"
 *       action="changed status to"
 *       highlight="Approved"
 *       timestamp="2d ago"
 *     />
 *     <Timeline.Item actor="System" timestamp="4d ago">
 *       Requirement #1.2 was created.
 *     </Timeline.Item>
 *   </Timeline>
 *
 * Props — Timeline:
 *   children:  Timeline.Item elements
 *   className
 *
 * Props — Timeline.Item:
 *   actor:      string          — who performed the action
 *   action:     string          — verb phrase ("changed status to")
 *   highlight:  string          — bolded conclusion ("Approved")
 *   timestamp:  string          — relative or absolute time
 *   icon:       ReactNode       — overrides the default avatar dot
 *   children:   ReactNode       — optional freeform content below the line
 */
export function Timeline({ children, className = '', ...rest }) {
  return (
    <div
      className={['nos-timeline', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}

function TimelineItem({
  actor,
  action,
  highlight,
  timestamp,
  icon,
  children,
  className = '',
  ...rest
}) {
  return (
    <div className={['nos-timeline-item', className].filter(Boolean).join(' ')} {...rest}>
      <div className="nos-timeline-item__rail">
        <div className="nos-timeline-item__dot" aria-hidden="true">
          {icon || <DefaultDot actor={actor} />}
        </div>
        <div className="nos-timeline-item__line" aria-hidden="true" />
      </div>

      <div className="nos-timeline-item__content">
        <p className="nos-timeline-item__summary">
          {actor && <strong className="nos-timeline-item__actor">{actor}</strong>}
          {action && <span className="nos-timeline-item__action"> {action} </span>}
          {highlight && <strong className="nos-timeline-item__highlight">{highlight}</strong>}
          {!action && !highlight && !actor && children}
        </p>

        {(action || highlight || actor) && children && (
          <div className="nos-timeline-item__body">{children}</div>
        )}

        {timestamp && (
          <time className="nos-timeline-item__timestamp">{timestamp}</time>
        )}
      </div>
    </div>
  );
}

function DefaultDot({ actor }) {
  const initials = actor
    ? actor.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '·';
  return <span className="nos-timeline-item__avatar">{initials}</span>;
}

Timeline.Item = TimelineItem;
