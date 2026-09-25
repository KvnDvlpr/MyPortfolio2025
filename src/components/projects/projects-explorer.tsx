"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { useState } from "react";

import { AppPreviewDialog } from "@/components/projects/app-preview-dialog";
import { GalleryDialog } from "@/components/projects/gallery-dialog";
import { type NotePhase, PaperNote } from "@/components/projects/paper-note";
import { ProjectDetailBody } from "@/components/projects/project-detail";
import { easeOutExpo } from "@/lib/motion";
import { projects, type ProjectKey } from "@/lib/projects";

const notes: { key: ProjectKey; tilt: number; seed: number }[] = [
  { key: "daywell", tilt: -2.5, seed: 0 },
  { key: "setlist", tilt: 1.8, seed: 1 },
  { key: "portfolio", tilt: -1.2, seed: 2 },
];

const bloomEase = [0.22, 1, 0.36, 1] as const;

// The new panel blooms from a bud at the top centre, like the smoothed note.
// All four polygons share 12 points so motion can tween the outline.
const BUD = "polygon(44% 0%, 46% 0%, 48% 2%, 50% 0%, 52% 2%, 54% 0%, 56% 2%, 58% 0%, 60% 0%, 60% 18%, 50% 22%, 40% 18%)";
const PETAL = "polygon(10% 4%, 18% 0%, 28% 3%, 40% 0%, 50% 3%, 60% 0%, 72% 3%, 84% 0%, 92% 4%, 92% 70%, 50% 75%, 8% 70%)";
const NEAR = "polygon(0% 1.5%, 12% 0%, 25% 1%, 40% 0%, 50% 1%, 60% 0%, 75% 1%, 90% 0%, 100% 1.5%, 100% 100%, 50% 100%, 0% 100%)";
const OPEN = "polygon(0% 0%, 12% 0%, 25% 0%, 40% 0%, 50% 0%, 60% 0%, 75% 0%, 90% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)";

const panelVariants: Variants = {
  hidden: { opacity: 0.35, y: -10, scaleY: 0.86, clipPath: BUD },
  enter: {
    opacity: [0.35, 1, 1, 1],
    y: [-10, -5, -2, 0],
    scaleY: [0.86, 0.94, 0.98, 1],
    clipPath: [BUD, PETAL, NEAR, OPEN],
    transition: { duration: 1.15, ease: bloomEase, times: [0, 0.45, 0.75, 1] },
  },
  // the old panel folds away quickly before the new one opens
  exit: { opacity: 0, y: 14, scale: 0.97, transition: { duration: 0.26, ease: easeOutExpo } },
};

// reduced motion: a plain cross-fade, no unfolding outline. The settled
// "enter" values match panelVariants so server and client render the same.
const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 0, scaleY: 1, clipPath: OPEN },
  enter: { opacity: 1, y: 0, scaleY: 1, clipPath: OPEN, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/** Paper-note tabs, the detail panel they control, and the two project dialogs. */
export function ProjectsExplorer() {
  const reduceMotion = useReducedMotion();
  // nothing is open until the visitor picks a note (same on server and client)
  const [selected, setSelected] = useState<ProjectKey | null>(null);
  const [phases, setPhases] = useState<Partial<Record<ProjectKey, NotePhase>>>({});
  const [galleryKey, setGalleryKey] = useState<ProjectKey | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [appKey, setAppKey] = useState<ProjectKey | null>(null);
  const [appOpen, setAppOpen] = useState(false);

  // tapping the open note folds it back; tapping another swaps them
  function toggle(key: ProjectKey) {
    const prev = selected;
    if (key === prev) {
      setSelected(null);
      setPhases(reduceMotion ? {} : { [key]: "closing" });
      return;
    }
    setSelected(key);
    // the note we leave crumples back up, the new one blooms open
    setPhases(reduceMotion ? {} : { ...(prev && { [prev]: "closing" }), [key]: "opening" });
  }

  // the panel opens below the fold on short screens; nudge it into view
  function bringIntoView() {
    const el = document.getElementById("projectDetail");
    if (!el || el.getBoundingClientRect().top < window.innerHeight * 0.7) return;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }

  function openGallery(key: ProjectKey) {
    setGalleryKey(key);
    setGalleryOpen(true);
  }

  function tryInside() {
    if (!galleryKey || !projects[galleryKey].embeddable) return;
    setGalleryOpen(false);
    setAppKey(galleryKey);
    setAppOpen(true);
  }

  return (
    <>
      <div className="paper-pile" role="group" aria-label="Projects">
        {notes.map((note) => (
          <PaperNote
            key={note.key}
            id={note.key}
            project={projects[note.key]}
            tilt={note.tilt}
            seed={note.seed}
            selected={selected === note.key}
            phase={phases[note.key] ?? null}
            onSelect={() => toggle(note.key)}
            onPhaseEnd={() => setPhases((m) => ({ ...m, [note.key]: undefined }))}
          />
        ))}
      </div>

      {/* wait: the old panel folds away, then the new one blooms in */}
      <AnimatePresence mode="wait" initial={false}>
        {selected && (
          <motion.article
            key={selected}
            id="projectDetail"
            role="region"
            aria-labelledby={`paperTab-${selected}`}
            variants={reduceMotion ? fadeVariants : panelVariants}
            initial="hidden"
            animate="enter"
            exit="exit"
            whileHover="hover"
            onAnimationStart={(def) => def === "enter" && bringIntoView()}
            style={{ transformOrigin: "50% 0%" }}
            className="project-detail grid grid-cols-1 overflow-hidden rounded-3xl border border-line bg-surface shadow-soft-md min-[961px]:grid-cols-2"
          >
            <ProjectDetailBody id={selected} project={projects[selected]} onMore={() => openGallery(selected)} />
          </motion.article>
        )}
      </AnimatePresence>

      <GalleryDialog
        project={galleryKey ? projects[galleryKey] : null}
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
        onTryInside={tryInside}
      />
      <AppPreviewDialog
        project={appKey ? projects[appKey] : null}
        open={appOpen}
        onOpenChange={setAppOpen}
        returnFocus={() => document.querySelector<HTMLElement>("#projectDetail .project-more")?.focus()}
      />
    </>
  );
}
