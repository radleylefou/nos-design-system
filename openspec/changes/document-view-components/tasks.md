## 1. StatusPill

- [x] 1.1 Create `components/StatusPill.jsx` with variants: `draft`, `in-progress`, `reviewed`, `approved`, `pending`
- [x] 1.2 Create `components/StatusPill.css` using semantic color tokens for each variant
- [x] 1.3 Export `StatusPill` from `components/index.js`
- [x] 1.4 Add StatusPill demo to `workbench/demos/` and register in workbench nav

## 2. PageHeader

- [x] 2.1 Create `components/PageHeader.jsx` — title (h1), optional subtitle, optional status (StatusPill), optional meta string
- [x] 2.2 Create `components/PageHeader.css`
- [x] 2.3 Export `PageHeader` from `components/index.js`
- [x] 2.4 Add PageHeader demo to `workbench/demos/` and register in workbench nav

## 3. PageTabs

- [x] 3.1 Create `components/PageTabs.jsx` — tabs array, activeTab, onTabChange; underline active state; role="tablist"
- [x] 3.2 Implement keyboard navigation: ArrowLeft/Right, Home/End
- [x] 3.3 Create `components/PageTabs.css`
- [x] 3.4 Export `PageTabs` from `components/index.js`
- [x] 3.5 Add PageTabs demo to `workbench/demos/` and register in workbench nav

## 4. DescriptionList

- [x] 4.1 Create `components/DescriptionList.jsx` — items array of `{ label, value }`; renders as dl/dt/dd
- [x] 4.2 Create `components/DescriptionList.css` — uppercase dt labels, muted semibold; dd body text
- [x] 4.3 Export `DescriptionList` from `components/index.js`
- [x] 4.4 Add DescriptionList demo to `workbench/demos/` and register in workbench nav

## 5. SectionHeader

- [x] 5.1 Create `components/SectionHeader.jsx` — icon slot, title (h2/h3 via level prop), optional status (StatusPill), optional onEdit
- [x] 5.2 Create `components/SectionHeader.css` — flex row, space-between
- [x] 5.3 Export `SectionHeader` from `components/index.js`
- [x] 5.4 Add SectionHeader demo to `workbench/demos/` and register in workbench nav

## 6. DocumentSection

- [x] 6.1 Create `components/DocumentSection.jsx` — header prop slot, children body, footer prop slot with divider
- [x] 6.2 Create `components/DocumentSection.css` — card surface: border, radius-lg, shadow-xs, padding
- [x] 6.3 Export `DocumentSection` from `components/index.js`
- [x] 6.4 Add DocumentSection demo combining SectionHeader + DescriptionList + Button footer to `workbench/demos/` and register in workbench nav

## 7. AssistBar

- [x] 7.1 Create `components/AssistBar.jsx` — optional label prop, actions array of `{ label, onClick }`, ghost-link style
- [x] 7.2 Create `components/AssistBar.css` — muted color, small text, horizontal flex
- [x] 7.3 Export `AssistBar` from `components/index.js`
- [x] 7.4 Add AssistBar demo to `workbench/demos/` and register in workbench nav
