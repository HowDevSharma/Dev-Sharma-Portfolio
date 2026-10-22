import type { Metadata } from "next";
import { services, site } from "@/content/site";
import { accents, cn } from "@/lib/utils";
import { Ruler } from "@/components/layout/Ruler";
import { ContactCta, Footer } from "@/components/layout/Footer";
import { ProcessScroller } from "@/components/services/ProcessScroller";
import { ServiceBands } from "@/components/services/ServiceBands";
import { Toolkit } from "@/components/services/Toolkit";
import { Icon } from "@/components/ui/Icon";
import { Pop, Reveal, SplitTitle } from "@/components/ui/motion";
import { Avatar, CtaButton, Scribble, SelectionFrame } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Services",
  description: "Product design, data & dashboards, design systems and product discovery.",
};

function FaqThread({ q, a, accent, index }: { q: string; a: string; accent: (typeof services.faq.items)[number]["accent"]; index: number }) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-card p-5 shadow-[0_24px_50px_-28px_rgb(22_20_15/0.5)] ring-1 ring-line">
      <p className="border-b border-line pb-2 text-sm text-ink-3">Question</p>
      <div className="mt-4 flex gap-3">
        <span className={cn("grid size-9 shrink-0 place-items-center rounded-full", accents[accent].soft)}>
          <Icon name="user" size={16} />
        </span>
        <div>
          <p className="text-sm text-ink-3">Visitor</p>
          <h3 className="mt-1 text-xl leading-snug font-medium">{q}</h3>
          <span className={cn("mt-3 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm", accents[accent].soft)}>
            <Icon name={index % 2 ? "heart" : "bolt"} size={13} /> {index + 2}
          </span>
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <Avatar size={36} />
        <p className="rounded-xl rounded-tl-none bg-paper px-4 py-3 text-[15px] leading-relaxed text-ink-2">{a}</p>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const { title, faq, toolkit, process } = services;
  return (
    <>
      <Ruler />

      {/* ------------------------------------------------------------ hero */}
      <section className="shell flex flex-col items-center pt-14 pb-20 text-center sm:pt-20 sm:pb-28">
        <Reveal>
          <span className="label inline-flex items-center gap-2 rounded-full bg-card px-3 py-2 text-[12px] ring-1 ring-line">
            <span className="size-2 rounded-full bg-lime ring-1 ring-ink/40" />
            {services.badge}
          </span>
        </Reveal>
        <h1 className="sr-only">{title.join(" ")}</h1>
        <div aria-hidden className="mt-8 flex flex-col items-center">
          <SplitTitle as="p" text={title[0]} className="text-[clamp(3.5rem,12vw,9.5rem)]" />
          <Pop className="my-2">
            <SelectionFrame accent="lime" className="flex items-center gap-4 bg-lime-soft px-4 py-2 sm:gap-8 sm:px-8">
              <Icon name="flower" size={48} className="text-lime-deep" />
              <span className="display text-[clamp(3.5rem,12vw,9.5rem)]">{title[1]}</span>
              <Icon name="star" size={48} className="text-lime-deep" />
            </SelectionFrame>
          </Pop>
          <SplitTitle as="p" text={title[2]} delay={0.2} className="text-[clamp(3.5rem,12vw,9.5rem)]" />
        </div>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">{services.intro}</p>
          <CtaButton href="/contact" className="mt-8">
            {services.cta}
          </CtaButton>
        </Reveal>
        <Reveal className="mt-20 -rotate-2">
          <Scribble>{services.scribble}</Scribble>
        </Reveal>
      </section>

      <ServiceBands items={services.items} />

      <div className="pt-24 sm:pt-32">
        <ProcessScroller title={process.title} steps={process.steps} />
      </div>

      {/* --------------------------------------------------------- toolkit */}
      <section aria-labelledby="toolkit" className="shell pt-24 sm:pt-36">
        <div id="toolkit" className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <SplitTitle as="h2" text={toolkit.title} className="text-[clamp(3rem,9vw,7rem)]" />
          <span className="hand -rotate-3 text-2xl text-ink-2">(go on, move them around)</span>
        </div>
        <Toolkit groups={toolkit.groups} />
      </section>

      {/* ------------------------------------------------------------- faq */}
      <section aria-labelledby="faq" className="shell pt-28 sm:pt-40">
        <div id="faq" className="flex justify-center">
          <SplitTitle as="h2" text={faq.title} className="text-[clamp(3rem,9vw,7rem)]" />
        </div>
        <div className="mt-14 flex flex-col gap-8 sm:gap-4">
          {faq.items.map((item, i) => (
            <Reveal
              key={item.q}
              delay={0.05}
              className={cn("flex", i % 2 ? "justify-end sm:-mt-16" : "justify-start", i === 0 && "sm:mt-0")}
              style={{ rotate: `${i % 2 ? 1.2 : -1.2}deg` }}
            >
              <FaqThread q={item.q} a={item.a} accent={item.accent} index={i} />
            </Reveal>
          ))}
        </div>
        <p className="label mt-16 text-center text-[12px] text-ink-3">
          Something else? <a className="underline underline-offset-4 hover:text-ink" href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </section>

      <ContactCta />
      <Footer />
    </>
  );
}
