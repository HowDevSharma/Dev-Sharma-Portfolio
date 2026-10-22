import Image from "next/image";
import Link from "next/link";
import type { JournalCategory, Post } from "@/content/journal";
import { accents, cn, formatDate } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";

export const categoryIcon: Record<JournalCategory, IconName> = {
  Craft: "pencil",
  Research: "search",
  Stories: "chat",
  Studio: "lamp",
  Process: "steps",
};

export function CategoryBadge({ post, size = "sm" }: { post: Post; size?: "sm" | "lg" }) {
  const a = accents[post.accent];
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-md border-[1.5px] border-ink",
        a.bg,
        a.onBg,
        size === "sm" ? "size-8" : "size-11",
      )}
      title={post.category}
    >
      <Icon name={categoryIcon[post.category]} size={size === "sm" ? 15 : 20} />
    </span>
  );
}

export function PostCard({ post, priority }: { post: Post; priority?: boolean }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="group flex h-full flex-col bg-card ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgb(22_20_15/0.55)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-line">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          preload={priority}
          sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex items-start gap-3 p-4">
        <CategoryBadge post={post} />
        <div>
          <h2 className="leading-snug font-semibold">{post.title}</h2>
          <p className="mt-1 text-sm text-ink-3">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.category}
          </p>
        </div>
      </div>
    </Link>
  );
}
