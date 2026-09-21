# Implementation Workflow Rules

Project: Student Information Portal (React routing and reusable JSX lab).

## 1. Slice discipline
- Read `docs/IMPLEMENTATION_PLAN.md` before editing anything.
- Implement exactly one slice per turn, then stop and wait for approval.
- State the slice name and the exact list of files to add, change or delete before editing.
- Do not touch files outside that list during the same slice.
- Do not start the next slice until the user says to continue.
- Do not add anything the rubric does not ask for without asking first.
- Ask before running `git commit`. One commit per slice, only after approval.
- If a slice outgrows its declared file list, stop and re-plan with the user.

## 2. Code conventions
- Function components in `PascalCase.jsx`, one component per file, default export.
- Pages in `src/pages/`, shared UI in `src/components/`, plain data in `src/data/`.
- Destructured props with JSX defaults. Never use `propTypes` or `defaultProps`: React 19 ignores both.
- Always pass a stable `key` in `.map()`.
- Never export a non-component value from a component file. The eslint `react-refresh` rule rejects it.
- `NavLink` for navigation, `Link` for in-page links, semantic `nav`, `main`, `header`, `section`.
- Match the existing style: 2-space indent, single quotes, no semicolons.
- All routing lives in `src/App.jsx`. Never edit `src/main.jsx` for routing.

## 3. Definition of done for a slice
- `npm run lint` passes with no output.
- `npm run build` succeeds.
- Docs are updated inside the same slice, not in a follow-up.

## 4. Report format after every slice
Plain text headings, no emojis:

```
### Slice N - <name>
Files: added / changed / deleted
What changed and why: reasoning, not a diff dump
Verified: exact commands run and the observed result
Not verified: anything only the user can confirm visually
Docs updated: files and sections
Deviations: differences from the plan, or none
Next: next slice and anything blocked on the user
```

## 5. Doc map
- Slice status change -> `docs/IMPLEMENTATION_PLAN.md` status table.
- Completed slice -> append an entry to `docs/SLICE_LOG.md`.
- Route, prop, folder or script change -> `README.md`, in the same slice that makes the change. The
  README is declared in that slice's file list so rule 1 still holds. Slice 6 keeps the full README
  rewrite as final polish, so a slice may add to the README before that rewrite happens.
