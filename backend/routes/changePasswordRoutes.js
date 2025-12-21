import express from "express";
import {authProtect} from "../middlewares/authMiddleware.js";
import { changePassword } from "../controllers/changePasswordController.js";
const router = express.Router();

router.put("/change-password",authProtect,changePassword);

export default router;