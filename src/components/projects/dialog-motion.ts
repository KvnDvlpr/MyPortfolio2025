import type { Variants } from "motion/react";

import { easeOutExpo } from "@/lib/motion";

// Shared enter/exit for the two project dialogs: they arrive with weight and
// leave quickly (exit is always faster than entrance).

export const overlayVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  shown: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

export function panelVariants(rise: number, scale: number): Variants {
  return {
    hidden: { opacity: 0, y: rise, scale },
    shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: easeOutExpo } },
    exit: { opacity: 0, y: rise / 2, scale: (1 + scale) / 2, transition: { duration: 0.2, ease: "easeIn" } },
  };
}
