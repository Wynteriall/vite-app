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
| `src/components/` | Reusable UI: `Navbar`, `StudentCard` |
| `src/pages/` | One component per route |
| `src/data/` | Plain data modules, no JSX |
| `src/index.css` | Design tokens, base typography, page container |
| `docs/` | Implementation plan and slice log |

CSS is colocated with the file that uses it: `StudentCard.jsx` imports `StudentCard.css`, and
`Students.jsx` imports `Students.css` for its card grid.

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

Every prop is destructured with a JSX default. `propTypes` and `defaultProps` are deliberately not
used because React 19 ignores both for function components. Records live in `src/data/students.js`
as an array of objects with the shape above.

## Tooling

Plugins registered in `vite.config.js`:

- `@vitejs/plugin-react`, which uses [Oxc](https://oxc.rs)
- `@tailwindcss/vite`. Tailwind is installed and its plugin is registered, but `src/index.css` never
  imports `tailwindcss`, so no Tailwind utility class currently has any effect. Styling is plain CSS
  colocated per component and page.
- `@rolldown/plugin-babel` with `reactCompilerPreset()`, so the React Compiler is active. See
  [this documentation](https://react.dev/learn/react-compiler) for more information.

## ESLint

`npm run lint` runs ESLint 10 with `@eslint/js`, `eslint-plugin-react-hooks` and
`eslint-plugin-react-refresh` over `**/*.{js,jsx}`, ignoring `dist`. The react-refresh rule is why
plain data such as `src/data/students.js` lives outside component files.
