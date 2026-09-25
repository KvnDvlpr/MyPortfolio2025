"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";

import { KvnMark } from "@/components/icons/kvn-mark";
import { easeOutExpo } from "@/lib/motion";
import type { Project, ProjectKey } from "@/lib/projects";
import { cn } from "@/lib/utils";

export type NotePhase = "opening" | "closing";

// The sheet's outline, from crumpled to flat. Every polygon has the same 17
// points so motion can tween between them.
const CRUMPLED =
  "polygon(4% 6%, 18% 1%, 37% 5.5%, 55% 1.5%, 74% 6%, 96% 2%, 100% 22%, 94% 45%, 100% 68%, 96% 94%, 78% 100%, 52% 94%, 28% 100%, 6% 96%, 0% 74%, 5% 50%, 0% 25%)";
const Q3 =
  "polygon(3% 4%, 18% 0.5%, 37% 4%, 55% 1%, 74% 4%, 97% 1.5%, 100% 22%, 95.5% 45%, 100% 68%, 97% 95.5%, 78% 100%, 52% 95.5%, 28% 100%, 4.5% 97%, 0% 74%, 3.5% 50%, 0% 25%)";
const HALF =
  "polygon(1.5% 2%, 18% 0.25%, 37% 2%, 55% 0.5%, 74% 2%, 98.5% 0.75%, 100% 22%, 97.75% 45%, 100% 68%, 98.5% 97.75%, 78% 100%, 52% 97.75%, 28% 100%, 2.25% 98.5%, 0% 74%, 1.75% 50%, 0% 25%)";
const FLAT =
  "polygon(0% 0%, 18% 0%, 37% 0%, 55% 0%, 74% 0%, 100% 0%, 100% 22%, 100% 45%, 100% 68%, 100% 100%, 78% 100%, 52% 100%, 28% 100%, 0% 100%, 0% 74%, 0% 50%, 0% 25%)";

/** the unfold: slow start, a lift past flat, then it settles */
const bloomEase = [0.22, 1, 0.36, 1] as const;
const BLOOM = { duration: 1.6, ease: bloomEase };
const CLOSE = { duration: 0.8, ease: easeOutExpo };

function noteVariants(tilt: number, hoverable: boolean): Variants {
  return {
    rest: { rotate: tilt, scale: 0.94, y: 0 },
    open: { rotate: 0, scale: 1, y: -8 },
    // whileHover stays mounted so motion always sees hover end; an open or
    // moving note just has nothing to do on hover
    hover: hoverable ? { rotate: tilt * 0.6, scale: 0.96, y: -4, transition: { duration: 0.7, ease: easeOutExpo } } : {},
    // null = start from wherever the note is, so fast re-clicks never jump
    opening: {
      rotate: [null, tilt * 0.8, tilt * -0.3, tilt * 0.12, 0, 0],
      scale: [null, 0.92, 1.01, 1.05, 0.99, 1],
      y: [null, -2, -9, -13, -7, -8],
      transition: { ...BLOOM, times: [0, 0.22, 0.48, 0.72, 0.88, 1] },
    },
    closing: {
      rotate: [null, tilt * 1.3, tilt],
      scale: [null, 0.9, 0.94],
      y: [null, 2, 0],
      transition: CLOSE,
    },
  };
}

const sheetVariants: Variants = {
  rest: { clipPath: CRUMPLED },
  open: { clipPath: FLAT },
  opening: { clipPath: [null, CRUMPLED, Q3, HALF, FLAT], transition: { ...BLOOM, times: [0, 0.18, 0.42, 0.66, 1] } },
  closing: { clipPath: [null, HALF, CRUMPLED], transition: { ...CLOSE, times: [0, 0.4, 1] } },
};

// the crease skin fades as the note is smoothed out
const creaseVariants: Variants = {
  rest: { clipPath: CRUMPLED, opacity: 1 },
  open: { clipPath: FLAT, opacity: 0.16 },
  opening: {
    clipPath: [null, CRUMPLED, Q3, HALF, FLAT],
    opacity: [null, 1, 0.75, 0.16],
    transition: { ...BLOOM, times: [0, 0.2, 0.55, 1], clipPath: { ...BLOOM, times: [0, 0.18, 0.42, 0.66, 1] } },
  },
  closing: { clipPath: [null, HALF, CRUMPLED], opacity: 1, transition: { ...CLOSE, times: [0, 0.4, 1] } },
};

// the ink sharpens as the paper flattens
const inkVariants: Variants = {
  opening: { filter: ["blur(0.4px)", "blur(0.15px)", "blur(0px)"], transition: { duration: 1.6, ease: "easeOut" } },
};

/** the logo tile tips up with a little give */
const logoSpring = { type: "spring", stiffness: 380, damping: 20 } as const;
const logoLifted = { y: -2, rotate: -6, scale: 1.06 };
const logoVariants: Variants = {
  rest: { y: 0, rotate: 0, scale: 1 },
  open: logoLifted,
  hover: logoLifted,
  opening: logoLifted,
  closing: { y: 0, rotate: 0, scale: 1 },
};

// The glass tile around each note: its glow and luminous ring brighten on
// hover and stay lit while the note is open. Labels match noteVariants, so
// the tile's animate state propagates down to the paper and its layers.
const glowVariants: Variants = {
  rest: { opacity: 0.35, scale: 0.98 },
  hover: { opacity: 0.85, scale: 1, transition: { duration: 0.5, ease: easeOutExpo } },
  open: { opacity: 1, scale: 1.01 },
  opening: { opacity: 1, scale: 1.01, transition: { duration: 0.9, ease: easeOutExpo } },
  closing: { opacity: 0.35, scale: 0.98, transition: CLOSE },
};
const ringVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 0.7, transition: { duration: 0.35, ease: easeOutExpo } },
  open: { opacity: 1 },
  opening: { opacity: 1, transition: { duration: 0.6, ease: easeOutExpo } },
  closing: { opacity: 0, transition: CLOSE },
};

/** One crumpled note on a glass tile; a disclosure button for its project. */
export function PaperNote({
  id,
  project,
  tilt,
  seed,
  selected,
  phase,
  onSelect,
  onPhaseEnd,
}: {
  id: ProjectKey;
  project: Project;
  tilt: number;
  seed: number;
  selected: boolean;
  phase: NotePhase | null;
  onSelect: () => void;
  onPhaseEnd: () => void;
}) {
  const state = phase ?? (selected ? "open" : "rest");
  const hoverable = !selected && !phase;

  return (
    <motion.button
      type="button"
      id={`paperTab-${id}`}
      aria-expanded={selected}
      aria-controls={selected ? "projectDetail" : undefined}
      onClick={onSelect}
      initial={false}
      animate={state}
      // whileHover stays mounted so motion always sees hover end; an open or
      // moving note just has nothing to do on hover
      whileHover={hoverable ? "hover" : undefined}
      whileFocus={hoverable ? "hover" : undefined}
      className={cn("paper-tile group", phase === "opening" && "z-3")}
      style={{ "--seed": seed } as React.CSSProperties}
    >
      <motion.span className="paper-tile-glow" variants={glowVariants} aria-hidden="true" />
      <span className="paper-tile-glass" aria-hidden="true" />
      <motion.span className="paper-tile-ring" variants={ringVariants} aria-hidden="true" />

      <motion.span
        className="paper"
        variants={noteVariants(tilt, hoverable)}
        transition={{ duration: 0.7, ease: easeOutExpo }}
        onAnimationComplete={(def) => def === phase && onPhaseEnd()}
      >
        <motion.span className="paper-sheet" variants={sheetVariants} aria-hidden="true" />
        <motion.span className="paper-crumple" variants={creaseVariants} aria-hidden="true" />
        <span className="paper-tape" aria-hidden="true" />
        <motion.span className="paper-inner" variants={inkVariants}>
          {project.mark === "kvn" ? (
            <motion.span className="paper-logo is-mark" variants={logoVariants} transition={logoSpring} aria-hidden="true">
              <KvnMark className="size-6" />
            </motion.span>
          ) : (
            project.logo && (
              <motion.span className="paper-logo" variants={logoVariants} transition={logoSpring} aria-hidden="true">
                <Image src={project.logo} alt="" width={40} height={40} />
              </motion.span>
            )
          )}
          <span className="pr-14 font-heading text-[clamp(1.35rem,2vw,1.6rem)] leading-[1.1] font-extrabold tracking-[-0.02em]">
            {project.label}
          </span>
          <span className="paper-note text-[0.93rem] leading-normal opacity-80">{project.note}</span>
          <span className="paper-hint mt-auto inline-flex items-center gap-1.5 pt-3.5 text-[0.78rem] font-semibold opacity-60">
            {selected ? "Tap to fold back" : "Tap to unfold"}
          </span>
        </motion.span>
      </motion.span>
    </motion.button>
  );
}
