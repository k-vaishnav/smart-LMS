import express from "express";
import { authProtect } from "../middlewares/authMiddleware";
import { createPaymentIntent } from "../controllers/paymentController";
const router = express.Router();


router.post("/create-payment-intent",authProtect,createPaymentIntent);


export default router;