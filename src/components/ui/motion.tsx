"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/* Reveal — fade and lift into view once.                                      */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span" | "section" | "article";
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Comp>
  );
}

/** Pop in with a little overshoot — for stickers and notes. */
export function Pop({
  children,
  className,
  delay = 0,
  rotate = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  rotate?: number;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: rotate - 12 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Canvas + Draggable — anything inside a Canvas can be picked up and moved.   */
/* -------------------------------------------------------------------------- */

const CanvasCtx = createContext<RefObject<HTMLDivElement | null> | null>(null);

export function Canvas({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <CanvasCtx.Provider value={ref}>
      <div ref={ref} className={cn("relative", className)} style={style}>
        {children}
      </div>
    </CanvasCtx.Provider>
  );
}

let zCounter = 20;

export function Draggable({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const bounds = useContext(CanvasCtx);
  const [z, setZ] = useState<number | undefined>(undefined);
  return (
    <motion.div
      drag
      dragConstraints={bounds ?? undefined}
      dragElastic={0.15}
      dragMomentum={false}
      whileDrag={{ scale: 1.06 }}
      whileHover={{ scale: 1.02 }}
      onPointerDown={() => setZ(++zCounter)}
      className={cn("touch-none cursor-grab active:cursor-grabbing", className)}
      style={{ ...style, zIndex: z ?? style?.zIndex }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* SplitTitle — big display word(s) that assemble letter by letter.            */
/* -------------------------------------------------------------------------- */

export function SplitTitle({
  text,
  className,
  delay = 0,
  as = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const words = text.split(" ");
  let i = 0;
  return (
    <Comp
      className={cn("display", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {[...word].map((ch) => {
            const d = delay + i++ * 0.045;
            return (
              <motion.span
                key={`${ch}-${d}`}
                className="inline-block"
                variants={{
                  hidden: reduce ? { opacity: 1 } : { opacity: 0.08, y: "0.35em", filter: "blur(6px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease, delay: d } },
                }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span className="inline-block w-[0.3em]" />}
        </span>
      ))}
    </Comp>
  );
}

/* -------------------------------------------------------------------------- */
/* ScrollWords — words ink in as the paragraph scrolls through the viewport.   */
/* -------------------------------------------------------------------------- */

export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  return scrollYProgress;
}

export function ScrollWord({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/* -------------------------------------------------------------------------- */
/* LiveClock                                                                   */
/* -------------------------------------------------------------------------- */

function subscribeToSeconds(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}

export function LiveClock({ timeZone, className }: { timeZone: string; className?: string }) {
  const seconds = useSyncExternalStore(
    subscribeToSeconds,
    () => Math.floor(Date.now() / 1000),
    () => null,
  );
  const time =
    seconds === null
      ? "--:--:--"
      : new Date(seconds * 1000).toLocaleTimeString("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
  return (
    <time className={cn("tabular-nums", className)} suppressHydrationWarning>
      {time}
    </time>
  );
}
