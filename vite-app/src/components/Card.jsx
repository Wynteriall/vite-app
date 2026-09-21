import './Card.css'

/**
 * Shared shell for the reusable cards.
 *
 * StudentCard and CourseCard both render a title, a short meta line, one focal
 * figure and a list of labelled values, so that markup and its styling live here
 * once and each card supplies only its own field list. `rows` is an array of
 * { label, value }; a value may be a string, a number or a node, which lets
 * StudentCard pass its mailto link through unchanged. A label is unique inside one
 * card, so it is safe as the React key.
 *
 * `figure` is the one number the record is read for - the GPA of a student, the
 * unit load of a course. It is drawn large in the header, and a card that owns a
 * figure leaves it out of `rows` instead of printing the same field twice.
 *
 * Props are destructured with JSX defaults because React 19 ignores `defaultProps`
 * and `propTypes`.
 */
function Card({ title = 'Untitled', meta = '', figure = '', figureLabel = '', rows = [] }) {
  return (
    <article className="card">
      <header className="card__header">
        <div className="card__heading">
          {meta ? <p className="card__meta">{meta}</p> : null}
          <h3 className="card__title">{title}</h3>
        </div>

        {figure ? (
          <p className="card__figure">
            <span className="card__figure-value">{figure}</span>
            <span className="card__figure-label">{figureLabel}</span>
          </p>
        ) : null}
      </header>

      <dl className="card__details">
        {rows.map(({ label, value }) => (
          <div className="card__row" key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

export default Card
