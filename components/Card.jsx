import './Card.css';

/**
 * Card — surface container for grouping related content.
 *
 * Props:
 *   variant:  "default" | "muted" | "outlined"   (default: "default")
 *   padding:  "none" | "sm" | "md" | "lg"         (default: "md")
 *   interactive: boolean — adds hover elevation/affordance (use when the whole card is clickable)
 *   as:       HTML tag to render (default: "div")
 *   children: content
 *
 * Subcomponents:
 *   Card.Header, Card.Body, Card.Footer — optional structural helpers.
 *
 * Usage:
 *   <Card>
 *     <Card.Header>Title</Card.Header>
 *     <Card.Body>…</Card.Body>
 *   </Card>
 */
export function Card({
  variant = 'default',
  padding = 'md',
  interactive = false,
  as: Tag = 'div',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'nos-card',
    `nos-card--${variant}`,
    `nos-card--pad-${padding}`,
    interactive ? 'nos-card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

function CardHeader({ className = '', children, ...rest }) {
  return (
    <div className={`nos-card__header ${className}`} {...rest}>
      {children}
    </div>
  );
}

function CardBody({ className = '', children, ...rest }) {
  return (
    <div className={`nos-card__body ${className}`} {...rest}>
      {children}
    </div>
  );
}

function CardFooter({ className = '', children, ...rest }) {
  return (
    <div className={`nos-card__footer ${className}`} {...rest}>
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
