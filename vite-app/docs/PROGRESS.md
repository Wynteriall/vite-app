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
| 5A | Visual redesign: design system | Reported, awaiting commit | - | 7 |
| 5B | Visual redesign: cards and page compositions | Not started | - | - |
| 6 | Cleanup and final verification | Not started | - | - |
| 7 | Route smoke test (optional) | Deferred | - | - |

Files touched is the count reported for the slice at the time, docs included where the slice touched docs.

## Next slice

Slice 5B, cards and page compositions.

- Change `src/components/Card.jsx`, `src/components/Card.css`, `src/components/StudentCard.jsx`,
  `src/components/CourseCard.jsx`, `src/pages/Home.jsx`, `src/pages/Students.jsx`, `src/pages/Courses.jsx`,
  `src/pages/About.jsx`, `README.md`.
- No additions, no deletions. `src/index.css` is deliberately absent, because every shell class the cards
  and pages need landed in 5A.
- Exit criteria: `Card` gains one focal figure, ruled rows replace the floating box, every page gets a
  composition of its own, and no indigo or pill class survives anywhere.
- The `--bg`, `--text`, `--text-h` and `--border` aliases and the `--shadow` token are deleted here, with
  their last usage in `Card.css`.

## Open items

- Slice 5A is reported but not committed: its seven changed files are still in the working tree.
- Slice 5A About list defect, found in the user browser check and fixed inside the same slice. `.page__list li`
  was a grid container, which blockifies its inline children, so each item of the section headed "What you can
  do here" became three boxes and the description text was placed in the 40px counter column. `src/index.css`
  now uses block flow with the counter as an inline-block in a left gutter, and the `72ch` cap on the list was
  dropped. No file outside the 5A list was touched. The About page needs one more visual check.
- Catch-all `NotFound` route: open, scheduled for Slice 6. `vite preview` answers 200 for `/nope`, so an
  unmatched URL currently renders the navbar and an empty `main` with no message.
- Slice 6 exit criteria: lint clean, build green, README read-through, `NotFound` decided either way.
- Slice 7 route smoke test: skipped unless a rubric mark depends on tests.
