import { HeroAmbience } from "@/components/sections/hero-ambience";
import { HeroCopy } from "@/components/sections/hero-copy";
import { HeroScrollCue } from "@/components/sections/hero-scroll-cue";
import { HeroVisual } from "@/components/sections/hero-visual";
import { SketchLayer } from "@/components/sketch/sketch-layer";

export function Hero() {
  return (
    <section
      id="home"
      className="has-sketch overflow-hidden pt-[calc(var(--spacing-header)+clamp(3rem,7vw,6rem))] pb-[clamp(3rem,7vw,6rem)]"
    >
      <SketchLayer
        items={[
          { doodle: "graduationCap", className: "top-[12%] left-[1.5%] w-20 -rotate-12 hidden nav:block" },
          { doodle: "sparkle", className: "top-[31%] left-[39%] w-10 rotate-6 hidden nav:block" },
          { doodle: "diploma", className: "bottom-[7%] left-[5%] w-24 rotate-6 hidden nav:block" },
          { doodle: "musicNotes", className: "top-[11%] right-[2.5%] w-16 rotate-6 hidden nav:block" },
          { doodle: "graduationCap", className: "top-[10%] right-[4%] w-12 rotate-12 nav:hidden" },
        ]}
      />
      <HeroAmbience />
      <div className="relative z-1 container-page grid grid-cols-1 items-center gap-[clamp(2rem,5vw,5rem)] text-center nav:grid-cols-[1.05fr_0.95fr] nav:text-left">
        <HeroCopy />
        <div className="flex w-full justify-center nav:justify-end">
          <HeroVisual />
        </div>
      </div>
      <HeroScrollCue />
    </section>
  );
}
