import { useEffect, useState } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/course/checkoutForm";
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const stripePromise = loadStripe(stripeKey);
const CheckoutPge = () => {
  const {state} = useLocation();
  const navigate= useNavigate();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if(!state || !state.courses || !state.totalAmount){
      navigate('/cart');
      return;
    }
    const createIntent = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const { data } = await axios.post(
          `${BACKEND_URL}/api/payment/create-payment-intent`,
          { courses: state.courses, }, 
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // actual header
            },
          }
        );
        console.log("Client Secret:", data.clientSecret);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error(
          "Payment Intent Error:",
          error.response?.data || error.message
        );
      }
    };

    createIntent();
  }, []);
  return (
    <>
      <div className="container my-5">
        <h3 className="fw-bold mt-3">Complete your payment</h3>
        {clientSecret && 
        <Elements
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <CheckoutForm courses={state.courses}></CheckoutForm>
      </Elements>}
      </div>
      
    </>
  );
};

export default CheckoutPge;
