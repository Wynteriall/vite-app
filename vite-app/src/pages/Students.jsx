import StudentCard from '../components/StudentCard.jsx'
import students from '../data/students.js'

/**
 * Students page. Route: /students
 *
 * Renders one reusable StudentCard per record in src/data/students.js. The key is
 * the record id so React can track each card across re-renders. The list uses the
 * shared `card-grid` rule from src/index.css, the same one the Courses and Home
 * pages use.
 *
 * The page composition is an editorial directory header: a monospace kicker, the
 * heading, then a context line of monospace figures before the first record. The
 * program count is derived from the data module, and it stays module-private because
 * the eslint react-refresh rule rejects a non-component export from a file that
 * exports a component.
 */
const programCount = new Set(students.map(({ program }) => program)).size

function Students() {
  return (
    <section>
      <p className="page__kicker">Directory</p>
      <h1>Students</h1>
      <p className="page__meta">
        {students.length} records &middot; {programCount} programs &middot; keyed by
        student id
      </p>
      <p className="page__lead">
        Every record below is rendered by the same reusable StudentCard component,
        mapped over src/data/students.js.
      </p>

      <div className="card-grid">
        {students.map((student) => (
          <StudentCard key={student.id} {...student} />
        ))}
      </div>
    </section>
  )
}

export default Students
