import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BACKENED_URL = import.meta.env.VITE_BACKEND_URL

const LessonPlayerPage = () => {
    const { id: courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeLesson, setActiveLesson] = useState(null);
    const {user} = useAuth();


    // fetch courses details against cousre id
    useEffect(()=>{
        const getCourseDetails = async () => {
            try{
                const {data} = await axios.get(`${BACKENED_URL}/api/courses/${courseId}`);
                setCourse(data);
            }
            catch(error){
                console.log(error);
            }
            finally{
                setIsLoading(false);
            }
        }
        if(user)
        getCourseDetails();
    },[courseId,user]);

    if(isLoading){
        return <h1>Loading course Content...</h1>
    }
    if(!course){
        return <h1>Course content not found!</h1>
    }
    return (
        <div>
            <h1>Lesson Player Page</h1>
            <p>Lesson ID: {lessonId}</p>
        </div>
    );
}

export default LessonPlayerPage