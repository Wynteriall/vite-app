import Card from './Card.jsx'

/**
 * Reusable card for one student record.
 *
 * Rendered once per record by the Students page and reused by the Home page
 * preview, which is what makes it reusable rather than page specific. The markup
 * and the styling come from Card, so this file only maps a student record onto the
 * shared field list. The GPA is handed over as the card's focal figure so the
 * header carries the one number the record is read for, which is why it is not
 * repeated in the rows. Props are destructured with JSX defaults because React 19
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
      figure={Number(gpa).toFixed(2)}
      figureLabel="GPA"
      rows={[
        { label: 'Program', value: program },
        { label: 'Year level', value: yearLevel },
        { label: 'Email', value: <a href={`mailto:${email}`}>{email}</a> },
      ]}
    />
  )
}

export default StudentCard
