"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/** Round mascot. Pupils track the pointer; it blinks every few seconds. */
export function Mascot({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width * 0.5;
      const cy = r.top + r.height * 0.42;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 400);
      px.set((dx / d) * 9 * k);
      py.set((dy / d) * 9 * k);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [px, py]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 320"
      className={cn("h-auto w-full overflow-visible", className)}
      role="img"
      aria-label="A round, lime-green mascot"
    >
      {/* tail */}
      <path d="M54 196 8 226l58 6z" fill="var(--color-cobalt)" stroke="var(--color-ink)" strokeWidth="5" strokeLinejoin="round" />
      {/* feet */}
      <g stroke="var(--color-ink)" strokeWidth="6" strokeLinecap="round" fill="none">
        <path d="M130 272v26m-12 0h24M190 272v26m-12 0h24" />
      </g>
      {/* body */}
      <path
        d="M160 30c78 0 132 58 132 132 0 70-56 116-132 116S28 232 28 162C28 88 82 30 160 30z"
        fill="var(--color-lime)"
        stroke="var(--color-ink)"
        strokeWidth="6"
      />
      {/* belly */}
      <path d="M160 170c46 0 82 18 92 44-18 34-54 50-92 50s-74-16-92-50c10-26 46-44 92-44z" fill="var(--color-lime-soft)" />
      {/* wing */}
      <path
        d="M58 150c24-10 60 0 70 34 6 22-18 40-44 34-30-8-48-58-26-68z"
        fill="var(--color-lilac)"
        stroke="var(--color-ink)"
        strokeWidth="5"
      />
      {/* cheeks */}
      <circle cx="100" cy="150" r="13" fill="var(--color-tangerine)" opacity=".35" />
      <circle cx="232" cy="150" r="13" fill="var(--color-tangerine)" opacity=".35" />
      {/* eyes */}
      {[122, 202].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy="118" rx="26" ry="30" fill="#fff" stroke="var(--color-ink)" strokeWidth="5" />
          <motion.g style={{ x: sx, y: sy }}>
            <circle cx={cx} cy="120" r="12" fill="var(--color-ink)" />
            <circle cx={cx + 4} cy="115" r="3.5" fill="#fff" />
          </motion.g>
          <motion.rect
            x={cx - 29}
            y="86"
            width="58"
            height="64"
            fill="var(--color-lime)"
            style={{ originY: 0 }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 0, 1, 0] }}
            transition={{ duration: 4.2, times: [0, 0.9, 0.95, 1], repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      ))}
      {/* beak */}
      <path d="M144 150h32l-16 22z" fill="var(--color-tangerine)" stroke="var(--color-ink)" strokeWidth="5" strokeLinejoin="round" />
      {/* tuft */}
      <path d="M160 32c-6-16 2-26 14-26-2 10 4 16 12 18-10 2-18 6-26 8z" fill="var(--color-ink)" />
    </svg>
  );
}
