import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-auto">
      <div className="container">
        <div className="row">
          {/* Brand */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold text-primary">Smart LMS</h5>
            <p className="small">
              A modern learning management system to make education simple,
              engaging, and accessible.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/courses" className="text-light text-decoration-none">Courses</Link></li>
              <li><Link to="/dashboard" className="text-light text-decoration-none">Dashboard</Link></li>
              <li><Link to="/login" className="text-light text-decoration-none">Login</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Contact Us</h6>
            <ul className="list-unstyled small">
              <li>
                <i className="bi bi-envelope-fill me-2 text-primary"></i>
                support@smartlms.com
              </li>
              <li>
                <i className="bi bi-telephone-fill me-2 text-primary"></i>
                +91 98765 43210
              </li>
              <li>
                <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                New Delhi, India
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light fs-5"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light fs-5"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="text-light fs-5"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="text-center pt-3 border-top border-secondary mt-3">
          <small>© {new Date().getFullYear()} Smart LMS. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}