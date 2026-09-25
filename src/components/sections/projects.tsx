import { CrumpleFilter } from "@/components/projects/project-bits";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SketchLayer } from "@/components/sketch/sketch-layer";

export function Projects() {
  return (
    <section id="projects" className="section-pad has-sketch">
      <SketchLayer
        items={[
          { doodle: "penTool", className: "top-[5.5rem] left-[5%] w-28 hidden nav:block" },
          { doodle: "wireframe", className: "top-[5rem] right-[5%] w-28 rotate-6 hidden nav:block" },
          { doodle: "cropMarks", className: "top-[2.4rem] left-[30%] w-14 -rotate-6 hidden nav:block" },
          { doodle: "penTool", className: "top-[1.4rem] right-[4%] w-14 nav:hidden" },
        ]}
      />
      <CrumpleFilter />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            center
            title="Things I've built"
            sub="Three crumpled notes from my desk. Tap one to smooth it out and see the app."
          />
        </Reveal>
        <ProjectsExplorer />
      </div>
    </section>
  );
}
