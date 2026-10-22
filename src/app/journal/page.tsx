import type { Metadata } from "next";
import { journal, posts } from "@/content/journal";
import { Ruler } from "@/components/layout/Ruler";
import { ContactCta, Footer } from "@/components/layout/Footer";
import { PostCard } from "@/components/journal/PostCard";
import { Pop, Reveal, SplitTitle } from "@/components/ui/motion";
import { StickyNote } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on craft, research and process from a working product designer.",
};

export default function JournalPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <Ruler />
      <div className="shell pt-14 sm:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SplitTitle text={journal.title} className="text-[clamp(3.25rem,11vw,9rem)]" />
          <Pop rotate={-3} delay={0.4} className="mb-2">
            <StickyNote accent="lilac" className="max-w-64">
              Short notes, written on the tram. New ones most months.
            </StickyNote>
          </Pop>
        </div>
        <ul className="mt-16 grid gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={(i % 3) * 0.08}>
              <PostCard post={post} priority={i < 3} />
            </Reveal>
          ))}
        </ul>
      </div>
      <ContactCta />
      <Footer />
    </>
  );
}
