import { home } from "@/content/site";
import { projects } from "@/content/projects";
import { Ruler } from "@/components/layout/Ruler";
import { ContactCta, Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ProjectStack } from "@/components/work/ProjectStack";
import { Pop, Reveal, SplitTitle } from "@/components/ui/motion";
import { Scribble, StickyNote } from "@/components/ui/primitives";

export default function HomePage() {
  const { featured } = home;
  return (
    <>
      <Ruler />
      <Hero />
      <Intro />

      <section aria-labelledby="selected-work" className="pb-10">
        <div className="shell flex flex-col items-center pb-16 text-center sm:pb-24">
          <Reveal className="-rotate-3">
            <Scribble>{featured.scribble}</Scribble>
          </Reveal>
          <div id="selected-work" className="mt-6">
            <SplitTitle
              as="h2"
              text={featured.titleTop}
              className="text-[clamp(3.25rem,11vw,9.5rem)]"
            />
            <SplitTitle
              as="p"
              text={featured.titleBottom}
              delay={0.3}
              className="text-[clamp(3.25rem,11vw,9.5rem)] text-cobalt"
            />
          </div>
          <Pop rotate={-3} delay={0.3} className="mt-8">
            <StickyNote accent="butter" className="max-w-xs text-left">
              {featured.note}
            </StickyNote>
          </Pop>
        </div>
        <ProjectStack projects={projects} />
      </section>

      <ContactCta />
      <Footer />
    </>
  );
}
