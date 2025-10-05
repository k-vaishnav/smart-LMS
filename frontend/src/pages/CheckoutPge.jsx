import { useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/course/checkoutForm";
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripeKey);
const CheckoutPge = () => {
  useEffect(() => {
    const createIntent = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const { data } = await axios.post(
          "http://localhost:3002/api/payment/create-payment-intent",
          { amount: 899 }, // request body
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // actual header
            },
          }
        );
        console.log("Client Secret:", data.clientSecret);
      } catch (error) {
        console.error(
          "Payment Intent Error:",
          error.response?.data || error.message
        );
      }
    };

    createIntent();
  }, []);
  const amount = 899;
  return (
    <>
      <h1>Complete your Order</h1>
      <Elements
        stripe={stripePromise}
        options={{ clientSecret: "CONSTANT_SECRET" }}
      >
        <CheckoutForm amount={amount}></CheckoutForm>
      </Elements>
    </>
  );
};

export default CheckoutPge;
