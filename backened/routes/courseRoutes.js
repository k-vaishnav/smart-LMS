import express from "express";
import {getCourse,getCourseById} from "../controllers/courseController.js"
const router = express.Router();

// cousre routes
// get all courses
router.get("/",getCourse);
// get details of single course
router.post("/:id",getCourseById);

export default router;