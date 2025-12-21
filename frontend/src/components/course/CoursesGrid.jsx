// src/components/course/CoursesGrid.jsx
import { Link } from "react-router-dom";
import "../../styles/card.css";
import PropTypes from "prop-types";

const CoursesGrid = ({ courses }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
      {courses.map((course) => (
        <div className="col" key={course._id}>
          <div className="card h-100 shadow-sm border-0 course-card d-flex flex-column">
            
            {/* Image */}
            <img
              src="https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?w=500&auto=format&fit=crop&q=60"
              className="card-img-top"
              alt={course.title}
              style={{ height: "200px", objectFit: "cover" }}
            />

            {/* Card Body */}
            <div className="card-body d-flex flex-column">
              <h5 className="card-title fw-bold">{course.title}</h5>

              {/* Description with better alignment */}
              <p
                className="card-text text-muted flex-grow-1"
                style={{
                  minHeight: "70px", // enough for 3 lines approx.
                  maxHeight: "70px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3, // show max 3 lines
                  WebkitBoxOrient: "vertical",
                }}
              >
                {course.description}
              </p>

              {/* Footer Section (always at bottom) */}
              <div className="mt-auto">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fw-bold text-primary">${course.price}</span>
                  <div className="text-warning small">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                    <span className="text-muted ms-1">(4.5)</span>
                  </div>
                </div>
                <Link
                  to={`/courses/${course._id}`}
                  className="btn btn-primary w-100"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

CoursesGrid.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default CoursesGrid;
