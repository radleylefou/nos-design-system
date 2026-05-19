import { useState } from 'react';
import tokens from '../../tokens/tokens.json';
import { TOKEN_CATEGORIES } from '../nav.js';
import { WorkbenchTransition } from '../WorkbenchTransition.jsx';
import './TokensPage.css';

// Extract $value from a DTCG token object, or return the value as-is.
const val = (token) =>
  token && typeof token === 'object' && '$value' in token ? token.$value : token;

// Iterate non-metadata children of a DTCG group.
const groupEntries = (group) =>
  Object.entries(group || {}).filter(([key]) => !key.startsWith('$'));

/**
 * TokensPage — renders design tokens with an inline category tab bar.
 *
 * Props:
 *   category: initial active category (optional, defaults to "Color")
 */
export function TokensPage({ category = 'Color' }) {
  const [active, setActive] = useState(category);

  return (
    <div className="wb-page">
      <div className="wb-page__header">
        <div className="wb-page__eyebrow">Design Tokens</div>
        <h1 className="wb-page__title">Tokens</h1>
        <p className="wb-page__subtitle">
          Edit <code className="wb-inline-code">tokens/tokens.json</code> and run{' '}
          <code className="wb-inline-code">npm run tokens</code> to regenerate.
        </p>
      </div>

      <div className="wb-page-tabs" role="tablist" aria-label="Token categories">
        {TOKEN_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            className={`wb-page-tabs__item ${active === cat ? 'wb-page-tabs__item--active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <WorkbenchTransition transitionKey={active} variant="tab" className="wb-token-panel">
        {active === 'Color'      && <ColorView />}
        {active === 'Typography' && <TypographyView />}
        {active === 'Spacing'    && <SpacingView />}
        {active === 'Radius'     && <RadiusView />}
        {active === 'Shadow'     && <ShadowView />}
        {active === 'Border'     && <BorderView />}
      </WorkbenchTransition>
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
      <SwatchGroup title="Dataviz — Green"  swatches={tokens.color.dataviz.green}  prefix="color-dataviz-green" />
      <SwatchGroup title="Dataviz — Lime"   swatches={tokens.color.dataviz.lime}   prefix="color-dataviz-lime" />
      <SwatchGroup title="Dataviz — Blue"   swatches={tokens.color.dataviz.blue}   prefix="color-dataviz-blue" />
      <SwatchGroup title="Dataviz — Cyan"   swatches={tokens.color.dataviz.cyan}   prefix="color-dataviz-cyan" />
      <SwatchGroup title="Dataviz — Teal"   swatches={tokens.color.dataviz.teal}   prefix="color-dataviz-teal" />
      <SwatchGroup title="Dataviz — Orange" swatches={tokens.color.dataviz.orange} prefix="color-dataviz-orange" />
      <SwatchGroup title="Dataviz — Amber"  swatches={tokens.color.dataviz.amber}  prefix="color-dataviz-amber" />
      <SwatchGroup title="Dataviz — Pink"   swatches={tokens.color.dataviz.pink}   prefix="color-dataviz-pink" />
      <SwatchGroup title="White Alpha" swatches={tokens.color['white-alpha']} prefix="color-white-alpha" />
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

const TYPOGRAPHY_FONT_ROLES = [
  {
    key: 'sans',
    label: 'Sans',
    role: 'Primary UI font',
    usage: 'Use for product UI, body copy, labels, controls, tables, and documentation.',
    sample: 'Guidance dashboard',
  },
  {
    key: 'mono',
    label: 'Mono',
    role: 'Technical font',
    usage: 'Use for code, tokens, keyboard shortcuts, IDs, and fixed-width technical values.',
    sample: 'scope_id: NOS-4821',
  },
];

const TYPOGRAPHY_STYLES = [
  {
    name: 'Page title',
    description: 'Top-level workbench and app page headings.',
    fontFamily: 'sans',
    fontSize: '4xl',
    fontWeight: 'bold',
    lineHeight: 'display',
    letterSpacing: 'normal',
    sample: 'Components',
  },
  {
    name: 'Page description',
    description: 'Introductory copy below top-level headings.',
    fontFamily: 'sans',
    fontSize: 'sm',
    fontWeight: 'regular',
    lineHeight: 'relaxed',
    letterSpacing: 'normal',
    sample: 'Browse the primitives that shape NOS product screens.',
  },
  {
    name: 'Section title',
    description: 'Uppercase section labels and compact module headings.',
    fontFamily: 'sans',
    fontSize: 'xs',
    fontWeight: 'semibold',
    lineHeight: 'tight',
    letterSpacing: 'wide',
    transform: 'uppercase',
    sample: 'Design Tokens',
  },
  {
    name: 'Control label',
    description: 'Labels above inputs, selects, checkboxes, and playground controls.',
    fontFamily: 'sans',
    fontSize: 'xs',
    fontWeight: 'medium',
    lineHeight: 'snug',
    letterSpacing: 'normal',
    sample: 'Client name',
  },
  {
    name: 'Control text',
    description: 'Text inside buttons, inputs, selects, segmented controls, and compact UI.',
    fontFamily: 'sans',
    fontSize: 'sm',
    fontWeight: 'medium',
    lineHeight: 'none',
    letterSpacing: 'normal',
    sample: 'Save changes',
  },
  {
    name: 'Helper text',
    description: 'Secondary form guidance, validation copy, timestamps, and muted details.',
    fontFamily: 'sans',
    fontSize: 'xs',
    fontWeight: 'regular',
    lineHeight: 'snug',
    letterSpacing: 'normal',
    sample: 'Updated 2 hours ago',
  },
  {
    name: 'Table header',
    description: 'Column headers, table-stage labels, and dense table chrome.',
    fontFamily: 'sans',
    fontSize: '2xs',
    fontWeight: 'medium',
    lineHeight: 'none',
    letterSpacing: 'caps',
    transform: 'uppercase',
    sample: 'STAGE',
  },
  {
    name: 'Table cell',
    description: 'Primary row text in tables and list-like data surfaces.',
    fontFamily: 'sans',
    fontSize: 'sm',
    fontWeight: 'medium',
    lineHeight: 'snug',
    letterSpacing: 'normal',
    sample: 'Radiology Imaging Associates',
  },
  {
    name: 'Table meta',
    description: 'Secondary table row text and quiet metadata below primary values.',
    fontFamily: 'sans',
    fontSize: 'xs',
    fontWeight: 'regular',
    lineHeight: 'snug',
    letterSpacing: 'normal',
    sample: 'SOW#4 - Website Project',
  },
  {
    name: 'Metric value',
    description: 'Large numerical readouts in metrics, stat blocks, and dashboard cards.',
    fontFamily: 'sans',
    fontSize: '3xl',
    fontWeight: 'medium',
    lineHeight: 'tight',
    letterSpacing: 'normal',
    numeric: true,
    sample: '115.00 hrs',
  },
  {
    name: 'Metric label',
    description: 'Compact labels below or beside numerical dashboard readouts.',
    fontFamily: 'sans',
    fontSize: 'xs',
    fontWeight: 'regular',
    lineHeight: 'snug',
    letterSpacing: 'normal',
    sample: 'Target 40 hrs',
  },
  {
    name: 'Code',
    description: 'Inline code, token names, generated JSX, and identifiers.',
    fontFamily: 'mono',
    fontSize: 'xs',
    fontWeight: 'regular',
    lineHeight: 'relaxed',
    letterSpacing: 'normal',
    sample: '--font-size-sm',
  },
];

function TypographyView() {
  const families = Object.entries(tokens.typography['font-family']);
  const sizes = Object.entries(tokens.typography['font-size']);
  const weights = Object.entries(tokens.typography['font-weight']);

  return (
    <>
      <section className="wb-section">
        <header className="wb-section__head">
          <h2 className="wb-section__title">Fonts used</h2>
          <p className="wb-section__desc">
            NOS uses Geist for interface typography and a system monospace stack for technical content. Large dashboard values stay in the sans family for a calmer enterprise rhythm.
          </p>
        </header>
        <div className="wb-font-grid">
          {TYPOGRAPHY_FONT_ROLES.map((font) => {
            const token = tokens.typography['font-family'][font.key];
            if (!token) return null;
            const value = val(token);
            const varName = `--font-family-${font.key}`;
            return (
              <article className="wb-font-card" key={font.key}>
                <div className="wb-font-card__sample" style={{ fontFamily: `var(${varName})` }}>
                  {font.sample}
                </div>
                <div className="wb-font-card__body">
                  <div className="wb-font-card__label">{font.label}</div>
                  <div className="wb-font-card__role">{font.role}</div>
                  <p className="wb-font-card__usage">{font.usage}</p>
                  <code className="wb-font-card__stack">{value}</code>
                </div>
                <CopyButton text={varName} />
              </article>
            );
          })}
        </div>
      </section>

      <section className="wb-section">
        <h2 className="wb-section__title">Font family tokens</h2>
        <div className="wb-token-list">
          {families.map(([key, token]) => {
            const value = val(token);
            const varName = `--font-family-${key}`;
            return (
              <div className="wb-token-row wb-token-row--wide-preview" key={key}>
                <div className="wb-token-row__preview" style={{ fontFamily: `var(${varName})` }}>
                  The quick brown fox
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
        <header className="wb-section__head">
          <h2 className="wb-section__title">Type styles</h2>
          <p className="wb-section__desc">
            These are recommended combinations of existing tokens. They are documentation recipes, not additional generated CSS variables.
          </p>
        </header>
        <div className="wb-type-style-grid">
          {TYPOGRAPHY_STYLES.map((style) => {
            const cssVar = (group, key) => `var(--${group}-${key})`;
            const sampleStyle = {
              fontFamily: cssVar('font-family', style.fontFamily),
              fontSize: cssVar('font-size', style.fontSize),
              fontWeight: cssVar('font-weight', style.fontWeight),
              lineHeight: cssVar('line-height', style.lineHeight),
              letterSpacing: cssVar('letter-spacing', style.letterSpacing),
              textTransform: style.transform || 'none',
              fontVariantNumeric: style.numeric ? 'tabular-nums' : undefined,
            };
            return (
              <article className="wb-type-style" key={style.name}>
                <div className="wb-type-style__sample" style={sampleStyle}>{style.sample}</div>
                <div className="wb-type-style__meta">
                  <div>
                    <h3>{style.name}</h3>
                    <p>{style.description}</p>
                  </div>
                  <div className="wb-type-style__tokens">
                    <code>--font-family-{style.fontFamily}</code>
                    <code>--font-size-{style.fontSize}</code>
                    <code>--font-weight-{style.fontWeight}</code>
                    <code>--line-height-{style.lineHeight}</code>
                    <code>--letter-spacing-{style.letterSpacing}</code>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

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
