import express from "express";
import { authProtect } from "../middlewares/authMiddleware.js";
import {
  getCourse,
  getCourseById,
  enrollStudentInCourse,
  myCourses,
  postCourse,
  updateCourse,
} from "../controllers/courseController.js";
import { videoUpload } from "../middlewares/file-upload.midddleware.js";
import { getRecommendations } from "../controllers/recommendationController.js";
const router = express.Router();

// cousre routes
// post a course
router.post("/", videoUpload.any(), postCourse);
// get recommendations
router.get("/recommendations", authProtect, getRecommendations);
// update a course
router.put("/update/:courseId", videoUpload.any(), updateCourse);
// get all courses
router.get("/my-courses", authProtect, myCourses);
router.get("/", getCourse);
// get details of single course
router.get("/:id", getCourseById);
// enroll user
router.post("/:id/enroll", authProtect, enrollStudentInCourse);



export default router;
