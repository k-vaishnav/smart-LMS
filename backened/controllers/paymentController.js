import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  try {
    const args = {
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    };
    // create payment intent
    const paymentIntent = await stripe.paymentIntents.create(args);
    
    console.log(paymentIntent.client_secret);
    // return client secret to FE
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};
