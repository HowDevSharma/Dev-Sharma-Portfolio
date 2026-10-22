import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPost, journal, posts } from "@/content/journal";
import { accents, cn, formatDate } from "@/lib/utils";
import { Ruler } from "@/components/layout/Ruler";
import { ContactCta, Footer } from "@/components/layout/Footer";
import { ArticleBody } from "@/components/article/ArticleBody";
import { CategoryBadge, PostCard } from "@/components/journal/PostCard";
import { Reveal } from "@/components/ui/motion";
import { DateLabel, Scribble, SelectionFrame } from "@/components/ui/primitives";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function PostPage(props: PageProps<"/journal/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();
  const others = posts.filter((p) => p.slug !== slug).slice(0, 3);
  const frameAccent = post.accent === "ink" ? "cobalt" : post.accent;

  return (
    <>
      <Ruler />
      <article className="shell grid gap-12 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <header className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)] lg:self-start">
          <DateLabel className="text-ink-2">{formatDate(post.date)}</DateLabel>
          <div className="mt-8 flex items-center gap-3">
            <CategoryBadge post={post} size="lg" />
            <span className="text-xl font-medium">{post.category}</span>
          </div>
          <Reveal>
            <h1 className="mt-5 text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.03em]">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <span className="label border-[1.5px] border-ink px-2 py-1 text-[11px]">Summary</span>
            <p className={cn("mt-3 p-5 text-lg leading-relaxed", accents[post.accent].soft)}>{post.summary}</p>
          </Reveal>
        </header>

        <div>
          <Reveal>
            <SelectionFrame accent={frameAccent}>
              <div className="relative aspect-[16/11] overflow-hidden bg-line">
                <Image src={post.cover} alt={post.coverAlt} fill preload sizes="(min-width: 1024px) 42rem, 100vw" className="object-cover" />
              </div>
            </SelectionFrame>
          </Reveal>
          <div className="mt-12 space-y-5 text-lg leading-relaxed text-ink-2">
            {post.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ArticleBody sections={post.sections} accent={post.accent} className="mt-14" />
        </div>
      </article>

      <section aria-label="More journal entries" className="shell mt-28">
        <Scribble className="-rotate-2">{journal.moreLabel}</Scribble>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.08}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </ul>
      </section>

      <ContactCta />
      <Footer />
    </>
  );
}
