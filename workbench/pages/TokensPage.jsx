import { useState } from 'react';
import tokens from '../../tokens/tokens.json';
import './TokensPage.css';

// Extract $value from a DTCG token object, or return the value as-is.
const val = (token) =>
  token && typeof token === 'object' && '$value' in token ? token.$value : token;

/**
 * TokensPage — renders one token category at a time.
 *
 * Props:
 *   category: "Color" | "Typography" | "Spacing" | "Radius"
 */
export function TokensPage({ category }) {
  return (
    <div className="wb-page">
      <div className="wb-page__header">
        <div className="wb-page__eyebrow">Tokens</div>
        <h1 className="wb-page__title">{category}</h1>
        <p className="wb-page__subtitle">
          Edit <code className="wb-inline-code">tokens/tokens.json</code> and run{' '}
          <code className="wb-inline-code">npm run tokens</code> to regenerate.
        </p>
      </div>

      {category === 'Color'      && <ColorView />}
      {category === 'Typography' && <TypographyView />}
      {category === 'Spacing'    && <SpacingView />}
      {category === 'Radius'     && <RadiusView />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Copy button
// ---------------------------------------------------------------------------

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button type="button" className="wb-copy-btn" onClick={handleCopy} title={`Copy ${text}`}>
      {copied ? '✓' : 'Copy'}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Color
// ---------------------------------------------------------------------------

function ColorView() {
  return (
    <>
      <SwatchGroup title="Brand" swatches={tokens.color.brand} prefix="color-brand" />
      <SwatchGroup title="Neutral" swatches={tokens.color.neutral} prefix="color-neutral" />
      <SwatchGroup title="Success" swatches={tokens.color.semantic.success} prefix="color-semantic-success" />
      <SwatchGroup title="Warning" swatches={tokens.color.semantic.warning} prefix="color-semantic-warning" />
      <SwatchGroup title="Error"   swatches={tokens.color.semantic.error}   prefix="color-semantic-error" />
      <SwatchGroup title="Info"    swatches={tokens.color.semantic.info}    prefix="color-semantic-info" />
    </>
  );
}

function SwatchGroup({ title, swatches, prefix }) {
  return (
    <section className="wb-section">
      <h2 className="wb-section__title">{title}</h2>
      <div className="wb-swatches">
        {Object.entries(swatches).map(([step, token]) => {
          const hex = val(token);
          const varName = `--${prefix}-${step}`;
          return (
            <div className="wb-swatch" key={step}>
              <div className="wb-swatch__chip" style={{ background: hex }} />
              <div className="wb-swatch__meta">
                <div className="wb-swatch__step">{step}</div>
                <div className="wb-swatch__hex">{hex}</div>
                <CopyButton text={varName} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

function TypographyView() {
  const sizes = Object.entries(tokens.typography['font-size']);
  const weights = Object.entries(tokens.typography['font-weight']);

  return (
    <>
      <section className="wb-section">
        <h2 className="wb-section__title">Font size</h2>
        <div className="wb-token-list">
          {sizes.map(([key, token]) => {
            const value = val(token);
            const varName = `--font-size-${key}`;
            return (
              <div className="wb-token-row" key={key}>
                <div className="wb-token-row__preview">
                  <span style={{ fontSize: value, lineHeight: 1 }}>Aa</span>
                </div>
                <code className="wb-token-row__name">{varName}</code>
                <span className="wb-token-row__value">{value}</span>
                <CopyButton text={varName} />
              </div>
            );
          })}
        </div>
      </section>

      <section className="wb-section">
        <h2 className="wb-section__title">Font weight</h2>
        <div className="wb-token-list">
          {weights.map(([key, token]) => {
            const value = val(token);
            const varName = `--font-weight-${key}`;
            return (
              <div className="wb-token-row" key={key}>
                <div className="wb-token-row__preview">
                  <span style={{ fontWeight: value, fontSize: '16px' }}>The quick brown fox</span>
                </div>
                <code className="wb-token-row__name">{varName}</code>
                <span className="wb-token-row__value">{value}</span>
                <CopyButton text={varName} />
              </div>
            );
          })}
        </div>
      </section>

      <section className="wb-section">
        <h2 className="wb-section__title">Line height</h2>
        <div className="wb-token-list">
          {Object.entries(tokens.typography['line-height']).map(([key, token]) => {
            const value = val(token);
            const varName = `--line-height-${key}`;
            return (
              <div className="wb-token-row" key={key}>
                <div className="wb-token-row__preview" style={{ width: 160 }}>
                  <span style={{ fontSize: '13px', lineHeight: value, display: 'block' }}>
                    The quick brown fox jumps over the lazy dog.
                  </span>
                </div>
                <code className="wb-token-row__name">{varName}</code>
                <span className="wb-token-row__value">{value}</span>
                <CopyButton text={varName} />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

function SpacingView() {
  return (
    <section className="wb-section">
      <div className="wb-token-list">
        {Object.entries(tokens.spacing).map(([key, token]) => {
          const value = val(token);
          const varName = `--spacing-${key}`;
          return (
            <div className="wb-token-row" key={key}>
              <div className="wb-token-row__preview">
                <div
                  className="wb-spacing-bar"
                  style={{ width: value === '0px' ? '2px' : value }}
                />
              </div>
              <code className="wb-token-row__name">{varName}</code>
              <span className="wb-token-row__value">{value}</span>
              <CopyButton text={varName} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Radius
// ---------------------------------------------------------------------------

function RadiusView() {
  return (
    <section className="wb-section">
      <div className="wb-radius-grid">
        {Object.entries(tokens.radius).map(([key, token]) => {
          const value = val(token);
          const varName = `--radius-${key}`;
          return (
            <div className="wb-radius-item" key={key}>
              <div
                className="wb-radius-preview"
                style={{ borderRadius: value === '9999px' ? '50%' : value }}
              />
              <code className="wb-token-row__name">{varName}</code>
              <span className="wb-token-row__value">{value}</span>
              <CopyButton text={varName} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
