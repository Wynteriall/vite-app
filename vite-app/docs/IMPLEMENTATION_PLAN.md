# Student Information Portal - Implementation Plan

Lab: React routing and reusable JSX components.
Workspace: C:\Users\CCL305\Documents\Lopez-React\vite-app
Git root: C:\Users\CCL305\Documents\Lopez-React (one level above the workspace)

## 1. Rubric to deliverable mapping

| # | Requirement | Deliverable | Slice |
| --- | --- | --- | --- |
| 1 | Separate component and pages folders in src | `src/components/`, `src/pages/` | 1 |
| 2 | Reusable Navbar linking Home, Students, Courses, About | `src/components/Navbar.jsx` using `NavLink` | 1 |
| 3 | Reusable StudentCard and CourseCard | `StudentCard.jsx`, `CourseCard.jsx` in `src/components/` | 2, 3 |
| 4 | Pages for Home, Students, Courses, About | `src/pages/*.jsx` | 1 (stubs), 4 (content) |
| 5 | React Router configured per URL path | `src/App.jsx` | 1 |
| 6 | Cards used multiple times on their own path | `src/data/*.js` mapped over in each page | 2, 3, 4 |
| 7 | Basic styling for nav, pages, cards | CSS colocated per component and page | 1-5 |

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
|   |   |-- Navbar.jsx       + Navbar.css
|   |   |-- StudentCard.jsx  + StudentCard.css
|   |   `-- CourseCard.jsx   + CourseCard.css
|   |-- pages/
|   |   |-- Home.jsx     + Home.css
|   |   |-- Students.jsx + Students.css
|   |   |-- Courses.jsx  + Courses.css
|   |   `-- About.jsx    + About.css
|   |-- data/
|   |   |-- students.js
|   |   `-- courses.js
|   |-- App.jsx    (rewritten: router, navbar, routes)
|   |-- index.css  (rewritten: tokens, base, app shell)
|   |-- App.css    (deleted: dead landing-page CSS)
|   `-- main.jsx   (unchanged)
`-- README.md      (updated)
```

The per-file CSS layout depends on the styling decision taken in Slice 1.

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

Pages pass props by spreading the record: `<StudentCard key={student.id} {...student} />`. The `key`
comes from the record id, and the card destructures only the props it renders.

## 7. Slice plan

| Slice | Name | Status | Exit criteria |
| --- | --- | --- | --- |
| 0 | Docs and cline rules | Done | Docs exist, `src/` untouched, lint clean |
| 1 | Folders, routing skeleton, Navbar | Done | All four links change page and URL, active link highlighted, hard refresh on `/students` renders |
| 2 | Students page and StudentCard | Not started | Four cards from `.map()`, no missing-key warning |
| 3 | Courses page and CourseCard | Not started | Four cards from the same component, no copy-paste |
| 4 | Home and About content | Not started | Home reuses StudentCard and CourseCard, proving cross-page reuse |
| 5 | Styling and responsive pass | Not started | Grids reflow at 640px, consistent spacing and focus states |
| 6 | Cleanup, docs, final verification | Not started | Lint clean, build green, README documents routes and props |
| 7 | Route smoke test (optional) | Deferred | All routes render under `MemoryRouter` without a browser |

Slice 1 file list, declared in advance:

- Add `src/components/Navbar.jsx`, `src/components/Navbar.css`, `src/pages/Home.jsx`,
  `src/pages/Students.jsx`, `src/pages/Courses.jsx`, `src/pages/About.jsx`.
- Change `src/App.jsx`, `src/index.css`.
- Delete `src/App.css`.
- Verify with `npm run lint`, `npm run build`, then `npm run dev` and a click-through of every route.

## 8. Decisions pending

| Item | Options | Recommendation | Status |
| --- | --- | --- | --- |
| Styling approach | Plain CSS / CSS Modules / Tailwind / hybrid | Plain CSS colocated per component | Decided (Slice 1) |
| Router type | `BrowserRouter` / `HashRouter` | `HashRouter` if the lab is submitted as files or static-hosted, else `BrowserRouter` | Decided (Slice 1) as BrowserRouter, pending confirmation of submission method |
| Folder name | `components/` / `component/` | `components/`, the rubric uses the singular | Decided (Slice 1) |
| Dead template files | Delete `App.css` and unused images / keep | Delete `App.css`, keep the images | Decided (Slice 1) |
| Catch-all route | Add `NotFound` + `*` / skip | Add it and mark it as a bonus in the README | Open, scheduled for Slice 6 |
| Slice 7 route test | Zero-dependency SSR render / Vitest / skip | Skip unless a rubric mark depends on tests | Open, deferred |
| Commit cadence | One commit per slice / a single commit at the end | One commit per slice, only after approval | Open, no commit made yet |

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
