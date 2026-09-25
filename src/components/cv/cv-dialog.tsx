"use client";

import { AnimatePresence, motion } from "motion/react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { createContext, useContext, useMemo, useRef, useState } from "react";

import { DownloadIcon } from "@/components/animated-icons/download";
import { XIcon } from "@/components/animated-icons/x";
import { ActionButton } from "@/components/motion/action-button";
import { useAnimatedIcon } from "@/components/motion/use-animated-icon";
import { duration, easeOutExpo, transitions } from "@/lib/motion";
import { site } from "@/lib/site";

const CvDialogContext = createContext<{ open: () => void } | null>(null);

/** `useCvDialog().open()` shows the in-page CV viewer from anywhere on the page. */
export function useCvDialog() {
  const ctx = useContext(CvDialogContext);
  if (!ctx) throw new Error("useCvDialog must be used inside <CvDialogProvider>");
  return ctx;
}

export function CvDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open: () => setOpen(true) }), []);

  return (
    <CvDialogContext.Provider value={value}>
      {children}
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        {/* Radix keeps focus trap + Escape; motion owns enter/exit (exit is quicker) */}
        <AnimatePresence>{open && <CvViewer key="cv" />}</AnimatePresence>
      </DialogPrimitive.Root>
    </CvDialogContext.Provider>
  );
}

const exit = { duration: duration.state - 0.05, ease: [0.4, 0, 1, 1] } as const;

function DownloadPdf({ className }: { className?: string }) {
  return (
    <ActionButton
      href={site.cvPdf}
      download={site.cvFileName}
      variant="brand"
      size="pill"
      icon={DownloadIcon}
      iconSide="start"
      className={className}
    >
      Download PDF
    </ActionButton>
  );
}

function CloseButton({ buttonRef }: { buttonRef: React.RefObject<HTMLButtonElement | null> }) {
  const { ref: xRef, triggers: xTriggers } = useAnimatedIcon();
  return (
    <DialogPrimitive.Close asChild>
      <motion.button
        ref={buttonRef}
        type="button"
        aria-label="Close CV"
        {...xTriggers}
        whileTap={{ scale: 0.92 }}
        transition={transitions.press}
        className="grid size-10 place-items-center rounded-full border border-line text-ink-2 transition-colors duration-200 hover:bg-sage-soft hover:text-ink"
      >
        <XIcon ref={xRef} size={18} className="grid" />
      </motion.button>
    </DialogPrimitive.Close>
  );
}

function CvViewer() {
  const closeRef = useRef<HTMLButtonElement>(null);
  // the dialog opens from plain buttons (not a Radix Trigger), so return focus by hand
  const lastFocus = useRef<HTMLElement | null>(null);

  return (
    <DialogPrimitive.Portal forceMount>
      <DialogPrimitive.Overlay asChild forceMount>
        <motion.div
          className="fixed inset-0 z-200 bg-[rgba(20,10,4,0.7)] supports-backdrop-filter:backdrop-blur-[8px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: duration.state, ease: easeOutExpo } }}
          exit={{ opacity: 0, transition: exit }}
        />
      </DialogPrimitive.Overlay>
      <DialogPrimitive.Content
        asChild
        forceMount
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          lastFocus.current = document.activeElement as HTMLElement | null;
          closeRef.current?.focus();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          lastFocus.current?.focus();
        }}
      >
        <motion.div
          className="cv-panel fixed top-1/2 left-1/2 z-200 grid h-[min(92vh,1100px)] w-[min(960px,calc(100%-2*clamp(0.75rem,3vw,2.5rem)))] -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr_auto] overflow-hidden rounded-[20px] bg-bg outline-none max-[540px]:h-[calc(100dvh-1.5rem)] max-[540px]:rounded-[14px]"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: duration.overlay, ease: easeOutExpo } }}
          exit={{ opacity: 0, y: 12, scale: 0.98, transition: exit }}
        >
          <header className="flex items-center justify-between gap-4 border-b border-line bg-surface px-5 py-4">
            <div>
              <DialogPrimitive.Title className="font-heading text-[1.05rem] leading-[1.1] font-bold tracking-[-0.02em]">
                CV<span className="max-[540px]:hidden"> · Kevin Acebuche</span>
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-[0.82rem] text-ink-3 max-[540px]:hidden">
                Scroll to read. Download when you&apos;re ready.
              </DialogPrimitive.Description>
            </div>
            <div className="flex items-center gap-2.5">
              <DownloadPdf className="px-[1.05rem] py-[0.6rem] text-[0.85rem] leading-none max-[640px]:hidden" />
              <CloseButton buttonRef={closeRef} />
            </div>
          </header>

          <div className="overflow-hidden bg-[#d9cfc2]">
            <iframe src="/cv?embed=1" title="Kevin Acebuche CV" className="block size-full border-0 bg-[#d9cfc2]" />
          </div>

          <footer className="flex items-center justify-between gap-4 bg-brand-deep px-5 py-3.5 text-[0.85rem] text-white/80">
            <span>PDF · A4 · 2 pages</span>
            <DownloadPdf className="bg-white px-[1.05rem] py-[0.6rem] text-[0.85rem] leading-none text-brand-deep shadow-none hover:bg-sage-2" />
          </footer>
        </motion.div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
