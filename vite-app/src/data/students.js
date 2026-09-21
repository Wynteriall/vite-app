/**
 * Student records. Plain data only, no JSX.
 *
 * The records live here rather than inside a page because the eslint
 * react-refresh rule rejects a file that exports a component and also exports
 * plain data, and because both the Students page and the Home page read them.
 *
 * Shape: id, name, program, yearLevel, email, gpa.
 */
const students = [
  {
    id: '2023-00187',
    name: 'Juan Dela Cruz',
    program: 'BS Computer Science',
    yearLevel: '3rd Year',
    email: 'juan.delacruz@example.edu',
    gpa: 1.75,
  },
  {
    id: '2022-00412',
    name: 'Maria Clara Santos',
    program: 'BS Information Technology',
    yearLevel: '4th Year',
    email: 'maria.santos@example.edu',
    gpa: 1.5,
  },
  {
    id: '2024-00093',
    name: 'Andres Reyes',
    program: 'BS Computer Science',
    yearLevel: '2nd Year',
    email: 'andres.reyes@example.edu',
    gpa: 2,
  },
  {
    id: '2021-00556',
    name: 'Josefina Ramos',
    program: 'BS Information Systems',
    yearLevel: '4th Year',
    email: 'josefina.ramos@example.edu',
    gpa: 1.25,
  },
]

export default students
