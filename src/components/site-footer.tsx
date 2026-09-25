import { ContactForm } from "@/components/contact/contact-form";
import { ContactLinks, SocialLinks } from "@/components/contact/contact-links";
import { FooterBar } from "@/components/contact/footer-bar";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SketchLayer } from "@/components/sketch/sketch-layer";

/** Contact lives in the footer: full-bleed brand panel, form + links, then the copyright bar. */
export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="site-footer has-sketch overflow-hidden mt-[clamp(2rem,5vw,4rem)] rounded-t-[40px] text-white max-[540px]:rounded-t-[28px]"
    >
      <SketchLayer
        tone="light"
        items={[
          { doodle: "paperPlane", className: "top-[1.6rem] right-[7%] w-16 -rotate-6" },
          { doodle: "musicNotes", className: "top-[42%] left-[52.3%] w-12 rotate-6 hidden min-[960px]:block" },
          { doodle: "sparkle", className: "top-[2.4rem] left-[44%] w-9 hidden min-[960px]:block" },
          { doodle: "piano", className: "bottom-[5.6rem] left-[38%] w-24 -rotate-2 hidden min-[960px]:block" },
        ]}
      />
      <Reveal className="container-page grid items-center gap-[clamp(2rem,5vw,5rem)] pt-[clamp(4rem,8vw,6.5rem)] pb-[clamp(3rem,6vw,5rem)] min-[960px]:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading
            light
            title="Have an idea, a role, or some advice?"
            sub="Send me a message about anything you saw here. I read everything and reply to everyone."
            className="mb-7 [&_h2]:mb-2 [&_p]:mt-0"
          />

          <ContactLinks />

          <div className="mt-6">
            <p className="mb-2.5 text-[0.72rem] tracking-[0.1em] text-sage-2 uppercase">Find me on</p>
            <SocialLinks />
          </div>
        </div>

        <ContactForm />
      </Reveal>

      <FooterBar year={new Date().getFullYear()} />
    </footer>
  );
}
