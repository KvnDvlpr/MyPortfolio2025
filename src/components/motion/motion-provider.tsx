"use client";

import { MotionConfig } from "motion/react";

import { transitions } from "@/lib/motion";

/** Honors prefers-reduced-motion site-wide: transforms are dropped, opacity/color stay. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={transitions.state}>
      {children}
    </MotionConfig>
  );
}
