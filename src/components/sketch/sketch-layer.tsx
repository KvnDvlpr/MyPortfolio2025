"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

import { useLoop } from "@/components/motion/use-loop";
import { type DoodleName, doodles } from "@/components/sketch/doodles";
import { cn } from "@/lib/utils";

export type SketchItem = {
  doodle: DoodleName;
  /** position + size + rotation, e.g. "top-[8%] left-[4%] w-24 -rotate-12 hidden nav:block" */
  className: string;
};

type Phase = "hidden" | "shown" | "erase";

const stroke: Variants = {
  hidden: { pathLength: 0, opacity: 0, transition: { duration: 0 } },
  shown: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: [0.45, 0, 0.2, 1], delay: 0.1 + i * 0.1 },
      opacity: { duration: 0.2, delay: 0.1 + i * 0.1 },
    },
  }),
  // lifted off the page in reverse order, faster than it was drawn
  erase: (i: number) => ({
    pathLength: 0,
    opacity: 0.2,
    transition: { duration: 0.45, ease: [0.4, 0, 1, 1], delay: Math.max(0, 0.25 - i * 0.04) },
  }),
};
const shade: Variants = {
  hidden: { opacity: 0, transition: { duration: 0 } },
  shown: (i: number) => ({ opacity: 1, transition: { duration: 0.6, delay: 1 + i * 0.1 } }),
  erase: { opacity: 0, transition: { duration: 0.25 } },
};

const ERASE_MS = 650;

/**
 * Pencil doodles behind a section. Light mode draws them as graphite on
 * paper, dark mode as glowing chalk. Each doodle sketches itself in when it
 * first scrolls into view, then lives: it sways slowly, now and then erases
 * and re-sketches itself, and every doodle on screen erases and redraws in the
 * new medium when the theme flips. `tone="light"` is for dark surfaces.
 */
export function SketchLayer({ items, tone = "ink" }: { items: SketchItem[]; tone?: "ink" | "light" }) {
  const { resolvedTheme } = useTheme();
  return (
    <div aria-hidden="true" className={cn("sketch-layer", tone === "light" && "sketch-light")}>
      {items.map((item, i) => (
        <SketchDoodle key={`${item.doodle}-${i}`} item={item} index={i} theme={resolvedTheme} />
      ))}
    </div>
  );
}

function SketchDoodle({ item, index, theme }: { item: SketchItem; index: number; theme?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const visible = useInView(ref, { margin: "80px" });
  const reduce = useReducedMotion();
  // null = resting; "erase" while a redraw lifts the lines off
  const [override, setOverride] = useState<Phase | null>(null);
  const lastTheme = useRef(theme);
  // first time on screen it sketches in; after that it rests drawn
  const phase: Phase = !seen ? "hidden" : (override ?? "shown");

  // erase → redraw, used by the theme flip and the idle cycle
  const redrawTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const redraw = useRef(() => {
    setOverride("erase");
    if (redrawTimer.current) clearTimeout(redrawTimer.current);
    redrawTimer.current = setTimeout(() => setOverride(null), ERASE_MS);
  });
  useEffect(() => () => void (redrawTimer.current && clearTimeout(redrawTimer.current)), []);

  // theme flip: every doodle already on screen re-sketches in the new medium
  useEffect(() => {
    const prev = lastTheme.current;
    lastTheme.current = theme;
    if (!prev || !theme || prev === theme || !seen || reduce) return;
    // a small stagger so the page redraws like a hand moving across it
    const t = setTimeout(() => redraw.current(), index * 90);
    return () => clearTimeout(t);
  }, [theme, seen, reduce, index]);

  // idle life: now and then erase and re-sketch, staggered per doodle
  useEffect(() => {
    if (!seen || !visible || reduce) return;
    const first = setTimeout(() => redraw.current(), 9000 + index * 3700);
    const every = setInterval(() => redraw.current(), 17000 + index * 2300);
    return () => {
      clearTimeout(first);
      clearInterval(every);
    };
  }, [seen, visible, reduce, index]);

  // slow sway; each doodle breathes at its own pace, paused offscreen
  useLoop(
    ref,
    { y: [0, -6, 0], rotate: [0, index % 2 ? -2 : 2, 0] },
    { duration: 6.5 + (index % 4) * 1.4, ease: "easeInOut", delay: index * 0.6 },
    visible
  );

  const d = doodles[item.doodle] as { paths: string[]; fill?: string[]; dashed?: string[] };
  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 120 120"
      className={cn("sketch", item.className)}
      initial="hidden"
      animate={phase}
    >
      <g className="sketch-ghost" transform="translate(1.6 1.1)">
        {d.paths.map((p, j) => (
          <motion.path key={j} d={p} variants={stroke} custom={j} />
        ))}
      </g>
      <g className="sketch-stroke">
        {d.paths.map((p, j) => (
          <motion.path key={j} d={p} variants={stroke} custom={j} />
        ))}
        {d.dashed?.map((p, j) => (
          <motion.path key={`d${j}`} d={p} className="sketch-dashed" variants={shade} custom={j} />
        ))}
      </g>
      {d.fill?.map((p, j) => (
        <motion.path key={`f${j}`} d={p} className="sketch-fill" variants={shade} custom={j} />
      ))}
    </motion.svg>
  );
}
