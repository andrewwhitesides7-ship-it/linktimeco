"use client";
import { useState } from "react";

const FORMSPREE_URL = "https://formspree.io/f/YOUR_ID";
const PROMO_CODE = "Holein1";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Enter a valid email.");
      return;
    }
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, source: "email_capture" }),
      });
      if (res.ok) setDone(true);
      else setError("Something went wrong. Try again.");
    } catch {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <section
      style={{
        background: "#f2f7f4",
        borderRadius: 16,
        maxWidth: 640,
        margin: "2rem auto",
        padding: "2rem 1.5rem",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {!done ? (
        <>
          <h2 style={{ color: "#0b5d3b", marginBottom: 6 }}>
            20% off your first build
          </h2>
          <p style={{ color: "#555", fontSize: 15, marginBottom: 18 }}>
            Drop your email and get your discount code instantly.
          </p>
          <form
            onSubmit={submit}
            style={{
              display: "flex",
              gap: 8,
              maxWidth: 420,
              margin: "0 auto",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              style={{
                flex: "1 1 220px",
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 15,
              }}
            />
            <button
              type="submit"
              style={{
                padding: "12px 24px",
                borderRadius: 8,
                border: "none",
                background: "#0b5d3b",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Get my code
            </button>
          </form>
          {error && (
            <p style={{ color: "#c0392b", fontSize: 13, marginTop: 10 }}>
              {error}
            </p>
          )}
        </>
      ) : (
        <>
          <h2 style={{ color: "#0b5d3b", marginBottom: 6 }}>You're in.</h2>
          <p style={{ color: "#555", fontSize: 15 }}>
            Use this at checkout for 20% off:
          </p>
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: "14px",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#0b5d3b",
              maxWidth: 260,
              margin: "10px auto 0",
            }}
          >
            {PROMO_CODE}
          </div>
        </>
      )}
    </section>
  );
}
