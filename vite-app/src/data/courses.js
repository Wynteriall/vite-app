/**
 * Course records. Plain data only, no JSX.
 *
 * The records live here rather than inside a page because the eslint
 * react-refresh rule rejects a file that exports a component and also exports
 * plain data, and because both the Courses page and the Home page read them.
 *
 * Shape: code, title, instructor, units, schedule, room.
 * `code` is unique per record and doubles as the React key on the Courses page,
 * because a course record has no separate id field.
 */
const courses = [
  {
    code: 'CS 301',
    title: 'Data Structures and Algorithms',
    instructor: 'Prof. A. Reyes',
    units: 3,
    schedule: 'MWF 9:00-10:00 AM',
    room: 'Lab 204',
  },
  {
    code: 'IT 210',
    title: 'Web Systems and Technologies',
    instructor: 'Prof. L. Bautista',
    units: 3,
    schedule: 'TTh 1:00-2:30 PM',
    room: 'Room 312',
  },
  {
    code: 'CS 205',
    title: 'Object-Oriented Programming',
    instructor: 'Prof. M. Villanueva',
    units: 3,
    schedule: 'MWF 1:00-2:00 PM',
    room: 'Lab 108',
  },
  {
    code: 'IS 340',
    title: 'Database Management Systems',
    instructor: 'Prof. R. Aquino',
    units: 4,
    schedule: 'TTh 8:00-9:30 AM',
    room: 'Lab 210',
  },
]

export default courses
