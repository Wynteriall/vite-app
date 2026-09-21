import CourseCard from '../components/CourseCard.jsx'
import courses from '../data/courses.js'

/**
 * Courses page. Route: /courses
 *
 * Renders one reusable CourseCard per record in src/data/courses.js. The key is
 * the course code, the only unique field in a course record. The list uses the
 * shared `card-grid` rule from src/index.css, the same one the Students and Home
 * pages use.
 */
function Courses() {
  return (
    <section>
      <h1>Courses</h1>
      <p className="page__lead">
        {courses.length} course offerings, each rendered by the same reusable
        CourseCard component.
      </p>

      <div className="card-grid">
        {courses.map((course) => (
          <CourseCard key={course.code} {...course} />
        ))}
      </div>
    </section>
  )
}

export default Courses
