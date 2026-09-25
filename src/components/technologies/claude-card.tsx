"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef } from "react";

import { SparklesIcon, type SparklesIconHandle } from "@/components/animated-icons/sparkles";
import { transitions } from "@/lib/motion";
import { aiTools } from "@/lib/skills";

// Hover: the card stays put and the light moves instead — a glow fades up,
// a sheen sweeps across once, the mascot tile tips and the spark flares.
const glow: Variants = { rest: { opacity: 0 }, hover: { opacity: 1, transition: { duration: 0.5 } } };
const sweep: Variants = {
  rest: { x: "-70%", opacity: 0, transition: { duration: 0.2 } },
  hover: { x: "70%", opacity: 1, transition: { x: { duration: 1.1, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.3 } } },
};
const spark: Variants = {
  rest: { scale: 1, rotate: 0, filter: "drop-shadow(0 0 0px rgba(184, 205, 163, 0))" },
  hover: { scale: 1.25, rotate: 12, filter: "drop-shadow(0 0 8px rgba(184, 205, 163, 0.8))" },
};
const logo: Variants = { rest: { y: 0, rotate: 0, scale: 1 }, hover: { y: -2, rotate: -1.5, scale: 1.02 } };
const mascot: Variants = { rest: { scale: 1 }, hover: { scale: 1.08 } };
const chip: Variants = { rest: { y: 0 }, hover: { y: -1 } };
const chipIco: Variants = { rest: { scale: 1, rotate: 0 }, hover: { scale: 1.12, rotate: -8 } };

const TWINKLE_EVERY = 3600;
const TWINKLE_FOR = 2400;

export function ClaudeCard() {
  const cardRef = useRef<HTMLElement>(null);
  const bigSpark = useRef<SparklesIconHandle>(null);
  const hovered = useRef(false);
  const inView = useInView(cardRef, { amount: 0.25 });
  const reduce = useReducedMotion();

  const sparkle = (on: boolean) => {
    if (on) bigSpark.current?.startAnimation();
    else bigSpark.current?.stopAnimation();
  };

  // ambient twinkle, only while the card is on screen and nobody is hovering it
  useEffect(() => {
    if (!inView || reduce) return;
    let off: number | undefined;
    const tick = () => {
      if (hovered.current) return;
      sparkle(true);
      off = window.setTimeout(() => !hovered.current && sparkle(false), TWINKLE_FOR);
    };
    tick();
    const every = window.setInterval(tick, TWINKLE_EVERY);
    return () => {
      window.clearInterval(every);
      window.clearTimeout(off);
    };
  }, [inView, reduce]);

  return (
    <motion.article
      ref={cardRef}
      className="claude-card"
      aria-labelledby="claudeTitle"
      initial="rest"
      animate="rest"
      whileHover="hover"
      transition={transitions.press}
      onHoverStart={() => {
        hovered.current = true;
        sparkle(true);
      }}
      onHoverEnd={() => {
        hovered.current = false;
        sparkle(false);
      }}
    >
      <motion.span className="claude-fx claude-glow" aria-hidden="true" variants={glow} />
      <motion.span className="claude-fx claude-sweep" aria-hidden="true" variants={sweep} />

      <motion.span className="claude-spark" aria-hidden="true" variants={spark} transition={{ type: "spring", stiffness: 300, damping: 14 }}>
        <SparklesIcon ref={bigSpark} size={26} className="flex" />
      </motion.span>
      <div className="claude-badge">
        <motion.span className="claude-logo" variants={logo} transition={transitions.press}>
          <motion.img
            src="/assets/icons/claude-code.svg"
            alt=""
            width={96}
            height={60}
            variants={mascot}
            transition={{ type: "spring", stiffness: 300, damping: 14 }}
          />
        </motion.span>
        <span className="claude-badge-name">Claude Code</span>
      </div>
      <div className="claude-body">
        <h3 id="claudeTitle">AI-fluent builder. Claude Code is the loop.</h3>
        <p className="claude-note">
          Claude Code runs in my daily loop as an agentic pair-programmer: scaffolding, refactors, tests and the boring
          80%, so my judgment goes into the 20% that matters. I describe the feature and its edge cases, it writes the
          code, and I read every diff before it ships. Daywell, Exalting AGHAM and this site were all built this way.
        </p>
        <div className="claude-ai" aria-label="Other AI platforms I use">
          <span className="claude-ai-label">Also in the toolbox</span>
          <ul className="claude-ai-chips">
            {aiTools.map((t) => (
              // own rest/hover so a chip reacts to its own pointer, not the card's
              <motion.li
                key={t.name}
                className="claude-ai-chip"
                variants={chip}
                initial="rest"
                animate="rest"
                whileHover="hover"
                transition={transitions.press}
              >
                <motion.span className="claude-ai-ico" variants={chipIco} transition={{ type: "spring", stiffness: 380, damping: 16 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- small svg logo */}
                  <img src={`/assets/icons/${t.src}`} alt="" width={14} height={14} />
                </motion.span>
                {t.name}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}
