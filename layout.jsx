"use client";

import { useEffect, useState } from "react";
import { CHECKOUT_URL, CONTACT_EMAIL, PRICE } from "../../lib/config";

export default function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = CHECKOUT_URL
    ? CHECKOUT_URL
    : `mailto:${CONTACT_EMAIL}?subject=Links%20Time%20Co.%20Order&body=I%20want%20to%20order%20the%20Dimple%20Dial%20($${PRICE}).`;

  return (
    <div className={`stickybar${show ? " show" : ""}`} aria-hidden={!show}>
      <div className="stickybar-inner">
        <img src="/images/hero.jpg" alt="" />
        <div>
          <div className="stickybar-name">The Dimple Dial</div>
          <div className="stickybar-price">
            ${PRICE} &bull; made to order &bull; lifetime guarantee
          </div>
        </div>
        <a className="btn small" href={href} tabIndex={show ? 0 : -1}>
          Order
        </a>
      </div>
    </div>
  );
}
