import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
import Course from "../models/CourseModel.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const createPaymentIntent = async (req, res) => {
  const { courses } = req.body;
  try {
    if (!courses || courses.length === 0) {
      return res
        .status(400)
        .json({ message: "No courses selected for purchase!" });
    }
    const validCourses = await Course.find({ _id: { $in: courses } });
    if (validCourses.length !== courses.length) {
      return res.status(400).json({ message: "Invalid course detected" });
    }
    let amount = validCourses.reduce(
      (total, course) => total + course.price,
      0
    );
    amount = amount*100;
    const args = {
      amount,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
      metadata:{
        userId: req.user._id.toString(),
        courses:courses.join(',')
      }
    };
    // create payment intent
    const paymentIntent = await stripe.paymentIntents.create(args);

    console.log(paymentIntent.client_secret);
    // return client secret to FE
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
  }
};
