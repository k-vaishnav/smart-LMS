import HeroSection from "../components/home/HeroSection";
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
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Featured Courses</h2>
          <p className="text-muted text-center mb-5">
            Handpicked courses to help you get started with Smart LMS.
          </p>
          <div className="row g-4">
            {/* Course Card 1 */}
            <div className="col-md-4">
              <Link to="/courses/1" className="text-decoration-none text-dark">
                <div className="card h-100 shadow-lg border-0 position-relative">
                  {/* Category Badge */}
                  <span className="badge bg-primary position-absolute top-0 end-0 m-2">
                    Programming
                  </span>

                  <img
                    src="https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D"
                    className="card-img-top"
                    alt="Course"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">Full-Stack Web Development</h5>
                    <p className="card-text text-muted">
                      Learn HTML, CSS, JavaScript, React, and Node.js from
                      scratch.
                    </p>
                    {/* Bottom Section */}
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        {/* Price */}
                        <span className="fw-bold text-primary">$49.99</span>
                        {/* Ratings */}
                        <div className="text-warning">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-half"></i>
                          <span className="text-muted ms-1">(4.5)</span>
                        </div>
                        <div className="d-flex justify-content-end">
                          {/* Instructor */}
                          <small className="text-muted">By John Doe</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Course Card 2 */}
            <div className="col-md-4">
              <Link to="/courses/2" className="text-decoration-none text-dark">
                <div className="card h-100 shadow-lg border-0 position-relative">
                  <span className="badge bg-success position-absolute top-0 end-0 m-2">
                    Business
                  </span>

                  <img
                    src="https://plus.unsplash.com/premium_photo-1661384118133-8f8b6eef9715?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzaW5lc3MlMjBhbmFseXRpY3N8ZW58MHx8MHx8fDA%3D"
                    className="card-img-top"
                    alt="Course"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      Business Analytics Essentials
                    </h5>
                    <p className="card-text text-muted">
                      Master data analysis and decision-making with Excel &
                      Tableau.
                    </p>
                    {/* Bottom Section */}
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        {/* Price */}
                        <span className="fw-bold text-primary">$49.99</span>
                        {/* Ratings */}
                        <div className="text-warning">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-half"></i>
                          <span className="text-muted ms-1">(3.5)</span>
                        </div>
                        <div className="d-flex justify-content-end">
                          {/* Instructor */}
                          <small className="text-muted">By John Doe</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Course Card 3 */}
            <div className="col-md-4">
              <Link to="/courses/3" className="text-decoration-none text-dark">
                <div className="card h-100 shadow-lg border-0 position-relative">
                  <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
                    Design
                  </span>

                  <img
                    src="https://plus.unsplash.com/premium_photo-1661335231844-b66fc5284398?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3JlYXRpdmUlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D"
                    className="card-img-top"
                    alt="Course"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">UI/UX Design Fundamentals</h5>
                    <p className="card-text text-muted">
                      Learn design thinking and create stunning user
                      experiences.
                    </p>
                    {/* Bottom Section */}
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        {/* Price */}
                        <span className="fw-bold text-primary">$49.99</span>
                        {/* Ratings */}
                        <div className="text-warning">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <span className="text-muted ms-1">(4.0)</span>
                        </div>
                        <div className="d-flex justify-content-end">
                          {/* Instructor */}
                          <small className="text-muted">By John Doe</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-5">
            <Link to="/courses" className="btn btn-primary btn-lg">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

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
          <a href="/signup" className="btn btn-light btn-lg px-5 shadow">
            Get Started Now
          </a>
        </div>
      </section>
    </>
  );
}
