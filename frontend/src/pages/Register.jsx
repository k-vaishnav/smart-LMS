import { Link } from "react-router-dom";
import { useState } from "react";
import illustration from "../assets/login-illustration.svg"; // your illustration
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cnfpwd: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState("");
  const {register} = useAuth();
  const navigate = useNavigate();
  const checkPasswordStrength = (password) => {
    if (password.length < 8) return { text: "Too short", color: "danger" };

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*#?&]/.test(password);
    if (hasUpper && hasLower && hasNumber && hasSpecial)
      return { text: "Strong Password", color: "success" };
    if (
      (hasUpper && hasLower && hasNumber) ||
      (hasUpper && hasLower && hasSpecial)
    )
      return { text: "Medium Password", color: "warning" };
    return { text: "Weak password", color: "danger" };
  };
  const validatePassword = (e) => {
    setForm({ ...form, password: e.target.value });
    const strength = checkPasswordStrength(e.target.value);
    setMessage(strength);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.cnfpwd) {
      setError("Passwords do not match");
      return;
    }
    const res = await register(form.name, form.email, form.password);
    if(!res.success) {
      setError(res.message);
      return
    }
    navigate("/");
    setError("");
  };
  const isDisabled =
    !message ||
    message.text === "Too short" ||
    message.text === "Weak password";

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
            <h2 className="fw-bold text-center mb-4 text-primary">
              Create Your Account
            </h2>
            {error && (
              <div
                className="text-white text-center py-2 pe-2 mx-2 me-0 bg-danger mb-3 border-0 shadow-sm "
                style={{ borderRadius: "12px", fontSize: "14px" }}
              >
                {error}
              </div>
            )}
            <form className="shadow p-4 rounded bg-white">
              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={(e) => validatePassword(e)}
                  required
                />
              </div>
              {!error && message && (
                <small className={`d-block mt-1 text-${message.color}`}>
                  {message.text}
                </small>
              )}

              {/* Confirm Password */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="cnfpwd"
                  placeholder="Re-enter your password"
                  value={form.cnfpwd}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                onClick={handleSubmit}
                disabled={isDisabled}
              >
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
