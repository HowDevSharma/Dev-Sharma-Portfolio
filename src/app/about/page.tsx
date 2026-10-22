import type { Metadata } from "next";
import { about, site } from "@/content/site";
import { accents, cn } from "@/lib/utils";
import { Ruler } from "@/components/layout/Ruler";
import { ContactCta, Footer } from "@/components/layout/Footer";
import { SectionNav } from "@/components/about/SectionNav";
import { Statement } from "@/components/home/Statement";
import { Icon } from "@/components/ui/Icon";
import { Pop, Reveal, SplitTitle } from "@/components/ui/motion";
import { CursorTag, Polaroid, SelectionFrame, StickyNote } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "About",
  description: `The long version: how ${site.name} works, what drives the work, and where it's happened so far.`,
};

/** Hand-drawn arrow used between value cards and their notes. */
function DoodleArrow({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 90 40"
      className={cn("h-8 w-20 shrink-0 text-ink", flip && "-scale-x-100")}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M3 22c18-14 44-16 80-2M72 10l12 10-14 6" />
    </svg>
  );
}

export default function AboutPage() {
  const { bio, values, path } = about;
  return (
    <>
      <Ruler />
      <SectionNav sections={about.sections} />

      <div className="shell max-w-5xl pt-14 sm:pt-20">
        <SplitTitle text={about.title} className="text-[clamp(3.5rem,13vw,10rem)]" />

        {/* ------------------------------------------------------------ bio */}
        <section id="bio" aria-label="Bio" className="relative mt-16 scroll-mt-24 sm:mt-24">
          <Reveal>
            <SelectionFrame accent="tangerine" label={bio.label} className="bg-card/60 p-5 sm:p-10 md:p-14">
              <Statement segments={bio.statement} className="text-[clamp(1.75rem,3.6vw,3.25rem)]" />

              <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-12">
                <div className="space-y-5 text-lg leading-relaxed text-ink-2">
                  {bio.paragraphs.map((p) => (
                    <p key={p.slice(0, 20)}>{p}</p>
                  ))}
                  <Pop rotate={-1.5} className="pt-3">
                    <StickyNote accent="butter">{bio.notes[0]}</StickyNote>
                  </Pop>
                  <Pop rotate={2} className="md:ml-16">
                    <StickyNote accent="butter">{bio.notes[1]}</StickyNote>
                  </Pop>
                </div>
                <div className="relative mx-auto w-56 md:mx-0 md:mt-6 md:w-full md:max-w-64">
                  <Pop rotate={5}>
                    <Polaroid {...bio.polaroid} />
                  </Pop>
                  <div className="absolute -bottom-8 -left-6">
                    <CursorTag text={site.firstName} accent="tangerine" side="right" rotate={-6} />
                  </div>
                </div>
              </div>
            </SelectionFrame>
          </Reveal>
        </section>

        {/* --------------------------------------------------------- values */}
        <section id="values" aria-label={values.label} className="relative mt-28 scroll-mt-24 sm:mt-36">
          <SelectionFrame accent="lilac" label={values.label} className="p-5 sm:p-10">
            <ul className="space-y-8 sm:space-y-12">
              {values.items.map((v, i) => {
                const right = i % 2 === 1;
                return (
                  <li key={v.title} className={cn("flex flex-col gap-4 md:items-center", right ? "md:flex-row-reverse" : "md:flex-row")}>
                    <Reveal
                      y={36}
                      className={cn("w-full p-6 sm:p-8 md:w-[58%]", accents[v.accent].soft)}
                      style={{ rotate: `${right ? 1 : -1}deg` }}
                    >
                      <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-semibold tracking-tight">{v.title}</h2>
                      <p className="mt-3 text-base leading-relaxed text-ink-2 sm:text-lg">{v.body}</p>
                    </Reveal>
                    <Reveal
                      delay={0.15}
                      className={cn("flex items-center gap-3 px-2 md:flex-1", right ? "md:flex-row-reverse md:justify-start" : "")}
                    >
                      <DoodleArrow flip={right} />
                      <span className="hand -rotate-6 text-2xl">{v.note}</span>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
            <div className="absolute -right-3 -bottom-6 sm:right-10">
              <CursorTag text={values.tag} accent="lilac" side="left" rotate={-4} />
            </div>
          </SelectionFrame>
        </section>

        {/* ----------------------------------------------------------- path */}
        <section id="path" aria-label={path.label} className="relative mt-28 scroll-mt-24 sm:mt-36">
          <SelectionFrame accent="cobalt" label={path.label} className="bg-card/60 px-5 sm:px-12">
            <ol>
              {path.items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.company}
                  className={cn("py-10 sm:py-12", i > 0 && "border-t border-line")}
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="grid size-11 place-items-center rounded-xl bg-ink text-lime">
                      <Icon name={item.logo} size={22} />
                    </span>
                    <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] leading-none font-semibold tracking-tight">
                      {item.company}
                    </h2>
                    <span className="label text-[12px] text-ink-3">{item.role}</span>
                  </div>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">{item.body}</p>
                  <span
                    className={cn(
                      "label mt-5 inline-flex items-center gap-2 border-[1.5px] border-ink px-2.5 py-1.5 text-[11px]",
                      item.current ? "bg-lime" : "bg-card",
                    )}
                  >
                    <Icon name={item.current ? "bolt" : "grid"} size={12} />
                    {item.dates}
                  </span>
                </Reveal>
              ))}
            </ol>
            <div className="absolute top-24 -right-3 sm:-right-8">
              <CursorTag text={path.tag} accent="cobalt" side="left" rotate={6} />
            </div>
          </SelectionFrame>
        </section>
      </div>

      <ContactCta />
      <Footer />
    </>
  );
}
