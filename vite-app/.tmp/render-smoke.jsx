import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import Home from '../src/pages/Home.jsx'
import Students from '../src/pages/Students.jsx'
import Courses from '../src/pages/Courses.jsx'
import About from '../src/pages/About.jsx'
import Card from '../src/components/Card.jsx'
import StudentCard from '../src/components/StudentCard.jsx'
import CourseCard from '../src/components/CourseCard.jsx'

const targets = {
  PageHome: Home,
  PageStudents: Students,
  PageCourses: Courses,
  PageAbout: About,
  CardBare: Card,
  CardStudent: StudentCard,
  CardCourse: CourseCard,
}

for (const [name, Target] of Object.entries(targets)) {
  try {
    const props =
      name === 'CardStudent'
        ? { id: 'x', name: 'T', program: 'p', yearLevel: 'y', email: 'e', gpa: 1.75 }
        : name === 'CardCourse'
          ? { code: 'c', title: 't', instructor: 'i', units: 3, schedule: 's', room: 'r' }
          : {}
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <Target {...props} />
      </MemoryRouter>,
    )
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    console.log(`${name}: OK ${html.length} chars :: ${text.slice(0, 100)}`)
  } catch (error) {
    const stack = error && error.stack ? error.stack.split('\n').slice(0, 5).join(' || ') : String(error)
    console.log(`${name}: THREW -> ${stack}`)
  }
}