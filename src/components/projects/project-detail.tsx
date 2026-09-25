"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";

import { ArrowRightIcon } from "@/components/animated-icons/arrow-right";
import { ArrowUpRightIcon } from "@/components/animated-icons/arrow-up-right";
import { KvnMark } from "@/components/icons/kvn-mark";
import { ActionButton } from "@/components/motion/action-button";
import { useAnimatedIcon } from "@/components/motion/use-animated-icon";
import { ProjectMeta, ProjectTags } from "@/components/projects/project-bits";
import { easeOutExpo, transitions } from "@/lib/motion";
import type { Project, ProjectKey } from "@/lib/projects";

const heroBg: Record<ProjectKey, string> = {
  daywell: "#f4ecd6",
  setlist: "#ffffff",
  portfolio: "#f4ecd6",
};

// After the panel's outline opens, each block of the story unfolds in turn.
const bodyVariants: Variants = {
  enter: { transition: { delayChildren: 0.42, staggerChildren: 0.1 } },
};
const petal: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.985 },
  enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};
// the logo pops in with a little overshoot…
const logoPop: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -6 },
  enter: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.9, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] } },
};
// …and floats up while the panel is hovered
const logoFloat: Variants = {
  enter: { y: 0, rotate: 0, transition: { duration: 0.6, ease: easeOutExpo } },
  hover: { y: -6, rotate: -2, transition: { duration: 0.6, ease: easeOutExpo } },
};

/** Body of the detail panel: logo tile + story + actions. */
export function ProjectDetailBody({
  id,
  project,
  onMore,
}: {
  id: ProjectKey;
  project: Project;
  onMore: () => void;
}) {
  const { ref: moreIconRef, triggers: moreTriggers } = useAnimatedIcon();

  return (
    <>
      <div
        className="project-hero grid min-h-[220px] place-items-center p-[clamp(1.5rem,3vw,2.5rem)] text-brand min-[961px]:min-h-[340px]"
        style={{ "--hero-bg": heroBg[id] } as React.CSSProperties}
      >
        <motion.div variants={logoFloat} className="grid w-full place-items-center">
          <motion.div variants={logoPop} className="grid w-full place-items-center">
            {project.mark === "kvn" ? (
              <KvnMark className="project-hero-mark h-auto w-[min(38%,170px)] text-brand" />
            ) : (
              project.logo && (
                <Image
                  src={project.logo}
                  alt={`${project.label} logo`}
                  width={project.logoWidth ?? 300}
                  height={project.logoHeight ?? 300}
                  sizes="300px"
                  className="project-hero-logo h-auto max-h-[170px] w-[min(62%,300px)] object-contain min-[961px]:max-h-[260px]"
                />
              )
            )}
          </motion.div>
        </motion.div>
      </div>
      <motion.div variants={bodyVariants} className="project-body flex flex-col gap-5 p-[clamp(1.5rem,3vw,2.5rem)]">
        <motion.h3 variants={petal} className="text-[clamp(2rem,3.6vw,2.9rem)] leading-none tracking-[-0.03em]">
          {project.label}
        </motion.h3>
        <motion.div variants={petal} className="-mt-1.5 flex flex-col gap-2">
          <p className="text-base text-ink-3 italic">{project.tagline}</p>
          <ProjectMeta project={project} />
        </motion.div>
        <motion.p variants={petal} className="text-ink-2">
          {project.desc}
        </motion.p>
        <motion.div variants={petal}>
          <ProjectTags tags={project.tags} />
        </motion.div>
        <motion.div variants={petal} className="mt-auto flex flex-wrap gap-3">
          <ActionButton
            href={project.live}
            target="_blank"
            rel="noopener"
            variant="brand"
            size="pill"
            icon={ArrowUpRightIcon}
            className="w-full min-[541px]:w-auto"
          >
            Live site
          </ActionButton>
          <motion.button
            type="button"
            aria-haspopup="dialog"
            onClick={onMore}
            {...moreTriggers}
            whileHover="nudge"
            whileFocus="nudge"
            whileTap={{ scale: 0.97 }}
            transition={transitions.press}
            className="project-more group/more inline-flex items-center gap-2.5 px-1.5 py-2 font-semibold text-ink"
          >
            See more
            <motion.span
              variants={{ nudge: { x: 3 } }}
              transition={transitions.press}
              className="project-more-arrow grid size-[30px] place-items-center rounded-full bg-sage text-white group-hover/more:bg-sage-ink group-focus-visible/more:bg-sage-ink"
            >
              <ArrowRightIcon ref={moreIconRef} size={15} className="flex" />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}
