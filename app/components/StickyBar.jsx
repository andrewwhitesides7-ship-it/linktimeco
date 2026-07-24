"use client";
import { useEffect, useState } from "react";
import { PRICE } from "../../lib/config";

export default function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    window.dispatchEvent(new CustomEvent("open-checkout"));
  };

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
        <button
          className="btn small"
          onClick={onClick}
          tabIndex={show ? 0 : -1}
        >
          Order
        </button>
      </div>
    </div>
  );
}
