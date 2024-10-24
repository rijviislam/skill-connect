// pages/api/create-payment-intent.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Extract information from the request body, e.g., amount, currency
      const { amount } = req.body;

      // Step 1: Create a payment intent with the correct amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,  // amount should be passed from the frontend in cents
        currency: 'usd', // You can change the currency as needed
        payment_method_types: ['card'],
      });

      // Step 2: Send back the clientSecret to the frontend
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end('Method Not Allowed');
  }
}