import {
  useStripe,
  useElements,
  PaymentElement,
} from  "@stripe/react-stripe-js";
import { useState } from "react";
import { createOrder } from "../../services/orderApi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ courses }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", 
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    try {
      await createOrder(
        paymentIntent.id,
        user.token,
        courses
      );
      navigate("/learning");
    } catch (err) {
      console.error(err);
      setError("Order creation failed. Please contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      {error && <p className="text-danger mt-2">{error}</p>}

      <button
        className="btn btn-success w-100 mt-3"
        disabled={isLoading || !stripe}
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
