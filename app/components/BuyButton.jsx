"use client";
import { track } from "@vercel/analytics";
import { CHECKOUT_URL, CONTACT_EMAIL, PRICE } from "../../lib/config";

export default function BuyButton({ label }) {
  const href = CHECKOUT_URL
    ? CHECKOUT_URL
    : `mailto:${CONTACT_EMAIL}?subject=Links%20Time%20Co.%20Order&body=I%20want%20to%20order%20the%20Dimple%20Dial%20($${PRICE}).`;

  const onClick = () =>
    track("buy_click", { destination: CHECKOUT_URL ? "square" : "email" });

  return (
    <a className="btn" href={href} onClick={onClick}>
      {label || `Reserve yours \u2022 $${PRICE}`}
    </a>
  );
}
