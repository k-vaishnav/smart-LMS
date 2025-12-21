import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/card.css"
import axios from "axios";
import { ProgressBar } from "react-bootstrap";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LearningPage = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/courses/my-courses`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setCourses(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" />
        <p className="mt-2">Loading your courses...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">My Learning</h2>
      <p className="text-muted mb-4">Continue where you left off</p>

      {courses.length === 0 ? (
        <div className="text-center">
          <h5>You haven’t enrolled in any courses yet 📚</h5>
          <Link to="/courses" className="btn btn-primary mt-3">
            Explore Courses
          </Link>
        </div>
      ) : (
        <div className="row">
          {courses.map((course) => {
            const firstLesson = course.modules?.[0]?.lessons?.[0]?._id;
            const progress = Math.floor(Math.random() * 70)+10; // Placeholder for actual progress
            return (
              <div key={course._id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0 course-card">
                  {course.image && (
                    <img
                      src={course.image}
                      className="card-img-top"
                      alt={course.title}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  )}

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text text-muted">
                      {course.description?.slice(0, 80) ||
                        "No description available."}
                      ...
                    </p>

                    <div className="mb-3">
                      {/* <div className="progress" style = {{height: "8px"}}>
                        <div className="progress-bar bg-success" style = {{width: `${progress}%`}}></div>
                        
                      </div>
                      <small className="text-muted">{progress}% completed</small> */}
                      <ProgressBar animated now={progress} label={`${progress}%`} />
                      </div>

                    {firstLesson && (
                      <Link
                        to={`/learn/courses/${course._id}/lessons/${firstLesson}`}
                        className="btn btn-primary mt-auto"
                      >
                        Continue Learning
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LearningPage;
