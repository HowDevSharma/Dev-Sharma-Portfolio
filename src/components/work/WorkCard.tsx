import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import type { CSSProperties } from "react";
import { accentColor, accentOnColor, formatDate } from "@/lib/utils";
import { DateLabel } from "@/components/ui/primitives";

/** Grid card for the Work index: a folder with the date on its tab. */
export function WorkCard({ project, priority }: { project: Project; priority?: boolean }) {
  const vars = {
    "--accent": accentColor[project.accent],
    "--on-accent": accentOnColor[project.accent],
  } as CSSProperties;
  return (
    <Link href={`/work/${project.slug}`} className="group block" style={vars}>
      <div className="relative">
        <div
          className="flex h-10 w-[58%] max-w-72 items-center rounded-tl-xl bg-line pr-10 pl-4 transition-colors duration-300 group-hover:bg-(--accent) group-hover:text-(--on-accent)"
          style={{ clipPath: "polygon(0 0, calc(100% - 2.5rem) 0, 100% 100%, 0 100%)" }}
        >
          <DateLabel>{formatDate(project.date)}</DateLabel>
        </div>
        <div className="rounded-tr-xl rounded-b-xl bg-line p-2.5 transition-colors duration-300 group-hover:bg-(--accent) sm:p-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              preload={priority}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <h2 className="text-[clamp(2rem,3.6vw,3rem)] leading-none font-semibold tracking-tight">{project.title}</h2>
        <p className="mx-auto mt-3 max-w-sm text-ink-2">{project.summary}</p>
      </div>
    </Link>
  );
}
