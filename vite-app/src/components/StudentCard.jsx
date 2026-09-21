import Card from './Card.jsx'

/**
 * Reusable card for one student record.
 *
 * Rendered once per record by the Students page and reused by the Home page
 * preview, which is what makes it reusable rather than page specific. The markup
 * and the styling come from Card, so this file only maps a student record onto the
 * shared field list. Props are destructured with JSX defaults because React 19
 * ignores `defaultProps` and `propTypes`.
 */
function StudentCard({
  id = '0000-00000',
  name = 'Unnamed student',
  program = 'Program not set',
  yearLevel = 'Year level not set',
  email = 'no-email@example.edu',
  gpa = 0,
}) {
  return (
    <Card
      title={name}
      meta={id}
      rows={[
        { label: 'Program', value: program },
        { label: 'Year level', value: yearLevel },
        { label: 'Email', value: <a href={`mailto:${email}`}>{email}</a> },
        { label: 'GPA', value: Number(gpa).toFixed(2) },
      ]}
    />
  )
}

export default StudentCard
