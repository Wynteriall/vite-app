import CourseCard from '../components/CourseCard.jsx'
import courses from '../data/courses.js'

/**
 * Courses page. Route: /courses
 *
 * Renders one reusable CourseCard per record in src/data/courses.js. The key is
 * the course code, the only unique field in a course record. The list uses the
 * shared `card-grid` rule from src/index.css, the same one the Students and Home
 * pages use.
 *
 * The page composition is a catalog header: a monospace kicker, the heading, the
 * records, and then a closing strip of totals derived from the same data module, so
 * the figures cannot drift from the offerings above them. Both totals stay
 * module-private: the eslint react-refresh rule rejects a non-component export from
 * a file that exports a component.
 */
const totalUnits = courses.reduce((sum, { units }) => sum + units, 0)
const teachingRooms = new Set(courses.map(({ room }) => room)).size

function Courses() {
  return (
    <section>
      <p className="page__kicker">Catalog</p>
      <h1>Courses</h1>
      <p className="page__lead">
        Every offering below is rendered by the same reusable CourseCard component,
        mapped over src/data/courses.js and keyed by the course code.
      </p>

      <div className="card-grid">
        {courses.map((course) => (
          <CourseCard key={course.code} {...course} />
        ))}
      </div>

      <div className="stat-strip">
        <p className="stat">
          <span className="stat__value">{courses.length}</span>
          <span className="stat__label">Offerings</span>
        </p>
        <p className="stat">
          <span className="stat__value">{totalUnits}</span>
          <span className="stat__label">Total units</span>
        </p>
        <p className="stat">
          <span className="stat__value">{teachingRooms}</span>
          <span className="stat__label">Teaching rooms</span>
        </p>
      </div>
    </section>
  )
}

export default Courses
