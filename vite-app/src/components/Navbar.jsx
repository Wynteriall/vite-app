import { NavLink } from 'react-router-dom'
import './Navbar.css'

/**
 * Single source of truth for the navigation items. Kept module-private on
 * purpose: the eslint react-refresh rule forbids exporting a non-component
 * value from a file that exports a component, and nothing else reads this.
 * `end` is set on Home so that NavLink only marks it current on the index route.
 */
const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/students', label: 'Students' },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About' },
]

/**
 * Reusable top navigation bar. Rendered once in App, above the routes, so every
 * page can reach every other page without a full page reload.
 *
 * The brand is a two line block, a serif wordmark with a monospace sub-line, and
 * the links are small uppercase labels whose current page is marked with a rule
 * rather than a filled pill. NavLink still supplies `isActive`; only the classes
 * it maps onto changed.
 */
function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <NavLink to="/" end className="navbar__brand">
          <span className="navbar__brand-name">Student Information Portal</span>
          <span className="navbar__brand-note">Registrar of Records</span>
        </NavLink>

        <ul className="navbar__list">
          {navLinks.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
