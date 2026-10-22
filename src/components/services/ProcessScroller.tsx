"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Accent } from "@/content/site";
import type { IconName } from "@/components/ui/Icon";
import { Icon } from "@/components/ui/Icon";
import { accents, cn } from "@/lib/utils";
import { CursorTag } from "@/components/ui/primitives";

type Step = { title: string; body: string; icon: IconName; accent: Accent };

function PhoneCard({ step, index }: { step: Step; index: number }) {
  return (
    <article
      className={cn(
        "relative flex h-[30rem] w-[min(19rem,78vw)] shrink-0 flex-col items-center rounded-[2.75rem] border-[3px] border-ink px-6 pt-16 pb-6 text-center",
        accents[step.accent].soft,
      )}
    >
      <span aria-hidden className="absolute top-0 left-1/2 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-ink" />
      <span className="grid size-20 place-items-center rounded-full border-[3px] border-ink bg-card">
        <Icon name={step.icon} size={34} />
      </span>
      <h3 className="mt-8 text-4xl font-semibold tracking-tight">{step.title}</h3>
      <p className="mt-3 text-ink-2">{step.body}</p>
      <div className="mt-5">
        <CursorTag text={`Step ${String(index + 1).padStart(2, "0")}`} accent={step.accent} side="right" rotate={-6} float={false} />
      </div>
      <span className="mt-auto grid size-12 place-items-center self-end rounded-full border-[3px] border-ink bg-card">
        <Icon name="arrowRight" size={20} />
      </span>
    </article>
  );
}

function subscribeWidth(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}

/** Pinned section that scrolls sideways through the process steps on desktop. */
export function ProcessScroller({ title, steps }: { title: string[]; steps: Step[] }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const t = track.current;
      if (!t) return;
      setDistance(Math.max(0, t.scrollWidth - window.innerWidth + 64));
    };
    // ResizeObserver also fires once on observe(), which takes the first measurement.
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    const off = subscribeWidth(measure);
    return () => {
      ro.disconnect();
      off();
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const pinned = !reduce && distance > 0;

  const heading = (
    <h2 className="display shrink-0 pr-6 text-[clamp(3rem,8vw,7rem)]">
      {title.map((t) => (
        <span key={t} className="block">
          {t}
        </span>
      ))}
    </h2>
  );

  return (
    <section aria-label={title.join(" ")} className="relative">
      {/* desktop: pinned horizontal scroll */}
      <div ref={outer} className="hidden lg:block" style={{ height: pinned ? `calc(100vh + ${distance}px)` : undefined }}>
        <div className={cn("flex items-center overflow-hidden", pinned && "sticky top-0 h-screen")}>
          <motion.div ref={track} style={{ x: pinned ? x : 0 }} className="flex items-center gap-10 pr-16 pl-[max(2rem,calc((100vw-78rem)/2+2rem))]">
            {heading}
            {steps.map((s, i) => (
              <PhoneCard key={s.title} step={s} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* mobile & tablet: native swipe */}
      <div className="lg:hidden">
        <div className="shell">{heading}</div>
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:px-8" data-lenis-prevent-horizontal>
          {steps.map((s, i) => (
            <div key={s.title} className="snap-center">
              <PhoneCard step={s} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
