"use client";

import { useEffect, useRef } from "react";

/*
  Scroll-driven line-art golfer.
  Pose is parametric: arm+club angles are keyframed against page
  scroll progress, so the swing scrubs as you scroll. The ball
  launches at impact and traces an arc across the viewport.
*/

const KEYS = [
  // [progress, armAngleDeg, wristLagDeg]
  [0.0, 15, 12], // address
  [0.32, -160, -85], // top of backswing
  [0.5, 20, 0], // impact
  [0.72, 195, 55], // follow-through finish
  [1.0, 195, 55], // hold finish
];

const IMPACT = 0.5;

function ease(t) {
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function pose(p) {
  for (let i = 0; i < KEYS.length - 1; i++) {
    const [p0, t0, l0] = KEYS[i];
    const [p1, t1, l1] = KEYS[i + 1];
    if (p >= p0 && p <= p1) {
      const t = p1 > p0 ? ease((p - p0) / (p1 - p0)) : 0;
      return [lerp(t0, t1, t), lerp(l0, l1, t)];
    }
  }
  return [KEYS[KEYS.length - 1][1], KEYS[KEYS.length - 1][2]];
}

export default function GolferScene() {
  const ref = useRef(null);
  const raf = useRef(0);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const el = {
      arm: svg.querySelector("#g-arm"),
      club: svg.querySelector("#g-club"),
      head: svg.querySelector("#g-clubhead"),
      ball: svg.querySelector("#g-ball"),
      tracer: svg.querySelector("#g-tracer"),
      torso: svg.querySelector("#g-torso"),
    };

    // Fixed body geometry (viewBox units)
    const S = { x: 300, y: 300 }; // shoulder
    const ARM = 105;
    const CLUB = 150;
    const GROUND = 565;
    const BALL = { x: 415, y: GROUND - 9 };

    let target = 0;
    let current = -1;

    const readScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };

    const draw = (p) => {
      const [thDeg, lagDeg] = pose(p);
      const th = (thDeg * Math.PI) / 180;
      const ph = ((thDeg + lagDeg) * Math.PI) / 180;
      const hx = S.x + ARM * Math.sin(th);
      const hy = S.y + ARM * Math.cos(th);
      const cx = hx + CLUB * Math.sin(ph);
      const cy = hy + CLUB * Math.cos(ph);

      el.arm.setAttribute("x2", hx);
      el.arm.setAttribute("y2", hy);
      el.club.setAttribute("x1", hx);
      el.club.setAttribute("y1", hy);
      el.club.setAttribute("x2", cx);
      el.club.setAttribute("y2", cy);
      el.head.setAttribute("cx", cx);
      el.head.setAttribute("cy", cy);

      // slight torso lean through the swing
      const lean = thDeg > 90 ? -4 : thDeg < -90 ? 4 : 0;
      el.torso.setAttribute(
        "transform",
        `rotate(${lean} ${S.x} ${S.y + 120})`
      );

      // ball flight
      if (p < IMPACT) {
        el.ball.setAttribute("cx", BALL.x);
        el.ball.setAttribute("cy", BALL.y);
        el.ball.setAttribute("opacity", "1");
        el.tracer.setAttribute("opacity", "0");
      } else {
        const t = Math.min(1, (p - IMPACT) / (1 - IMPACT));
        const fx = BALL.x + 900 * t;
        const fy = BALL.y - (620 * t - 430 * t * t);
        el.ball.setAttribute("cx", fx);
        el.ball.setAttribute("cy", fy);
        el.ball.setAttribute("opacity", String(1 - t * 0.5));
        // dotted tracer arc from tee to ball
        const pts = [];
        const n = 22;
        for (let i = 0; i <= n; i++) {
          const s = (i / n) * t;
          pts.push(
            `${BALL.x + 900 * s},${BALL.y - (620 * s - 430 * s * s)}`
          );
        }
        el.tracer.setAttribute("points", pts.join(" "));
        el.tracer.setAttribute("opacity", "0.5");
      }
    };

    const loop = () => {
      if (Math.abs(target - current) > 0.0005) {
        current = current < 0 ? target : current + (target - current) * 0.12;
        draw(current);
      }
      raf.current = requestAnimationFrame(loop);
    };

    readScroll();
    if (reduced) {
      draw(0);
    } else {
      window.addEventListener("scroll", readScroll, { passive: true });
      window.addEventListener("resize", readScroll);
      raf.current = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
    };
  }, []);

  return (
    <div className="golfer-bg" aria-hidden="true">
      <svg
        ref={ref}
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMidYMax slice"
        width="100%"
        height="100%"
      >
        <g
          stroke="#f6f4ec"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        >
          {/* ground */}
          <line
            x1="60"
            y1="574"
            x2="1140"
            y2="574"
            strokeWidth="2.5"
            opacity="0.5"
          />
          {/* flag in the distance */}
          <g opacity="0.55">
            <line x1="1050" y1="574" x2="1050" y2="470" strokeWidth="3" />
            <polygon
              points="1050,470 1094,483 1050,496"
              fill="#c8102e"
              stroke="none"
            />
          </g>
          {/* golfer */}
          <g id="g-torso">
            {/* legs */}
            <line x1="300" y1="420" x2="252" y2="565" />
            <line x1="300" y1="420" x2="340" y2="565" />
            {/* spine */}
            <line x1="300" y1="420" x2="300" y2="300" />
            {/* head */}
            <circle cx="300" cy="258" r="24" strokeWidth="7" />
          </g>
          {/* arm + club, driven by scroll */}
          <line id="g-arm" x1="300" y1="300" x2="330" y2="402" />
          <line
            id="g-club"
            x1="330"
            y1="402"
            x2="360"
            y2="548"
            stroke="#c9cdd1"
            strokeWidth="4.5"
          />
          <circle id="g-clubhead" cx="360" cy="548" r="9" fill="#c9cdd1" stroke="none" />
        </g>
        {/* ball + tracer */}
        <polyline
          id="g-tracer"
          points=""
          fill="none"
          stroke="#f6f4ec"
          strokeWidth="2.5"
          strokeDasharray="1 14"
          strokeLinecap="round"
          opacity="0"
        />
        <circle id="g-ball" cx="415" cy="556" r="8" fill="#f6f4ec" />
      </svg>
    </div>
  );
}
