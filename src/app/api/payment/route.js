import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: "Stripe secret key is missing" });
  }

  try {
    const { amount } = await request.json();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    console.log("payment", paymentIntent);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);

    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
