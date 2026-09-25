import type { Transition } from "motion/react";

/** Shared motion vocabulary — every animation on the site draws from here. */

/** Exponential ease-out: confident arrivals, no bounce. Same curve as --ease-out-expo. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const duration = {
  feedback: 0.15, // hover / press acknowledgement
  state: 0.25, // routine state change
  overlay: 0.4, // dialogs, menus, layout moves
  focal: 0.8, // the hero entrance
} as const;

export const transitions = {
  feedback: { duration: duration.feedback, ease: easeOutExpo },
  state: { duration: duration.state, ease: easeOutExpo },
  overlay: { duration: duration.overlay, ease: easeOutExpo },
  /** Snappy spring for hover lifts and presses. */
  press: { type: "spring", stiffness: 520, damping: 32, mass: 0.6 },
  /** Soft spring for things that follow the pointer. */
  follow: { type: "spring", stiffness: 140, damping: 18, mass: 0.5 },
} satisfies Record<string, Transition>;

/** Hover lift used by buttons and tiles: rise on hover, settle on press. */
export const lift = {
  whileHover: { y: -2 },
  whileTap: { y: 0, scale: 0.98 },
  transition: transitions.press,
} as const;
