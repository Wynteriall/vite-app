import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Students from './pages/Students.jsx'
import Courses from './pages/Courses.jsx'
import About from './pages/About.jsx'

/**
 * Application shell and the only place routing is configured.
 * The navbar sits outside Routes so it stays mounted while pages swap,
 * which is what makes navigation client side instead of a page reload.
 */
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App