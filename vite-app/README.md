# Student Information Portal

React single page application for a student information portal: one page per route, shared
navigation and reusable card components. Lab topic: React routing and reusable JSX components.

## Routes

Every route is declared in `src/App.jsx`. `src/main.jsx` only mounts `App` and never declares a
route.

| Path | Page component | Source |
| --- | --- | --- |
| `/` | `Home` | `src/pages/Home.jsx` |
| `/students` | `Students` | `src/pages/Students.jsx` |
| `/courses` | `Courses` | `src/pages/Courses.jsx` |
| `/about` | `About` | `src/pages/About.jsx` |

The navbar renders outside `<Routes>`, so it stays mounted while pages swap, and links are handled
client side by `NavLink` instead of a full page reload. The app uses `BrowserRouter`; `npm run dev`
and `npm run preview` both serve an SPA fallback, so a hard refresh on a deep link such as
`/students` resolves locally. The same URL from `file://`, or from a static host with no rewrite
rule, would not.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint over the repository |

## Project structure

| Path | Contents |
| --- | --- |
| `src/components/` | Reusable UI: `Navbar`, `Card`, `StudentCard`, `CourseCard` |
| `src/pages/` | One component per route |
| `src/data/` | Plain data modules, no JSX: `students.js`, `courses.js` |
| `src/index.css` | Design tokens, base typography, page shell (kicker, lead, meta line, section rule, hero band, stat strip), shared card grid and focus ring |
| `docs/` | `PROGRESS.md` (slice progress tracker) and `IMPLEMENTATION_PLAN.md` (routes, props, constraints) |

## Components

| Component | Role |
| --- | --- |
| `Navbar` | Brand block plus a `NavLink` list built from one array, one entry per route |
| `Card` | Shared card shell: title, meta line, labelled value rows |
| `StudentCard` | Maps one student record onto `Card` |
| `CourseCard` | Maps one course record onto `Card` |

`StudentCard` and `CourseCard` hold no markup and no CSS of their own. Each owns only the field list
for its record type and hands it to `Card`, so no card code and no card styling is duplicated.

## Styling

The look is deliberately not the default dashboard: ink on paper, serif headings, monospace data,
hairline rules instead of floating rounded boxes, and a single oxblood accent. Styling is plain CSS,
and each rule lives in exactly one place:

| File | Owns |
| --- | --- |
| `src/index.css` | Tokens, base typography, page shell (kicker, lead, meta line, section rule, hero band, stat strip, ruled list), `.card-grid`, `a:focus-visible` |
| `src/components/Navbar.css` | Header, brand block, nav links, active rule |
| `src/components/Card.css` | The card shell, shared by both cards |

No page carries a stylesheet. The card list is the single `.card-grid` rule in `src/index.css`, so
the Students, Courses and Home pages get the same responsive grid without copying it.

### Design tokens

Light is the default and dark is a token override inside `prefers-color-scheme`, so no component knows
which theme is active.

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `--paper` | `#f7f4ed` | `#14161a` | Page ground and the sticky header |
| `--surface` | `#fffdf8` | `#1b1e24` | Card surface |
| `--surface-sunk` | `#efeade` | `#22262e` | Hero band |
| `--ink` | `#1a1c22` | `#f2efe8` | Headings and values |
| `--ink-soft` | `#4a4f58` | `#b6b3ab` | Body copy and inactive nav links |
| `--rule` | `#ddd6c8` | `#2c3037` | Hairlines |
| `--rule-strong` | `#c9c0ac` | `#3a3f48` | Doubled header rule and the stat strip rule |
| `--accent` | `#8c2f39` | `#c05a63` | Active nav rule and the focus ring |
| `--accent-text` | `#7a2531` | `#e0a3a3` | Links |
| `--gold` | `#8a5a12` | `#d9a94c` | Kickers and stat labels |
| `--radius` | `3px` | `3px` | Near square corners |

Contrast against the paper ground, computed with the WCAG relative luminance formula. Light: ink
15.5:1, ink-soft 7.5:1, accent 7.41:1, accent-text 8.95:1, gold 5.38:1, white on accent 8.14:1. Dark:
ink 15.77:1, ink-soft 8.65:1, accent 8.57:1, gold 8.39:1. Every pair clears AA.

Three stacks, all of them fonts already on the machine, so the app loads no webfont:

| Token | Stack |
| --- | --- |
| `--serif` | `'Iowan Old Style', 'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif` |
| `--sans` | `system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` |
| `--mono` | `ui-monospace, 'Cascadia Mono', 'Segoe UI Mono', Consolas, monospace` |

`--bg`, `--text`, `--text-h` and `--border` are the Slice 1 token names. They now alias `--paper`,
`--ink-soft`, `--ink` and `--rule`, and `Card.css` is their only remaining reader, which is why they
still exist.

### `Card`

| Prop | Type | Example |
| --- | --- | --- |
| `title` | string | `Juan Dela Cruz` |
| `meta` | string | `2023-00187` |
| `rows` | `{ label, value }[]` | `[{ label: 'Program', value: 'BS Computer Science' }]` |

`value` may be a string, a number or a node, so `StudentCard` passes its `mailto:` anchor through
unchanged. Rows are keyed by `label`, which is unique inside one card.

## Component props

`StudentCard` (`src/components/StudentCard.jsx`) renders one student record. A page passes a record
by spreading it: `<StudentCard key={student.id} {...student} />`.

| Prop | Type | Example |
| --- | --- | --- |
| `id` | string | `2023-00187` |
| `name` | string | `Juan Dela Cruz` |
| `program` | string | `BS Computer Science` |
| `yearLevel` | string | `3rd Year` |
| `email` | string | `juan.delacruz@example.edu` |
| `gpa` | number | `1.75` |

`CourseCard` (`src/components/CourseCard.jsx`) renders one course record, spread the same way:
`<CourseCard key={course.code} {...course} />`.

| Prop | Type | Example |
| --- | --- | --- |
| `code` | string | `CS 301` |
| `title` | string | `Data Structures and Algorithms` |
| `instructor` | string | `Prof. A. Reyes` |
| `units` | number | `3` |
| `schedule` | string | `MWF 9:00-10:00 AM` |
| `room` | string | `Lab 204` |

Every prop in all three components is destructured with a JSX default. `propTypes` and
`defaultProps` are deliberately not used because React 19 ignores both for function components.

Records live in `src/data/students.js` and `src/data/courses.js`. The `key` is the record `id` for
students and the course `code` for courses, because a course record has no separate id field. The
data sits outside the pages because the eslint `react-refresh` rule rejects a file that exports a
component and also exports plain data, and because the Home page reads the same records.

## Tooling

Plugins registered in `vite.config.js`:

- `@vitejs/plugin-react`, which uses [Oxc](https://oxc.rs)
- `@tailwindcss/vite`. Tailwind is installed and its plugin is registered, but `src/index.css` never
  imports `tailwindcss`, so no Tailwind utility class currently has any effect. Styling is plain CSS
  colocated per component.
- `@rolldown/plugin-babel` with `reactCompilerPreset()`, so the React Compiler is active. See
  [this documentation](https://react.dev/learn/react-compiler) for more information.

## ESLint

`npm run lint` runs ESLint 10 with `@eslint/js`, `eslint-plugin-react-hooks` and
`eslint-plugin-react-refresh` over `**/*.{js,jsx}`, ignoring `dist`. The react-refresh rule is why
plain data such as `src/data/students.js` lives outside component files.
