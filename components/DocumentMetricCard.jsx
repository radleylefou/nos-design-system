import './DocumentMetricCard.css';

/**
 * DocumentMetricCard — quantified benefit card for document sections.
 *
 * Props:
 *   label          — small label above the value
 *   value          — prominent metric value
 *   delta          — optional inline change text
 *   deltaTone      — 'positive' | 'negative' | 'neutral'
 *   supportingText — supporting copy below the value
 *   className      — optional class appended to the root
 *   ...rest        — forwarded to the root <article>
 */
export function DocumentMetricCard({
  label,
  value,
  delta,
  deltaTone = 'positive',
  supportingText,
  className = '',
  ...rest
}) {
  const cls = ['nos-document-metric-card', className].filter(Boolean).join(' ');

  return (
    <article className={cls} {...rest}>
      {label && <p className="nos-document-metric-card__label">{label}</p>}
      <div className="nos-document-metric-card__body">
        <div className="nos-document-metric-card__value-row">
          <p className="nos-document-metric-card__value">{value}</p>
          {delta && (
            <p className={`nos-document-metric-card__delta nos-document-metric-card__delta--${deltaTone}`}>
              {delta}
            </p>
          )}
        </div>
        {supportingText && <p className="nos-document-metric-card__supporting">{supportingText}</p>}
      </div>
    </article>
  );
}
