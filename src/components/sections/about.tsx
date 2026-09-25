"use client";

import { useRef } from "react";

import { JourneySketch } from "@/components/about/journey-sketch";
import { FileTextIcon } from "@/components/animated-icons/file-text";
import { useCvDialog } from "@/components/cv/cv-dialog";
import { ActionButton } from "@/components/motion/action-button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SketchLayer } from "@/components/sketch/sketch-layer";

const facts = [
  { term: "Based in", value: "Teresa, Rizal, PH" },
  { term: "Degree", value: "BS Electronics Engineering" },
  { term: "Latest role", value: "Technical Support Representative" },
  { term: "Status", value: "Open to IT roles" },
];

export function About() {
  const cv = useCvDialog();
  const section = useRef<HTMLElement>(null);

  return (
    <section ref={section} id="about" className="section-pad has-sketch overflow-hidden bg-bg">
      <JourneySketch target={section} />
      <SketchLayer
        items={[
          { doodle: "graduationCap", className: "top-[3.2rem] left-[31%] w-16 rotate-12 hidden nav:block" },
          { doodle: "musicNotes", className: "top-[48%] right-[1%] w-16 -rotate-6 hidden nav:block" },
          { doodle: "piano", className: "top-[2.4rem] right-[5%] w-24 rotate-3 hidden nav:block" },
        ]}
      />

      <div className="container-page grid items-start gap-[clamp(2rem,6vw,6rem)] min-[960px]:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading title="Engineer by degree. Developer in the making." />
          <ActionButton
            variant="outline-soft"
            size="pill"
            className="mt-6"
            icon={FileTextIcon}
            iconSide="start"
            iconClassName="opacity-80"
            onClick={cv.open}
          >
            Read my CV
          </ActionButton>
        </Reveal>

        <Reveal className="about-body">
          <p>
            I&apos;m <strong>Kevin Acebuche</strong>, an Electronics Engineering graduate from Teresa, Rizal. I&apos;m
            still learning and upskilling every week, and this page is the honest record of that journey so far.
          </p>
          <p>
            After graduating in 2025 I started in digital marketing, training in CRM and workflow automation with
            GoHighLevel and ActiveCampaign. From there I moved into technical support, spending six months on a medical
            healthcare account diagnosing issues and documenting every fix. Now I&apos;m working my way into the IT
            industry, hoping to become a developer.
          </p>
          <p>
            Along the way I&apos;ve built <strong>Daywell</strong>, <strong>Agham Setlist</strong>, and this portfolio.
            In my spare time I handle design for our church&apos;s media team, and I play piano.
          </p>

          <blockquote className="about-quote">
            It might not be today, but someday I&apos;ll get there, because I trust the One who leads my future.
          </blockquote>

          <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-line pt-8 nav:grid-cols-4">
            {facts.map((f) => (
              <div key={f.term}>
                <dt className="mb-1 text-xs leading-[1.65] tracking-[0.08em] text-ink-3 uppercase">{f.term}</dt>
                <dd className="font-heading text-base leading-[1.65] font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
