"use client";

export default function BuyButton({ label }) {
  const openCheckout = () => {
    window.dispatchEvent(new CustomEvent("open-checkout"));
  };

  return (
    <button className="btn" onClick={openCheckout}>
      {label || "Order the Dimple Dial"}
    </button>
  );
}
