// Workbench icon set, sourced from tokens/tokens.json.
//
// Icons live as path data in tokens.json under the `icon.*` group. Each token
// is a list of SVG path "d" strings rendered into a normalized 16x16 viewBox
// with currentColor stroke. This file turns those tokens into a catalog of
// React components used by IconsPage and other workbench previews.
//
// NOS apps in production are expected to bring their own icon library — these
// are intentionally minimal references, not a runtime export.

import tokens from '../tokens/tokens.json';

const GROUP = tokens.icon;
const DEFAULT_VIEWBOX = GROUP.$viewBox || '0 0 16 16';
const DEFAULT_STROKE_WIDTH = GROUP.$strokeWidth ?? 1.5;

// Convert "chevron-up" → "ChevronUp", then prefix with "Icon".
const componentName = (key) =>
  'Icon' +
  key
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const makeIcon = (paths) => {
  const Component = (props) => (
    <svg
      viewBox={DEFAULT_VIEWBOX}
      fill="none"
      stroke="currentColor"
      strokeWidth={DEFAULT_STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
  return Component;
};

// Walk the icon group and produce a flat catalog.
//   value     — internal id used in playground state (e.g. "arrow-right")
//   name      — JSX component name written into generated code (e.g. "IconArrowRight")
//   label     — human display label
//   category  — gallery grouping
//   paths     — raw path-data array, exposed for power use
//   Component — React component
function buildCatalog() {
  const catalog = [];
  for (const [, sub] of Object.entries(GROUP)) {
    if (!sub || typeof sub !== 'object' || Array.isArray(sub)) continue;
    for (const [key, token] of Object.entries(sub)) {
      if (key.startsWith('$')) continue;
      if (!token || token.$type !== 'icon') continue;
      const paths = Array.isArray(token.$value) ? token.$value : [token.$value];
      catalog.push({
        value: key,
        name: componentName(key),
        label: token.$label || key,
        category: token.$category || 'Other',
        paths,
        Component: makeIcon(paths),
      });
    }
  }
  return catalog;
}

export const ICONS = buildCatalog();

const BY_VALUE = new Map(ICONS.map((icon) => [icon.value, icon]));

export function getIcon(value) {
  return BY_VALUE.get(value);
}

export function getIconNode(value) {
  if (!value || value === 'none') return undefined;
  const entry = BY_VALUE.get(value);
  return entry ? <entry.Component /> : undefined;
}

export function getIconJsxName(value) {
  const entry = BY_VALUE.get(value);
  return entry ? entry.name : undefined;
}
