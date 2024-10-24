import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PAYMENT_GAEWAY_PK);

export default function Payment() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm stripe={stripePromise} />
      </Elements>
    </div>
  );
}
