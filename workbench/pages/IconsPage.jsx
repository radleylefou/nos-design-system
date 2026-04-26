import { useMemo, useState } from 'react';
import { ICONS } from '../icons.jsx';
import './IconsPage.css';

const SIZE_OPTIONS = [16, 20, 24, 32];
const STROKE_OPTIONS = [1, 1.25, 1.5, 1.75, 2];
const ALL = '__all__';

/**
 * IconsPage — gallery of every workbench/demo icon, grouped by category.
 *
 * The icons here power the playground previews and component demos.
 * NOS apps in production are expected to bring their own icon library;
 * this page is a reference, not a runtime export.
 */
export function IconsPage() {
  const [size, setSize] = useState(20);
  const [stroke, setStroke] = useState(1.5);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(ALL);

  const categories = useMemo(() => {
    const seen = new Set();
    const order = [];
    for (const icon of ICONS) {
      if (!seen.has(icon.category)) {
        seen.add(icon.category);
        order.push(icon.category);
      }
    }
    return order;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ICONS.filter((icon) => {
      if (activeCategory !== ALL && icon.category !== activeCategory) return false;
      if (!q) return true;
      return (
        icon.label.toLowerCase().includes(q) ||
        icon.name.toLowerCase().includes(q) ||
        icon.value.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const icon of filtered) {
      if (!map.has(icon.category)) map.set(icon.category, []);
      map.get(icon.category).push(icon);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="wb-page">
      <div className="wb-page__header">
        <div className="wb-page__eyebrow">Foundations</div>
        <h1 className="wb-page__title">Icons</h1>
        <p className="wb-page__subtitle">
          {ICONS.length} inline SVG icons defined in{' '}
          <code className="wb-inline-code">tokens/tokens.json</code>. Normalized to a 16x16 viewBox,
          rendered with <code className="wb-inline-code">currentColor</code>. Click any tile to copy
          its JSX tag.
        </p>
      </div>

      <div className="wb-icons__toolbar">
        <input
          type="search"
          className="wb-icons__search"
          placeholder={`Search ${ICONS.length} icons…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="wb-icons__toggle" role="group" aria-label="Icon preview size">
          <span className="wb-icons__toggle-label">Size</span>
          {SIZE_OPTIONS.map((value) => (
            <button
              key={value}
              type="button"
              className={`wb-icons__toggle-btn ${size === value ? 'is-active' : ''}`}
              aria-pressed={size === value}
              onClick={() => setSize(value)}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="wb-icons__toggle" role="group" aria-label="Stroke width">
          <span className="wb-icons__toggle-label">Stroke</span>
          {STROKE_OPTIONS.map((value) => (
            <button
              key={value}
              type="button"
              className={`wb-icons__toggle-btn ${stroke === value ? 'is-active' : ''}`}
              aria-pressed={stroke === value}
              onClick={() => setStroke(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="wb-icons__chips" role="tablist" aria-label="Filter by category">
        <button
          type="button"
          className={`wb-icons__chip ${activeCategory === ALL ? 'is-active' : ''}`}
          aria-pressed={activeCategory === ALL}
          onClick={() => setActiveCategory(ALL)}
        >
          All
          <span className="wb-icons__chip-count">{ICONS.length}</span>
        </button>
        {categories.map((category) => {
          const count = ICONS.filter((i) => i.category === category).length;
          const active = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              className={`wb-icons__chip ${active ? 'is-active' : ''}`}
              aria-pressed={active}
              onClick={() => setActiveCategory(active ? ALL : category)}
            >
              {category}
              <span className="wb-icons__chip-count">{count}</span>
            </button>
          );
        })}
      </div>

      {grouped.length === 0 && (
        <div className="wb-icons__empty">No icons match “{query}”.</div>
      )}

      {grouped.map(([category, icons]) => (
        <section key={category} className="wb-icons__group">
          <header className="wb-icons__group-head">
            <h2 className="wb-icons__group-title">{category}</h2>
            <span className="wb-icons__group-count">{icons.length}</span>
          </header>
          <div className="wb-icons__grid">
            {icons.map((icon) => (
              <IconCard key={icon.value} icon={icon} size={size} stroke={stroke} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function IconCard({ icon, size, stroke }) {
  const [copied, setCopied] = useState(false);
  const Component = icon.Component;

  const handleCopy = () => {
    navigator.clipboard.writeText(`<${icon.name} />`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };

  return (
    <button
      type="button"
      className={`wb-icon-tile ${copied ? 'is-copied' : ''}`}
      onClick={handleCopy}
      title={`<${icon.name} />`}
      aria-label={`Copy ${icon.name}`}
    >
      <div className="wb-icon-tile__preview">
        <Component width={size} height={size} strokeWidth={stroke} />
      </div>
      <div className="wb-icon-tile__name">{icon.value}</div>
      <div className={`wb-icon-tile__flash ${copied ? 'is-on' : ''}`} aria-hidden="true">
        Copied
      </div>
    </button>
  );
}
