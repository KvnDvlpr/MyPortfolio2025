"use client";

import { motion } from "motion/react";

import { duration, easeOutExpo } from "@/lib/motion";

/** Fades + lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** milliseconds */
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: duration.focal - 0.1, ease: easeOutExpo, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
