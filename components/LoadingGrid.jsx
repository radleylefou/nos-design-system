import './LoadingGrid.css';

const PATTERNS = ['scatter', 'wave', 'ripple', 'scan'];
const GRID_SIZES = [4, 5, 6];
const SPEEDS = ['slow', 'normal', 'fast'];
const DENSITIES = ['sparse', 'balanced', 'dense'];
const ACCENT_RATIOS = ['low', 'medium', 'high'];
const CELL_SIZES = ['sm', 'md', 'lg'];
const GAPS = ['xs', 'sm', 'md'];
const VARIANTS = ['light', 'inverse'];

const DENSITY_THRESHOLD = {
  sparse: 40,
  balanced: 60,
  dense: 80,
};

const ACCENT_THRESHOLD = {
  low: 14,
  medium: 26,
  high: 38,
};

/**
 * LoadingGrid — deterministic pixel-grid loading animation.
 *
 * Props:
 *   pattern:     "scatter" | "wave" | "ripple" | "scan"       (default: "scatter")
 *   gridSize:    4 | 5 | 6                                      (default: 5)
 *   speed:       "slow" | "normal" | "fast"                    (default: "normal")
 *   density:     "sparse" | "balanced" | "dense"               (default: "balanced")
 *   accentRatio: "low" | "medium" | "high"                     (default: "medium")
 *   cellSize:    "sm" | "md" | "lg"                            (default: "md")
 *   gap:         "xs" | "sm" | "md"                            (default: "sm")
 *   variant:     "light" | "inverse"                           (default: "light")
 *   paused:      boolean
 *   decorative:  boolean — hides the loader from assistive tech when true
 *   label:       accessible loading label                       (default: "Loading")
 *   as:          HTML tag to render for the shell                (default: "div")
 *
 * Usage:
 *   <LoadingGrid pattern="wave" gridSize={5} label="Loading guidance" />
 *   <LoadingGrid pattern="scan" variant="inverse" decorative />
 */
export function LoadingGrid({
  pattern = 'scatter',
  gridSize = 5,
  speed = 'normal',
  density = 'balanced',
  accentRatio = 'medium',
  cellSize = 'md',
  gap = 'sm',
  variant = 'light',
  paused = false,
  decorative = false,
  label = 'Loading',
  as: Tag = 'div',
  className = '',
  style,
  role,
  'aria-label': ariaLabel,
  ...rest
}) {
  const safePattern = optionOrDefault(pattern, PATTERNS, 'scatter');
  const safeGridSize = numberOptionOrDefault(gridSize, GRID_SIZES, 5);
  const safeSpeed = optionOrDefault(speed, SPEEDS, 'normal');
  const safeDensity = optionOrDefault(density, DENSITIES, 'balanced');
  const safeAccentRatio = optionOrDefault(accentRatio, ACCENT_RATIOS, 'medium');
  const safeCellSize = optionOrDefault(cellSize, CELL_SIZES, 'md');
  const safeGap = optionOrDefault(gap, GAPS, 'sm');
  const safeVariant = optionOrDefault(variant, VARIANTS, 'light');

  const classes = [
    'nos-loading-grid',
    `nos-loading-grid--${safePattern}`,
    `nos-loading-grid--speed-${safeSpeed}`,
    `nos-loading-grid--density-${safeDensity}`,
    `nos-loading-grid--accent-${safeAccentRatio}`,
    `nos-loading-grid--cell-${safeCellSize}`,
    `nos-loading-grid--gap-${safeGap}`,
    `nos-loading-grid--${safeVariant}`,
    paused ? 'nos-loading-grid--paused' : '',
    className,
  ].filter(Boolean).join(' ');

  const cells = createCells({
    pattern: safePattern,
    gridSize: safeGridSize,
    density: safeDensity,
    accentRatio: safeAccentRatio,
  });

  const accessibilityProps = decorative
    ? { 'aria-hidden': true }
    : { role: role || 'status', 'aria-label': ariaLabel || label };

  return (
    <Tag
      className={classes}
      style={{ ...style, '--nos-loading-grid-count': safeGridSize }}
      {...accessibilityProps}
      {...rest}
    >
      {cells.map((cell) => (
        <span
          key={cell.key}
          className={cell.className}
          aria-hidden="true"
        />
      ))}
    </Tag>
  );
}

function createCells({ pattern, gridSize, density, accentRatio }) {
  const threshold = DENSITY_THRESHOLD[density];
  const accentThreshold = ACCENT_THRESHOLD[accentRatio];
  const center = (gridSize - 1) / 2;

  return Array.from({ length: gridSize * gridSize }, (_, index) => {
    const row = Math.floor(index / gridSize);
    const column = index % gridSize;
    const hash = hashCell(row, column, gridSize);
    const active = hash < threshold;
    const accent = active && ((hash + index * 11) % 100) < accentThreshold;
    const phase = getPhase(pattern, row, column, center, hash);

    return {
      key: `${row}-${column}`,
      className: [
        'nos-loading-grid__cell',
        active ? 'nos-loading-grid__cell--active' : '',
        accent ? 'nos-loading-grid__cell--accent' : '',
        `nos-loading-grid__cell--phase-${phase}`,
      ].filter(Boolean).join(' '),
    };
  });
}

function getPhase(pattern, row, column, center, hash) {
  if (pattern === 'wave') {
    return (row + column) % 8;
  }

  if (pattern === 'ripple') {
    const distance = Math.abs(row - center) + Math.abs(column - center);
    return Math.round(distance * 2) % 8;
  }

  if (pattern === 'scan') {
    return (column + row * 2) % 8;
  }

  return hash % 8;
}

function hashCell(row, column, gridSize) {
  return (row * 37 + column * 53 + gridSize * 19 + row * column * 11) % 100;
}

function optionOrDefault(value, options, defaultValue) {
  return options.includes(value) ? value : defaultValue;
}

function numberOptionOrDefault(value, options, defaultValue) {
  const numericValue = Number(value);
  return options.includes(numericValue) ? numericValue : defaultValue;
}
