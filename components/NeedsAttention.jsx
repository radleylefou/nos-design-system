import { DashboardCard } from './DashboardCard.jsx';
import { Button } from './Button.jsx';
import './NeedsAttention.css';

/**
 * NeedsAttention — surface card listing items that require user follow-up.
 *
 * Renders a header (title + optional actions) and a stack of tinted alert rows.
 * Each row has a tone-coloured left bar, a title and subtitle, and an optional
 * inline action button.
 *
 * Props:
 *   title      — header label. Defaults to "Needs Attention".
 *   items      — Array<{
 *                  id?:       string
 *                  tone:      'danger' | 'warning' | 'brand'
 *                  title:     string
 *                  subtitle?: string
 *                  action?:   { label: string, onClick?: () => void }
 *                }>
 *   onExpand   — optional callback for the header expand affordance (↗).
 *   onMore     — optional callback for the header overflow affordance (⋯).
 *   ...rest    — passed to the root element via DashboardCard.
 */
export function NeedsAttention({
  title = 'Needs Attention',
  items = [],
  onExpand,
  onMore,
  ...rest
}) {
  return (
    <DashboardCard title={title} onExpand={onExpand} onMore={onMore} {...rest}>
      <ul className="nos-na__list" role="list">
        {items.map((item, i) => (
          <NeedsAttentionItem key={item.id ?? i} {...item} />
        ))}
      </ul>
    </DashboardCard>
  );
}

function NeedsAttentionItem({ tone, title, subtitle, action }) {
  return (
    <li className={`nos-na__item nos-na__item--${tone}`}>
      <span className="nos-na__bar" aria-hidden="true" />
      <div className="nos-na__content">
        <p className="nos-na__item-title">{title}</p>
        {subtitle && (
          <p className="nos-na__item-subtitle">{subtitle}</p>
        )}
      </div>
      {action && (
        <Button
          variant="soft"
          size="sm"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </li>
  );
}
