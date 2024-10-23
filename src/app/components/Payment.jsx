import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51QDCjcJ5DOhPgyVe7YUAFGSevnE6ZmRHyIxkuLASDXiPxgu8ASLZleauYIYgpsG07KIqgQfiLpohYXPsTbpwWTef00ZSIddo9S"
);

export default function Payment() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
