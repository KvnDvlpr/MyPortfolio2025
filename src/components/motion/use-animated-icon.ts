"use client";

import { useMemo, useRef } from "react";

/** Imperative handle every lucide-animated icon exposes. */
export type AnimatedIconHandle = { startAnimation: () => void; stopAnimation: () => void };

/**
 * Lets a whole control (link, button, tile) drive a lucide-animated icon:
 * spread `triggers` on the control and pass `ref` to the icon. Passing a ref
 * switches the icon to controlled mode, so it no longer reacts to its own hover.
 *
 * Destructure the result (`const { ref, triggers } = …`); reading `x.ref` during
 * render trips the React Compiler refs lint. Never call stopAnimation from an
 * effect cleanup — motion throws if the icon is already unmounting.
 */
export function useAnimatedIcon<T extends AnimatedIconHandle = AnimatedIconHandle>() {
  const ref = useRef<T>(null);
  const triggers = useMemo(
    () => ({
      onMouseEnter: () => ref.current?.startAnimation(),
      onMouseLeave: () => ref.current?.stopAnimation(),
      onFocus: () => ref.current?.startAnimation(),
      onBlur: () => ref.current?.stopAnimation(),
    }),
    []
  );
  return { ref, triggers };
}
