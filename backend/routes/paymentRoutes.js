import express from "express";
import {authProtect} from "../middlewares/authMiddleware.js";
import { createPaymentIntent } from "../controllers/paymentController.js";
const router = express.Router();


router.post("/create-payment-intent",authProtect,createPaymentIntent);


export default router;