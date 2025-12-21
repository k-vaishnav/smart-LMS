import express from 'express';
import { authProtect } from '../middlewares/authMiddleware.js';
import { addToCart,getCartItems,removeFromCart } from '../controllers/cartController.js';
const router = express.Router();

router.post('/add', authProtect, addToCart);
router.get('/items', authProtect, getCartItems);
router.delete('/remove/:cartItemId', authProtect, removeFromCart);

export default router;