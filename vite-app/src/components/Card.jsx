import './Card.css'

/**
 * Shared shell for the reusable cards.
 *
 * StudentCard and CourseCard both render a title, a short meta line and a list of
 * labelled values, so that markup and its styling live here once and each card
 * supplies only its own field list. `rows` is an array of { label, value }; a
 * value may be a string, a number or a node, which lets StudentCard pass its
 * mailto link through unchanged. A label is unique inside one card, so it is safe
 * as the React key.
 *
 * Props are destructured with JSX defaults because React 19 ignores `defaultProps`
 * and `propTypes`.
 */
function Card({ title = 'Untitled', meta = '', rows = [] }) {
  return (
    <article className="card">
      <header className="card__header">
        <h3 className="card__title">{title}</h3>
        {meta ? <p className="card__meta">{meta}</p> : null}
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
