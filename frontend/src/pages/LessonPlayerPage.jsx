import React, { useState, useEffect, act } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "react-bootstrap";
const BACKENED_URL = import.meta.env.VITE_BACKEND_URL;

const LessonPlayerPage = () => {
  const { courseId, lessonId } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { user } = useAuth();

  // fetch courses details against cousre id
  useEffect(() => {
    const getCourseDetails = async () => {
      if (!user) return;

      try {
        const { data } = await axios.get(
          `${BACKENED_URL}/api/courses/${courseId}`
        );
        setCourse(data);
        if(data.enrolledStudents.includes(user.id)){
          setIsEnrolled(true);
        }
        if (lessonId) {
          const lesson = data.modules
            .flatMap((m) => m.lessons)
            .find((l) => l._id === lessonId);
          setActiveLesson(lesson);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCourseDetails();
  }, [courseId, lessonId, user]);

  if (isLoading) {
    return (
      <div className="text-center mx-auto my-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (!course) {
    return <div className="alert alert-danger">Course content not found!</div>;
  }

  if (!isEnrolled) {
  return (
    <div className="container p-4 mt-4 rounded shadow-sm bg-light border text-center">
      <p className="fs-3 mb-3">You are not enrolled in this course.</p>

      <Link to={`/courses/${course._id}`}>
        <button className="btn btn-warning px-4">Enroll</button>
      </Link>
    </div>
  );
}


  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: "90vh" }}>
        <aside
          className="col-md-3 border-end bg-light"
          style={{ padding: "20px", overflowY: "auto", height: "100vh" }}
        >
          <h4 className="fw-bold mb-3">{course.title}</h4>
          {course.modules.map((module, modIdx) => (
            <div key={modIdx} className="mb-3">
              <h6 className="fw-semibold text-primary">
                {modIdx + 1}. {module.title}
              </h6>

              <ul className="list-group">
                {module.lessons.map((lesson, lessonIdx) => (
                  <li
                    key={lessonIdx}
                    className={`list-group-item d-flex justify-content-between align-items-center 
                    ${activeLesson?._id === lesson._id ? "active" : ""}`}
                    onClick={() => setActiveLesson(lesson)}
                    style={{ cursor: "pointer" }}
                  >
                    <span>{lesson.title}</span>
                    <i className="bi bi-play-circle"></i>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
        <main style={{ flex: 1, padding: "2rem" }}>
          {activeLesson ? (
            <div>
              <h3 className="fw-bold mb-3">{activeLesson.title}</h3>
              <div className="rounded shadow-sm mb-4">
                <video
                  key={activeLesson._id}
                  width="100%"
                  height="400"
                  controls
                >
                  <source src={activeLesson.videoUrl} type="video/mp4" />
                  <p>Your browser does not support the video tag.</p>
                </video>
              </div>
            </div>
          ) : (
            <h2>Select a lesson to begin.</h2>
          )}
        </main>
      </div>
    </div>
  );
};

export default LessonPlayerPage;
