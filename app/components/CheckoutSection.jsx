"use client";
import { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = pk ? loadStripe(pk) : null;

export default function CheckoutSection({ label }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    if (!res.ok) {
      const text = await res.text();
      setError(`Checkout error (${res.status}): ${text.slice(0, 200)}`);
      throw new Error(text);
    }
    const data = await res.json();
    if (!data.clientSecret) {
      setError("Checkout error: no client secret returned.");
      throw new Error("no clientSecret");
    }
    return data.clientSecret;
  }, []);

  if (!pk) {
    return (
      <p style={{ color: "#c0392b" }}>
        Checkout is missing its publishable key. Add
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in Vercel and redeploy.
      </p>
    );
  }

  if (!open) {
    return (
      <button className="btn" onClick={() => setOpen(true)}>
        {label || "Order the Dimple Dial"}
      </button>
    );
  }

  return (
    <div style={{ marginTop: 24, textAlign: "left" }}>
      {error && (
        <p style={{ color: "#c0392b", fontSize: 14, marginBottom: 12 }}>
          {error}
        </p>
      )}
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
