"use client";
import { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutSection({ label }) {
  const [open, setOpen] = useState(false);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    return data.clientSecret;
  }, []);

  if (!open) {
    return (
      <button className="btn" onClick={() => setOpen(true)}>
        {label || "Order the Dimple Dial"}
      </button>
    );
  }

  return (
    <div style={{ marginTop: 24, textAlign: "left" }}>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
