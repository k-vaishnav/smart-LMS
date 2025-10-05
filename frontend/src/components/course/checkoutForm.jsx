import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // validation
    const { error } = await stripe.confirmPayment({
      elements,

      confirmParams: {
        return_url: `${window.location.origin}/complete`,
      },
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Something went wrong! Please try again.");
    }
    setIsLoading(false);
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="course-payment-element" />

      <button disabled={isLoading || !stripe || !elements} id="submit">
        Pay Now
        {isLoading && <div className="spinner" id="spinner"></div>}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CheckoutForm;
