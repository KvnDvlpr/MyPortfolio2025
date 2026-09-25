"use client";

import { animate, type DOMKeyframesDefinition, type AnimationOptions, useReducedMotion } from "motion/react";
import { type RefObject, useEffect, useRef } from "react";

type Controls = ReturnType<typeof animate>;

/**
 * Runs an infinite ambient loop on `ref` and pauses it while `active` is false
 * (pass `useInView` so loops stop offscreen). Skipped entirely under reduced motion.
 */
export function useLoop(
  ref: RefObject<Element | null>,
  keyframes: DOMKeyframesDefinition,
  options: AnimationOptions,
  active = true
) {
  const reduce = useReducedMotion();
  const controls = useRef<Controls | null>(null);
  // keyframes/options are static per call site; start once
  const init = useRef({ keyframes, options });

  useEffect(() => {
    if (reduce || !ref.current) return;
    const c = animate(ref.current, init.current.keyframes, { repeat: Infinity, ...init.current.options });
    controls.current = c;
    return () => {
      c.stop();
      controls.current = null;
    };
  }, [reduce, ref]);

  useEffect(() => {
    if (active) controls.current?.play();
    else controls.current?.pause();
  }, [active]);
}
