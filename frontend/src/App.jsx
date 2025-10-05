import Footer from './components/layout/Footer.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login'
import Register from './pages/Register.jsx'
import CourseDetails from './pages/CourseDetails.jsx'
import Courses from './pages/courses.jsx'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.jsx'
import LearningPage from './pages/LearningPage.jsx'


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
        <Route element = {<PrivateRoute/>} >
          <Route path= "/learning" element={<LearningPage />} />
          <Route path= "/learn/courses/:courseId" element={<LessonPlayerPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App