"use client";

import { Monitor, Smartphone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { ArrowUpRightIcon } from "@/components/animated-icons/arrow-up-right";
import { XIcon } from "@/components/animated-icons/x";
import { ActionButton } from "@/components/motion/action-button";
import { useAnimatedIcon } from "@/components/motion/use-animated-icon";
import { overlayVariants, panelVariants } from "@/components/projects/dialog-motion";
import { easeOutExpo, transitions } from "@/lib/motion";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const panel = panelVariants(16, 0.98);
const frameTransition = { duration: 0.45, ease: easeOutExpo };

/** The real project embedded in an iframe, in a desktop or phone frame. */
export function AppPreviewDialog({
  project,
  open,
  onOpenChange,
  returnFocus,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** where focus goes on close (the element that opened it may be gone) */
  returnFocus?: () => void;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && project && (
          <DialogPrimitive.Portal key="app" forceMount>
            <DialogPrimitive.Overlay forceMount asChild>
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="shown"
                exit="hidden"
                className="app-overlay fixed inset-0 z-[200] bg-[rgba(20,10,4,0.7)] backdrop-blur-[8px]"
              />
            </DialogPrimitive.Overlay>
            <AppPanel key={project.live} project={project} returnFocus={returnFocus} />
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}

function AppPanel({ project, returnFocus }: { project: Project; returnFocus?: () => void }) {
  const [device, setDevice] = useState<"desktop" | "phone">("desktop");
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { ref: closeIconRef, triggers: closeTriggers } = useAnimatedIcon();
  const phone = device === "phone";

  // after 8s without a load event, suggest opening it in a new tab
  useEffect(() => {
    if (loaded) return;
    const t = setTimeout(() => setSlow(true), 8000);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <DialogPrimitive.Content
      forceMount
      asChild
      aria-describedby={undefined}
      onOpenAutoFocus={(e) => {
        e.preventDefault();
        closeRef.current?.focus();
      }}
      onCloseAutoFocus={(e) => {
        if (!returnFocus) return;
        e.preventDefault();
        returnFocus();
      }}
    >
      <motion.div
        variants={panel}
        initial="hidden"
        animate="shown"
        exit="exit"
        className="app-panel fixed top-1/2 left-1/2 z-[201] grid h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr_auto] overflow-hidden rounded-[14px] bg-bg shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)] outline-none min-[541px]:h-[min(92vh,1000px)] min-[541px]:w-[min(1200px,calc(100%-2*clamp(0.75rem,3vw,2.5rem)))] min-[541px]:rounded-[20px]"
      >
        <header className="flex items-center justify-between gap-4 border-b border-line bg-surface px-5 py-4">
          <div className="min-w-0">
            <DialogPrimitive.Title className="text-[1.05rem]">
              {project.label}
              <span className="hidden min-[541px]:inline"> · live preview</span>
            </DialogPrimitive.Title>
            <p className="hidden text-[0.82rem] text-ink-3 min-[541px]:block">{project.host}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <div
              role="group"
              aria-label="Preview size"
              className="hidden rounded-full border border-line bg-bg p-[3px] min-[961px]:inline-flex"
            >
              {(
                [
                  { key: "desktop", label: "Desktop", Icon: Monitor },
                  { key: "phone", label: "Phone", Icon: Smartphone },
                ] as const
              ).map(({ key, label, Icon }) => (
                <motion.button
                  key={key}
                  type="button"
                  aria-pressed={device === key}
                  onClick={() => setDevice(key)}
                  whileTap={{ scale: 0.96 }}
                  transition={transitions.press}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.8rem] font-semibold transition-colors duration-200",
                    device === key ? "text-on-brand" : "text-ink-3 hover:text-ink"
                  )}
                >
                  {/* the brand pill slides to whichever size is active */}
                  {device === key && (
                    <motion.span
                      layoutId="app-device-pill"
                      transition={frameTransition}
                      className="absolute inset-0 rounded-full bg-brand"
                    />
                  )}
                  <Icon className="relative size-[15px]" />
                  <span className="relative">{label}</span>
                </motion.button>
              ))}
            </div>
            <ActionButton
              href={project.live}
              target="_blank"
              rel="noopener"
              variant="brand"
              size="pill"
              icon={ArrowUpRightIcon}
              className="hidden px-[1.05rem] py-2.5 text-[0.85rem] leading-none min-[641px]:inline-flex"
            >
              Open live site
            </ActionButton>
            <DialogPrimitive.Close asChild>
              <motion.button
                ref={closeRef}
                aria-label="Close preview"
                {...closeTriggers}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.94 }}
                transition={transitions.press}
                className="grid size-10 place-items-center rounded-full border border-line text-ink-2 transition-colors duration-200 hover:bg-sage-soft hover:text-ink"
              >
                <XIcon ref={closeIconRef} size={18} className="flex" />
              </motion.button>
            </DialogPrimitive.Close>
          </div>
        </header>

        <div className="relative grid place-items-center overflow-hidden bg-bg-3 p-[clamp(0.5rem,2vw,1.5rem)]">
          {/* the frame morphs between desktop and phone as one object */}
          <motion.div
            layout
            transition={frameTransition}
            initial={false}
            animate={{ borderRadius: phone ? 40 : 14, borderWidth: phone ? 10 : 0 }}
            className={cn(
              "app-device relative overflow-hidden border-solid border-[#1a120c] bg-white shadow-soft-lg",
              phone ? "h-[min(100%,800px)] w-[min(390px,100%)]" : "h-full w-full"
            )}
          >
            <iframe
              src={project.live}
              title="Live app preview"
              onLoad={() => setLoaded(true)}
              className="block size-full border-0 bg-white"
            />
            <AnimatePresence>
              {!loaded && (
                <motion.div
                  key="loading"
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  className="app-loading absolute inset-0 grid place-content-center justify-items-center gap-3 bg-bg-3 p-4 text-center text-[0.9rem] text-ink-3"
                >
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
                    className="app-spinner size-[30px] rounded-full border-3 border-line-strong border-t-sage"
                  />
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={slow ? "slow" : "loading"}
                      role="status"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
                    >
                      {slow ? "Still loading… if nothing shows up, open it in a new tab." : "Loading the live app…"}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <footer className="flex items-center justify-between gap-4 bg-brand-deep px-5 py-3.5 text-[0.85rem] text-white/80">
          <span>This is the real app, embedded. Click around; nothing here is a screenshot.</span>
          <ActionButton
            href={project.live}
            target="_blank"
            rel="noopener"
            size="pill"
            icon={ArrowUpRightIcon}
            className="bg-white px-[1.05rem] py-2.5 text-[0.85rem] leading-none text-brand-deep hover:bg-sage-2"
          >
            Open in new tab
          </ActionButton>
        </footer>
      </motion.div>
    </DialogPrimitive.Content>
  );
}
