"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { useLoop } from "@/components/motion/use-loop";
import { easeOutExpo } from "@/lib/motion";

export function HeroScrollCue() {
  const root = useRef<HTMLAnchorElement>(null);
  const bead = useRef<HTMLSpanElement>(null);
  const inView = useInView(root);
  useLoop(bead, { y: ["-100%", "100%"] }, { duration: 1.8, ease: easeOutExpo }, inView);

  return (
    <motion.a
      ref={root}
      href="#background"
      aria-label="Scroll to the next section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.6 }}
      whileHover={{ y: 3 }}
      className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[0.72rem] tracking-[0.14em] text-ink-3 uppercase transition-colors hover:text-ink nav:flex"
    >
      <span className="relative h-9 w-px overflow-hidden bg-linear-to-b from-sage to-transparent">
        <span ref={bead} className="absolute inset-0 bg-brand" style={{ transform: "translateY(-100%)" }} />
      </span>
      <span>Scroll</span>
    </motion.a>
  );
}
