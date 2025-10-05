import express from "express";
import {authProtect} from "../middlewares/authMiddleware.js"
import {getCourse,getCourseById,enrollStudentInCourse,myCourses} from "../controllers/courseController.js"
const router = express.Router();

// cousre routes
// get all courses
router.get("/my-courses",authProtect,myCourses);
router.get("/",getCourse);
// get details of single course
router.get("/:id",getCourseById);
// enroll user
router.post("/:id/enroll",authProtect ,enrollStudentInCourse);

export default router;