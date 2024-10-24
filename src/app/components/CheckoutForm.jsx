import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const amount = 49.99;
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  // Fetch the PaymentIntent clientSecret from the backend
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: Math.round(amount * 100) }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };
    fetchPaymentIntent();
  }, [amount]);

  // Fetch profiles from API by email
  const fetchUserByEmail = async () => {
    try {
      const response = await fetch(`/api/get-user?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setCurrUser(data);
      } else {
        console.error("Failed to fetch user:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    fetchUserByEmail();
  }, [userEmail]);

  const { mutateAsync } = useMutation({
    mutationFn: async (paymentIntent) => {
      if (currUser) {
        const result = await axios.patch(
          `/api/payment-update/${currUser._id}`,
          { paymentIntent }
        );
        return result.data;
      }
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErr("Stripe or elements not ready.");
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErr(error.message);
      Swal.fire({ title: error.message });
      setLoading(false);
      return;
    } else {
      setErr("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: currUser?.email || "anonymous",
            name: currUser?.username || "anonymous",
          },
        },
      });

    if (confirmError) {
      Swal.fire({ title: confirmError.message });
      setLoading(false);
      return;
    } else {
      if (paymentIntent.status === "succeeded") {
        Swal.fire({ title: "Payment Successful" });
        try {
          await mutateAsync(paymentIntent);
        } catch (error) {
          console.error("Error updating payment info:", error);
        }
      }
    }
    setLoading(false);
  };

  return (
    <div>
      {clientSecret ? (
        <form
          className="rounded-lg mt-5 p-5 mx-5 bg-purple-400 shadow-md"
          onSubmit={handleSubmit}
        >
          <CardElement
            className="p-3 rounded-lg h-[60px] bg-gray-300"
            options={{
              style: {
                base: {
                  fontSize: "20px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
          <button
            className="my-5 py-2 px-7 text-white font-medium text-lg rounded-lg hover:bg-purple-500 transition duration-500 bg-purple-600"
            type="submit"
            disabled={!stripe || !clientSecret || loading}
          >
            {loading ? "Processing..." : `Pay $${amount}`}
          </button>
          <p className="text-red-500">{err}</p>
        </form>
      ) : (
        <div>Loading Payment...</div>
      )}
    </div>
  );
}
