"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { ArrowUpRightIcon } from "@/components/animated-icons/arrow-up-right";
import { XIcon } from "@/components/animated-icons/x";
import { useAnimatedIcon } from "@/components/motion/use-animated-icon";
import { duration, easeOutExpo, transitions } from "@/lib/motion";
import { projectLinks, type ProjectKey } from "@/lib/projects";
import { skills, type Skill } from "@/lib/skills";
import { cn } from "@/lib/utils";

const GAP = 14;
const HIDE_DELAY = 140;

type Placement = { left: number; top: number; arrowX: number; above: boolean };

// the grid arrives once, as a list: 9 tiles x 30ms keeps the tail under 300ms
const grid: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.03 } },
};
const tileIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: duration.overlay, ease: easeOutExpo } },
};
// hover / open: the tile rises and its logo tips, driven from the tile
const tile: Variants = {
  rest: { y: 0 },
  active: { y: -3 },
};
const tileLogo: Variants = {
  rest: { scale: 1, rotate: 0 },
  active: { scale: 1.08, rotate: -3 },
};

/**
 * Tiles for each technology. Hover (mouse) or focus shows a speech-bubble
 * popover under the tile; tap toggles it. It flips above the tile when there
 * is no room below, and clamps horizontally inside the grid.
 */
export function SkillExplorer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement | null>(null);
  const tileRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hideTimer = useRef<number | undefined>(undefined);
  // a tap fires focus (opens) then click; don't let that click close it again
  const openedAt = useRef(0);

  const [openId, setOpenId] = useState<string | null>(null);
  const [placement, setPlacement] = useState<Placement | null>(null);

  const open = skills.find((s) => s.id === openId) ?? null;

  const show = useCallback((id: string) => {
    window.clearTimeout(hideTimer.current);
    setOpenId((cur) => {
      if (cur !== id) openedAt.current = performance.now();
      return id;
    });
  }, []);

  const hide = useCallback(() => {
    window.clearTimeout(hideTimer.current);
    setOpenId(null);
  }, []);

  const scheduleHide = useCallback(() => {
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(hide, HIDE_DELAY);
  }, [hide]);

  const position = useCallback(() => {
    const wrap = wrapRef.current;
    const pop = popRef.current;
    const t = openId ? tileRefs.current[openId]?.getBoundingClientRect() : null;
    if (!wrap || !pop || !t) return;
    const w = wrap.getBoundingClientRect();
    const popW = pop.offsetWidth;
    const popH = pop.offsetHeight;

    let left = t.left - w.left + t.width / 2 - popW / 2;
    left = Math.max(0, Math.min(w.width - popW, left));
    const arrowX = Math.max(14, Math.min(popW - 30, t.left - w.left + t.width / 2 - left - 8));

    const spaceBelow = window.innerHeight - t.bottom;
    const above = spaceBelow < popH + GAP && t.top > popH + GAP;
    const top = above ? t.top - w.top - popH - GAP : t.bottom - w.top + GAP;
    setPlacement({ left, top, arrowX, above });
  }, [openId]);

  // measure the freshly rendered bubble before paint, so it grows from the tile
  useLayoutEffect(() => {
    if (openId) position();
  }, [openId, position]);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && hide();
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) hide();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", position);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", position);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [openId, hide, position]);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  return (
    // own stacking layer above the Claude card, so the bubble can never slip under it
    <div ref={wrapRef} className="relative z-20">
      <motion.div
        className="stack-grid"
        aria-label="Technologies I have used"
        variants={grid}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skills.map((s) => {
          const isOpen = openId === s.id;
          return (
            <motion.div key={s.id} variants={tileIn} className="flex">
              <motion.button
                ref={(el) => {
                  tileRefs.current[s.id] = el;
                }}
                type="button"
                aria-label={s.name}
                aria-describedby={isOpen ? "skillPop" : undefined}
                aria-expanded={isOpen}
                className={cn("stack-tile flex-1", isOpen && "is-open")}
                variants={tile}
                initial="rest"
                animate={isOpen ? "active" : "rest"}
                whileHover="active"
                whileTap={{ scale: 0.98 }}
                transition={transitions.press}
                onPointerEnter={(e) => e.pointerType === "mouse" && show(s.id)}
                onPointerLeave={(e) => e.pointerType === "mouse" && scheduleHide()}
                onFocus={() => show(s.id)}
                onBlur={() => {
                  // switching windows (e.g. a screenshot tool) blurs the tile too;
                  // keep the bubble instead of freezing it mid-fade
                  if (document.hasFocus()) scheduleHide();
                }}
                onClick={() => (isOpen && performance.now() - openedAt.current > 300 ? hide() : show(s.id))}
              >
                <motion.span className="tile-logo" variants={tileLogo} transition={transitions.press}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- small svg logo */}
                  <img src={`/assets/icons/${s.icon}.svg`} alt="" loading="lazy" />
                </motion.span>
                <span className="tile-text">
                  <span className="tile-name">{s.name}</span>
                  <span className="tile-cat">{s.category}</span>
                </span>
                <span className="tile-meta">
                  <strong>{s.levelLabel}</strong>
                  <span className="tile-bar">
                    <span style={{ transform: `scaleX(${s.level / 100})` }} />
                  </span>
                </span>
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            key={open.id}
            ref={(el: HTMLDivElement | null) => {
              // an exiting bubble unmounts after the new one mounts; keep the live one
              if (el) popRef.current = el;
            }}
            id="skillPop"
            role="tooltip"
            className={cn("stack-pop", placement?.above && "is-above")}
            style={{
              left: placement?.left ?? 0,
              top: placement?.top ?? 0,
              // grow out of the arrow, i.e. from the tile
              transformOrigin: placement
                ? `${placement.arrowX + 8}px ${placement.above ? "100%" : "0%"}`
                : "50% 0%",
            }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: duration.state, ease: easeOutExpo } }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.12, ease: easeOutExpo } }}
            onPointerEnter={() => window.clearTimeout(hideTimer.current)}
            onPointerLeave={(e) => e.pointerType === "mouse" && scheduleHide()}
          >
            <span
              className="stack-pop-arrow"
              aria-hidden="true"
              style={placement ? { left: placement.arrowX } : undefined}
            />
            <PopBody skill={open} onClose={hide} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PopBody({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  const { ref: closeIcon, triggers: closeTriggers } = useAnimatedIcon();

  return (
    <div>
      <button type="button" className="stack-pop-close" aria-label="Close" onClick={onClose} {...closeTriggers}>
        <XIcon ref={closeIcon} size={14} className="flex" />
      </button>
      <div className="stack-pop-head">
        <div className="stack-pop-logo">
          <motion.img
            src={`/assets/icons/${skill.icon}.svg`}
            alt=""
            initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.04 }}
          />
        </div>
        <div>
          <h3>{skill.name}</h3>
          <p className="stack-pop-cat">{skill.category}</p>
        </div>
      </div>
      <div className="stack-pop-meta">
        <span>
          First used <strong>{skill.since}</strong>
        </span>
        <span>
          Level <strong>{skill.levelLabel}</strong>
        </span>
      </div>
      <div className="stack-pop-level">
        <motion.span
          style={{ width: `${skill.level}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.08 }}
        />
      </div>
      <p className="stack-pop-note">{skill.note}</p>
      <ul className="stack-pop-used">
        {skill.usedIn.map((key) => (
          <UsedLink key={key} project={key} />
        ))}
      </ul>
    </div>
  );
}

function UsedLink({ project }: { project: ProjectKey }) {
  const p = projectLinks[project];
  const external = p.href.startsWith("http");
  const { ref: arrowIcon, triggers: arrowTriggers } = useAnimatedIcon();

  return (
    <li>
      <a href={p.href} {...(external ? { target: "_blank", rel: "noopener" } : {})} {...arrowTriggers}>
        {p.label}
        {external && <ArrowUpRightIcon ref={arrowIcon} size={12} className="flex" />}
      </a>
    </li>
  );
}
