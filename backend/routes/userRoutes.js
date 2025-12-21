import express from "express";
const router = express.Router();
import {authProtect} from "../middlewares/authMiddleware.js"
import {getUserProfile,updateUserProfile} from "../controllers/userController.js"
// user routes
// get user profile info
router.get("/profile",authProtect,getUserProfile);
// update user profile
router.put("/profile",authProtect,updateUserProfile);


export default router;
