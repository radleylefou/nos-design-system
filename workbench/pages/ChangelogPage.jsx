import { useState } from 'react';
import { RELEASES, TAG_COLORS, ENTRY_TYPE_META } from '../changelog.js';
import './ChangelogPage.css';

const ALL = '__all__';

/**
 * ChangelogPage — version history for the NOS design system.
 * Data lives in workbench/changelog.js.
 */
export function ChangelogPage() {
  const [activeType, setActiveType] = useState(ALL);

  const types = ['new', 'changed', 'fixed', 'removed'];

  const filtered = RELEASES.map((release) => ({
    ...release,
    entries: activeType === ALL
      ? release.entries
      : release.entries.filter((e) => e.type === activeType),
  })).filter((release) => release.entries.length > 0);

  return (
    <div className="wb-page wb-changelog">
      <div className="wb-page__header">
        <div className="wb-page__eyebrow">NOS Design System</div>
        <h1 className="wb-page__title">Changelog</h1>
        <p className="wb-page__subtitle">
          A running record of additions, changes, and fixes across every
          release. Edit <code className="wb-inline-code">workbench/changelog.js</code> to add new entries.
        </p>
      </div>

      <div className="wb-changelog__filters" role="group" aria-label="Filter by change type">
        <button
          type="button"
          className={`wb-changelog__filter ${activeType === ALL ? 'is-active' : ''}`}
          onClick={() => setActiveType(ALL)}
        >
          All
        </button>
        {types.map((type) => {
          const meta = ENTRY_TYPE_META[type];
          const active = activeType === type;
          return (
            <button
              key={type}
              type="button"
              className={`wb-changelog__filter ${active ? 'is-active' : ''}`}
              style={active ? { '--_accent': meta.color } : {}}
              onClick={() => setActiveType(active ? ALL : type)}
            >
              <span className="wb-changelog__filter-dot" style={{ background: meta.color }} />
              {meta.label}
            </button>
          );
        })}
      </div>

      <div className="wb-changelog__feed">
        {filtered.map((release) => (
          <Release key={release.version} release={release} />
        ))}

        {filtered.length === 0 && (
          <div className="wb-changelog__empty">
            No {ENTRY_TYPE_META[activeType]?.label.toLowerCase()} entries recorded yet.
          </div>
        )}
      </div>
    </div>
  );
}

function Release({ release }) {
  return (
    <div className="wb-release">
      <div className="wb-release__header">
        <div className="wb-release__meta">
          <span className="wb-release__version">v{release.version}</span>
          <time className="wb-release__date" dateTime={release.date}>
            {formatDate(release.date)}
          </time>
        </div>
        {release.summary && (
          <p className="wb-release__summary">{release.summary}</p>
        )}
      </div>

      <ul className="wb-release__entries" role="list">
        {release.entries.map((entry, i) => (
          <Entry key={i} entry={entry} />
        ))}
      </ul>
    </div>
  );
}

function Entry({ entry }) {
  const meta = ENTRY_TYPE_META[entry.type] || ENTRY_TYPE_META.changed;

  return (
    <li className="wb-entry">
      <span
        className="wb-entry__type"
        style={{ color: meta.color }}
        title={meta.label}
      >
        {meta.label}
      </span>
      <span className="wb-entry__text">{entry.text}</span>
      {entry.tags && entry.tags.length > 0 && (
        <span className="wb-entry__tags">
          {entry.tags.map((tag) => {
            const colors = TAG_COLORS[tag] || { bg: 'var(--bg-subtle)', text: 'var(--fg-muted)' };
            return (
              <span
                key={tag}
                className="wb-entry__tag"
                style={{ background: colors.bg, color: colors.text }}
              >
                {tag}
              </span>
            );
          })}
        </span>
      )}
    </li>
  );
}

function formatDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
