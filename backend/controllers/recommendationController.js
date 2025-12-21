import Course from "../models/CourseModel.js";
import Order from "../models/OrderModel.js";

export const getRecommendations = async (req, res) => {
  const userId = req.user._id;
  try {
    const userOrders = await Order.find({ user: userId }).populate("courses");
    const categories = userOrders.flatMap((order) =>
      order.courses.map((c) => c.category)
    );
    const purchasedCourseIds = userOrders.flatMap((order) => order.courses.map(c=>c._id));

    const recommendedCourses = await Course.find({
      _id: { $nin: purchasedCourseIds },
      category: { $nin: categories },
    }).limit(3);
    const popularCourses = await Course.find({})
      .sort({ enrolledStudents: -1 })
      .limit(3);

    return res.json({
      basedOnInterest: recommendedCourses,
      popular: popularCourses,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to fetch recommendations" });
  }
};
