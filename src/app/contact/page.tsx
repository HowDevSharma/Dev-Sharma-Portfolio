import type { Metadata } from "next";
import { contact, site, socials } from "@/content/site";
import { Ruler } from "@/components/layout/Ruler";
import { ContactForm } from "@/components/contact/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { Pop, Reveal } from "@/components/ui/motion";
import { Polaroid, Scribble, SelectionFrame } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Contact",
  description: `Leave ${site.firstName} a note about your project.`,
};

export default function ContactPage() {
  return (
    <>
      <Ruler />
      <section className="relative isolate flex min-h-[calc(100svh_-_var(--nav-h)_-_1.5rem)] flex-col items-center justify-center overflow-hidden px-4 py-16">
        {/* side polaroids */}
        <Pop rotate={-9} delay={0.3} className="absolute top-[18%] left-[3%] -z-10 hidden w-56 lg:block xl:left-[8%]">
          <Polaroid {...contact.polaroids[0]} />
        </Pop>
        <Pop rotate={8} delay={0.4} className="absolute top-[26%] right-[3%] -z-10 hidden w-56 lg:block xl:right-[8%]">
          <Polaroid {...contact.polaroids[1]} />
        </Pop>

        <Reveal className="-rotate-2">
          <Scribble>{contact.scribble}</Scribble>
        </Reveal>

        <Pop rotate={-4} className="mt-8">
          <SelectionFrame accent="cobalt" className="px-5 py-2 sm:px-8">
            <h1 className="display text-[clamp(3.5rem,13vw,8.5rem)]">{contact.title}</h1>
          </SelectionFrame>
        </Pop>

        <Reveal delay={0.2} className="mt-12 flex w-full justify-center">
          <ContactForm />
        </Reveal>

        <Reveal delay={0.35} className="mt-16 flex items-center gap-3">
          <svg viewBox="0 0 70 30" className="h-6 w-14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M2 8c20 14 40 16 62 10M56 10l9 8-11 5" />
          </svg>
          <span className="hand text-2xl">{contact.aside}</span>
        </Reveal>

        <Reveal delay={0.45} className="mt-8">
          <ul className="flex gap-1 rounded-2xl bg-card p-2 shadow-[0_18px_40px_-22px_rgb(22_20_15/0.5)] ring-1 ring-line">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="label flex w-24 flex-col items-center gap-2 rounded-xl py-3 text-[11px] transition-colors hover:bg-lime sm:w-28"
                >
                  <Icon name={s.icon} size={20} />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="label mt-8 text-[12px] text-ink-3">
          or email <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">{site.email}</a>
        </p>
      </section>
    </>
  );
}
