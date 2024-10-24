import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CheckoutForm({ stripePromise }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [currUser, setCurrUser] = useState([]);
  const amount = 49.99;
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  console.log(session?.user);

  const [paymentIntent, setPaymentIntent] = useState("");

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
  console.log("user", currUser);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Ensure stripe and elements are loaded
    if (!stripe || !elements) {
      setErrorMessage("Stripe or elements not ready.");
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
      Swal.fire({
        title: { error },
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
    } else {
      console.log("Payment Method", paymentMethod);
      setErr("");
      Swal.fire({
        title: "Payment Successfull",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
    }

    // COMFIRM PAYMENT //
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
      Swal.fire({
        title: "confirm error",
        showClass: {
          popup: `
           animate__animated
           animate__fadeInUp
           animate__faster
         `,
        },
        hideClass: {
          popup: `
           animate__animated
           animate__fadeOutDown
           animate__faster
         `,
        },
      });
    } else {
      console.log("Payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // TO DO  CHANGE THE USER STATUS IS VERIFY
        Swal.fire({
          title: "Transaction Done!",
          showClass: {
            popup: `
             animate__animated
             animate__fadeInUp
             animate__faster
           `,
          },
          hideClass: {
            popup: `
             animate__animated
             animate__fadeOutDown
             animate__faster
           `,
          },
        });
        console.log("Payyyyyy", paymentIntent);
        Swal.fire({
          title: "Payment Successfully Done!",
          showClass: {
            popup: `
               animate__animated
               animate__fadeInUp
               animate__faster
             `,
          },
          hideClass: {
            popup: `
               animate__animated
               animate__fadeOutDown
               animate__faster
             `,
          },
        });
      }
    }
  };

  return (
    <div>
      {clientSecret ? (
        // <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
        //   {/* Ensure that PaymentElement is only rendered when clientSecret is set */}
        //   <PaymentElement />
        //   {errorMessage && <div>{errorMessage}</div>}
        //   <button
        //     disabled={!stripe || loading}
        //     className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
        //   >
        //     {!loading ? `Pay $${amount}` : "Processing..."}
        //   </button>
        // </form>
        <form
          className=" rounded-lg  mt-5 p-5 mx-5 bg-purple-400 shadow-md"
          onSubmit={handleSubmit}
        >
          <CardElement
            className="p-3 rounded-lg h-[60px] bg-gray-300"
            options={{
              style: {
                base: {
                  fontSize: "20px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className=" my-5 py-2 px-7 text-white font-medium text-lg rounded-lg hover:bg-purple-500 transition duration-500 bg-purple-600"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
          <p className="text-red-500">{err}</p>
        </form>
      ) : (
        <div>Loading Payment...</div>
      )}
    </div>
  );
}
