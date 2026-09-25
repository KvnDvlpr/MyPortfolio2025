import { About } from "@/components/sections/about";
import { Background } from "@/components/sections/background";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Technologies } from "@/components/sections/technologies";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Background />
        <About />
        <Projects />
        <Technologies />
      </main>
      <SiteFooter />
    </>
  );
}
