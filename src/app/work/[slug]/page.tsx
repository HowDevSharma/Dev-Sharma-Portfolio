import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projectDisclaimer, projects } from "@/content/projects";
import { accents, cn, formatDate } from "@/lib/utils";
import { Ruler } from "@/components/layout/Ruler";
import { ContactCta, Footer } from "@/components/layout/Footer";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ProjectCard } from "@/components/work/ProjectStack";
import { Icon } from "@/components/ui/Icon";
import { Pop, Reveal, SplitTitle } from "@/components/ui/motion";
import { DateLabel, FolderChip, Scribble, SelectionFrame } from "@/components/ui/primitives";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

const noteAccents = ["cobalt", "tangerine", "lime", "lilac"] as const;
const noteTilt = [-3, 2.5, 2, -2.5];

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);
  const frameAccent = project.accent === "ink" ? "cobalt" : project.accent;

  return (
    <>
      <Ruler />
      <article>
        <header className="shell grid gap-12 pt-14 sm:pt-20 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <DateLabel className="text-ink-2">{formatDate(project.date)}</DateLabel>
            <SplitTitle text={project.title} className="mt-5 text-[clamp(3.25rem,10vw,8rem)]" />
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-lg text-xl leading-snug text-ink-2 sm:text-2xl">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2 pt-2">
                {project.tags.map((t) => (
                  <FolderChip key={t}>{t}</FolderChip>
                ))}
              </div>
            </Reveal>
          </div>
          <dl className="grid grid-cols-2 gap-3 sm:gap-4">
            {project.meta.map((m, i) => (
              <Pop key={m.label} rotate={noteTilt[i]} delay={0.2 + i * 0.08}>
                <div className={cn("h-full p-4 shadow-[0_8px_20px_-12px_rgb(22_20_15/0.45)]", accents[noteAccents[i]].soft)}>
                  <dt className="label text-[11px] text-ink-2">{m.label}</dt>
                  <dd className="mt-2 leading-snug font-medium">{m.value}</dd>
                </div>
              </Pop>
            ))}
          </dl>
        </header>

        <Reveal className="shell mt-16 sm:mt-20">
          <SelectionFrame accent={frameAccent}>
            <div className="relative aspect-[16/10] overflow-hidden bg-line sm:aspect-[16/8]">
              <Image
                src={project.cover}
                alt={project.coverAlt}
                fill
                preload
                sizes="(min-width: 1248px) 76rem, 100vw"
                className="object-cover"
              />
            </div>
          </SelectionFrame>
        </Reveal>

        <div className="shell mt-20 max-w-3xl sm:mt-28">
          <ArticleBody sections={project.sections} accent={project.accent} wideImages />
          <p className="label mt-20 flex items-start gap-2 border-t border-line pt-6 text-[11px] leading-relaxed text-ink-3">
            <Icon name="spark" size={12} className="mt-px shrink-0" />
            {projectDisclaimer}
          </p>
        </div>
      </article>

      <section aria-label="Next project" className="mt-24">
        <div className="shell mb-8 flex items-center justify-between">
          <Scribble className="-rotate-2">next project</Scribble>
          <span className="label hidden items-center gap-2 text-[12px] text-ink-3 sm:flex">
            <Icon name="arrowRight" size={14} /> {next.title}
          </span>
        </div>
        <div className="shell">
          <ProjectCard project={next} index={0} total={projects.length} number={projects.indexOf(next) + 1} />
        </div>
      </section>

      <ContactCta />
      <Footer />
    </>
  );
}
