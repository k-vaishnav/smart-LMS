import { useState } from "react";
import illustration from "../assets/login-illustration.png"// your illustration

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted:", form);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Illustration - hidden on small screens */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light">
          <img src={illustration} alt="Login Illustration" className="img-fluid p-4" style={{ maxHeight: "80%" }} />
        </div>

        {/* Right Login Form */}
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center bg-white">
          <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px", borderRadius: "12px" }}>
            <div className="card-body">
              <h3 className="text-center mb-4 text-primary">Smart LMS Login</h3>

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Remember Me + Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                  </div>
                  <a href="#" className="text-decoration-none small text-primary">Forgot Password?</a>
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>

              {/* Signup Link */}
              <p className="text-center mt-4 mb-0">
                Don’t have an account?{" "}
                <a href="/register" className="text-decoration-none text-primary fw-semibold">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}