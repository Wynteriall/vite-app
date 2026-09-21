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
 */
function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <NavLink to="/" end className="navbar__brand">
          Student Portal
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