"use client";

import { AnimatePresence, motion, type PanInfo, type Variants } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { ChevronLeftIcon } from "@/components/animated-icons/chevron-left";
import { ChevronRightIcon } from "@/components/animated-icons/chevron-right";
import { type DeckCard, deckCards } from "@/components/background/cards";
import { useAnimatedIcon, type AnimatedIconHandle } from "@/components/motion/use-animated-icon";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { duration, easeOutExpo, lift, transitions } from "@/lib/motion";

type StackState = "active" | "next" | "next2" | "gone" | "hidden";

/** Position of a card relative to the active one → its stack state. */
function stateFor(offset: number): StackState {
  if (offset === 0) return "active";
  if (offset === 1) return "next";
  if (offset === 2) return "next2";
  if (offset < 0) return "gone";
  return "hidden";
}

// stacking order is set instantly (style), only the look is animated
const zIndex: Record<StackState, number> = { gone: 6, active: 5, next: 4, next2: 3, hidden: 1 };

const cardMove = { duration: 0.7, ease: easeOutExpo };
const cardVariants: Variants = {
  active: { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: "brightness(1)", transition: cardMove },
  next: { x: 0, y: -20, rotate: 0, scale: 0.96, opacity: 1, filter: "brightness(0.8)", transition: cardMove },
  next2: { x: 0, y: -40, rotate: 0, scale: 0.92, opacity: 1, filter: "brightness(0.65)", transition: cardMove },
  hidden: { x: 0, y: -40, rotate: 0, scale: 0.92, opacity: 0, filter: "brightness(0.65)", transition: cardMove },
  // the card you just read slides off to the left
  gone: {
    x: "-40%",
    y: "4%",
    rotate: -6,
    scale: 1,
    opacity: 0,
    transition: { ...cardMove, opacity: { duration: 0.5, ease: "easeOut" } },
  },
};

/** One card at a time; Next reveals the following one, the last wraps to the start. */
export function CardDeck() {
  const [index, setIndex] = useState(0);
  const total = deckCards.length;
  const last = index === total - 1;
  const { ref: prevIconRef, triggers: prevTriggers } = useAnimatedIcon();
  const { ref: nextIconRef, triggers: nextTriggers } = useAnimatedIcon();

  const go = (step: number) =>
    setIndex((i) => (step > 0 && i === total - 1 ? 0 : Math.min(total - 1, Math.max(0, i + step))));

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
      e.preventDefault();
      go(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  // swipe: drag the active card sideways past 50px (or flick it)
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.1;
    if (swipe < -50) go(1);
    else if (swipe > 50) go(-1);
  };

  return (
    <>
      <Reveal className="relative mb-8 flex flex-col items-start gap-5 nav:flex-row nav:items-end nav:justify-between nav:gap-8">
        <SectionHeading
          title="Beyond the code"
          sub="Eight cards about who I am. One at a time, no peeking. Hit next."
        />
        <div className="flex w-full flex-none items-center justify-between gap-2.5 nav:w-auto nav:justify-start">
          <span
            className="relative inline-flex overflow-hidden px-2 font-heading text-[0.9rem] font-semibold text-ink-2 tabular-nums"
            aria-live="polite"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={index}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={transitions.state}
              >
                {index + 1}
              </motion.span>
            </AnimatePresence>
            &nbsp;/ {total}
          </span>
          <motion.button
            type="button"
            className="deck-btn"
            aria-label="Previous card"
            disabled={index === 0}
            onClick={() => go(-1)}
            {...(index === 0 ? {} : lift)}
            {...prevTriggers}
          >
            <ChevronLeftIcon ref={prevIconRef} size={20} className="flex" />
          </motion.button>
          <motion.button
            type="button"
            className="deck-btn deck-btn-primary"
            aria-label="Next card"
            onClick={() => go(1)}
            {...lift}
            {...nextTriggers}
          >
            <span>{last ? "Start over" : "Next"}</span>
            {/* on the last card the chevron turns down: "back to the top of the pile" */}
            <motion.span className="flex" animate={{ rotate: last ? 90 : 0 }} transition={transitions.overlay}>
              <ChevronRightIcon ref={nextIconRef} size={20} className="flex" />
            </motion.span>
          </motion.button>
        </div>
      </Reveal>

      <div
        className="deck"
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Cards about Kevin"
        onKeyDown={onKeyDown}
      >
        <ul className="deck-stack">
          {deckCards.map((card, i) => {
            const state = stateFor(i - index);
            const active = state === "active";
            return (
              <motion.li
                key={card.label}
                className="deck-card"
                aria-hidden={!active}
                style={{ zIndex: zIndex[state], originX: 0.5, originY: 0, pointerEvents: state === "gone" || state === "hidden" ? "none" : undefined }}
                variants={cardVariants}
                initial={false}
                animate={state}
                drag={active ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                dragSnapToOrigin
                onDragEnd={active ? onDragEnd : undefined}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={{ scale: active ? 1 : 1.06 }}
                  transition={{ duration: 1.2, ease: easeOutExpo }}
                >
                  <Image
                    className="deck-img"
                    src={card.image}
                    alt=""
                    fill
                    sizes="(max-width: 1160px) 100vw, 1120px"
                    loading={i < 2 ? "eager" : "lazy"}
                    draggable={false}
                  />
                </motion.div>
                <motion.div
                  className="deck-glass"
                  initial={false}
                  animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={
                    active
                      ? { opacity: { duration: 0.6, ease: "easeOut", delay: 0.15 }, y: { duration: 0.7, ease: easeOutExpo, delay: 0.15 } }
                      : { duration: duration.state, ease: easeOutExpo }
                  }
                >
                  <CardIcon icon={card.icon} active={active} />
                  <h3>{card.title}</h3>
                  {card.meta && <p className="deck-meta">{card.meta}</p>}
                  <p className="deck-text">{card.text}</p>
                </motion.div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <div className="mt-7 h-1 overflow-hidden rounded-full bg-line-strong" aria-hidden="true">
        <motion.span
          className="block h-full rounded-[inherit] bg-brand"
          style={{ originX: 0 }}
          initial={false}
          animate={{ scaleX: (index + 1) / total }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        />
      </div>
    </>
  );
}

/** The card's badge icon plays once as its card lands on top. */
function CardIcon({ icon, active }: { icon: DeckCard["icon"]; active: boolean }) {
  const ref = useRef<AnimatedIconHandle>(null);

  useEffect(() => {
    if (!("animated" in icon)) return;
    // reset while the card is behind the pile (never from cleanup: the
    // icon's motion controls are gone once it unmounts)
    if (!active) {
      ref.current?.stopAnimation();
      return;
    }
    // wait for the glass panel to arrive before the icon moves
    const t = setTimeout(() => ref.current?.startAnimation(), 450);
    return () => clearTimeout(t);
  }, [active, icon]);

  if ("animated" in icon) {
    const Icon = icon.animated;
    return (
      <div className="deck-icon">
        <Icon ref={ref} size={24} className="flex" />
      </div>
    );
  }

  // no animated version: a small settle-in instead
  const Icon = icon.static;
  return (
    <div className="deck-icon">
      <motion.span
        className="flex"
        initial={false}
        animate={active ? { rotate: 0, scale: 1 } : { rotate: -12, scale: 0.8 }}
        transition={active ? { ...transitions.press, delay: 0.45 } : transitions.feedback}
      >
        <Icon />
      </motion.span>
    </div>
  );
}
