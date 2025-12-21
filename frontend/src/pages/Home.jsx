import HeroSection from "../components/home/HeroSection";
import FeaturedCourses from "../components/home/FeaturedCourses";
import { Link } from "react-router";
export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Browse Categories Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Browse Categories</h2>
          <p className="text-muted mb-5">
            Choose from a wide range of subjects to start your learning journey.
          </p>
          <div className="row g-4">
            {/* Category Card 1 */}
            <div className="col-6 col-md-4 col-lg-3">
              <Link to="/courses/programming" className="text-decoration-none">
                <div className="card shadow-sm h-100 border-0">
                  <div className="card-body text-center">
                    <i className="bi bi-code-slash fs-1 text-primary"></i>
                    <h6 className="mt-3 text-dark">Programming</h6>
                    <p className="text-muted small">120 courses</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Category Card 2 */}
            <div className="col-6 col-md-4 col-lg-3">
              <Link to="/courses/business" className="text-decoration-none">
                <div className="card shadow-sm h-100 border-0">
                  <div className="card-body text-center">
                    <i className="bi bi-bar-chart-line fs-1 text-success"></i>
                    <h6 className="mt-3 text-dark">Business</h6>
                    <p className="text-muted small">85 courses</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Category Card 3 */}
            <div className="col-6 col-md-4 col-lg-3">
              <Link to="/courses/design" className="text-decoration-none">
                <div className="card shadow-sm h-100 border-0">
                  <div className="card-body text-center">
                    <i className="bi bi-palette fs-1 text-warning"></i>
                    <h6 className="mt-3 text-dark">Design</h6>
                    <p className="text-muted small">60 courses</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Category Card 4 */}
            <div className="col-6 col-md-4 col-lg-3">
              <Link to="/courses/languages" className="text-decoration-none">
                <div className="card shadow-sm h-100 border-0">
                  <div className="card-body text-center">
                    <i className="bi bi-globe fs-1 text-danger"></i>
                    <h6 className="mt-3 text-dark">Languages</h6>
                    <p className="text-muted small">45 courses</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Courses Section */}
      <FeaturedCourses />

      {/* Features Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Why Choose Smart LMS?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <i className="bi bi-laptop fs-1 text-primary"></i>
              <h5 className="mt-3">Accessible Anywhere</h5>
              <p className="text-muted">
                Learn at your own pace on desktop, tablet, or mobile.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="bi bi-people fs-1 text-success"></i>
              <h5 className="mt-3">Expert Instructors</h5>
              <p className="text-muted">
                Courses designed and delivered by industry experts.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="bi bi-award fs-1 text-warning"></i>
              <h5 className="mt-3">Certification</h5>
              <p className="text-muted">
                Earn certificates to showcase your achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-5 text-center text-white"
        style={{
          background: "linear-gradient(210deg, #4e54c8 0%, #f7b733 100%)",
        }}
      >
        <div className="container py-5">
          <h2 className="fw-bold mb-3">Ready to Start Learning?</h2>
          <p className="lead mb-4">
            Join thousands of learners and upskill yourself with Smart LMS
            today.
          </p>
          <a href="/register" className="btn btn-light btn-lg px-5 shadow">
            Get Started Now
          </a>
        </div>
      </section>
    </>
  );
}
