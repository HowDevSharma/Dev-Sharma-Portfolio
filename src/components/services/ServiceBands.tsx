import type { Accent } from "@/content/site";
import { accentColor, accentSoftColor, accents, cn } from "@/lib/utils";
import { Reveal, SplitTitle } from "@/components/ui/motion";

type Service = { title: string; body: string; chips: string[]; accent: Accent };

/** Jagged top edge with little vertex dots, like a line chart. */
function ZigZag({ fill, offset }: { fill: string; offset: number }) {
  const pts = [0, 180, 380, 590, 790, 1000, 1210, 1440].map((x, i) => [x, (i + offset) % 2 ? 20 : 70 - (i % 3) * 12]);
  const line = pts.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="block h-14 w-full sm:h-20" aria-hidden>
      <polygon points={`${line} 1440,90 0,90`} fill={fill} />
      <polyline points={line} fill="none" stroke="var(--color-ink)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      {pts.slice(1, -1).map(([x, y]) => (
        <rect key={x} x={x - 5} y={y - 5} width="10" height="10" fill="var(--color-ink)" />
      ))}
    </svg>
  );
}

/** A big faint shape behind each band's title. */
function BackdropShape({ index, color }: { index: number; color: string }) {
  const shapes = [
    <path key="a" d="M200 20 380 200 200 380 20 200z" />,
    <circle key="b" cx="200" cy="200" r="180" />,
    <path key="c" d="M200 20c40 90 90 140 180 180-90 40-140 90-180 180-40-90-90-140-180-180 90-40 140-90 180-180z" />,
    <path key="d" d="M40 40h320v320H40z" transform="rotate(12 200 200)" />,
  ];
  return (
    <svg
      viewBox="0 0 400 400"
      className="pointer-events-none absolute top-10 left-1/2 -z-10 w-[min(38rem,90vw)] -translate-x-1/2 opacity-60"
      fill={color}
      aria-hidden
    >
      {shapes[index % shapes.length]}
    </svg>
  );
}

export function ServiceBands({ items }: { items: Service[] }) {
  return (
    <div>
      {items.map((s, i) => {
        const soft = accentSoftColor[s.accent];
        const [first, ...rest] = s.title.split(" ");
        return (
          <section key={s.title} aria-label={s.title} className="relative" style={{ marginTop: i === 0 ? 0 : -1 }}>
            <ZigZag fill={soft} offset={i} />
            <div className="relative isolate overflow-hidden pb-24 sm:pb-32" style={{ background: soft }}>
              <BackdropShape index={i} color={accentColor[s.accent]} />
              <div className="shell flex flex-col items-center pt-8 text-center">
                <span className="label grid size-12 place-items-center rounded-full border-[1.5px] border-ink text-[12px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-6">
                  <SplitTitle as="h2" text={first} className="text-[clamp(2.75rem,9vw,7rem)]" />
                  {rest.length > 0 && (
                    <SplitTitle as="p" text={rest.join(" ")} delay={0.2} className="text-[clamp(2.75rem,9vw,7rem)]" />
                  )}
                </div>
                <Reveal>
                  <p className="mt-6 max-w-md text-lg text-ink-2">{s.body}</p>
                </Reveal>
                <ul className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-x-4 gap-y-6 text-left xs:grid-cols-2 md:grid-cols-3">
                  {s.chips.map((c, ci) => (
                    <Reveal as="li" key={c} delay={ci * 0.06} y={16}>
                      <span
                        className={cn("folder label block px-4 py-4 text-[12px]", accents[s.accent].bg, accents[s.accent].onBg)}
                      >
                        {c}
                      </span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
