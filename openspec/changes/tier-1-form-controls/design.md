## Context

Button, Input, Select, Combobox, Textarea, Checkbox, RadioGroup, Switch all have complete, token-compliant implementations on the main branch. SegmentedControl does not exist anywhere and must be designed and built. The workbench needs demo entries for each so they appear in the component browser.

## Goals / Non-Goals

**Goals:**
- All 9 components available in components/ with correct CSS token usage
- Each has a workbench demo (preview + detail variants)
- Two new nav categories: Actions, Form Controls

**Non-Goals:**
- Rewriting component APIs from main
- Adding full behavioral specs (JSDoc is sufficient)
- NumberInput (deferred — only needed for time entry)

## Decisions

**Port from main, don't rewrite.** The main branch APIs are stable and token-compliant. Copy, verify token usage, register, demo.

**SegmentedControl design.** Single-select pill group, controlled via value/onChange. Props: options (array of {label, value, disabled?}), value, onChange, size (sm/md/lg), disabled. Renders as a bordered container of pill buttons, one active at a time. Visually distinct from RadioGroup (horizontal pills, no radio circles).

**Nav categories:**
- Actions: Button
- Form Controls: Input, Select, Combobox, Textarea, Checkbox, RadioGroup, Switch, SegmentedControl

## Risks / Trade-offs

- Combobox uses local state + popover — verify no z-index conflicts with workbench chrome
- CSS from main may reference tokens not yet in tokens.css — audit and add any missing tokens before porting
