"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";
import { greetings } from "@/content/site";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Smooth scrolling (skipped for reduced-motion users)                          */
/* -------------------------------------------------------------------------- */

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);
  return null;
}

export function SmoothScroll({ children }: { children?: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.12, smoothWheel: true }}>
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}

/* -------------------------------------------------------------------------- */
/* Multiplayer-style “YOU” cursor for mouse users                               */
/* -------------------------------------------------------------------------- */

function subscribePointer(cb: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

const INTERACTIVE = "a, button, [role=button], input, textarea, select, label, [data-cursor]";

export function Cursor() {
  const fine = useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const tx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const ty = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [visible, setVisible] = useState(false);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!fine) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHot(!!(e.target as Element | null)?.closest?.(INTERACTIVE));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div className="absolute top-0 left-0" style={{ x, y, opacity: visible ? 1 : 0 }}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          className={cn("-translate-x-[3px] -translate-y-[2px] transition-transform duration-150", hot && "scale-90")}
        >
          <path d="M3 2l16.5 7.2-7 2.3-2.3 7z" fill="var(--color-ink)" stroke="var(--color-card)" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <motion.div className="absolute top-0 left-0" style={{ x: tx, y: ty, opacity: visible ? 1 : 0 }}>
        <span
          className={cn(
            "label absolute top-5 left-4 rounded-full px-2.5 py-1.5 text-[11px] transition-colors duration-200",
            hot ? "bg-lime text-ink" : "bg-ink text-paper",
          )}
        >
          You
        </span>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* First-visit preloader                                                        */
/* -------------------------------------------------------------------------- */

export const SEEN_KEY = "ds-seen";

/** Runs before paint so returning visitors never see a flash of the preloader. */
export const preloaderScript = `try{if(sessionStorage.getItem('${SEEN_KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.seen='1'}catch(e){}`;

export function Preloader() {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.seen) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 150;
    for (const word of greetings) {
      for (let i = 1; i <= word.length; i++) {
        const slice = word.slice(0, i);
        timers.push(setTimeout(() => setText(slice), t));
        t += 55;
      }
      t += 240;
    }
    timers.push(
      setTimeout(() => {
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
        setDone(true);
      }, t + 150),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="preloader fixed inset-0 z-[90] grid place-items-center bg-paper [background-image:linear-gradient(to_right,var(--color-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid)_1px,transparent_1px)] [background-size:var(--grid-size)_var(--grid-size)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          aria-hidden
        >
          <motion.div
            exit={{ scale: 1.6, opacity: 0, rotate: -4 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="flex min-w-16 items-center justify-center rounded-2xl border-2 border-ink bg-cobalt px-6 py-4 font-sans text-[clamp(2rem,6vw,3.5rem)] font-semibold text-white shadow-[6px_6px_0_var(--color-ink)]"
          >
            {text}
            <span className="ml-1 inline-block h-[0.9em] w-[3px] animate-blink bg-white" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
