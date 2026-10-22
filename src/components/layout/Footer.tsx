import Link from "next/link";
import { contactCta, nav, site, socials } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/primitives";
import { Pop, Reveal, SplitTitle } from "@/components/ui/motion";
import { Mascot } from "./Mascot";
import { Ruler } from "./Ruler";

/** Figma-style comment card. */
export function CommentCard({
  author,
  body,
  reactions,
  className,
}: {
  author: string;
  body: string;
  reactions?: number;
  className?: string;
}) {
  return (
    <div
      className={`w-[min(20rem,86vw)] rounded-xl bg-card p-4 shadow-[0_24px_50px_-24px_rgb(22_20_15/0.45)] ring-1 ring-line ${className ?? ""}`}
    >
      <p className="border-b border-line pb-2 text-sm text-ink-3">Comment</p>
      <div className="mt-3 flex gap-3">
        <Avatar size={34} />
        <div className="text-[15px] leading-snug">
          <p className="font-semibold">{author}</p>
          <p className="mt-1 text-ink-2">{body}</p>
          {reactions ? (
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-lime-soft px-2 py-1 text-sm ring-1 ring-lime">
              <Icon name="bird" size={14} /> {reactions}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CtaPanel() {
  return (
    <Link
      href="/contact"
      className="group relative isolate block overflow-hidden rounded-3xl bg-cobalt"
      aria-label={contactCta.button}
    >
      {/* bold wave stripes — shift on hover */}
      <svg
        aria-hidden
        viewBox="0 0 1200 520"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 -z-10 h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110 group-hover:rotate-2"
      >
        <path d="M-50 120C200 20 380 260 620 170S1000-20 1260 60v-120H-50z" fill="var(--color-lilac)" />
        <path d="M-50 330C180 230 420 470 660 360s380-220 600-120v60C1040 200 880 440 640 520H-50z" fill="var(--color-lilac)" />
        <path d="M-50 470c240-80 460 60 700-10s420-140 610-60V600H-50z" fill="var(--color-lime)" />
        <circle cx="1030" cy="150" r="70" fill="var(--color-tangerine)" />
      </svg>
      <div className="grid min-h-[20rem] place-items-center p-6 sm:min-h-[26rem]">
        <span className="flex items-center gap-2 border-[3px] border-ink bg-lime p-2 shadow-[6px_6px_0_var(--color-ink)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-2deg] sm:gap-4 sm:p-3">
          <span className="grid size-10 place-items-center bg-ink text-lime sm:size-16">
            <Icon name="send" size={24} />
          </span>
          <span className="display px-1 text-[clamp(1.5rem,5.5vw,4.5rem)]">{contactCta.button}</span>
          <span className="grid size-10 place-items-center bg-ink text-lime sm:size-16">
            <Icon name="arrowUpRight" size={24} />
          </span>
        </span>
      </div>
    </Link>
  );
}

export function ContactCta() {
  return (
    <section aria-labelledby="say-hello" className="shell pt-28 pb-10 sm:pt-40">
      <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Pop className="mx-auto w-[min(20rem,70vw)] md:w-full md:max-w-sm">
          <Mascot />
        </Pop>
        <div>
          <div id="say-hello">
            <SplitTitle as="h2" text={contactCta.title} className="text-[clamp(2.75rem,9vw,7rem)]" />
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">{contactCta.body}</p>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-16 sm:mt-24">
        <Pop className="relative z-10 -mb-16 ml-2 sm:-mb-20 sm:ml-10" rotate={-2}>
          <CommentCard author={site.firstName} body={contactCta.comment} reactions={contactCta.reactions} />
        </Pop>
        <CtaPanel />
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16">
      <div className="shell grid gap-8 border-t border-line py-10 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="display text-2xl">{site.name}</p>
          <p className="mt-2 max-w-sm text-ink-2">{site.role} · {site.location}</p>
          <a href={`mailto:${site.email}`} className="label mt-5 inline-flex items-center gap-2 text-[13px] hover:text-cobalt">
            <Icon name="mail" size={14} /> {site.email}
          </a>
        </div>
        <div className="flex flex-col gap-5 sm:items-end">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="label text-[12px] text-ink-2 hover:text-ink">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid size-10 place-items-center bg-card ring-1 ring-line transition-colors hover:bg-lime"
              >
                <Icon name={s.icon} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="shell label flex flex-wrap justify-between gap-2 pb-4 text-[11px] text-ink-3">
        <span>
          © {year} {site.copyright}
        </span>
        <span>{site.builtIn}</span>
      </div>
      <Ruler className="border-t border-b-0" />
    </footer>
  );
}
