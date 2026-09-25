"use client";

import { type MotionValue, motion, useScroll, useTransform } from "motion/react";
import { Caveat } from "next/font/google";
import { type RefObject } from "react";

import { cn } from "@/lib/utils";

const hand = Caveat({ subsets: ["latin"], weight: ["500", "600"] });

// Drawn in a 1000×1000 box stretched over the section (preserveAspectRatio
// none + non-scaling strokes), so milestone labels can sit at matching %.
// The trail lives in the left column (under the heading) so the notes never
// cross the copy, then sweeps along the bottom edge to the flag.
const PATH =
  "M60 440 C 170 460, 320 490, 280 550 S 90 630, 130 690 S 330 730, 250 800 S 110 875, 220 925 S 660 960, 860 948";

const milestones = [
  { x: 60, y: 440, label: "Engineering grad, 2025" },
  { x: 280, y: 550, label: "Digital marketing" },
  { x: 130, y: 690, label: "Technical support" },
  { x: 250, y: 800, label: "Still learning, still building" },
  { x: 220, y: 925, label: "IT industry" },
];
const END = { x: 860, y: 948 };

/**
 * A pencil-sketch trail behind the About section: the career path drawn in
 * as the visitor reads, ending at a small flag marked "someday".
 */
export function JourneySketch({ target }: { target: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ target, offset: ["start 0.75", "end end"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const flagOpacity = useTransform(draw, [0.96, 1], [0, 1]);

  return (
    <div aria-hidden="true" className="journey pointer-events-none absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="absolute inset-0 size-full">
        {/* a second, offset pass reads as a pencil going over the line twice */}
        <motion.path
          d={PATH}
          className="journey-line journey-line-ghost"
          style={{ pathLength: draw }}
          transform="translate(3 2)"
        />
        <motion.path d={PATH} className="journey-line" style={{ pathLength: draw }} />
      </svg>

      {milestones.map((m, i) => (
        <Milestone key={m.label} x={m.x} y={m.y} progress={draw} at={i / milestones.length}>
          {m.label}
        </Milestone>
      ))}

      <motion.div
        className={cn("journey-flag", hand.className)}
        style={{ left: `${END.x / 10}%`, top: `${END.y / 10}%`, opacity: flagOpacity }}
      >
        <svg viewBox="0 0 24 32" className="journey-flag-mark">
          <path d="M4 30 V4" />
          <path d="M4 5 C 10 2, 14 9, 21 6 L 20 16 C 14 19, 10 12, 4 15" className="journey-flag-cloth" />
        </svg>
        <span>someday</span>
      </motion.div>
    </div>
  );
}

function Milestone({
  x,
  y,
  at,
  progress,
  children,
}: {
  x: number;
  y: number;
  at: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  // each dot + note appears as the line reaches it
  const opacity = useTransform(progress, [at, at + 0.06], [0, 1]);
  const scale = useTransform(progress, [at, at + 0.06], [0.4, 1]);
  return (
    <motion.div className="journey-stop" style={{ left: `${x / 10}%`, top: `${y / 10}%`, opacity }}>
      <motion.span className="journey-dot" style={{ scale }} />
      <span className={cn("journey-note", hand.className)}>{children}</span>
    </motion.div>
  );
}
