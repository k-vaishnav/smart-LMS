import express from "express";
import {getCategory} from "../controllers/categoryController.js"
const router = express.Router();

// cousre routes
// get all courses
router.get("/",getCategory);


export default router;