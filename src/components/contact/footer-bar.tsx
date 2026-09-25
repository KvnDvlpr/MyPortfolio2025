"use client";

import { motion } from "motion/react";

import { ArrowUpIcon } from "@/components/animated-icons/arrow-up";
import { useAnimatedIcon } from "@/components/motion/use-animated-icon";
import { transitions } from "@/lib/motion";

/** Bottom bar of the footer: copyright + back to top. */
export function FooterBar({ year }: { year: number }) {
  const { ref: upRef, triggers: upTriggers } = useAnimatedIcon();

  return (
    <div className="container-page flex flex-wrap items-center justify-between gap-4 border-t border-white/12 py-7 text-[0.88rem] text-white/60 max-[540px]:justify-center max-[540px]:text-center">
      <p>
        &copy; {year} All rights reserved |{" "}
        <a href="#home" className="font-heading font-semibold text-white/85 transition-colors duration-200 hover:text-sage-2">
          kvndvlpr
        </a>
      </p>
      <motion.a
        href="#home"
        {...upTriggers}
        whileTap={{ y: 1 }}
        transition={transitions.press}
        className="inline-flex items-center gap-1.5 border-b border-white/25 font-medium text-white/85 transition-colors duration-200 hover:border-sage-2 hover:text-sage-2"
      >
        Back to top
        <ArrowUpIcon ref={upRef} size={14} className="grid" />
      </motion.a>
    </div>
  );
}
