"use client";

import { motion, useAnimationControls, useInView } from "motion/react";
import { useEffect, useRef } from "react";

// Three drifting blobs behind the deck. The loop only runs while the
// section is on screen.
const blobs = [
  { className: "deck-blob deck-blob-1", duration: 18 },
  { className: "deck-blob deck-blob-2", duration: 21 },
  { className: "deck-blob deck-blob-3", duration: 24 },
];

function Blob({ className, duration, active }: { className: string; duration: number; active: boolean }) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (!active) {
      controls.stop();
      return;
    }
    controls.start({
      x: [0, 60],
      y: [0, -40],
      scale: [1, 1.12],
      transition: { duration, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
    });
  }, [active, controls, duration]);

  return <motion.span className={className} animate={controls} />;
}

export function DeckScene() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div ref={ref} className="deck-scene" aria-hidden="true">
      {blobs.map((b) => (
        <Blob key={b.className} {...b} active={inView} />
      ))}
    </div>
  );
}
