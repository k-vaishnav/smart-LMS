import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center p-4">
        <span style={{ fontSize: "64px" }}>😕</span>
        <div className="display-1 fw-bold text-primary">404</div>

        <h2 className="fw-semibold mt-3">Page Not Found</h2>

        <p className="text-muted mt-2 mb-4">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link to="/" className="btn btn-primary px-4">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};
