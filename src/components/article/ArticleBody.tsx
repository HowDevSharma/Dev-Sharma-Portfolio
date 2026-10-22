import Image from "next/image";
import type { Block, Section } from "@/content/projects";
import type { Accent } from "@/content/site";
import { accents, cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/motion";
import { SelectionFrame } from "@/components/ui/primitives";

function BlockView({ block, accent, wide }: { block: Block; accent: Accent; wide?: boolean }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "points":
      return (
        <ul className="space-y-4">
          {block.items.map((item) => (
            <li key={item.lead} className="flex gap-3">
              <span className={cn("mt-2.5 size-2 shrink-0 rotate-45", accents[accent].bg)} aria-hidden />
              <span>
                <strong className="font-semibold text-ink">{item.lead}</strong> {item.text}
              </span>
            </li>
          ))}
        </ul>
      );
    case "quotes":
      return (
        <div className="grid gap-3 py-2">
          {block.items.map((q, i) => (
            <blockquote
              key={q}
              className={cn(
                "w-fit max-w-full px-4 py-3 text-[1.05em] text-ink shadow-[0_8px_20px_-14px_rgb(22_20_15/0.5)]",
                accents[accent].soft,
                i % 2 ? "rotate-[0.6deg] sm:ml-10" : "-rotate-[0.6deg]",
              )}
            >
              “{q}”
            </blockquote>
          ))}
        </div>
      );
    case "image":
      return (
        <Reveal className={cn("py-6", wide && "lg:-mx-24")}>
          <SelectionFrame accent={accent === "ink" ? "cobalt" : accent}>
            <div className="relative aspect-[16/9] overflow-hidden bg-line">
              <Image src={block.src} alt={block.alt} fill sizes="(min-width: 1024px) 60rem, 100vw" className="object-cover" />
            </div>
          </SelectionFrame>
        </Reveal>
      );
  }
}

/** Renders case-study and journal sections from content data. */
export function ArticleBody({
  sections,
  accent,
  wideImages,
  className,
}: {
  sections: Section[];
  accent: Accent;
  wideImages?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("space-y-16", className)}>
      {sections.map((section) => (
        <section key={section.heading} className="space-y-5 text-lg leading-relaxed text-ink-2">
          <Reveal>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.75rem)] leading-tight font-semibold tracking-tight text-ink">
              {section.heading}
            </h2>
          </Reveal>
          {section.blocks.map((block, i) => (
            <BlockView key={i} block={block} accent={accent} wide={wideImages} />
          ))}
        </section>
      ))}
    </div>
  );
}
