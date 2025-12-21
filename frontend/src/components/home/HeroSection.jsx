import { Link } from "react-router-dom";
import heroImg from "../../assets/learning-illustration.svg"; // Replace with your image
import { useAuth } from "../../context/AuthContext";

export default function HeroSection() {
  const { user } = useAuth();
  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #12D8FA 0%,  #F9D423 100%)", // subtle gradient
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Left: Text Section */}
          <div className="col-md-6 text-center text-md-start">
            <h1 className="fw-bold display-4">
              Learn Smarter with <span className="text-primary">Smart LMS</span>
            </h1>
            <p className="lead text-light mt-3">
              Access quality courses, track your progress, and upskill yourself
              — anytime, anywhere.
            </p>
            <div className="mt-4">
              <Link to="/courses" className="btn btn-primary btn-lg me-3">
                Explore Courses
              </Link>
              {user?.token ? (
                <Link to="/" className="btn btn-outline-light btn-lg">
                  Get Started
                </Link>
              ) : (
                <Link to="/login" className="btn btn-outline-light btn-lg">
                  Get Started
                </Link>
              )}
            </div>
          </div>

          {/* Right: Image Section */}
          <div className="col-md-6 mt-4 mt-md-0 text-center">
            <img
              src={heroImg}
              alt="Learning Illustration"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "420px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
