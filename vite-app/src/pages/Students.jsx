import StudentCard from '../components/StudentCard.jsx'
import students from '../data/students.js'
import './Students.css'

/**
 * Students page. Route: /students
 *
 * Renders one reusable StudentCard per record in src/data/students.js. The key
 * is the record id so React can track each card across re-renders.
 */
function Students() {
  return (
    <section>
      <h1>Students</h1>
      <p className="page__lead">
        {students.length} student records, each rendered by the same reusable
        StudentCard component.
      </p>

      <div className="students-grid">
        {students.map((student) => (
          <StudentCard key={student.id} {...student} />
        ))}
      </div>
    </section>
  )
}

export default Students