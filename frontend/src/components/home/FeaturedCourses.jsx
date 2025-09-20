import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // fixed import
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:3002/api/courses");
        setCourses(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Render skeleton cards when loading
  const renderSkeletons = () => {
    return Array(3)
      .fill(0)
      .map((_, idx) => (
        <div className="col-md-4" key={idx}>
          <div className="card h-100 shadow-lg border-0 position-relative">
            <Skeleton height={30} width={120} className="position-absolute top-0 end-0 m-2" />
            <Skeleton height={200} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <Skeleton width={`80%`} />
              </h5>
              <p className="card-text text-muted">
                <Skeleton count={3} />
              </p>
              <div className="mt-auto d-flex justify-content-between align-items-center">
                <span className="fw-bold text-primary"><Skeleton width={60} /></span>
                <div className="text-warning">
                  <Skeleton width={80} />
                </div>
                <small className="text-muted"><Skeleton width={100} /></small>
              </div>
            </div>
          </div>
        </div>
      ));
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-4">Featured Courses</h2>
        <p className="text-muted text-center mb-5">
          Handpicked courses to help you get started with Smart LMS.
        </p>
        <div className="row g-4">
          {loading ? renderSkeletons() : courses.map((course) => (
            <div className="col-md-4" key={course._id}>
              <Link to={`/courses/${course._id}`} className="text-decoration-none text-dark">
                <div className="card h-100 shadow-lg border-0 position-relative">
                  <span className="badge bg-primary position-absolute top-0 end-0 m-2">
                    {course.category.name}
                  </span>
                  <img
                    src="https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D"
                    className="card-img-top"
                    alt="Course"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text text-muted">{course.description}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-primary">${course.price}</span>
                      <div className="text-warning">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-half"></i>
                        <span className="text-muted ms-1">(4.5)</span>
                      </div>
                      <small className="text-muted">{course.instructor.name}</small>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/courses" className="btn btn-primary btn-lg">
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
