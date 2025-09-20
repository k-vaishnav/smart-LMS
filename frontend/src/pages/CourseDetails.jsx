import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CourseDetails() {
  const { courseid } = useParams();
  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);
  const studentsEnrolled = Math.floor(Math.random() * 1000) + 50;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3002/api/courses/${courseid}`
        );
        setCourse(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseid]);

   if (loading) {
    return (
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <Skeleton height={400} className="mb-3" />
            <Skeleton height={30} width="60%" className="mb-2" />
            <Skeleton count={3} />
          </div>
          <div className="col-lg-4">
            <Skeleton height={250} />
          </div>
        </div>
      </div>
    );
  }

  if (!course) return <div className="text-center my-5">Course not found!</div>;

  // Skills by category
  const skillsMap = {
    "Web Dev": ["HTML", "CSS", "JavaScript", "Bootstrap", "React"],
    "Data Science": ["Python", "Pandas", "NumPy", "Matplotlib", "ML Basics"],
    Design: ["Figma", "Adobe XD", "UI/UX Principles"],
    Languages: ["English", "Spanish", "French"],
  };
  const skills = skillsMap[course.category.name] || [];

  return (
    <section className="py-5">
      <div className="container-fluid ">
        <div className="row g-4">
          {/* Left: Full Card */}
          <div className="col-lg-8">
            <div className="card shadow-lg rounded overflow-hidden">
              {/* Full-width Image (no padding) */}
              <img
                src="https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?w=800&auto=format&fit=crop&q=60"
                alt={course.title}
                className="img-fluid"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  maxHeight: "450px",
                }}
              />

              {/* Card Body */}
              <div className="card-body p-4">
                <h2 className="fw-bold">{course.title}</h2>

                {/* Rating & Students */}
                <div className="d-flex align-items-center mb-2">
                  <div className="text-warning me-2">
                    {[...Array(4)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                    <i className="bi bi-star-half"></i>
                  </div>
                  <span className="text-muted ms-2">4.8</span>
                  <span className="ms-3 text-muted">
                    • {studentsEnrolled} students enrolled
                  </span>
                </div>

                {/* Short Description */}
                <p className="mb-2 text-muted">{course.description}</p>

                {/* Instructor */}
                <p className="text-muted">
                  Created by {course.instructor.name}
                </p>

                {/* What You'll Learn */}
                <div className="mb-4">
                  <h5>What you'll learn</h5>
                  <div className="row row-cols-1 row-cols-md-2 g-2">
                    {skills.map((skill, idx) => (
                      <div key={idx} className="col">
                        <div className="d-flex align-items-center justify-content-between">
                          <span>
                            <i className="bi bi-check-circle-fill text-primary me-2"></i>
                            {skill}
                          </span>
                        </div>
                        <hr className="mt-2 mb-2" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Content */}
                <div className="mb-4">
                  <h5>Course Content</h5>
                  {course.lessons?.map((lesson, idx) => (
                    <div key={idx} className="card mb-2 shadow-sm">
                      <div
                        className="card-body d-flex justify-content-between align-items-center"
                        data-bs-toggle="collapse"
                        data-bs-target={`#lesson${idx}`}
                        aria-expanded="false"
                        aria-controls={`lesson${idx}`}
                        style={{ cursor: "pointer" }}
                      >
                        <span>{lesson.title}</span>
                        <i className="bi bi-chevron-down"></i>
                      </div>
                      <div className="collapse" id={`lesson${idx}`}>
                        <div className="card-body border-top text-muted">
                          {lesson.content || "Lesson content details..."}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sticky Info Card */}
          <div className="col-lg-4">
            <div
              className="card p-4 shadow-sm"
              style={{ position: "sticky", top: "80px" }}
            >
              <h4 className="fw-bold text-primary mb-3">${course.price}</h4>
              <Link to="/checkout" className="btn btn-primary w-100 mb-3">
                Buy Now
              </Link>
              <Link to="/cart" className="btn btn-outline-primary w-100 mb-3">
                Add to Cart
              </Link>

              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex align-items-center">
                  <i className="bi bi-people-fill me-2 text-primary"></i>
                  {studentsEnrolled} students
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <i className="bi bi-clock-fill me-2 text-primary"></i>
                  Full-time Access
                </li>
                <li className="list-group-item d-flex align-items-center">
                  <i className="bi bi-award-fill me-2 text-primary"></i>
                  Certificate of Completion
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
