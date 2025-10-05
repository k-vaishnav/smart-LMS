import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const LearningPage = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(
          "http://localhost:3002/api/courses/my-courses",
          config
        );
        setCourses(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchCourses();
  }, [user]);
  if (loading) {
    return <h1>Loading Your Courses!</h1>;
  }
  return (
    <>
      <h1>My Learning Center</h1>
      <div>
        {courses.map((course) => (
          <div key={course._id}>
            <h2>{course.title}</h2>
            <Link to={`/learn/courses/${course._id}`}></Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default LearningPage;
