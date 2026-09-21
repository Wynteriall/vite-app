# Slice Log

Append-only. One entry per completed slice, newest last. Keep the status table in sync with `IMPLEMENTATION_PLAN.md`.

| Slice | Name | Status | Files touched |
| --- | --- | --- | --- |
| 0 | Docs and cline rules | Done | 3 |
| 1 | Folders, routing skeleton, Navbar | Done | 9 |
| 2 | Students page and StudentCard | Done | 5 |
| 3 | Courses page and CourseCard | Done | 14 |
| 4 | Home and About content | Done | 5 |
| 5 | Styling and responsive pass | Not started | - |
| 6 | Cleanup, docs, final verification | Not started | - |
| 7 | Route smoke test (optional, deferred) | Deferred | - |

---

## Slice 0 - Docs and cline rules

Date: 2026-09-21
Status: done

Commit: 87db04c

Files added:
- `.clinerules/implementation-workflow.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/SLICE_LOG.md`

What changed and why:
- Added the implementation plan so every later slice has a written scope, exit criteria and
  rubric traceability, instead of work being driven by chat memory.
- Added the slice log so each completed slice leaves a persistent record of what changed and why.
- Added one compact Cline rules file. The original plan called for three rule files (workflow,
  conventions, reporting). They were merged into one because the user asked to keep the rule set
  minimal and avoid context clutter. Workflow, conventions, definition of done, report format and
  the doc map now live in a single file with five short sections.
- No file under `src/` was created, modified or deleted in this slice.

What was recorded during planning (verified, not assumed):
- Tailwind 4.3.3 is installed and `@tailwindcss/vite` is registered, but `@import "tailwindcss";`
  is missing from `src/index.css`, so no Tailwind utility currently applies.
- `src/index.css` contains unlayered rules (`h1`, `#root`, `p`, `code`) that would override
  Tailwind utilities, which live in `@layer utilities`.
- `react-router-dom` 7.18.4 is installed but has never been imported.
- React is 19.3.0, React Compiler is enabled, and `propTypes`/`defaultProps` are inert under the
  automatic JSX runtime.
- `npm run lint` passes clean before any of our work starts.

Verified:
- `Test-Path` checks, `npm ls`, runtime `import()` probes of `react-router-dom` and `react-dom/server`.
- `node .\node_modules\eslint\bin\eslint.js .` returned no findings.
- `git status` after this slice showed only docs and rules files, no `src/` changes.

Decisions deferred:
- Styling approach (plain CSS vs CSS Modules vs Tailwind vs hybrid) is deferred to Slice 1 by user
  choice. See the Decisions Pending section of `IMPLEMENTATION_PLAN.md`.

Next: Slice 1, blocked on the styling decision and the router choice.

## Slice 1 - Folders, routing skeleton, Navbar

Date: 2026-09-21
Status: done

Commit: 1af3224

Files added (6):
- `src/components/Navbar.jsx`
- `src/components/Navbar.css`
- `src/pages/Home.jsx`
- `src/pages/Students.jsx`
- `src/pages/Courses.jsx`
- `src/pages/About.jsx`

Files changed (2):
- `src/App.jsx`
- `src/index.css`

Files deleted (1):
- `src/App.css`

What changed and why:
- Routing now lives in exactly one place. `src/App.jsx` renders `BrowserRouter`, then `Navbar`, then a
  `main` with class `page` wrapping `Routes` with four routes: `/`, `/students`, `/courses`, `/about`.
  The navbar sits outside `Routes` so it stays mounted while pages swap, which is what makes
  navigation client side instead of a full page reload.
- `Navbar.jsx` is reusable and data driven: a module-private `navLinks` array is mapped into `NavLink`s.
  `NavLink` supplies `isActive`, and the className callback turns that into `navbar__link--active`, so
  the current page is highlighted with no extra state. The array is deliberately not exported because
  the eslint react-refresh rule forbids exporting a non-component from a component file.
- Home is the only link given `end`, so it is marked current only on the index route. `NavLink`
  prefix-matches by default, which would otherwise mark Home current on every route.
- `src/index.css` was rewritten. The Vite landing page tokens, the `#root` centring and border, and the
  `code`/`.counter` rules were removed because they describe the template demo rather than a portal,
  and because `#root` centring and `border-inline` fight a full width sticky header. They were replaced
  with design tokens (`--surface`, `--border`, `--accent`, `--accent-text`, `--accent-soft`, `--radius`,
  `--shadow`), a light/dark token pair, base typography and a `.page` content container.
- `--accent` (filled backgrounds, white text) is kept separate from `--accent-text` (links) so the dark
  theme can use a lighter indigo for readable link text without washing out the active nav pill.
- `src/App.css` was deleted. It styled only the deleted landing page and nothing referenced it after the
  App rewrite.
- Pages are deliberate placeholders in this slice so routing could be verified before any card or data
  work exists. Cards arrive in Slices 2 and 3, real page content in Slice 4.

Verified:
- `node .\node_modules\eslint\bin\eslint.js .` -> exit code 0, no output.
- `node .\node_modules\vite\bin\vite.js build` -> 32 modules transformed, built in 361ms,
  `dist/index.html` 0.45 kB, `dist/assets/index-_H6rE_kq.css` 2.27 kB, `dist/assets/index-jDWQju6U.js` 261.69 kB.
- Built bundle inspected directly: it contains `/students`, `/courses`, `/about`, the Home heading text,
  the Students placeholder copy and the navbar `Main navigation` label.
- Dev server on port 5199: `/`, `/students`, `/courses`, `/about` each returned HTTP 200 containing the
  `#root` mount point, which confirms the dev server SPA fallback for deep links. Server was stopped and
  the port confirmed free afterwards.
- `git status --porcelain` matched the declared file list exactly: one deletion, two modifications, two
  new folders. No stray files.
- All eight added or changed files checked for non-ASCII characters: zero in each.

Not verified:
- Visual layout, the active nav highlight and the 640px responsive reflow were not confirmed in a browser.
- Client side navigation (clicking a link without a page reload) was not observed. Only direct URL
  requests and bundle contents were checked.

Deviations:
- `$home` collided with PowerShell's read-only `$HOME` automatic variable on the first write attempt, so
  `Home.jsx` and `Students.jsx` were written in a second pass using `$homePage` and `$studentsPage`. No
  impact on the result; recorded because the plan assumed a single write pass.
- The docs updated here, `docs/IMPLEMENTATION_PLAN.md` and `docs/SLICE_LOG.md`, were not in Slice 1's
  declared source file list. Rule 3 requires docs inside the slice and rule 5 requires the status and log
  update, so they were treated as mandatory slice bookkeeping rather than as scope creep. `README.md` was
  left untouched: rule 5 maps route changes to the README, but the plan schedules the README rewrite for
  Slice 6 and the file is still the untouched Vite template. This is a real contradiction between rule 1
  and rule 5 that needs a decision.

Next: Slice 2 (`src/data/students.js`, `src/components/StudentCard.jsx`, `src/components/StudentCard.css`,
`src/pages/Students.jsx`, `src/pages/Students.css`). Blocked on the rules contradiction above and on
confirmation of the router choice.

## Slice 2 - Students page and StudentCard

Date: 2026-09-21
Status: done

Commit: cfef8df

Files added (4):
- `src/data/students.js`
- `src/components/StudentCard.jsx`
- `src/components/StudentCard.css`
- `src/pages/Students.css`

Files changed (5):
- `src/pages/Students.jsx`
- `README.md`
- `.clinerules/implementation-workflow.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/SLICE_LOG.md`

What changed and why:
- `src/data/students.js` holds four records as plain data. They cannot live inside the page: the
  eslint react-refresh rule rejects a file that exports a component and also exports plain data, and
  the Home preview in Slice 4 will read the same records.
- `StudentCard` renders one record as an `article` with a `dl` of label and value pairs, so the
  fields read as data rather than as loose paragraphs and a screen reader announces each label with
  its value. Every prop is destructured with a JSX default instead of `propTypes` or `defaultProps`,
  both of which React 19 ignores. `gpa` prints through `Number(gpa).toFixed(2)` so a whole number
  GPA still reads `2.00`.
- `Students.jsx` maps the records once as `<StudentCard key={student.id} {...student} />`. The key is
  the record id, and spreading means a new field is added to the data file only, never to the page.
- `Students.css` owns one `.students-grid` rule built on `auto-fill` with a 280px minimum, so the
  list reflows to a single column on narrow screens with no media query. A comment in the file notes
  that Slice 5 should lift the rule into a shared grid once Home and Courses need the same layout.
- `StudentCard.css` styles the card from the tokens already in `index.css` (`--surface`, `--border`,
  `--radius`, `--shadow`, `--accent`) instead of hard-coded colours, stacks the label above the value
  under 640px, and gives the mailto link the same `:focus-visible` outline as the navbar links.
- `.clinerules` rule 5 was amended as agreed: README changes now land in the same slice as the route,
  prop, folder or script change and are declared in that slice's file list, so rule 1 still holds.
  This resolves the rule 1 versus rule 5 contradiction that the Slice 1 log flagged.
- `README.md` was still the stock Vite template even though the repo link is the submission, so it
  now documents the routes, scripts, folder layout, `StudentCard` props and the registered tooling.
  It also states the honest limitation: the SPA fallback exists under `npm run dev` and
  `npm run preview`, so a deep link works locally but would not from `file://` or from a static host
  with no rewrite rule.

Verified:
- `node .\node_modules\eslint\bin\eslint.js .` -> exit code 0, no output.
- `node .\node_modules\vite\bin\vite.js build` -> 36 modules transformed (up from 32), built in
  400ms, `dist/assets/index-CtheKzQb.css` 3.26 kB, `dist/assets/index-CKYk6Ofn.js` 264.49 kB.
- Built bundle inspected directly: the JS chunk contains all four student names, plus
  `josefina.ramos@example.edu` and `BS Information Systems`, so the data module is genuinely reachable
  from the page. The CSS chunk contains `.student-card`, `.students-grid`, `.student-card__row` and
  `.student-card__id`, so the new rules survived the build.
- `vite preview --port 5211 --strictPort` returned HTTP 200 for `/`, `/students`, `/courses`, `/about`
  and `/nope`. This is the first check in the project against the production build rather than the dev
  server, and it confirms the SPA fallback claim now written into the README. The server was stopped
  and the port confirmed free.
- The four new files, the changed `Students.jsx` and the new `README.md` contain zero non-ASCII bytes,
  and the README has no carriage returns.
- The four docs files touched here had a trailing newline added, which the plan and slice log had been
  missing since Slice 0, so future diffs stop reporting "No newline at end of file".
- `git status --porcelain` matched the declared file list exactly.

Not verified:
- No rendered card was ever seen in a browser. Lint, build and bundle inspection cannot prove that
  four cards appear, that the grid reflows, or that the mailto links resolve.
- No missing-key warning was observed live. The `key` is in the source, but the absence of a console
  warning is a browser observation.
- `/nope` answered 200 with the fallback document, so an unmatched URL currently renders the navbar
  plus an empty `main`. Whether that blank page is acceptable is the open catch-all decision.

Deviations:
- `README.md` was not in Slice 2's originally declared file list. It was added with the user's
  approval as part of the rule 5 amendment, because the new `src/data/` folder triggers rule 5.
- The plan lists the README rewrite under Slice 6. That work is now largely done here, so Slice 6's
  README item becomes a final read-through instead of a rewrite.
- `Commit:` above is filled in only after the user approves the commit, the same order Slice 1 used,
  which is why the hash lands in a later edit.

Next: Slice 3 (`src/data/courses.js`, `src/components/CourseCard.jsx`, `src/components/CourseCard.css`,
`src/pages/Courses.jsx`, `src/pages/Courses.css`). Blocked on commit approval for Slice 2. The working
plan for the grid is to repeat the rule in `Courses.css` so each page owns its layout, then let Slice 5
consolidate both into one shared grid once the Home page needs it too.

## Slice 3 - Courses page and CourseCard

Date: 2026-09-21
Status: done

Commit: cc2bcf4

Files added (4):
- `src/data/courses.js`
- `src/components/Card.jsx`
- `src/components/Card.css`
- `src/components/CourseCard.jsx`

Files changed (8):
- `src/pages/Courses.jsx`
- `src/pages/Students.jsx`
- `src/components/StudentCard.jsx`
- `src/components/Navbar.css`
- `src/index.css`
- `README.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/SLICE_LOG.md`

Files deleted (2):
- `src/components/StudentCard.css`
- `src/pages/Students.css`

Why the declared slice changed before any edit:
- The Slice 2 note told this slice to repeat the card CSS and the page grid. The user directed that no
  code be duplicated, so the files were re-planned and approved first, under rule 1. The card shell
  became one shared `Card` component and the card list became one shared `.card-grid` rule, which is why
  Slice 2 files are edited here and why `src/pages/Courses.css` was never created even though the
  original note listed it.

What changed and why:
- `Card.jsx` and `Card.css` now own the card markup and the card look once. `Card` takes `title`, `meta`
  and `rows`, where `rows` is an array of `{ label, value }` and a value may be a string, a number or a
  node. That last point is what lets `StudentCard` keep its `mailto:` anchor without the shell knowing
  anything about students. Rows are keyed by `label`, which is unique inside one card, so the stable-key
  rule is satisfied inside the shell instead of at every call site.
- `StudentCard.jsx` lost its markup and its stylesheet import. It is now a thin wrapper that maps one
  record onto the shared field list and keeps all six prop defaults, so its public contract did not
  change for the already shipped Students page.
- `CourseCard.jsx` is the same shape for the course contract. `code` becomes the meta line and `units`
  is passed through as a number, so the card performs no formatting the data does not need.
- `courses.js` holds four records and documents that `code` is unique, because a course record has no
   separate id field and the Courses page uses `key={course.code}`. It lives outside the page for the
  same reason as `students.js`: the eslint react-refresh rule rejects a file that exports a component
  and also exports plain data.
- `Courses.jsx` maps the records once and reuses the shared grid, replacing the Slice 1 placeholder.
- `Students.jsx` switched to `card-grid` and dropped its stylesheet import, which is what removes the
  second copy of the grid rule.
- `index.css` gained `.card-grid` next to the existing `.page` helpers, plus one shared
  `a:focus-visible` ring.
- `Navbar.css` lost its `:focus-visible` block, which was the rule that would otherwise have been
  repeated in the card stylesheet.
- The two deleted files are superseded: `StudentCard.css` by `Card.css`, `Students.css` by the shared
  grid. Nothing imports either path now.

Verified:
- `node .\node_modules\eslint\bin\eslint.js .` -> exit code 0, no output.
- `node .\node_modules\vite\bin\vite.js build` -> 38 modules transformed (up from 36), built in 463ms,
  `dist/assets/index-C_IAZ7ez.css` 3.09 kB (down from 3.26 kB, the de-duplicated card CSS),
  `dist/assets/index-MkKaOd8K.js` 265.79 kB.
- Built bundle inspected directly: the JS chunk contains `Data Structures and Algorithms`,
  `Database Management Systems`, `Prof. R. Aquino` and the `card-grid` class name, so the new data is
  genuinely reachable from the page. That chunk no longer contains `student-card` or `course-card`, and
  the CSS chunk contains `.card-grid`, `.card__row`, `.card__meta`, `.card__title` and
  `a:focus-visible` while `.student-card` and `.students-grid` are gone. That is the direct evidence
  that the duplicated markup and CSS were removed rather than renamed.
- `vite preview --port 5211 --strictPort` returned HTTP 200 for `/`, `/students`, `/courses`, `/about`
  and `/nope`. The server was stopped and `Get-NetTCPConnection -LocalPort 5211` then reported 0
  listeners.
- All added and changed files were checked for non-ASCII bytes and for carriage returns: none found.

Not verified:
- No card has ever been rendered in a browser. Lint, build and bundle inspection cannot prove that four
  course cards appear, that the shared grid lays them out in columns, or that the 640px stack reads
  well.
- The single focus ring is confirmed present in the CSS chunk, not confirmed on screen.
- `/nope` still answers 200, so an unmatched URL renders the navbar with an empty `main`. That remains
  the open catch-all decision.

Deviations:
- This slice is larger than the plan structure implied: it adds a shared `Card` component, edits three
  Slice 2 files and deletes two of them. All of it was declared and approved before editing, and it is
  the direct consequence of the no-duplication directive.
- `src/pages/Courses.css` was planned and is deliberately not created.
- The plan structure block and the Slice 5 exit criteria were rewritten in this slice, because the
  extraction Slice 5 was scheduled to perform now exists.
- `Commit:` above is filled in once the user approves the commit, the order Slices 1 and 2 used.

Next: Slice 4 (Home and About content), where Home reuses both cards and the cards become provably
reusable across pages rather than only within one page. Blocked on commit approval for Slice 3.

## Slice 4 - Home and About content

Date: 2026-09-21
Status: done

Commit: pending approval

Files changed (5):
- `src/pages/Home.jsx`
- `src/pages/About.jsx`
- `src/index.css`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/SLICE_LOG.md`

What changed and why:
- `Home.jsx` is no longer a placeholder. It renders an intro line that reads the real record counts, then
  a featured-students block and a featured-courses block. Each block maps a filtered subset of a data
  module onto the very same `StudentCard` and `CourseCard` the Students and Courses pages render, which is
  the cross-page reuse this slice exists to prove: the cards are not page-specific wrappers.
- The preview selects records by an explicit id/code list held in two module-private constants, the same
  non-exported-constant pattern `Navbar.jsx` uses for its link list. `students.filter(...)` and
  `courses.filter(...)` are used rather than a lookup by id, so a selection can never yield `undefined` and
  the preview still follows the order of the data file. Only a subset is previewed, so no record is
  rendered on two routes at once and the full lists stay where the rubric asks for them.
- The two calls to action use `Link`, not `NavLink`, because `NavLink` exists to consume `isActive` and that
  highlight is only wanted in the navbar. Rule 2 literally reads "`NavLink` for navigation, `Link` for
  in-page links"; the one-line amendment that would remove the ambiguity was proposed with this slice and
  was not explicitly approved, so rule 2 stands as written and this reading is recorded under Deviations
  and in the plan's decisions table.
- `About.jsx` is no longer a placeholder. It describes the portal, lists the four routes and what each one
  shows, then lists the stack. Nothing on the page is data driven, so every `<li>` is written literally and
  the stable-key rule has nothing to apply to: no array is mapped and no card is rendered on About.
- `src/index.css` gained exactly three page-shell rules. `.page__section` is the one that mattered: `h2` is
  declared `margin: 0 0 12px`, so with two stacked sections the second heading would have sat flush against
  the card grid above it. `.page__more` spaces the call to action under a grid, and `.page__list` gives the
  About lists the same row rhythm as the rows inside a card instead of browser default list margins. All
  three live in `index.css` next to `.page` and `.page__lead`, so no page gained a stylesheet and the
  settled CSS layout from Slice 3 still holds.
- Doc bookkeeping: the Slice 3 commit left three stale lines, all repaired here because both doc files are
  in this slice's declared list. The `SLICE_LOG.md` status table still said Slice 3 `Not started` with `-`
  files touched, its entry still said `Commit: pending approval`, and the plan's commit history row still
  read `pending approval`. The log's historical prose was left untouched, since the log is append-only and
  only the status table and the `Commit:` placeholder are meant to be filled in later.
- A missing trailing newline was added to `Home.jsx` and `About.jsx`, the two files this slice rewrote.
  `App.jsx` and `Navbar.jsx` still lack one, but they are outside this slice's declared list, so that is
  left for Slice 6.

Verified:
- `npm run lint` -> no findings, exit code 0.
- `npm run build` -> 38 modules transformed (unchanged from Slice 3), built in 414ms,
  `dist/assets/index-BLMh4m8f.css` 3.21 kB (up from 3.09 kB: the three new rules),
  `dist/assets/index-DuvHQOpN.js` 269.50 kB (up from 265.79 kB: the new page copy).
- The built JS chunk was inspected directly and contains `Featured students`, `What you can do here`,
  `How it is built` and `View all `, so the new copy is genuinely reachable from the bundle rather than
  dead code. The same chunk contains neither `student-card` nor `course-card`, and the CSS chunk contains
  `.page__section`, `.page__more` and `.page__list` alongside the existing `.card-grid`. Together that is
  the direct evidence that Home renders the shared card shell instead of a new card implementation, and
  that no per-card class was reintroduced.
- `vite preview --port 5212 --strictPort` returned HTTP 200 for `/`, `/students`, `/courses`, `/about` and
  `/nope`. The server was stopped and `Get-NetTCPConnection -LocalPort 5212` then reported 0 listeners.
- Byte checks: `Home.jsx`, `About.jsx` and `index.css` contain 0 non-ASCII bytes and 0 carriage returns.

Not verified:
- No page was rendered in a browser. Lint, build, bundle inspection and HTTP status codes cannot prove
  that the two previews draw four cards, that the two "View all" links navigate client side, or that the
  40px section rhythm reads well at 640px.
- The `Link` usage on Home is confirmed as source and as bundle content only, not as a working click.

Docs updated:
- `docs/IMPLEMENTATION_PLAN.md`: slice plan status table (Slice 4 -> Done, Slice 5 exit criteria clarified),
  new Slice 4 file list block, decisions pending (two new rows for the cross-route link element and the Home
  preview source, plus a correction to the commit-cadence row, which still claimed only Slices 0 and 1 were
  committed), commit history (Slice 3 hash filled in, Slice 4 row added).
- `docs/SLICE_LOG.md`: status table (Slice 3 repaired to Done/14, Slice 4 added), Slice 3 `Commit:`
  placeholder filled in, and this entry appended.

Deviations:
- `docs/IMPLEMENTATION_PLAN.md` and `docs/SLICE_LOG.md` are in the slice's declared list and were edited, as
  rule 3 and rule 5 require. `README.md` was deliberately not touched, because rule 5 only requires it for
  route, prop, folder or script changes and this slice makes none.
- The three stale Slice 3 doc lines were repaired here instead of in Slice 3, because the commit that
  created the staleness landed after that slice was reported.
- The proposed one-line wording amendment to rule 2 was not applied, because it was not explicitly approved
  with the rest of the plan. `.clinerules/implementation-workflow.md` is untouched.
- `Commit:` above is filled in once the user approves the commit, the order Slices 1 to 3 used.

Next: Slice 5 (styling and responsive pass), polish only: consistent spacing and type scale across the four
pages, the 640px reflow spot-checked, and the remaining hover and focus states. Nothing in the rubric is
blocked on the user; the slice is blocked only on commit approval for Slice 4.
