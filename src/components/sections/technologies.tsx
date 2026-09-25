import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ClaudeCard } from "@/components/technologies/claude-card";
import { SkillExplorer } from "@/components/technologies/skill-explorer";
import { ToolChips } from "@/components/technologies/tool-chips";
import { SketchLayer } from "@/components/sketch/sketch-layer";

export function Technologies() {
  return (
    <section id="stack" className="section-pad has-sketch bg-bg">
      <SketchLayer
        items={[
          { doodle: "codeBrackets", className: "top-[5.5rem] left-[6%] w-24 -rotate-6 hidden nav:block" },
          { doodle: "circuit", className: "top-[5rem] right-[4%] w-36 hidden nav:block" },
          { doodle: "codeBrackets", className: "top-[1.6rem] right-[5%] w-12 nav:hidden" },
        ]}
      />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            center
            title="Technologies I've actually used"
            sub="One tool does most of the building. Hover or tap the rest to see when I picked each one up and what I built with it. Below that: the platforms I ran day to day in technical and automation roles."
          />
        </Reveal>

        <SkillExplorer />

        <ClaudeCard />

        <div className="tool-panel" aria-labelledby="toolsTitle">
          <div className="tool-head">
            <h3 id="toolsTitle">Tools I&apos;ve worked with</h3>
            <p>
              CRM, automation, support and productivity platforms from technical and automation work. No ratings here,
              just the things I have actually run.
            </p>
          </div>
          <ToolChips />
        </div>
      </div>
    </section>
  );
}
