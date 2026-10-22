"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { ScrollWord, useScrollProgress } from "@/components/ui/motion";

type Segment = { text: string; media: string };

/** Little inline stickers that sit between words. */
function Sticker({ kind }: { kind: string }) {
  const reduce = useReducedMotion();
  const common = "mx-[0.18em] inline-block size-[0.85em] -translate-y-[0.06em] align-middle";
  const inner =
    kind === "avatar" ? (
      <span className={cn(common, "relative overflow-hidden rounded-[0.2em] ring-2 ring-ink")}>
        <Image src={site.avatar} alt="" fill sizes="80px" className="object-cover" />
      </span>
    ) : kind === "knot" ? (
      <svg viewBox="0 0 40 40" className={common} aria-hidden>
        <rect width="40" height="40" rx="8" fill="var(--color-tangerine)" />
        <path
          d="M9 27c6-18 16-18 14-6s-12 12-8 2 18-12 16 4"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <svg viewBox="0 0 40 40" className={common} aria-hidden>
        <rect width="40" height="40" rx="20" fill="var(--color-lilac)" />
        <path d="M7 22c4-5 7-5 11 0s7 5 11 0 4-3 5-2" fill="none" stroke="var(--color-ink)" strokeWidth="3.4" strokeLinecap="round" />
      </svg>
    );
  return (
    <motion.span
      className="inline-block"
      initial={reduce ? false : { scale: 0, rotate: -30 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ type: "spring", stiffness: 300, damping: 14 }}
    >
      {inner}
    </motion.span>
  );
}

/**
 * A big sentence whose words ink in as you scroll, with stickers between
 * phrases. Used on Home and About.
 */
export function Statement({ segments, className }: { segments: Segment[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const progress = useScrollProgress(ref);
  const words = segments.flatMap((s, si) =>
    s.text.split(" ").map((w, wi, arr) => ({ w, sticker: wi === arr.length - 1 ? s.media : null, key: `${si}-${wi}` })),
  );
  const n = words.length;
  const plain = segments.map((s) => s.text).join(" ") + ".";

  return (
    <p
      ref={ref}
      className={cn(
        "text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.12] font-medium tracking-[-0.02em] [font-stretch:92%]",
        className,
      )}
    >
      <span className="sr-only">{plain}</span>
      {words.map(({ w, sticker, key }, i) => (
        <span key={key} aria-hidden>
          <ScrollWord progress={progress} range={[i / n, Math.min(1, (i + 1.5) / n)]}>
            {w}
          </ScrollWord>
          {sticker && (
            <>
              {" "}
              <Sticker kind={sticker} />
            </>
          )}
          {i < n - 1 ? " " : "."}
        </span>
      ))}
    </p>
  );
}
