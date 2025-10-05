import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () =>{
    setMenuOpen(false);
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
      <div className="container-fluid px-3">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-primary" to="/" onClick={closeMenu}>
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
        <div className={`collapse navbar-collapse ${menuOpen? "show":""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={({isActive})=> `nav-link ${isActive?"active fw-semibold text-primary": ""}`} to="/" >Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive})=> `nav-link ${isActive?"active fw-semibold text-primary": ""}`} to="/courses">Courses</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="btn btn-primary ms-lg-3 px-4 rounded-pill" to="/login" >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}