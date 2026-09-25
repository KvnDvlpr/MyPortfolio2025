"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { MoonIcon } from "@/components/animated-icons/moon";
import { SunIcon } from "@/components/animated-icons/sun";
import { useAnimatedIcon } from "@/components/motion/use-animated-icon";
import { easeOutExpo, lift } from "@/lib/motion";

const subscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // the stored theme is only known on the client
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const dark = mounted && resolvedTheme === "dark";
  const { ref, triggers } = useAnimatedIcon();

  return (
    <motion.button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      {...lift}
      {...triggers}
      className="relative grid size-[38px] place-items-center overflow-hidden rounded-full border border-line bg-surface text-ink-2 shadow-soft-sm transition-[border-color,color] duration-200 hover:border-sage hover:text-ink"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          className="grid place-items-center"
          initial={{ opacity: 0, rotate: dark ? -90 : 90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: dark ? 90 : -90, scale: 0.6, transition: { duration: 0.15 } }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
        >
          {dark ? <MoonIcon ref={ref} size={18} className="flex" /> : <SunIcon ref={ref} size={18} className="flex" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
