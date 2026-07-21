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

export default function CheckoutSection() {
  const [showCheckout, setShowCheckout] = useState(false);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    return data.clientSecret;
  }, []);

  return (
    <section id="buy" style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1rem" }}>
      {!showCheckout ? (
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "#0b5d3b", marginBottom: 8 }}>
            Dimple Dial Watch
          </h2>
          <p style={{ fontSize: 28, fontWeight: 700, margin: "4px 0" }}>$500</p>
          <p style={{ color: "#555", fontSize: 15, marginBottom: 20 }}>
            Handcrafted automatic. Your ball, built into the dial. Lifetime
            guarantee.
          </p>
          <button
            onClick={() => setShowCheckout(true)}
            style={{
              padding: "14px 40px",
              borderRadius: 8,
              border: "none",
              background: "#0b5d3b",
              color: "#fff",
              fontSize: 17,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Buy now
          </button>
        </div>
      ) : (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </section>
  );
}
