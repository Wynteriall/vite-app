import Card from './Card.jsx'

/**
 * Reusable card for one course record.
 *
 * Rendered once per record by the Courses page and reused by the Home page
 * preview, which is what makes it reusable rather than page specific. The markup
 * and the styling come from Card, so this file only maps a course record onto the
 * shared field list. Props are destructured with JSX defaults because React 19
 * ignores `defaultProps` and `propTypes`.
 */
function CourseCard({
  code = 'CS 000',
  title = 'Untitled course',
  instructor = 'Instructor not set',
  units = 0,
  schedule = 'Schedule not set',
  room = 'Room not set',
}) {
  return (
    <Card
      title={title}
      meta={code}
      rows={[
        { label: 'Instructor', value: instructor },
        { label: 'Units', value: units },
        { label: 'Schedule', value: schedule },
        { label: 'Room', value: room },
      ]}
    />
  )
}

export default CourseCard
