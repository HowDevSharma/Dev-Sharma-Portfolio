import clsx, { type ClassValue } from "clsx";
import type { Accent } from "@/content/site";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** "2026-08-12" → "Aug 12, 2026" */
export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Tailwind needs full class names at build time, so accent styling is
 * looked up from this table rather than built with string templates.
 */
export const accents: Record<
  Accent,
  { bg: string; soft: string; text: string; onBg: string; border: string; fill: string }
> = {
  cobalt: {
    bg: "bg-cobalt",
    soft: "bg-cobalt-soft",
    text: "text-cobalt",
    onBg: "text-white",
    border: "border-cobalt",
    fill: "fill-cobalt",
  },
  lime: {
    bg: "bg-lime",
    soft: "bg-lime-soft",
    text: "text-lime-deep",
    onBg: "text-ink",
    border: "border-lime",
    fill: "fill-lime",
  },
  tangerine: {
    bg: "bg-tangerine",
    soft: "bg-tangerine-soft",
    text: "text-tangerine-deep",
    onBg: "text-ink",
    border: "border-tangerine",
    fill: "fill-tangerine",
  },
  lilac: {
    bg: "bg-lilac",
    soft: "bg-lilac-soft",
    text: "text-lilac-deep",
    onBg: "text-ink",
    border: "border-lilac",
    fill: "fill-lilac",
  },
  ink: {
    bg: "bg-ink",
    soft: "bg-line",
    text: "text-ink",
    onBg: "text-paper",
    border: "border-ink",
    fill: "fill-ink",
  },
};

/** CSS colour values for places Tailwind classes can't reach (SVG, inline styles). */
export const accentColor: Record<Accent, string> = {
  cobalt: "var(--color-cobalt)",
  lime: "var(--color-lime)",
  tangerine: "var(--color-tangerine)",
  lilac: "var(--color-lilac)",
  ink: "var(--color-ink)",
};

export const accentSoftColor: Record<Accent, string> = {
  cobalt: "var(--color-cobalt-soft)",
  lime: "var(--color-lime-soft)",
  tangerine: "var(--color-tangerine-soft)",
  lilac: "var(--color-lilac-soft)",
  ink: "var(--color-line)",
};

/** Text colour that reads on top of each solid accent. */
export const accentOnColor: Record<Accent, string> = {
  cobalt: "#ffffff",
  lime: "var(--color-ink)",
  tangerine: "var(--color-ink)",
  lilac: "var(--color-ink)",
  ink: "var(--color-paper)",
};
