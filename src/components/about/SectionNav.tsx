"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import type { IconName } from "@/components/ui/Icon";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/** Floating tool-panel style section nav with scroll-spy. */
export function SectionNav({ sections }: { sections: { id: string; label: string; icon: IconName }[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const lenis = useLenis();

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="On this page"
      className="fixed top-1/2 left-4 z-30 hidden -translate-y-1/2 flex-col gap-1 rounded-2xl bg-card p-2 shadow-[0_20px_40px_-20px_rgb(22_20_15/0.4)] ring-1 ring-line xl:flex"
    >
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          onClick={(e) => {
            if (!lenis) return;
            e.preventDefault();
            lenis.scrollTo(`#${s.id}`, { offset: -90 });
          }}
          aria-current={active === s.id ? "true" : undefined}
          className={cn(
            "label flex w-16 flex-col items-center gap-2 rounded-xl py-3 text-[11px] transition-colors",
            active === s.id ? "bg-ink text-paper" : "hover:bg-paper",
          )}
        >
          <Icon name={s.icon} size={18} />
          {s.label}
        </a>
      ))}
    </nav>
  );
}
