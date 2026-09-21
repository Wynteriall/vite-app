import { Link } from 'react-router-dom'
import StudentCard from '../components/StudentCard.jsx'
import CourseCard from '../components/CourseCard.jsx'
import students from '../data/students.js'
import courses from '../data/courses.js'

/**
 * Records this page previews. Kept module-private on purpose: the eslint
 * react-refresh rule forbids exporting a non-component value from a file that
 * exports a component. Selecting by id and by code, instead of by position,
 * means the preview cannot silently change if a data file is reordered.
 */
const featuredStudentIds = ['2023-00187', '2022-00412']
const featuredCourseCodes = ['CS 301', 'IT 210']

const featuredStudents = students.filter(({ id }) => featuredStudentIds.includes(id))
const featuredCourses = courses.filter(({ code }) => featuredCourseCodes.includes(code))

/*
 * Totals for the cover band. Derived from the data modules instead of written out,
 * so the figures on the front page cannot drift from the records they count.
 */
const totalUnits = courses.reduce((sum, { units }) => sum + units, 0)

/**
 * Home page. Route: /
 *
 * Reuses the same StudentCard and CourseCard that the Students and Courses pages
 * render, which is what makes those components reusable across routes rather than
 * page specific. Only a subset of each list is previewed, so the full lists stay
 * on their own routes and are reached through a Link.
 *
 * The page composition is a cover sheet: the title, the summary and the three
 * totals sit in a sunk `.hero` band, and everything below it is a stacked
 * `.page__section`, so the front page is one band plus two ruled previews rather
 * than the grid of cards the two directory pages are.
 */
function Home() {
  return (
    <>
      <section className="hero">
        <p className="page__kicker">Student Information Portal</p>
        <h1 className="hero__title">A directory of students and the courses they take.</h1>
        <p className="page__lead">
          Welcome. The portal holds {students.length} student records and{' '}
          {courses.length} course offerings. Browse the previews below, or open the
          full lists from the navigation above.
        </p>

        <div className="stat-strip">
          <p className="stat">
            <span className="stat__value">{students.length}</span>
            <span className="stat__label">Student records</span>
          </p>
          <p className="stat">
            <span className="stat__value">{courses.length}</span>
            <span className="stat__label">Course offerings</span>
          </p>
          <p className="stat">
            <span className="stat__value">{totalUnits}</span>
            <span className="stat__label">Units on offer</span>
          </p>
        </div>
      </section>

      <section className="page__section">
        <h2>Featured students</h2>
        <p className="page__lead">
          Two records from the student directory, rendered by the same StudentCard
          the Students page maps over every record.
        </p>

        <div className="card-grid">
          {featuredStudents.map((student) => (
            <StudentCard key={student.id} {...student} />
          ))}
        </div>

        <p className="page__more">
          <Link to="/students">View all {students.length} students</Link>
        </p>
      </section>

      <section className="page__section">
        <h2>Featured courses</h2>
        <p className="page__lead">
          Two offerings from the course catalog, rendered by the same CourseCard
          the Courses page maps over every record.
        </p>

        <div className="card-grid">
          {featuredCourses.map((course) => (
            <CourseCard key={course.code} {...course} />
          ))}
        </div>

        <p className="page__more">
          <Link to="/courses">View all {courses.length} courses</Link>
        </p>
      </section>
    </>
  )
}

export default Home
