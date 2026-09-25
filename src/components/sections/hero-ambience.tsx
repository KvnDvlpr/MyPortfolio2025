"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

import { useLoop } from "@/components/motion/use-loop";

/** The two soft orbs behind the hero; the lower one drifts while in view. */
export function HeroAmbience() {
  const root = useRef<HTMLDivElement>(null);
  const drift = useRef<HTMLDivElement>(null);
  const inView = useInView(root);
  useLoop(
    drift,
    { x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.12, 1] },
    { duration: 44, ease: "easeInOut" },
    inView
  );

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="hero-orb-sage" />
      <div ref={drift} className="hero-orb-clay" />
    </div>
  );
}
