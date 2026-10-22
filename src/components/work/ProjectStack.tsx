import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import type { CSSProperties } from "react";
import { accents, cn, formatDate } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { ArrowLink, DateLabel, FolderChip, SelectionFrame } from "@/components/ui/primitives";

/** Folder-style project card. `index` offsets the tab so stacked cards read like a file drawer. */
export function ProjectCard({
  project,
  index,
  total,
  number = index + 1,
}: {
  project: Project;
  index: number;
  total: number;
  /** Number printed on the tab, if it differs from the stack position. */
  number?: number;
}) {
  const a = accents[project.accent];
  const dark = project.accent === "ink" || project.accent === "cobalt";
  const tabWidth = 100 / Math.max(total, 1);
  return (
    <article className="group/card">
      {/* tab */}
      <div className="relative h-10 sm:h-12">
        <div
          className={cn(
            "absolute bottom-0 left-0 flex h-full w-48 items-center gap-2 pr-10 pl-5 sm:pl-6 md:left-(--tab-left) md:w-(--tab-width)",
            a.bg,
            a.onBg,
          )}
          style={
            {
              "--tab-left": `${index * tabWidth}%`,
              "--tab-width": `${tabWidth}%`,
              clipPath: "polygon(0 0, calc(100% - 2.5rem) 0, 100% 100%, 0 100%)",
              borderTopLeftRadius: 14,
            } as CSSProperties
          }
        >
          <Icon name="steps" size={14} />
          <span className="label text-[12px]">Project {String(number).padStart(2, "0")}</span>
        </div>
      </div>

      <div
        className={cn(
          "grid gap-6 p-4 sm:p-6 md:min-h-[min(74vh,40rem)] md:grid-cols-[1fr_1.15fr] md:gap-10",
          index === 0 ? "rounded-2xl rounded-tl-none" : "rounded-2xl rounded-tl-none md:rounded-tl-2xl",
          a.bg,
          a.onBg,
        )}
      >
        <div className="flex flex-col py-2 sm:py-4">
          <DateLabel>{formatDate(project.date)}</DateLabel>
          <h3 className="mt-5 text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[0.95] font-semibold tracking-[-0.035em]">
            <Link href={`/work/${project.slug}`}>{project.title}</Link>
          </h3>
          <p className={cn("mt-4 max-w-sm text-lg leading-snug", dark ? "text-white/85" : "text-ink/80")}>
            {project.summary}
          </p>
          <div className="mt-6">
            <ArrowLink href={`/work/${project.slug}`}>View project</ArrowLink>
          </div>
          <div className="mt-auto flex flex-wrap gap-2 pt-10">
            {project.tags.map((t) => (
              <FolderChip key={t} accent={dark ? "paper" : "ink"}>
                {t}
              </FolderChip>
            ))}
          </div>
        </div>

        <SelectionFrame accent={dark ? "lime" : "ink"} className="min-h-64 sm:min-h-80 md:min-h-0">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
            />
          </div>
          <span className="label absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-ink px-2 py-1.5 text-[11px] text-paper">
            <Icon name="image" size={13} className="text-lime" />
            {project.slug}.jpg
          </span>
        </SelectionFrame>
      </div>
    </article>
  );
}

/**
 * Sticky stack: each card pins below the nav and the next one slides over it,
 * leaving the earlier tabs visible like a drawer of folders. Spacing uses
 * margin-top, not margin-bottom: a sticky element's margin box has to stay
 * inside its parent, so bottom margins would unstick cards early.
 */
export function ProjectStack({ projects }: { projects: Project[] }) {
  return (
    <div className="shell">
      {projects.map((p, i) => (
        <div
          key={p.slug}
          className="mt-10 first:mt-0 md:sticky md:mt-[18vh] md:first:mt-0"
          style={{ top: "calc(var(--nav-h) + 1.25rem)" }}
        >
          <ProjectCard project={p} index={i} total={projects.length} />
        </div>
      ))}
    </div>
  );
}
