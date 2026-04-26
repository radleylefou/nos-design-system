import { useState } from 'react';
import tokens from '../../tokens/tokens.json';
import './TokensPage.css';

// Extract $value from a DTCG token object, or return the value as-is.
const val = (token) =>
  token && typeof token === 'object' && '$value' in token ? token.$value : token;

// Iterate non-metadata children of a DTCG group.
const groupEntries = (group) =>
  Object.entries(group || {}).filter(([key]) => !key.startsWith('$'));

/**
 * TokensPage — renders one token category at a time.
 *
 * Props:
 *   category: "Color" | "Typography" | "Spacing" | "Radius" | "Shadow" | "Border"
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
      {category === 'Shadow'     && <ShadowView />}
      {category === 'Border'     && <BorderView />}
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

// ---------------------------------------------------------------------------
// Shadow
// ---------------------------------------------------------------------------

const SHADOW_GROUPS = [
  {
    title: 'Elevation',
    description: 'General-purpose lift, from the faintest hairline to a hero modal.',
    keys: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
  },
  {
    title: 'Surface roles',
    description: 'Tuned for specific overlay surfaces — use these instead of the size scale where possible.',
    keys: ['dropdown', 'popover', 'modal', 'toast', 'inner'],
  },
  {
    title: 'Focus rings',
    description: 'Two-stop ring used on focus-visible. Inner stop matches the surface, outer matches the intent.',
    keys: ['focus', 'focus-error', 'focus-success'],
  },
  {
    title: 'Brand glow',
    description: 'Reserved for primary CTAs and marketing surfaces.',
    keys: ['brand-glow', 'brand-glow-hover'],
  },
];

function ShadowView() {
  return (
    <>
      {SHADOW_GROUPS.map((group) => (
        <section className="wb-section" key={group.title}>
          <header className="wb-section__head">
            <h2 className="wb-section__title">{group.title}</h2>
            <p className="wb-section__desc">{group.description}</p>
          </header>
          <div className="wb-shadow-grid">
            {group.keys.map((key) => {
              const token = tokens.shadow[key];
              if (!token) return null;
              const value = val(token);
              const varName = `--shadow-${key}`;
              const isFocus = key.startsWith('focus');
              return (
                <div className="wb-shadow-card" key={key}>
                  <div
                    className={`wb-shadow-card__sample ${isFocus ? 'is-focus' : ''}`}
                    style={{ boxShadow: value }}
                  />
                  <div className="wb-shadow-card__meta">
                    <code className="wb-shadow-card__name">{varName}</code>
                    <CopyButton text={varName} />
                  </div>
                  <code className="wb-shadow-card__value" title={value}>{value}</code>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Border
// ---------------------------------------------------------------------------

const BORDER_GROUPS = [
  {
    title: 'Alpha (on light)',
    description:
      'Multiplying neutral-900 over the underlying surface keeps borders tonally consistent across white cards, brand washes, and tinted backgrounds.',
    group: tokens.border.alpha,
    prefix: 'border-alpha',
    background: 'var(--bg-surface)',
    swatch: 'light',
  },
  {
    title: 'Alpha (on dark)',
    description: 'Inverse alpha scale for use on dark surfaces, headers, and inverse-themed sections.',
    group: tokens.border['on-dark'],
    prefix: 'border-on-dark',
    background: 'var(--bg-inverse)',
    swatch: 'dark',
  },
  {
    title: 'Brand alpha',
    description: 'Tinted borders for brand-washed surfaces and selected states.',
    group: tokens.border['brand-alpha'],
    prefix: 'border-brand-alpha',
    background: 'var(--color-brand-50)',
    swatch: 'brand',
  },
];

const SEMANTIC_BORDER_KEYS = ['subtle', 'default', 'strong', 'inverse', 'focus'];

function BorderView() {
  return (
    <>
      {BORDER_GROUPS.map((group) => (
        <section className="wb-section" key={group.title}>
          <header className="wb-section__head">
            <h2 className="wb-section__title">{group.title}</h2>
            <p className="wb-section__desc">{group.description}</p>
          </header>
          <div className={`wb-border-grid wb-border-grid--${group.swatch}`}>
            {groupEntries(group.group).map(([key, token]) => {
              const value = val(token);
              const varName = `--${group.prefix}-${key}`;
              return (
                <div className="wb-border-card" key={key} style={{ background: group.background }}>
                  <div
                    className="wb-border-card__sample"
                    style={{ border: `1.5px solid ${value}` }}
                  />
                  <div className="wb-border-card__meta">
                    <div className="wb-border-card__step">{key}%</div>
                    <code className="wb-border-card__name">{varName}</code>
                    <code className="wb-border-card__value">{value}</code>
                  </div>
                  <CopyButton text={varName} />
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section className="wb-section">
        <header className="wb-section__head">
          <h2 className="wb-section__title">Semantic roles</h2>
          <p className="wb-section__desc">
            Resolved aliases used by components. Most components reference these — not the raw alpha
            tokens directly.
          </p>
        </header>
        <div className="wb-token-list">
          {SEMANTIC_BORDER_KEYS.map((key) => {
            const token = tokens.semantic.border[key];
            if (!token) return null;
            const ref = val(token);
            const varName = `--border-${key}`;
            return (
              <div className="wb-token-row" key={key}>
                <div className="wb-token-row__preview">
                  <div className="wb-border-sample" style={{ border: `1.5px solid var(${varName})` }} />
                </div>
                <code className="wb-token-row__name">{varName}</code>
                <span className="wb-token-row__value">{ref}</span>
                <CopyButton text={varName} />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
