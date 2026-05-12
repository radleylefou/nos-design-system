import './DescriptionList.css';

/**
 * DescriptionList — read-only display of labeled content pairs.
 *
 * Renders as a semantic <dl> with uppercase labels (dt) and body values (dd).
 * Values accept strings or ReactNode for rich content.
 *
 * Props:
 *   items     — array of { label: string, value: string | ReactNode }
 *   className — optional class appended to the root
 *   ...rest   — forwarded to the root <dl>
 */
export function DescriptionList({ items = [], className = '', ...rest }) {
  const cls = ['nos-description-list', className].filter(Boolean).join(' ');

  return (
    <dl className={cls} {...rest}>
      {items.map((item, i) => (
        <div className="nos-description-list__item" key={i}>
          <dt className="nos-description-list__label">{item.label}</dt>
          <dd className="nos-description-list__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
