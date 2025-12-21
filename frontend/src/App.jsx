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
import LessonPlayerPage from './pages/LessonPlayerPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPge from './pages/CheckoutPge.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'
import { NotFound } from './pages/NotFound.jsx'


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
          <Route path= "/learn/courses/:courseId/lessons/:lessonId" element={<LessonPlayerPage />} />
          <Route path= "/profile" element={<ProfilePage />} />
          <Route path = "/changePassword" element={<ChangePassword />} />
          <Route path = "/cart" element={<CartPage />} />
          <Route path = "/checkout" element={<CheckoutPge />} />
          <Route path="/orders" element={<OrdersPage/>}/>
        </Route>
        <Route path = "*" element={<NotFound/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App