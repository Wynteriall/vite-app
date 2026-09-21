/**
 * Home page. Route: /
 * Slice 1 renders a placeholder; real content and card previews arrive in Slice 4.
 */
function Home() {
  return (
    <section>
      <h1>Student Information Portal</h1>
      <p className="page__lead">
        Welcome. Use the navigation above to browse the student directory and the
        course offerings.
      </p>
    </section>
  )
}

export default Home