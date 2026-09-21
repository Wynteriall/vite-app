import './StudentCard.css'

/**
 * Reusable card for one student record.
 *
 * Rendered once per record by the Students page and reused by the Home page
 * preview, which is what makes it reusable rather than page specific.
 * Props are destructured with JSX defaults because React 19 ignores
 * `defaultProps` and `propTypes`.
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
    <article className="student-card">
      <header className="student-card__header">
        <h3 className="student-card__name">{name}</h3>
        <p className="student-card__id">{id}</p>
      </header>

      <dl className="student-card__details">
        <div className="student-card__row">
          <dt>Program</dt>
          <dd>{program}</dd>
        </div>
        <div className="student-card__row">
          <dt>Year level</dt>
          <dd>{yearLevel}</dd>
        </div>
        <div className="student-card__row">
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${email}`}>{email}</a>
          </dd>
        </div>
        <div className="student-card__row">
          <dt>GPA</dt>
          <dd>{Number(gpa).toFixed(2)}</dd>
        </div>
      </dl>
    </article>
  )
}

export default StudentCard
