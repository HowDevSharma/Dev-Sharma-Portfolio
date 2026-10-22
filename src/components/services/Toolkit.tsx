"use client";

import type { Accent } from "@/content/site";
import { accents, cn } from "@/lib/utils";
import { Canvas, Draggable, Reveal } from "@/components/ui/motion";

type Group = { label: string; accent: Accent; items: string[] };

// Loose, hand-placed positions (percentages of each quadrant) for up to five chips.
const spots = [
  { x: 10, y: 34, r: -4 },
  { x: 50, y: 16, r: 6 },
  { x: 52, y: 50, r: -7 },
  { x: 16, y: 66, r: 3 },
  { x: 44, y: 80, r: -2 },
];

/** A four-quadrant board of draggable skill chips. */
export function Toolkit({ groups }: { groups: Group[] }) {
  return (
    <div className="relative grid md:grid-cols-2">
      {/* the cross */}
      <span aria-hidden className="absolute inset-y-0 left-1/2 hidden w-px bg-ink md:block" />
      <span aria-hidden className="absolute inset-x-0 top-1/2 hidden h-px bg-ink md:block" />
      {groups.map((g, gi) => (
        <Reveal key={g.label} delay={gi * 0.08} className={cn("relative", gi > 0 && "border-t border-ink md:border-t-0")}>
          <Canvas className="h-[22rem] sm:h-[24rem]">
            <span
              className={cn("folder label absolute top-10 left-4 px-3 py-2 text-[12px] sm:left-8", accents[g.accent].bg, accents[g.accent].onBg)}
            >
              {g.label}
            </span>
            <ul aria-label={g.label}>
              {g.items.map((item, i) => {
                const s = spots[i % spots.length];
                return (
                  <li key={item} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                    <Draggable>
                      <span
                        className={cn(
                          "block max-w-[10rem] px-3.5 py-2.5 text-[15px] leading-tight font-medium shadow-[0_8px_18px_-12px_rgb(22_20_15/0.6)] sm:max-w-none sm:whitespace-nowrap",
                          accents[g.accent].soft,
                        )}
                        style={{ transform: `rotate(${s.r}deg)` }}
                      >
                        {item}
                      </span>
                    </Draggable>
                  </li>
                );
              })}
            </ul>
          </Canvas>
        </Reveal>
      ))}
    </div>
  );
}
