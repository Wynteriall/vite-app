/**
 * About page. Route: /about
 *
 * Static content only. Every list item is written out literally rather than
 * mapped over an array, because nothing here is data driven and a literal child
 * needs no key.
 */
function About() {
  return (
    <>
      <section>
        <p className="page__kicker">About the portal</p>
        <h1>About</h1>
        <p className="page__lead">
          This portal is a React single page application built with Vite and React
          Router. One page component is mounted per route, a shared navbar stays
          mounted above them, and every page is reached without a full page reload.
        </p>
      </section>

      <section className="page__section">
        <h2>What you can do here</h2>
        <ul className="page__list">
          <li>
            <strong>Home</strong> previews two students and two courses, reusing
            the very components the two directory pages render.
          </li>
          <li>
            <strong>Students</strong> renders every record in
            src/data/students.js as a StudentCard, keyed by the record id.
          </li>
          <li>
            <strong>Courses</strong> renders every record in src/data/courses.js
            as a CourseCard, keyed by the course code.
          </li>
          <li>
            <strong>About</strong> describes the portal, its routes and its stack.
          </li>
        </ul>
      </section>

      <section className="page__section">
        <h2>How it is built</h2>
        <ul className="page__list">
          <li>
            React 19 function components, one component per file, with props
            destructured and given JSX defaults.
          </li>
          <li>
            React Router 7. Every route is declared in src/App.jsx, and the navbar
            uses NavLink so the current page is highlighted.
          </li>
          <li>Vite for the development server and the production build.</li>
          <li>
            Plain CSS: one stylesheet per shared component, plus one global
            stylesheet for the tokens, the page container and the card grid.
          </li>
        </ul>
      </section>
    </>
  )
}

export default About
