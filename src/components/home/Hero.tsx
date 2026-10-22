"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { home, site } from "@/content/site";
import { Canvas, Draggable, LiveClock } from "@/components/ui/motion";
import { CommentPin, CtaButton, CursorTag, Scribble, SelectionFrame, StickyNote } from "@/components/ui/primitives";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  // Wait for the first-visit preloader before playing the entrance.
  const [delay] = useState(() =>
    typeof document !== "undefined" && !document.documentElement.dataset.seen ? 2.3 : 0.1,
  );
  const { hero } = home;
  const letters = [...site.firstName.toUpperCase()];

  const pop = (i: number, rotate = 0) => ({
    initial: reduce ? false : { opacity: 0, scale: 0.5, rotate: rotate - 10 },
    animate: { opacity: 1, scale: 1, rotate },
    transition: { type: "spring" as const, stiffness: 240, damping: 16, delay: delay + 0.55 + i * 0.12 },
  });

  return (
    <Canvas className="mx-auto flex min-h-[calc(100svh_-_var(--nav-h)_-_1.5rem)] max-w-[90rem] flex-col items-center overflow-hidden px-4 pt-6 pb-10">
      <p className="label flex items-center gap-2 text-[13px] text-ink-2">
        <span className="text-ink-3">{site.cityLabel}</span>
        <LiveClock timeZone={site.timeZone} className="text-ink" />
      </p>

      <div className="relative my-auto flex w-full flex-col items-center pt-10 pb-40 sm:pt-20 sm:pb-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay }}
          className="mb-28 sm:mb-5"
        >
          <Scribble className="text-3xl sm:text-4xl">{hero.kicker}</Scribble>
        </motion.div>

        <div className="relative">
          {/* sticky notes pinned to the name frame */}
          <motion.div {...pop(0, -7)} className="absolute -top-[5.5rem] left-0 z-20 max-w-[9.5rem] sm:-top-14 sm:-left-16 sm:max-w-none">
            <Draggable>
              <StickyNote accent={hero.notes[0].accent} className="text-[13px] sm:text-[15px]">
                {hero.notes[0].text}
              </StickyNote>
            </Draggable>
          </motion.div>
          <motion.div {...pop(1, 5)} className="absolute -top-[4.5rem] right-0 z-20 max-w-[9.5rem] sm:-top-12 sm:-right-20 sm:max-w-none">
            <Draggable>
              <StickyNote accent={hero.notes[1].accent} className="text-[13px] sm:text-[15px]">
                {hero.notes[1].text}
              </StickyNote>
            </Draggable>
          </motion.div>

          <SelectionFrame accent="cobalt" className="px-4 py-3 sm:px-8 sm:py-5">
            <h1
              className="display flex text-[clamp(4rem,15.5vw,12.5rem)] leading-[0.95]"
              aria-label={`${site.name}, ${site.role.toLowerCase()} in ${site.location}`}
            >
              {letters.map((ch, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="inline-block"
                  initial={reduce ? false : { y: "0.6em", opacity: 0, rotate: i % 2 ? 8 : -8 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 15, delay: delay + i * 0.07 }}
                >
                  {ch}
                </motion.span>
              ))}
            </h1>
          </SelectionFrame>
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.5 }}
          className="label mt-7 flex items-center gap-2.5 text-center text-[12px] sm:text-[13px]"
        >
          <span className="relative flex size-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-lime" />
            <span className="relative size-2.5 rounded-full bg-lime ring-1 ring-ink/40" />
          </span>
          {site.availability}
        </motion.p>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: delay + 0.65 }}
          className="mt-4 max-w-md text-center text-lg text-ink-2 sm:text-xl"
        >
          {hero.tagline}
        </motion.p>

        {/* floating multiplayer cursors */}
        <motion.div {...pop(2, -12)} className="absolute bottom-16 left-0 z-20 sm:bottom-2 sm:left-[4%] lg:left-[8%]">
          <Draggable>
            <CursorTag text={hero.tags[0].text} accent={hero.tags[0].accent} side="right" rotate={-12} />
          </Draggable>
        </motion.div>
        <motion.div {...pop(3, 10)} className="absolute right-0 bottom-2 z-20 sm:right-[6%] sm:bottom-16 lg:right-[12%]">
          <Draggable>
            <CursorTag text={hero.tags[1].text} accent={hero.tags[1].accent} side="left" rotate={10} />
          </Draggable>
        </motion.div>
      </div>

      {/* comment pins */}
      {hero.pins.map((pin, i) => (
        <motion.div
          key={pin.comment}
          {...pop(4 + i)}
          className={
            i === 0
              ? "absolute top-[34%] left-[3%] z-10 hidden md:block lg:left-[6%]"
              : "absolute top-[56%] right-[3%] z-10 hidden md:block lg:right-[7%]"
          }
        >
          <Draggable className="group relative">
            <CommentPin accent={i === 0 ? "lilac" : "lime"} />
            <span className="pointer-events-none absolute top-1 left-[calc(100%+10px)] w-max max-w-52 rounded-lg bg-card px-3 py-2 text-sm opacity-0 shadow-lg ring-1 ring-line transition-opacity group-hover:opacity-100">
              {pin.comment}
            </span>
          </Draggable>
        </motion.div>
      ))}

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: delay + 0.9 }}
      >
        <CtaButton href="/contact">{hero.cta}</CtaButton>
      </motion.div>
    </Canvas>
  );
}
