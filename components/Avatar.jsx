import './Avatar.css';

/**
 * Avatar — represents a person, account, or entity as a circular badge.
 *
 * Renders, in priority order: a custom `icon`, an `src` image, or initials
 * derived from `name`. Color is deterministic per name.
 *
 * Props:
 *   name:    string — used for initials and aria-label
 *   src:     string — image URL
 *   icon:    node — overrides image and initials
 *   size:    "xs" | "sm" | "md" | "lg" | "xl"   (default: "md")
 *   shape:   "circle" | "square"                (default: "circle")
 *   variant: "neutral" | "brand" | "auto"       (default: "auto")
 *   status:  "online" | "offline" | "busy" | "away"  optional indicator dot
 *
 * Usage:
 *   <Avatar name="Ada Lovelace" />
 *   <Avatar src="/me.png" name="Ada" status="online" />
 *
 * Subcomponent:
 *   Avatar.Group — overlapping stack with overflow count.
 */
export function Avatar({
  name = '',
  src,
  icon,
  size = 'md',
  shape = 'circle',
  variant = 'auto',
  status,
  className = '',
  ...rest
}) {
  const initials = getInitials(name);
  const tone = variant === 'auto' ? pickTone(name) : variant;

  const classes = [
    'nos-avatar',
    `nos-avatar--${size}`,
    `nos-avatar--${shape}`,
    `nos-avatar--tone-${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} role="img" aria-label={name || 'Avatar'} {...rest}>
      {icon ? (
        <span className="nos-avatar__icon">{icon}</span>
      ) : src ? (
        <img className="nos-avatar__image" src={src} alt="" />
      ) : (
        <span className="nos-avatar__initials">{initials || '?'}</span>
      )}
      {status && (
        <span
          className={`nos-avatar__status nos-avatar__status--${status}`}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

/**
 * Avatar.Group — stack of avatars with optional overflow count.
 *
 * Props:
 *   max:      number — show this many avatars before collapsing into "+N"
 *   size:     forwarded to children if they don't set it
 *   children: <Avatar /> elements
 */
function AvatarGroup({ max, size, className = '', children, ...rest }) {
  const items = Array.isArray(children) ? children.flat().filter(Boolean) : [children].filter(Boolean);
  const visible = max != null ? items.slice(0, max) : items;
  const overflow = items.length - visible.length;

  const classes = ['nos-avatar-group', size ? `nos-avatar-group--${size}` : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {visible.map((child, i) => (
        <span key={i} className="nos-avatar-group__slot">
          {child}
        </span>
      ))}
      {overflow > 0 && (
        <span className="nos-avatar-group__slot">
          <Avatar name={`+${overflow}`} size={size} variant="neutral" />
        </span>
      )}
    </span>
  );
}

Avatar.Group = AvatarGroup;

function getInitials(name) {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const TONES = ['brand', 'success', 'warning', 'info', 'neutral'];

function pickTone(name) {
  if (!name) return 'neutral';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return TONES[Math.abs(hash) % TONES.length];
}
