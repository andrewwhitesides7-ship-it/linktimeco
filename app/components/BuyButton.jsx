"use client";

import { https://square.link/u/Bejj6k5E, CONTACT_EMAIL, PRICE } from "../../lib/config";

export default function BuyButton({ label }) {
  const href = https://square.link/u/Bejj6k5E
    ? https://square.link/u/Bejj6k5E
    : `mailto:${CONTACT_EMAIL}?subject=Links%20Time%20Co.%20Order&body=I%20want%20to%20order%20the%20Dimple%20Dial%20($${PRICE}).`;
  return (
    <a className="btn" href={href}>
      {label || `Reserve yours \u2022 $${PRICE}`}
    </a>
  );
}
