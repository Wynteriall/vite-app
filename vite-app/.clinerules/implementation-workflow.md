# Implementation Workflow Rules

Project: Student Information Portal (React routing and reusable JSX lab).

## 1. Slice discipline
- Read `docs/PROGRESS.md` and `docs/IMPLEMENTATION_PLAN.md` before editing anything.
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
- The slice's row in `docs/PROGRESS.md` is filled in, and the next slice's file list is updated if the
  next slice changed. No other doc is required inside a slice.

## 4. Report format after every slice
Plain text headings, no emojis:

```
### Slice N - <name>
Files: added / changed / deleted
What changed and why: reasoning, not a diff dump
Verified: exact commands run and the observed result
Not verified: anything only the user can confirm visually
Tracker: row updated in docs/PROGRESS.md
Deviations: differences from the plan, or none
Next: next slice and anything blocked on the user
```

## 5. Doc map

One mutable doc, two reference files. Do not grow this list.

- `docs/PROGRESS.md` is the progress tracker and the only doc written per slice: one row per slice, the
  declared file list for the next slice, and the open items. The commit hash is added after the commit.
- `docs/IMPLEMENTATION_PLAN.md` is reference material: rubric map, routes, component contracts, the
  constraints that still shape the code, verification and change control. Edit it only when one of those
  facts is wrong or actually changes, never for status.

  Status tables, historical decision rows and per-slice file lists were removed from the plan, and
  `docs/SLICE_LOG.md` was deleted, because both duplicated the tracker and the tracker was the only part
  that was ever read. Slice history is `git log`; slice reasoning is the slice report in the chat.
- `README.md` is the submission's front page. Update it in the same slice only when that slice changes a
  route, a prop, the folder layout or a script, so it never contradicts the code. Otherwise leave it alone.
