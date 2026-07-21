"use client";
import { useState, useEffect } from "react";

const PROMO_CODE = "Holein1";

export default function EmailCapture() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.__ltcEmailShown) return;
    const t = setTimeout(() => {
      window.__ltcEmailShown = true;
      setOpen(true);
    }, 7000);
    return () => clearTimeout(t);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Enter a valid email.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        setError("Something went wrong. Try again.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div className="ltc-email-overlay" onClick={() => setOpen(false)}>
      <style>{`
        .ltc-email-overlay {
          position: fixed; inset: 0; z-index: 1500;
          background: rgba(10, 25, 18, 0.5);
          display: grid; place-items: end center;
          padding: 16px;
          animation: ltcFade2 0.25s ease;
        }
        @media (min-width: 640px) {
          .ltc-email-overlay { place-items: center; }
        }
        .ltc-email-card {
          background: #fff; border-radius: 18px;
          width: 100%; max-width: 420px;
          padding: 28px 24px; text-align: center;
          position: relative;
          animation: ltcSlideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ltc-email-close {
          position: absolute; top: 10px; right: 14px;
          border: none; background: none; font-size: 22px;
          color: #999; cursor: pointer;
        }
        .ltc-email-title { color: #0b5d3b; margin: 0 0 6px; }
        .ltc-email-sub { color: #555; font-size: 15px; margin: 0 0 18px; }
        .ltc-email-input {
          width: 100%; box-sizing: border-box;
          padding: 12px 14px; border-radius: 10px;
          border: 1px solid #ccc; font-size: 15px; margin-bottom: 10px;
        }
        .ltc-email-btn {
          width: 100%; padding: 13px; border-radius: 10px; border: none;
          background: #0b5d3b; color: #fff; font-size: 16px;
          font-weight: 600; cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .ltc-email-btn:hover { background: #094d31; transform: translateY(-1px); }
        .ltc-email-btn:disabled { background: #7fa593; cursor: default; transform: none; }
        .ltc-email-code {
          background: #f2f7f4; border-radius: 10px; padding: 14px;
          font-size: 22px; font-weight: 700; letter-spacing: 2px;
          color: #0b5d3b; margin-top: 10px;
          animation: ltcPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ltc-email-note { color: #999; font-size: 12px; margin-top: 10px; }
        @keyframes ltcFade2 { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ltcSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ltcPop {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div className="ltc-email-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="ltc-email-close"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          ×
        </button>
        {!done ? (
          <>
            <h2 className="ltc-email-title">20% off your first build</h2>
            <p className="ltc-email-sub">
              Drop your email and we&apos;ll send your code right over.
            </p>
            <form onSubmit={submit}>
              <input
                className="ltc-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
              />
              {error && (
                <p style={{ color: "#c0392b", fontSize: 13, marginBottom: 8 }}>
                  {error}
                </p>
              )}
              <button className="ltc-email-btn" type="submit" disabled={sending}>
                {sending ? "Sending..." : "Get my code"}
              </button>
            </form>
            <p className="ltc-email-note">No spam. One email with your code.</p>
          </>
        ) : (
          <>
            <h2 className="ltc-email-title">Check your inbox.</h2>
            <p className="ltc-email-sub">
              Your code is on its way. Here it is now too:
            </p>
            <div className="ltc-email-code">{PROMO_CODE}</div>
            <p className="ltc-email-note">
              Any ball works, yours or ours. Every dial is one of one.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
