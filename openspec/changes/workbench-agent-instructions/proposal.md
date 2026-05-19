## Why

The NOS workbench is intended to be usable by AppGen tools as both a hosted design-system reference and a source-code reference, but there is no single entry point that tells agents how to orient themselves. Users need a copyable starter prompt, clear source-of-truth files, and a high-level design brief that is separate from implementation rules.

## What Changes

- Add a top-level `Instructions` area to the workbench before `Components`
- Create a repo-level `DESIGN.md` that distills NOS design direction for agents
- Add a one-page Instructions view with a copyable AppGen starter prompt
- Expose the core reference files for agents: `DESIGN.md`, `rules/rules.md`, `AGENTS.md`, `CLAUDE.md`, `tokens/tokens.json`, `tokens/base.css`, and `components/index.js`
- Add quick navigation from Instructions to Components, Tokens, Icons, Page Examples, and Playground

## Impact

- `DESIGN.md` - new public design brief
- `workbench/App.jsx` - renders the Instructions page
- `workbench/Sidebar.jsx` - adds Instructions as a top-level item
- `workbench/pages/InstructionsPage.jsx` and CSS - new one-page instructions experience
