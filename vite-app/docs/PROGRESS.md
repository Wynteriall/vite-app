# Progress Tracker

The only doc written per slice. Fill the slice's row in when the slice is reported, then add the commit
hash once the commit lands. Reasoning, commands and command output belong in the slice report, not here.

Status values: Not started / In progress / Reported, awaiting commit / Done / Deferred.

| Slice | Name | Status | Commit | Files touched |
| --- | --- | --- | --- | --- |
| 0 | Docs and cline rules | Done | `87db04c` | 3 |
| 1 | Folders, routing skeleton, Navbar | Done | `1af3224` | 9 |
| 2 | Students page and StudentCard | Done | `cfef8df` | 5 |
| 3 | Courses page and CourseCard | Done | `cc2bcf4` | 14 |
| 4 | Home and About content | Done | `9f69976` | 5 |
| 5A | Visual redesign: design system | Done | `524d722` | 7 |
| 5B | Visual redesign: cards and page compositions | Reported, awaiting commit | - | 11 |
| 6 | Cleanup and final verification | Not started | - | - |
| 7 | Route smoke test (optional) | Deferred | - | - |

Files touched is the count reported for the slice at the time, docs included where the slice touched docs.

## Next slice

Slice 6, cleanup and final verification.

- Change `src/App.jsx` and `docs/PROGRESS.md`. Add `src/pages/NotFound.jsx` only if the catch-all route is
  approved, and update `README.md` in the same slice either way, because the route table changes with it.
- No deletions.
- Exit criteria: `npm run lint` clean, `npm run build` green, README read-through against the code, and
  the `NotFound` catch-all decided. `vite preview` answers 200 for `/nope`, so an unmatched URL renders
  the navbar and an empty `main` today; this is the last item the plan still calls open.

## Open items

- Slice 5A About list defect, found in the user browser check and fixed inside the same slice. `.page__list li`
  was a grid container, which blockifies its inline children, so each item of the section headed "What you can
  do here" became three boxes and the description text was placed in the 40px counter column. `src/index.css`
  now uses block flow with the counter as an inline-block in a left gutter, and the `72ch` cap on the list was
  dropped. No file outside the 5A list was touched. The About page, which 5B only gave a kicker, still
  needs that visual check, and no part of 5A or 5B has been seen in a browser since.
- Slice 5B opened two files the slice description did not list, both spelling corrections rather than new
  scope. `src/index.css` had to be opened because the alias and token deletion that the same description
  assigns to the slice can only happen in the file that declares them, and the ruled card dropped its
  surface fill, which retired `--surface` in the same edit; the tracker row therefore reads 11 files.
  `docs/IMPLEMENTATION_PLAN.md` was also corrected, because the `Card` contract changed and that file is
  the reference for it. Every other file in the 5B list matched the description.
- Catch-all `NotFound` route: open, scheduled for Slice 6. `vite preview` answers 200 for `/nope`, so an
  unmatched URL currently renders the navbar and an empty `main` with no message.
- Slice 6 exit criteria: lint clean, build green, README read-through, `NotFound` decided either way.
- Slice 7 route smoke test: skipped unless a rubric mark depends on tests.
