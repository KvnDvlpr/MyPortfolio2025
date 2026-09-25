"use client";

import { type AnimationOptions, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { useLoop } from "@/components/motion/use-loop";
import { easeOutExpo, transitions } from "@/lib/motion";

const orbitIcons = [
  { src: "/assets/icons/claude.svg", angle: 0 },
  { src: "/assets/icons/nextdotjs.svg", angle: 120 },
  { src: "/assets/icons/supabase.svg", angle: 240 },
];

const BLOB_SHAPES = [
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "40% 60% 70% 30% / 50% 60% 40% 50%",
  "55% 45% 40% 60% / 40% 55% 45% 60%",
  "60% 40% 30% 70% / 60% 30% 70% 40%",
];
const morph = { borderRadius: BLOB_SHAPES };
const morphTiming: AnimationOptions = { duration: 14, ease: "easeInOut", times: [0, 0.33, 0.66, 1] };

/**
 * Photo blob with orbiting icons. Part of the hero's focal entrance (it
 * resolves out of a soft blur), then follows the pointer on a spring.
 * Ambient loops pause while the hero is offscreen.
 */
export function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const tagA = useRef<HTMLDivElement>(null);
  const tagB = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { margin: "120px" });
  const reduce = useReducedMotion();

  useLoop(glow, { opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }, { duration: 6, ease: "easeInOut" }, inView);
  useLoop(back, morph, morphTiming, inView);
  useLoop(photo, morph, morphTiming, inView);
  useLoop(ring, { rotate: [0, 360] }, { duration: 40, ease: "linear" }, inView);
  useLoop(tagA, { y: [0, -8, 0] }, { duration: 6, ease: "easeInOut" }, inView);
  useLoop(tagB, { y: [0, -8, 0] }, { duration: 7, ease: "easeInOut", delay: 1 }, inView);

  // pointer parallax: -1..1 across the whole hero, smoothed by a spring
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, transitions.follow);
  const sy = useSpring(my, transitions.follow);
  const glowX = useTransform(sx, (v) => v * -10);
  const glowY = useTransform(sy, (v) => v * -10);
  const backX = useTransform(sx, (v) => v * 14);
  const backY = useTransform(sy, (v) => v * 14);
  const photoX = useTransform(sx, (v) => v * -8);
  const photoY = useTransform(sy, (v) => v * -8);

  useEffect(() => {
    const section = root.current?.closest("section");
    if (!section || reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my, reduce]);

  return (
    <motion.div
      ref={root}
      className="hero-visual"
      initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.2 }}
    >
      <motion.div ref={glow} style={{ x: glowX, y: glowY }} className="hero-blob-glow" aria-hidden="true" />
      <motion.div ref={back} style={{ x: backX, y: backY }} className="hero-blob-back" aria-hidden="true" />

      <div ref={ring} className="hero-orbit" aria-hidden="true">
        {orbitIcons.map((icon, i) => (
          <span key={icon.src} className="hero-orbit-slot" style={{ "--a": `${icon.angle}deg` } as React.CSSProperties}>
            <motion.span
              className="hero-orbit-item"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...transitions.press, delay: 1.3 + i * 0.1 }}
            >
              {/* counter-spin so the logo stays upright while the ring turns */}
              <CounterSpin active={inView}>
                {/* eslint-disable-next-line @next/next/no-img-element -- tiny decorative svg */}
                <img src={icon.src} alt="" width={22} height={22} />
              </CounterSpin>
            </motion.span>
          </span>
        ))}
      </div>

      <motion.div ref={photo} style={{ x: photoX, y: photoY }} className="hero-photo">
        <Image
          src="/assets/kevin.jpg"
          alt="Kevin Acebuche smiling, wearing a rust-colored shirt"
          width={1000}
          height={1440}
          sizes="(max-width: 900px) 300px, 430px"
          priority
        />
      </motion.div>

      <FloatTag innerRef={tagA} delay={1.1} className="top-[12%] left-[-2%] nav:left-[-6%]">
        Technical Support Rep · 6 mos
      </FloatTag>
      <FloatTag innerRef={tagB} delay={1.25} className="right-[-2%] bottom-[12%] nav:right-[-4%]">
        Built with AI, shipped live
      </FloatTag>
    </motion.div>
  );
}

function CounterSpin({ children, active }: { children: React.ReactNode; active: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useLoop(ref, { rotate: [0, -360] }, { duration: 40, ease: "linear" }, active);
  return (
    <span ref={ref} className="grid place-items-center">
      {children}
    </span>
  );
}

function FloatTag({
  children,
  className,
  delay,
  innerRef,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
  innerRef: React.RefObject<HTMLDivElement | null>;
}) {
  // outer: entrance pop; inner: the ambient float (separate so the loop's y
  // never fights the entrance)
  return (
    <motion.div
      className={`absolute z-4 ${className}`}
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ ...transitions.press, delay }}
    >
      <div ref={innerRef} className="hero-float-tag">
        {children}
      </div>
    </motion.div>
  );
}
