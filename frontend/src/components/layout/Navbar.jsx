import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaCircleUser } from "react-icons/fa6";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const handleProfileToggle = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
  };

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
          aria-controls="navbarNav"
          aria-expanded={menuOpen ? "true" : "false"}
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
                  `nav-link ${
                    isActive ? "active fw-semibold text-primary" : ""
                  }`
                }
                to="/"
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "active fw-semibold text-primary" : ""
                  }`
                }
                to="/courses"
                onClick={closeMenu}
              >
                Courses
              </NavLink>
            </li>

            {user && (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center ${
                      isActive ? "active fw-semibold text-primary" : ""
                    }`
                  }
                  to="/cart"
                  onClick={closeMenu}
                >
                  <i className="bi bi-cart3 fs-5 me-1"></i>
                  My Cart
                </NavLink>
              </li>
            )}

            {user ? (
              <li className="nav-item dropdown position-relative">
                {/* User Icon */}
                <button
                  className="btn border-0 bg-transparent d-flex align-items-center"
                  onClick={handleProfileToggle}
                >
                  <FaCircleUser size={28} className="text-primary me-1" />
                  <span className="fw-semibold">{user.name}</span>
                </button>

                {/* Dropdown Menu */}
                {profileMenuOpen && (
                  <div
                    className="dropdown-menu dropdown-menu-end show mt-2 shadow-sm"
                    style={{ position: "absolute", right: 0 }}
                  >
                    <Link
                      className="dropdown-item"
                      to={`/learning`}
                      onClick={closeMenu}
                    >
                      my-learnings
                    </Link> 
                    <Link
                      className="dropdown-item"
                      to={`/orders`}
                      onClick={closeMenu}
                    >
                      my orders
                    </Link> 
                    <Link
                      className="dropdown-item"
                      to={`/profile`}
                      onClick={closeMenu}
                    >
                      Profile
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={`/changePassword`}
                      onClick={closeMenu}
                    >
                      Change Password
                    </Link>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  className="btn btn-primary text-white px-4 rounded-pill"
                  to="/login"
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
