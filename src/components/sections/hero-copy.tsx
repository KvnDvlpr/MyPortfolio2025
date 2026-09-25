"use client";

import { motion } from "motion/react";

import { ArrowRightIcon } from "@/components/animated-icons/arrow-right";
import { DownloadIcon } from "@/components/animated-icons/download";
import { ActionButton } from "@/components/motion/action-button";
import { easeOutExpo } from "@/lib/motion";
import { site } from "@/lib/site";

// The hero's focal entrance: pill → headline word by word (rising out of a
// blur) → sage underlines draw in → actions settle. One rehearsed sequence.
const headline = [
  [{ w: "Learning" }, { w: "by" }, { w: "building,", accent: true }],
  [{ w: "shipping", accent: true }, { w: "as" }, { w: "I" }, { w: "go." }],
];
const wordDelay = (line: number, i: number) => (line === 0 ? 0.05 : 0.36) + i * 0.08;

const rise = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export function HeroCopy() {
  return (
    <div className="flex flex-col items-center nav:block">
      <motion.p
        {...rise}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.8rem] font-medium text-ink-2"
      >
        <span className="relative grid size-2 flex-none place-items-center">
          {/* availability ping; ambient, so reduced motion hides it (via CSS so SSR markup matches) */}
          <motion.span
            className="absolute inset-0 rounded-full bg-ok motion-reduce:hidden"
            animate={{ scale: [1, 2.6], opacity: [0.45, 0] }}
            transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity, repeatDelay: 1.2, delay: 1.4 }}
          />
          <span className="size-2 rounded-full bg-ok" />
        </span>
        Open to IT &amp; junior developer roles
      </motion.p>

      <h1 className="mb-5 text-[clamp(2.4rem,5.4vw,4.2rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance">
        {headline.map((line, li) => (
          <span key={li} className="block">
            {line.map(({ w, accent }, wi) => (
              <span key={w}>
                <motion.span
                  className={accent ? "relative inline-block text-sage" : "inline-block"}
                  initial={{ opacity: 0, y: "0.6em", rotate: 2, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, ease: easeOutExpo, delay: wordDelay(li, wi) }}
                >
                  {w}
                  {accent && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute right-[0.15em] bottom-[0.02em] left-0 -z-1 h-[0.12em] origin-left rounded-full bg-sage-2 opacity-75"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, ease: easeOutExpo, delay: 1 }}
                    />
                  )}
                </motion.span>
                {wi < line.length - 1 && " "}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <motion.div
        {...rise}
        transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.75 }}
        className="mb-9 flex flex-wrap justify-center gap-3 nav:justify-start"
      >
        <ActionButton href="#projects" variant="brand" size="pill" icon={ArrowRightIcon}>
          See my projects
        </ActionButton>
        <ActionButton
          href={site.cvPdf}
          download={site.cvFileName}
          variant="outline-soft"
          size="pill"
          icon={DownloadIcon}
          iconSide="start"
        >
          Download CV
        </ActionButton>
      </motion.div>
    </div>
  );
}
