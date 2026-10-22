import type { Metadata } from "next";
import { Ruler } from "@/components/layout/Ruler";
import { CtaButton, Scribble, SelectionFrame } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <>
      <Ruler />
      <section className="flex min-h-[calc(100svh_-_var(--nav-h)_-_1.5rem)] flex-col items-center justify-center px-4 text-center">
        <Scribble className="-rotate-3">error 404</Scribble>
        <SelectionFrame accent="tangerine" className="mt-8 rotate-2 px-6 py-2">
          <h1 className="display text-[clamp(3.5rem,14vw,9rem)]">Flown off</h1>
        </SelectionFrame>
        <p className="mt-8 max-w-sm text-lg text-ink-2">
          This page has left the nest. Let&apos;s get you somewhere useful.
        </p>
        <CtaButton href="/" className="mt-8">
          Back home
        </CtaButton>
      </section>
    </>
  );
}
