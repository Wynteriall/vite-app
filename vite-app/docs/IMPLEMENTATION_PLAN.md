# Student Information Portal - Implementation Plan

Lab: React routing and reusable JSX components.
Workspace: C:\Users\CCL305\Documents\Lopez-React\vite-app
Git root: C:\Users\CCL305\Documents\Lopez-React (one level above the workspace)

## 1. Rubric to deliverable mapping

| # | Requirement | Deliverable | Slice |
| --- | --- | --- | --- |
| 1 | Separate component and pages folders in src | `src/components/`, `src/pages/` | 1 |
| 2 | Reusable Navbar linking Home, Students, Courses, About | `src/components/Navbar.jsx` using `NavLink` | 1 |
| 3 | Reusable StudentCard and CourseCard | `StudentCard.jsx`, `CourseCard.jsx` in `src/components/`, both rendering the shared `Card.jsx` | 2, 3 |
| 4 | Pages for Home, Students, Courses, About | `src/pages/*.jsx` | 1 (stubs), 4 (content) |
| 5 | React Router configured per URL path | `src/App.jsx` | 1 |
| 6 | Cards used multiple times on their own path | `src/data/*.js` mapped over in each page | 2, 3, 4 |
| 7 | Basic styling for nav, pages, cards | Colocated CSS per component, plus one shared `.card-grid` and focus ring in `src/index.css` | 1-5 |

## 2. Verified baseline (checked at Slice 0)

| Fact | Evidence |
| --- | --- |
| React 19.3.0 and react-dom 19.3.0 | `node_modules/react/package.json` |
| react-router-dom 7.18.4 installed, never imported | search hits only in `package.json` and lockfile |
| Tailwind 4.3.3 installed, `@tailwindcss/vite` registered | `vite.config.js` lines 4 and 10 |
| No `components/` or `pages/` folder in `src/` | directory listing |
| No `.clinerules` existed before this slice | `Test-Path` returned False |
| `npm run lint` clean before any work started | `node .\node_modules\eslint\bin\eslint.js .` printed no findings |
| React Compiler enabled | `vite.config.js` line 11 |
| House style: 2-space indent, single quotes, no semicolons | `src/main.jsx`, `src/App.jsx` |

## 3. Environment risks and constraints

1. Tailwind is inert. Steps 2 and 3 of the official Vite install are done (package installed, plugin
   registered) but step 4 is missing: `@import "tailwindcss";` is absent from `src/index.css`. No
   Tailwind utility class currently has any effect.
2. Unlayered CSS beats Tailwind utilities. `src/index.css` sets unlayered `h1 { font-size: 56px }`,
   `p { margin: 0 }`, `#root { width: 1126px; text-align: center }` and `code, .counter`. Tailwind v4
   emits utilities inside `@layer utilities`, and unlayered normal declarations win the cascade.
   Activating Tailwind therefore requires deleting those template rules, not just adding the import.
3. BrowserRouter needs a server fallback. It works under `npm run dev` and `npm run preview`, but a
   deep link such as `/students` breaks when `dist/index.html` is opened over `file://` or hosted on
   a static host without a rewrite rule. `HashRouter` (`#/students`) is immune. This never shows up
   locally, only at submission time.
4. `propTypes` and `defaultProps` are inert here. React 19 deprecated them for function components
   and the automatic JSX runtime never reads `defaultProps` (confirmed: the installed
   `react/cjs/react-jsx-runtime.development.js` contains no `defaultProps` handling). Use
   destructuring defaults plus JSDoc.
5. No test runner is installed, so verification is lint, production build and manual browser checks
   unless optional Slice 7 is approved.
6. eslint `react-refresh` constraint: a file that exports a component may not also export plain data,
   so card data lives in `src/data/` rather than inside the page files.

## 4. Target file structure

```
vite-app/
|-- .clinerules/
|   `-- implementation-workflow.md
|-- docs/
|   |-- IMPLEMENTATION_PLAN.md
|   `-- SLICE_LOG.md
|-- src/
|   |-- components/
|   |   |-- Navbar.jsx      + Navbar.css
|   |   |-- Card.jsx        + Card.css   (shared card shell)
|   |   |-- StudentCard.jsx (maps a student record onto Card)
|   |   `-- CourseCard.jsx  (maps a course record onto Card)
|   |-- pages/
|   |   |-- Home.jsx
|   |   |-- Students.jsx
|   |   |-- Courses.jsx
|   |   `-- About.jsx
|   |-- data/
|   |   |-- students.js
|   |   `-- courses.js
|   |-- App.jsx    (rewritten: router, navbar, routes)
|   |-- index.css  (rewritten: tokens, base, page shell, card grid, focus ring)
|   `-- main.jsx   (unchanged)
`-- README.md      (updated)
```

Cards share one stylesheet. The per-file CSS layout is settled: `Navbar.css` and `Card.css` are the only component stylesheets, the card grid and the focus ring live in `src/index.css`, and no page carries a stylesheet of its own.

## 5. Routes

| Path | Page | Notes |
| --- | --- | --- |
| `/` | `Home` | Index route |
| `/students` | `Students` | StudentCard rendered once per record |
| `/courses` | `Courses` | CourseCard rendered once per record |
| `/about` | `About` | |
| `*` | `NotFound` | Optional, not required by the rubric |

## 6. Component contracts

`StudentCard` props, destructured with JSX defaults:

| Prop | Type | Example |
| --- | --- | --- |
| `id` | string | `2023-00187` |
| `name` | string | `Juan Dela Cruz` |
| `program` | string | `BS Computer Science` |
| `yearLevel` | string | `3rd Year` |
| `email` | string | `juan.delacruz@example.edu` |
| `gpa` | number | `1.75` |

`CourseCard` props:

| Prop | Type | Example |
| --- | --- | --- |
| `code` | string | `CS 301` |
| `title` | string | `Data Structures and Algorithms` |
| `instructor` | string | `Prof. A. Reyes` |
| `units` | number | `3` |
| `schedule` | string | `MWF 9:00-10:00 AM` |
| `room` | string | `Lab 204` |

`Card` props, the shared shell that both cards render:

| Prop | Type | Example |
| --- | --- | --- |
| `title` | string | `Juan Dela Cruz` |
| `meta` | string | `2023-00187` |
| `rows` | `{ label, value }[]` | `[{ label: 'Program', value: 'BS Computer Science' }]` |

`value` may be a string, a number or a node, so `StudentCard` passes its `mailto:` anchor through
unchanged. Rows are keyed by `label`, which is unique inside one card.

Pages pass props by spreading the record: `<StudentCard key={student.id} {...student} />` and
`<CourseCard key={course.code} {...course} />`. The `key` comes from the record id for students and
from the course code for courses, because a course record has no separate id field. Each card
destructures only the props it renders and hands `Card` its own field list.

## 7. Slice plan

| Slice | Name | Status | Exit criteria |
| --- | --- | --- | --- |
| 0 | Docs and cline rules | Done | Docs exist, `src/` untouched, lint clean |
| 1 | Folders, routing skeleton, Navbar | Done | All four links change page and URL, active link highlighted, hard refresh on `/students` renders |
| 2 | Students page and StudentCard | Done | Four cards from `.map()`, no missing-key warning |
| 3 | Courses page and CourseCard | Done | Four CourseCards from one mapped component over a shared shell, no duplicated markup or CSS |
| 4 | Home and About content | Done | Home reuses StudentCard and CourseCard, proving cross-page reuse |
| 5 | Styling and responsive pass | Not started | Spacing and type scale consistent across pages, the 640px reflow spot-checked, remaining hover and focus states polished. The shared grid, the focus ring and the section rhythm already exist, so the extraction once scheduled here is dropped and Slice 5 is polish only |
| 6 | Cleanup, docs, final verification | Not started | Lint clean, build green, README documents routes and props |
| 7 | Route smoke test (optional) | Deferred | All routes render under `MemoryRouter` without a browser |

Slice 1 file list, declared in advance:

- Add `src/components/Navbar.jsx`, `src/components/Navbar.css`, `src/pages/Home.jsx`,
  `src/pages/Students.jsx`, `src/pages/Courses.jsx`, `src/pages/About.jsx`.
- Change `src/App.jsx`, `src/index.css`.
- Delete `src/App.css`.
- Verify with `npm run lint`, `npm run build`, then `npm run dev` and a click-through of every route.

Slice 2 file list, declared in advance:

- Add `src/data/students.js`, `src/components/StudentCard.jsx`, `src/components/StudentCard.css`,
  `src/pages/Students.css`.
- Change `src/pages/Students.jsx`, `README.md`, `.clinerules/implementation-workflow.md`,
  `docs/IMPLEMENTATION_PLAN.md`, `docs/SLICE_LOG.md`.
- No deletions. `README.md` is the same-slice doc update that amended rule 5 now requires.

Slice 3 file list, declared in advance and revised with the user before editing. The revision was needed
because the Slice 2 note told this slice to copy the card CSS and the page grid:

- Add `src/data/courses.js`, `src/components/Card.jsx`, `src/components/Card.css`,
  `src/components/CourseCard.jsx`.
- Change `src/pages/Courses.jsx`, `src/pages/Students.jsx`, `src/components/StudentCard.jsx`,
  `src/index.css`, `src/components/Navbar.css`, `README.md`, `docs/IMPLEMENTATION_PLAN.md`,
  `docs/SLICE_LOG.md`.
- Delete `src/components/StudentCard.css`, `src/pages/Students.css`.
- `src/pages/Courses.css` is deliberately not created, and `src/App.jsx` is untouched because the
  `/courses` route already exists.
- Verify with `npm run lint`, `npm run build`, a bundle inspection and `vite preview` on every route.

Slice 4 file list, declared in advance:

- Change `src/pages/Home.jsx`, `src/pages/About.jsx`, `src/index.css`,
  `docs/IMPLEMENTATION_PLAN.md`, `docs/SLICE_LOG.md`.
- No additions, no deletions. `src/App.jsx` and `src/main.jsx` are untouched because `/` and `/about`
  already exist, so this slice changes no route and no prop. `README.md` is therefore not required by
  rule 5 and was left alone; `src/components/` and `src/data/` are read only.
- `src/index.css` gains exactly three page-shell rules: `.page__section` (a 40px top margin, required
  because `h2` is declared with no top margin), `.page__more` and `.page__list`.
- Verify with `npm run lint`, `npm run build`, a bundle inspection and `vite preview` on every route.
- The slice also repaired three stale doc lines left by the Slice 3 commit: the Slice 3 row in the
  `SLICE_LOG.md` status table, its `Commit:` placeholder, and the Slice 3 row in the commit history below.

## 8. Decisions pending

| Item | Options | Recommendation | Status |
| --- | --- | --- | --- |
| Styling approach | Plain CSS / CSS Modules / Tailwind / hybrid | Plain CSS colocated per component | Decided (Slice 1) |
| Router type | `BrowserRouter` / `HashRouter` | `HashRouter` if the lab is submitted as files or static-hosted, else `BrowserRouter` | Closed (Slice 2): submitted as a GitHub link and graded locally, so `BrowserRouter` stays. Deep links returned 200 under both `npm run dev` and `npm run preview`; revisit only if `dist/` is hosted without a rewrite rule |
| Folder name | `components/` / `component/` | `components/`, the rubric uses the singular | Decided (Slice 1) |
| Dead template files | Delete `App.css` and unused images / keep | Delete `App.css`, keep the images | Decided (Slice 1) |
| README update timing | Same slice as the change / one rewrite in Slice 6 | Same slice, so the README in the submitted repo is never stale; Slice 6 keeps the final read-through | Decided (Slice 2), rule 5 amended |
| Catch-all route | Add `NotFound` + `*` / skip | Add it and mark it as a bonus in the README | Open, scheduled for Slice 6. Slice 2 confirmed `vite preview` answers 200 for `/nope`, so an unmatched URL currently renders the navbar and an empty `main` with no message |
| Shared card shell | Copy the card markup and CSS per card / one shared `Card` component | One `Card` component that both cards render, so no markup and no CSS is duplicated | Decided (Slice 3), on the no-duplication directive |
| Card list layout | One grid rule per page / one shared grid rule | One `.card-grid` rule in `src/index.css`, used by Students, Courses and Home; `Students.css` was deleted rather than copied | Decided (Slice 3) |
| Focus ring | Repeat the outline rule per stylesheet / one rule in `src/index.css` | One `a:focus-visible` rule in `src/index.css`, removed from `Navbar.css` | Decided (Slice 3) |
| Cross-route links outside the navbar | `NavLink` everywhere / `Link` where no active state is needed | `Link` for Home's two "View all" calls to action, because `NavLink` exists to consume `isActive` and the navbar is the only place that highlight is wanted | Decided (Slice 4). Rule 2 still reads "`NavLink` for navigation, `Link` for in-page links"; a one-line wording amendment was proposed and is not applied yet |
| Home preview source | Explicit id/code list / `.slice(0, n)` / all records | Explicit `featuredStudentIds` and `featuredCourseCodes` lists filtered out of the data modules, so the preview cannot silently change if a data file is reordered and Home never duplicates the full lists | Decided (Slice 4) |
| Slice 7 route test | Zero-dependency SSR render / Vitest / skip | Skip unless a rubric mark depends on tests | Open, deferred |
| Commit cadence | One commit per slice / a single commit at the end | One commit per slice, only after approval | Decided: one commit per slice, executed for Slices 0, 1, 2 and 3 |

## 9. Verification strategy

Commands used to prove a slice works:

- `npm run lint` must print nothing.
- `npm run build` must succeed.
- `npm run dev`, then a click-through of every route plus a hard refresh on each route.

Honest limit: lint and build prove the code compiles and is clean. They do not prove that a route
renders the intended component or that the layout looks right. Route rendering and visual layout can
only be confirmed by the user in a browser, unless optional Slice 7 adds a render smoke test. No
claim of visual correctness will be made without that.

## 10. Change control

This plan is the single source of truth for scope. A slice that needs to touch files outside its
declared list, or that wants to add anything the rubric does not ask for, stops and asks first.
Operating rules live in `.clinerules/implementation-workflow.md`; slice history lives in
`docs/SLICE_LOG.md`.

## 11. Commit history

| Slice | Commit | Message |
| --- | --- | --- |
| 0 | `87db04c` | docs: add implementation plan, slice log and cline rules |
| 1 | `1af3224` | add: added routing skeleton, Navbar and four page stubs |
| 2 | `cfef8df` | add: added Students page, reusable StudentCard and students data module |
| 3 | `cc2bcf4` | add: added Courses page, reusable CourseCard and a shared Card component |
| 4 | pending approval | add: added Home and About content and the shared section rhythm |
