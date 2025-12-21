import CartModel from "../models/CartModel.js";
import mongoose from "mongoose";
import Course from "../models/CourseModel.js";
const addToCart = async (req, res) => {
  let { courseId } = req.body;
  const userId = req.user._id;
  try {
    courseId = new mongoose.Types.ObjectId(courseId);
    const existingItem = await CartModel.findOne({
      course: courseId,
      user: userId,
    });
    const purchasedItem = await Course.findOne({
      _id: courseId,
      enrolledStudents: userId,
    })
    if (existingItem) {
      return res
        .status(400)
        .json({
          message:
            "Course already in cart,Move Ahead to Purchase and start learning.",
        });
    }
    if(purchasedItem) return res.status(400).json({message:"You already purchased this course"});
    const cartItem = new CartModel({
      course: courseId,
      user: userId,
    });
    await cartItem.save();
    return res.status(201).json({ message: "Course added to cart" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartModel.find({ user: req.user._id }).populate({
      path: "course",
      populate:{path:'instructor',select:'name'}
    });
    return res.status(200).json(cartItems);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Server Error");
  }
};

const removeFromCart = async (req, res) => {
  let { cartItemId } = req.params;

  try {
    cartItemId = new mongoose.Types.ObjectId(cartItemId);
    const cartItem = await CartModel.findByIdAndDelete(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    return res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Server Error");
  }
};

export { addToCart, getCartItems, removeFromCart };
