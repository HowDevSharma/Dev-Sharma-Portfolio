import { cn } from "@/lib/utils";

const marks = Array.from({ length: 31 }, (_, i) => i * 100);

/** Design-tool ruler: minor ticks every 10px, labels every 100px (aligned to the page grid). */
export function Ruler({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative h-6 overflow-hidden border-b border-line bg-card/70", className)}>
      <div
        className="absolute inset-x-0 bottom-0 h-1.5"
        style={{
          backgroundImage: "repeating-linear-gradient(to right, var(--color-ink-3) 0 1px, transparent 1px 10px)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-3"
        style={{
          backgroundImage: "repeating-linear-gradient(to right, var(--color-ink-2) 0 1px, transparent 1px 100px)",
        }}
      />
      {marks.map((m) => (
        <span key={m} className="absolute top-0.5 font-mono text-[9px] text-ink-3" style={{ left: m + 4 }}>
          {m}
        </span>
      ))}
    </div>
  );
}
