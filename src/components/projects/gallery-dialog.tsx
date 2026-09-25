"use client";

import { AnimatePresence, motion, type PanInfo, type Variants } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { ArrowUpRightIcon } from "@/components/animated-icons/arrow-up-right";
import { ChevronLeftIcon } from "@/components/animated-icons/chevron-left";
import { ChevronRightIcon } from "@/components/animated-icons/chevron-right";
import { EyeIcon } from "@/components/animated-icons/eye";
import { GithubIcon } from "@/components/animated-icons/github";
import { XIcon } from "@/components/animated-icons/x";
import { ActionButton } from "@/components/motion/action-button";
import { useAnimatedIcon } from "@/components/motion/use-animated-icon";
import { overlayVariants, panelVariants } from "@/components/projects/dialog-motion";
import { ProjectFeatureCols, ProjectMeta, ProjectTags } from "@/components/projects/project-bits";
import { easeOutExpo, transitions } from "@/lib/motion";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const pad2 = (n: number) => String(n).padStart(2, "0");

const panel = panelVariants(24, 0.97);

// slides travel in the direction you paged
const slideVariants: Variants = {
  enter: (dir: number) => ({ x: `${dir * 40}%`, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.55, ease: easeOutExpo } },
  exit: (dir: number) => ({ x: `${dir * -40}%`, opacity: 0, scale: 0.96, transition: { duration: 0.3, ease: "easeIn" } }),
};

const ghostPill =
  "border-[1.5px] border-white/22 bg-transparent text-white hover:border-white/40 hover:bg-white/10 [&>div]:opacity-80";

/** "See more": screenshot carousel on top, dark story panel below. */
export function GalleryDialog({
  project,
  open,
  onOpenChange,
  onTryInside,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTryInside: () => void;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && project && (
          <DialogPrimitive.Portal key="gallery" forceMount>
            <DialogPrimitive.Overlay forceMount asChild>
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="shown"
                exit="hidden"
                className="gallery-overlay fixed inset-0 z-[210] bg-[rgba(14,8,3,0.82)] backdrop-blur-[10px]"
              />
            </DialogPrimitive.Overlay>
            <GalleryPanel
              // fresh slide index per project
              key={project.label}
              project={project}
              onTryInside={onTryInside}
            />
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}

function GalleryPanel({ project, onTryInside }: { project: Project; onTryInside: () => void }) {
  const [[at, dir], setSlide] = useState<[number, number]>([0, 0]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { ref: closeIconRef, triggers: closeTriggers } = useAnimatedIcon();
  const { ref: prevIconRef, triggers: prevTriggers } = useAnimatedIcon();
  const { ref: nextIconRef, triggers: nextTriggers } = useAnimatedIcon();
  const n = project.gallery.length;
  const single = n < 2;
  const go = (i: number, d = i > at ? 1 : -1) => setSlide([(i + n) % n, d]);

  function onDragEnd(_: unknown, info: PanInfo) {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -60) go(at + 1, 1);
    else if (swipe > 60) go(at - 1, -1);
  }

  const shot = project.gallery[at];

  return (
    <DialogPrimitive.Content
      forceMount
      asChild
      aria-describedby={undefined}
      onOpenAutoFocus={(e) => {
        e.preventDefault();
        closeRef.current?.focus();
      }}
      onKeyDown={(e) => {
        if (single) return;
        if (e.key === "ArrowRight") go(at + 1, 1);
        if (e.key === "ArrowLeft") go(at - 1, -1);
      }}
    >
      <motion.div
        variants={panel}
        initial="hidden"
        animate="shown"
        exit="exit"
        className="gallery-panel fixed top-1/2 left-1/2 z-[211] grid max-h-[calc(100dvh-1rem)] w-[min(980px,calc(100%-1rem))] -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[20px] bg-[#1a120c] text-[#f5ede3] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] outline-none sm:max-h-[calc(100dvh-2rem)] sm:w-[min(980px,calc(100%-4rem))]"
      >
        <div className="relative overflow-hidden border-b border-white/8 bg-[#0e0906]">
          <span className="absolute top-4 left-4 z-2 rounded-full border border-white/12 bg-black/60 px-3 py-1.5 font-mono text-[0.78rem] tracking-[0.08em] text-white/70 tabular-nums">
            <b className="text-white">{pad2(at + 1)}</b> / {pad2(n)}
          </span>
          <DialogPrimitive.Close asChild>
            <motion.button
              ref={closeRef}
              aria-label="Close"
              {...closeTriggers}
              whileHover={{ rotate: 90, scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={transitions.press}
              className="gallery-close absolute top-4 right-4 z-2 grid size-10 place-items-center rounded-full bg-white text-[#1a120c] shadow-[0_10px_24px_-10px_rgba(0,0,0,0.8)]"
            >
              <XIcon ref={closeIconRef} size={18} className="flex" />
            </motion.button>
          </DialogPrimitive.Close>
          {!single && (
            <motion.button
              type="button"
              aria-label="Previous screenshot"
              onClick={() => go(at - 1, -1)}
              {...prevTriggers}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={transitions.press}
              className="gallery-nav absolute top-1/2 left-3.5 z-2 -mt-[19px] grid size-[38px] place-items-center rounded-full border border-white/14 bg-black/70 text-white transition-colors duration-200 hover:bg-sage sm:-mt-[22px] sm:size-11"
            >
              <ChevronLeftIcon ref={prevIconRef} size={20} className="flex" />
            </motion.button>
          )}
          <div className="relative h-[min(42vh,360px)] overflow-hidden sm:h-[min(58vh,560px)]">
            <AnimatePresence initial={false} custom={dir}>
              <motion.figure
                key={shot.src}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag={single ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={onDragEnd}
                className={cn(
                  "gallery-slide absolute inset-0 flex min-h-0 min-w-0 items-center justify-center px-11 py-2.5 sm:px-[clamp(2.5rem,6vw,4rem)] sm:py-[clamp(0.75rem,2vw,1.5rem)]",
                  !single && "cursor-grab touch-pan-y active:cursor-grabbing"
                )}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1200}
                  height={750}
                  sizes="(max-width: 980px) 100vw, 900px"
                  draggable={false}
                  className="pointer-events-none h-auto max-h-full w-auto max-w-full rounded-[10px] object-contain shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] select-none"
                />
              </motion.figure>
            </AnimatePresence>
          </div>
          {!single && (
            <motion.button
              type="button"
              aria-label="Next screenshot"
              onClick={() => go(at + 1, 1)}
              {...nextTriggers}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={transitions.press}
              className="gallery-nav absolute top-1/2 right-3.5 z-2 -mt-[19px] grid size-[38px] place-items-center rounded-full border border-white/14 bg-black/70 text-white transition-colors duration-200 hover:bg-sage sm:-mt-[22px] sm:size-11"
            >
              <ChevronRightIcon ref={nextIconRef} size={20} className="flex" />
            </motion.button>
          )}
          {!single && (
            <div
              role="tablist"
              aria-label="Screenshots"
              className="absolute bottom-3.5 left-1/2 z-2 flex -translate-x-1/2 gap-[0.45rem] rounded-full bg-black/65 px-3 py-[0.45rem]"
            >
              {project.gallery.map((g, k) => (
                <motion.button
                  key={g.src}
                  type="button"
                  aria-label={`Screenshot ${k + 1} of ${n}`}
                  aria-current={k === at}
                  onClick={() => go(k)}
                  initial={false}
                  animate={{ width: k === at ? 26 : 8 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                  className="gallery-dot relative h-2 rounded-full bg-white/35"
                >
                  {k === at && (
                    <motion.span
                      layoutId="gallery-dot-active"
                      transition={{ duration: 0.35, ease: easeOutExpo }}
                      className="absolute inset-0 rounded-full bg-sage-2"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        <div className="gallery-info flex flex-col gap-4 overflow-auto p-[clamp(1.4rem,3vw,2.25rem)] pb-[clamp(1.6rem,3vw,2.5rem)]">
          <DialogPrimitive.Title className="text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-0.03em] text-white">
            {project.label}
          </DialogPrimitive.Title>
          <div className="-mt-2 flex flex-col gap-2">
            <p className="text-[1.05rem] text-white/60 italic">{project.tagline}</p>
            <ProjectMeta project={project} dark />
          </div>
          <p className="max-w-[70ch] text-white/85">{project.desc}</p>
          <ProjectTags tags={project.tags} dark />
          <div className="flex flex-wrap gap-2.5 border-t border-white/10 pt-[1.1rem]">
            <ActionButton
              href={project.live}
              target="_blank"
              rel="noopener"
              size="pill"
              icon={ArrowUpRightIcon}
              className="bg-[#f7f2e9] text-[#421b00] shadow-[0_12px_26px_-12px_rgba(0,0,0,0.8)] hover:bg-white"
            >
              Live site
            </ActionButton>
            {project.embeddable && (
              <ActionButton size="pill" icon={EyeIcon} iconSide="start" onClick={onTryInside} className={ghostPill}>
                Try it inside
              </ActionButton>
            )}
            <ActionButton
              href={project.source}
              target="_blank"
              rel="noopener"
              size="pill"
              icon={GithubIcon}
              iconSide="start"
              className={ghostPill}
            >
              Source
            </ActionButton>
          </div>
          <ProjectFeatureCols project={project} dark />
        </div>
      </motion.div>
    </DialogPrimitive.Content>
  );
}
