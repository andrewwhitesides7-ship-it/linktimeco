"use client";
import { useState, useEffect, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = pk ? loadStripe(pk) : null;

export default function CheckoutModal() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-checkout", handler);
    return () => window.removeEventListener("open-checkout", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

  if (!open) return null;

  return (
    <div className="ltc-overlay" onClick={() => setOpen(false)}>
      <style>{`
        .ltc-overlay {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(10, 25, 18, 0.6);
          display: grid; place-items: center;
          padding: 16px;
          animation: ltcFade 0.25s ease;
        }
        .ltc-modal {
          background: #fff; border-radius: 18px;
          width: 100%; max-width: 480px;
          max-height: 90vh; overflow-y: auto;
          padding: 20px; position: relative;
          animation: ltcRise 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ltc-close {
          position: sticky; top: 0; float: right;
          border: none; background: #f2f2f2; color: #333;
          width: 34px; height: 34px; border-radius: 50%;
          font-size: 18px; cursor: pointer; z-index: 1;
        }
        @keyframes ltcFade {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes ltcRise {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div className="ltc-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="ltc-close"
          onClick={() => setOpen(false)}
          aria-label="Close checkout"
        >
          ×
        </button>
        {error && (
          <p style={{ color: "#c0392b", fontSize: 14, margin: "8px 0 12px" }}>
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
    </div>
  );
}
