"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Accent } from "@/content/site";
import { accents, cn } from "@/lib/utils";
import { Canvas, Draggable } from "@/components/ui/motion";
import { Icon } from "@/components/ui/Icon";

type Item = { src: string; caption: string; x: number; y: number; w: number; r: number; accent: Accent };

const stickers = [
  {
    key: "sun",
    x: 22, y: 30, mx: 70, my: 30,
    svg: (
      <svg viewBox="0 0 80 80" className="size-20" aria-hidden>
        <g stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round">
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d="M40 4v10" transform={`rotate(${i * 45} 40 40)`} />
          ))}
        </g>
        <circle cx="40" cy="40" r="20" fill="var(--color-tangerine)" stroke="var(--color-ink)" strokeWidth="3" />
        <path d="M32 42c3 4 13 4 16 0" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="33" cy="35" r="2.5" />
        <circle cx="47" cy="35" r="2.5" />
      </svg>
    ),
  },
  {
    key: "star",
    x: 68, y: 34, mx: 8, my: 58,
    svg: (
      <svg viewBox="0 0 80 80" className="size-20" aria-hidden>
        <path
          d="m40 6 9 22 24 2-18 16 6 24-21-13-21 13 6-24L7 30l24-2z"
          fill="var(--color-lilac)"
          stroke="var(--color-ink)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "rainbow",
    x: 88, y: 38, mx: 60, my: 84,
    svg: (
      <svg viewBox="0 0 100 60" className="w-28" aria-hidden>
        {[
          ["var(--color-cobalt)", 44],
          ["var(--color-lime)", 34],
          ["var(--color-tangerine)", 24],
        ].map(([c, r]) => (
          <path
            key={r}
            d={`M${50 - Number(r)} 55a${r} ${r} 0 0 1 ${Number(r) * 2} 0`}
            fill="none"
            stroke={String(c)}
            strokeWidth="9"
          />
        ))}
        <path d="M2 55h96" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "bird",
    x: 12, y: 84, mx: 76, my: 8,
    svg: (
      <span className="grid size-16 place-items-center rounded-full border-[3px] border-ink bg-lime">
        <Icon name="bird" size={34} />
      </span>
    ),
  },
];

/** A pinboard of photos and stickers you can rearrange. “Tidy up” resets it. */
export function PlaygroundCanvas({ items, hint }: { items: Item[]; hint: string }) {
  const [round, setRound] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <Canvas
        key={round}
        className="min-h-[1480px] overflow-hidden sm:min-h-[max(44rem,calc(100svh_-_var(--nav-h)_-_1.5rem))]"
      >
        {items.map((item, i) => {
          const mobile = { x: i % 2 ? 44 : 4, y: 2 + i * 10.4 };
          return (
            <motion.div
              key={item.src}
              className="absolute top-(--my) left-(--mx) sm:top-(--y) sm:left-(--x)"
              style={
                {
                  "--x": `${item.x}%`,
                  "--y": `${item.y}%`,
                  "--mx": `${mobile.x}%`,
                  "--my": `${mobile.y}%`,
                } as CSSProperties
              }
              initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: item.r * 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.1 + i * 0.07 }}
            >
              <Draggable>
                <figure
                  className="relative w-[min(var(--w),46vw)] bg-card p-2 shadow-[0_24px_40px_-24px_rgb(22_20_15/0.6)] ring-1 ring-ink/5"
                  style={{ "--w": `${item.w}px`, transform: `rotate(${item.r}deg)` } as CSSProperties}
                >
                  <div className="relative aspect-[5/6] overflow-hidden bg-line">
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      sizes="240px"
                      draggable={false}
                      className="pointer-events-none object-cover"
                    />
                  </div>
                  <figcaption
                    className={cn(
                      "hand absolute -bottom-4 left-1/2 w-max max-w-[110%] -translate-x-1/2 px-3 py-1 text-lg shadow-sm sm:text-xl",
                      accents[item.accent].soft,
                    )}
                    style={{ rotate: `${-item.r * 1.4}deg` }}
                  >
                    {item.caption}
                  </figcaption>
                </figure>
              </Draggable>
            </motion.div>
          );
        })}

        {stickers.map((s, i) => (
          <motion.div
            key={s.key}
            className="absolute top-(--my) left-(--mx) sm:top-(--y) sm:left-(--x)"
            style={{ "--x": `${s.x}%`, "--y": `${s.y}%`, "--mx": `${s.mx}%`, "--my": `${s.my}%` } as CSSProperties}
            initial={reduce ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.8 + i * 0.1 }}
          >
            <Draggable>{s.svg}</Draggable>
          </motion.div>
        ))}
      </Canvas>

      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-30 flex justify-center">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-card py-1.5 pr-1.5 pl-5 shadow-[0_18px_40px_-20px_rgb(22_20_15/0.5)] ring-1 ring-line">
          <span className="hand text-xl">{hint}</span>
          <button
            type="button"
            onClick={() => setRound((r) => r + 1)}
            className="label flex items-center gap-2 rounded-full bg-ink px-3.5 py-2.5 text-[11px] text-paper transition-colors hover:bg-cobalt"
          >
            <Icon name="shapes" size={13} /> Tidy up
          </button>
        </div>
      </div>
    </div>
  );
}
