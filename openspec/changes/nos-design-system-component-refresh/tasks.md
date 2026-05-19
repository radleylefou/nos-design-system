## 1. Modified Components — Button, Badge, Progress

- [ ] 1.1 Add `size="xs"` to `Button` — 26px height, 10px horizontal padding, 12px font size — and add corresponding CSS in `Button.css`
- [ ] 1.2 Add `appearance` prop (`"filled" | "subtle"`, default `"filled"`) to `Badge` — `subtle` renders tinted background + colored text, no border — and add CSS rules in `Badge.css`
- [ ] 1.3 Add `segments` prop to `ProgressBar` — when provided, render multiple `.nos-progress__fill` elements proportionally; add CSS for multi-fill track layout in `Progress.css`

## 2. Modified Components — Card, StatBlock

- [ ] 2.1 Add `title`, `titleDropdown`, and `actions` props to `Card.Header` — title renders left-aligned, actions render right-aligned as icon buttons, titleDropdown appends a chevron-down icon after the title — update `Card.css`
- [ ] 2.2 Add `layout="grid"` prop to `StatBlock` — renders items in a 2-column CSS grid, label stacked above value per cell — add CSS in `StatBlock.css`
- [ ] 2.3 Add `labelAnnotation` prop to `StatBlock` — renders a small accented span inline after the label text

## 3. Modified Component — Table

- [ ] 3.1 Add `navigable` boolean to Table column definitions — renders a chevron-right glyph after cell content when true — add CSS for `.nos-table__cell--navigable` in `Table.css`
- [ ] 3.2 Apply uppercase + `letter-spacing: var(--letter-spacing-wide)` + `font-size: var(--font-size-2xs)` to `.nos-table__cell--head` in `Table.css`

## 4. New Component — AlertItem

- [ ] 4.1 Create `components/AlertItem.jsx` — accepts `severity` (`"error" | "warning" | "caution"`), `title`, `subtitle`, optional `action` (`{ label, onClick }`) — renders left-border accent row with correct semantic color tokens
- [ ] 4.2 Create `components/AlertItem.css` — left border, tinted background, and text styles using semantic color tokens
- [ ] 4.3 Export `AlertItem` from `components/index.js`

## 5. New Component — CategoryStatCard

- [ ] 5.1 Create `components/CategoryStatCard.jsx` — accepts `category` (`"neutral" | "success" | "warning" | "info"`), `title`, `count`, `description`, `weightedStat`, `totalStat` (each `{ label, value }`) — renders tinted card with two stat rows
- [ ] 5.2 Create `components/CategoryStatCard.css` — per-category tint backgrounds using semantic color tokens, typography hierarchy
- [ ] 5.3 Export `CategoryStatCard` from `components/index.js`

## 6. New Component — SparkLine

- [ ] 6.1 Create `components/SparkLine.jsx` — accepts `data` (number[]), `width` (default 88), `height` (default 32), `color` (CSS value, default brand token) — renders inline SVG polyline with min/max normalization and flat-line guard
- [ ] 6.2 Export `SparkLine` from `components/index.js`

## 7. New Components — KanbanBoard, KanbanCard

- [ ] 7.1 Create `components/KanbanCard.jsx` — accepts `company`, `date`, `amount`, `dealType`, `assignee` (`{ name, avatarUrl? }`), optional `onOpen` — renders deal card with chevron when `onOpen` is provided
- [ ] 7.2 Create `components/KanbanCard.css` — card layout, deal-type badge (uppercase tag), assignee row styles
- [ ] 7.3 Create `components/KanbanBoard.jsx` — accepts `columns` array (`{ id, label, probability, category, cards[] }`); renders horizontally scrollable column layout; each column header shows probability pill + label + count + add button; column body renders `KanbanCard` per item
- [ ] 7.4 Create `components/KanbanBoard.css` — horizontal scroll container, fixed-width columns, column header with probability pill, category accent colors
- [ ] 7.5 Export `KanbanBoard` and `KanbanCard` from `components/index.js`

## 8. Workbench Verification

- [ ] 8.1 Verify all 10 modified/new components appear in the workbench sidebar under correct categories — run `npm run dev` and spot-check
- [ ] 8.2 Confirm no hardcoded color/spacing/radius values were introduced — grep for hex colors and px values outside of token references in all modified/new files
