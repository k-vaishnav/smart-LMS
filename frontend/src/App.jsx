import Footer from './components/layout/Footer.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login'
import Register from './pages/Register.jsx'
import CourseDetails from './pages/CourseDetails.jsx'
import Courses from './pages/courses.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path= "/courses/:courseid" element={<CourseDetails />} />
        <Route path="/courses" element={<Courses/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App