# Slice Log

Append-only. One entry per completed slice, newest last. Keep the status table in sync with `IMPLEMENTATION_PLAN.md`.

| Slice | Name | Status | Files touched |
| --- | --- | --- | --- |
| 0 | Docs and cline rules | Done | 3 |
| 1 | Folders, routing skeleton, Navbar | Done | 9 |
| 2 | Students page and StudentCard | Not started | - |
| 3 | Courses page and CourseCard | Not started | - |
| 4 | Home and About content | Not started | - |
| 5 | Styling and responsive pass | Not started | - |
| 6 | Cleanup, docs, final verification | Not started | - |
| 7 | Route smoke test (optional, deferred) | Deferred | - |

---

## Slice 0 - Docs and cline rules

Date: 2026-09-21
Status: done

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