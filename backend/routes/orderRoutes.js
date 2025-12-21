import express from "express";
import { createOrder,getMyOrders } from "../controllers/orderController.js";
import { authProtect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/create-orders",authProtect,createOrder);
router.get("/myorders",authProtect,getMyOrders);

export default router;
