import { Link } from "react-router-dom";
import illustration from "../assets/login-illustration.svg"; // your illustration

export default function Register() {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Left Illustration (Desktop Only) */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light">
          <img
            src={illustration}
            alt="Register Illustration"
            className="img-fluid p-4"
          />
        </div>

        {/* Right Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-75">
            <h2 className="fw-bold text-center mb-4 text-primary">Create Your Account</h2>
            <form className="shadow p-4 rounded bg-white">
              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Create a password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  required
                />
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>

              {/* Already Have Account */}
              <div className="text-center mt-3">
                <small>
                  Already have an account? <Link to="/login">Login</Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}