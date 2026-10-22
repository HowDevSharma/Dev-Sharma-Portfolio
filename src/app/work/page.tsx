import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Ruler } from "@/components/layout/Ruler";
import { ContactCta, Footer } from "@/components/layout/Footer";
import { WorkCard } from "@/components/work/WorkCard";
import { Pop, Reveal, SplitTitle } from "@/components/ui/motion";
import { StickyNote } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected case studies: climate tech, fintech, logistics and research tools.",
};

export default function WorkPage() {
  return (
    <>
      <Ruler />
      <div className="shell pt-14 sm:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SplitTitle text="Case studies" className="text-[clamp(3rem,10vw,8.5rem)]" />
          <Pop rotate={3} delay={0.4} className="mb-2">
            <StickyNote accent="lime" className="max-w-60">
              {projects.length} projects, each with the messy middle left in.
            </StickyNote>
          </Pop>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-16 sm:mt-24 md:grid-cols-2 md:gap-y-24">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 2) * 0.12}>
              <WorkCard project={p} priority={i < 2} />
            </Reveal>
          ))}
        </ul>
      </div>
      <ContactCta />
      <Footer />
    </>
  );
}
