import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleToggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
      <div className="container-fluid px-3">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold text-primary"
          to="/"
          onClick={closeMenu}
        >
          Smart LMS
        </Link>

        {/* Toggler (Mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleToggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold text-primary" : ""}`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold text-primary" : ""}`
                }
                to="/courses"
              >
                Courses
              </NavLink>
            </li>

            {/* User Section */}
            {user ? (
              <li className="nav-item dropdown position-relative">
                {/* Profile Icon */}
                <button
                  className="btn btn-light d-flex align-items-center border-0 rounded-circle p-1"
                  onClick={toggleDropdown}
                >
                  <i className="bi bi-person-circle fs-4 text-primary"></i>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <ul
                    className="dropdown-menu dropdown-menu-end show mt-2 shadow"
                    style={{ right: 0, left: "auto" }}
                  >
                    <li className="dropdown-item text-muted small">
                      Signed in as <strong>{user.name}</strong>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={logout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  className="btn btn-primary ms-lg-3 px-4 rounded-pill"
                  to="/login"
                >
                  Log In
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
