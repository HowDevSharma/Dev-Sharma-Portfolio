"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { home } from "@/content/site";
import { accents, cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Pop, Reveal } from "@/components/ui/motion";
import { Polaroid, SelectionFrame } from "@/components/ui/primitives";
import { Statement } from "./Statement";

/** A hand-drawn line that draws itself as you scroll past. */
function ScrollSquiggle() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "end 0.35"] });
  const length = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} aria-hidden>
    <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="h-28 w-full sm:h-40">
      <motion.path
        d="M-10 170C180 120 300 60 520 70s300 110 520 60 260-110 420-90"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength: length }}
      />
    </svg>
    </div>
  );
}

export function Intro() {
  const { intro } = home;
  return (
    <section aria-label="Introduction" className="relative pb-24 sm:pb-36">
      <ScrollSquiggle />
      <div className="shell relative">
        <Reveal className="-mt-10 mb-10 ml-[6%] w-fit -rotate-[8deg] sm:-mt-16">
          <span className="hand text-2xl sm:text-3xl">{intro.scribble}</span>
        </Reveal>

        <div className="flex justify-center">
          <Pop>
            <SelectionFrame accent="ink" className="px-3 py-1">
              <span className="text-2xl font-medium sm:text-3xl">{intro.label}</span>
            </SelectionFrame>
          </Pop>
        </div>

        <div className="relative mx-auto mt-10 max-w-4xl text-center">
          <Statement segments={intro.statement} />
        </div>

        {/* polaroids — flanking on desktop, a pair on mobile */}
        <div className="mt-12 flex justify-center gap-4 lg:mt-0 lg:block">
          <Pop
            rotate={-8}
            className="w-40 lg:absolute lg:top-[38%] lg:-left-2 lg:w-52 xl:left-[-2%]"
          >
            <Polaroid {...intro.polaroids[0]} />
          </Pop>
          <Pop
            rotate={7}
            delay={0.1}
            className="w-40 lg:absolute lg:top-[30%] lg:-right-2 lg:w-52 xl:right-[-2%]"
          >
            <Polaroid {...intro.polaroids[1]} />
          </Pop>
        </div>

        <ul className="mx-auto mt-16 flex max-w-3xl flex-wrap justify-center gap-2 sm:mt-20">
          {intro.skills.map((s, i) => {
            const a = accents[s.accent];
            return (
              <Reveal as="li" key={s.label} delay={i * 0.08} y={16} className="flex gap-1.5">
                <span
                  className={cn(
                    "px-3 py-2 text-[clamp(1.1rem,2.6vw,1.75rem)] font-medium tracking-tight whitespace-nowrap",
                    a.bg,
                    a.onBg,
                  )}
                >
                  {s.label}
                </span>
                <span
                  className={cn(
                    "grid aspect-square place-items-center border-2 border-dashed border-ink/70 px-2",
                    a.soft,
                  )}
                >
                  <Icon name={s.icon} size={22} />
                </span>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
