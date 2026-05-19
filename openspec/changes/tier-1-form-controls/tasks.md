## 1. Reset rejected ports

- [x] 1.1 Delete ported Button, Input, Select, Textarea, Checkbox jsx + css
- [x] 1.2 Delete Combobox, RadioGroup, Switch jsx + css (defer to tier 2)
- [x] 1.3 Delete the existing SegmentedControl jsx + css (rebuilding from scratch)

## 2. Build Tier 1 from scratch

- [x] 2.1 Rebuild Button (.jsx + .css) — variants: primary, secondary, ghost, soft, link; sizes: sm, md; leadingIcon/trailingIcon, loading, disabled
- [x] 2.2 Rebuild Input (.jsx + .css) — label, helperText, error, leadingIcon/trailingIcon, sizes sm/md, disabled
- [x] 2.3 Rebuild Textarea (.jsx + .css) — same chrome as Input, resize prop, rows
- [x] 2.4 Rebuild Select (.jsx + .css) — native select wrapped in same field chrome
- [x] 2.5 Rebuild Checkbox (.jsx + .css) — label, helperText, error, disabled
- [x] 2.6 Rebuild SegmentedControl (.jsx + .css) — brand-50 outer container, transparent inactive pills with optional icon, active pill with brand-500 text + check icon, sm/md

## 3. Register and wire

- [x] 3.1 Update components/index.js — export the 6 components, remove Combobox/RadioGroup/Switch
- [x] 3.2 Update workbench/nav.js — trim "Form Controls" to the 6 grounded components
- [x] 3.3 Rewrite workbench/demos/index.jsx entries to match the new component APIs

## 4. Verification

- [x] 4.1 All 6 components visible in workbench under correct categories
- [x] 4.2 No console errors on any demo page
- [x] 4.3 Visual check against Figma frames (Time Entry modal, dashboard header buttons, View All)
