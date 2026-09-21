# Student Information Portal - Implementation Plan

Lab: React routing and reusable JSX components.
Workspace: C:\Users\CCL305\Documents\Lopez-React\vite-app
Git root: C:\Users\CCL305\Documents\Lopez-React (one level above the workspace)

This file is reference material: the rubric map, the routes, the component contracts and the constraints
that still shape the code. It changes only when one of those facts changes.

Slice status lives in `docs/PROGRESS.md`, the progress tracker. Operating rules live in
`.clinerules/implementation-workflow.md`.

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

## 2. Routes

| Path | Page | Notes |
| --- | --- | --- |
| `/` | `Home` | Index route; reuses `StudentCard` and `CourseCard` for a short preview |
| `/students` | `Students` | `StudentCard` rendered once per record |
| `/courses` | `Courses` | `CourseCard` rendered once per record |
| `/about` | `About` | |
| `*` | `NotFound` | Open: not required by the rubric, scheduled for Slice 6 |

Every route is declared in `src/App.jsx`, and `src/main.jsx` only mounts `App`. The navbar renders outside
`<Routes>`, so it stays mounted while pages swap.

## 3. Component contracts

Props are destructured with JSX defaults. `propTypes` and `defaultProps` are never used, because React 19
ignores both for function components.

`StudentCard` (`src/components/StudentCard.jsx`), spread by a page as
`<StudentCard key={student.id} {...student} />`:

| Prop | Type | Example |
| --- | --- | --- |
| `id` | string | `2023-00187` |
| `name` | string | `Juan Dela Cruz` |
| `program` | string | `BS Computer Science` |
| `yearLevel` | string | `3rd Year` |
| `email` | string | `juan.delacruz@example.edu` |
| `gpa` | number | `1.75` |

`CourseCard` (`src/components/CourseCard.jsx`), spread as `<CourseCard key={course.code} {...course} />`:

| Prop | Type | Example |
| --- | --- | --- |
| `code` | string | `CS 301` |
| `title` | string | `Data Structures and Algorithms` |
| `instructor` | string | `Prof. A. Reyes` |
| `units` | number | `3` |
| `schedule` | string | `MWF 9:00-10:00 AM` |
| `room` | string | `Lab 204` |

`Card` (`src/components/Card.jsx`), the shared shell both cards render. Neither card owns markup or CSS of
its own; each owns only its field list.

| Prop | Type | Example |
| --- | --- | --- |
| `title` | string | `Juan Dela Cruz` |
| `meta` | string | `2023-00187` |
| `rows` | `{ label, value }[]` | `[{ label: 'Program', value: 'BS Computer Science' }]` |

`value` may be a string, a number or a node, so `StudentCard` passes its `mailto:` anchor through
unchanged. Rows are keyed by `label`, which is unique inside one card.

Records live in `src/data/students.js` and `src/data/courses.js`, outside the pages, because the eslint
`react-refresh` rule rejects a file that exports a component and also exports plain data.

## 4. Constraints that still shape the code

- Tailwind 4.3.3 is installed and `@tailwindcss/vite` is registered, but `src/index.css` never imports
  `tailwindcss`, so no utility class applies. Styling is plain CSS, colocated per component.
- Unlayered CSS beats Tailwind utilities anyway, which is why the Vite template rules that describe the
  demo (`#root` centring, the `h1` size, `code`, `.counter`) were deleted in Slice 1 rather than layered.
- `BrowserRouter` needs an SPA fallback. `npm run dev` and `npm run preview` both serve it, so a deep
  link such as `/students` resolves locally, but `file://` and a static host with no rewrite rule do not.
- No test runner is installed, so verification is lint, build, bundle inspection and `vite preview`,
  unless optional Slice 7 is approved.
- The eslint `react-refresh` rule is also why `Navbar.jsx` keeps its link array module-private.
- A grid or flex container blockifies its inline children. `src/index.css` therefore keeps the About counter
  in a left gutter, as an inline-block pulled back by a negative margin, instead of in a grid or flex column:
  an item that opens with a `<strong>` would otherwise break into three boxes and wrap its description a few
  characters per line. Any new grid or flex rule in these stylesheets must be given element children.

## 5. Verification strategy

- `npm run lint` must print nothing.
- `npm run build` must succeed.
- `vite preview` must answer every route, and the built CSS and JS chunks are inspected for the copy and
  the class names the slice claims to add.

Honest limit: lint and build prove the code compiles and is clean, and the chunk inspection proves that
the copy and the classes reached the bundle. None of them renders a page. Layout, the active nav
highlight, a working client-side click and the 640px reflow can only be confirmed in a browser, and no
claim of visual correctness is made without that.

## 6. Change control

This plan is the source of truth for scope. A slice that needs to touch files outside its declared file
list, or that wants to add anything the rubric does not ask for, stops and asks first. Slice status and the
declared file list for the next slice live in `docs/PROGRESS.md`.
