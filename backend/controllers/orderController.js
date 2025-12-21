import Order from "../models/OrderModel.js";
import Course from "../models/CourseModel.js";
import Cart from "../models/CartModel.js";

export const createOrder = async (req, res) => {
  let { courses, amount, paymentIntentId } = req.body;
  try {
    const userId = req.user._id;
    if (!courses || courses.length === 0) {
      return res.status(400).json({ message: "No courses in the order!" });
    }

    const validCourses = await Course.find({ _id: { $in: courses } });
    if (validCourses.length !== courses.length) {
      return res.status(400).json({ message: "Invalid course detected" });
    }
    amount = validCourses.reduce((total, course) => total + course.price, 0);
    const newOrder = new Order({
      user: userId,
      courses,
      amount,
      paymentIntentId,
      paymentStatus: "Success",
    });
    await newOrder.save();
    await Course.updateMany(
      { _id: { $in: courses } },
      { $addToSet: { enrolledStudents: userId } }
    );
    await Cart.deleteMany({ user: userId, course: { $in: courses } });

    res.status(201).json({
      message: "Order created successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId })
      .populate({
        path: "courses",
        select: "title price instructor",
        populate: { path: "instructor", select: "name" },
      })
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
  }
};
