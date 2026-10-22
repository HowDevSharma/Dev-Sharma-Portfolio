import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import type { Accent } from "@/content/site";
import { accentColor, accents, cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/* -------------------------------------------------------------------------- */
/* SelectionFrame — the “selected layer” box with four corner handles.         */
/* -------------------------------------------------------------------------- */

export function SelectionFrame({
  children,
  accent = "cobalt",
  label,
  labelAccent,
  className,
  handles = true,
  style,
}: {
  children?: ReactNode;
  accent?: Accent;
  label?: string;
  labelAccent?: Accent;
  className?: string;
  handles?: boolean;
  style?: CSSProperties;
}) {
  const color = accentColor[accent];
  const la = accents[labelAccent ?? accent];
  return (
    <div className={cn("relative border-[1.5px]", className)} style={{ borderColor: color, ...style }}>
      {label && (
        <span className={cn("label absolute -top-7 left-0 px-1.5 py-1 text-[11px]", la.bg, la.onBg)}>
          {label}
        </span>
      )}
      {handles &&
        ["-left-[6px] -top-[6px]", "-right-[6px] -top-[6px]", "-left-[6px] -bottom-[6px]", "-right-[6px] -bottom-[6px]"].map(
          (pos) => (
            <span
              key={pos}
              aria-hidden
              className={cn("absolute z-10 size-[11px] border-[1.5px] bg-card", pos)}
              style={{ borderColor: color }}
            />
          ),
        )}
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* StickyNote                                                                  */
/* -------------------------------------------------------------------------- */

export function StickyNote({
  children,
  accent = "lime",
  rotate = 0,
  className,
}: {
  children: ReactNode;
  accent?: Accent | "butter";
  rotate?: number;
  className?: string;
}) {
  const bg = accent === "butter" ? "bg-butter" : accents[accent].soft;
  return (
    <div
      className={cn("px-4 py-3 text-[15px] leading-snug shadow-[0_8px_20px_-12px_rgb(22_20_15/0.45)]", bg, className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CursorTag — a multiplayer-style cursor with a name pill.                     */
/* -------------------------------------------------------------------------- */

export function CursorTag({
  text,
  accent = "tangerine",
  side = "right",
  rotate = 0,
  float = true,
  className,
}: {
  text: string;
  accent?: Accent;
  side?: "left" | "right";
  rotate?: number;
  float?: boolean;
  className?: string;
}) {
  const a = accents[accent];
  return (
    <div
      className={cn("relative inline-flex select-none", float && "animate-float", className)}
      style={{ "--r": `${rotate}deg`, transform: `rotate(${rotate}deg)` } as CSSProperties}
    >
      <span
        className={cn(
          "label rounded-full border-2 border-ink px-4 py-2.5 text-[12px] whitespace-nowrap sm:text-[13px]",
          a.bg,
          a.onBg,
        )}
      >
        {text}
      </span>
      <Icon
        name="cursor"
        size={26}
        className={cn(
          "absolute -top-5",
          side === "right" ? "-right-4 -scale-x-100" : "-left-4",
        )}
        style={{ color: accentColor[accent], stroke: "var(--color-ink)", strokeWidth: 1.5 }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Polaroid                                                                    */
/* -------------------------------------------------------------------------- */

export function Polaroid({
  src,
  alt,
  caption,
  rotate = 0,
  className,
  sizes = "240px",
  aspect = "aspect-[4/4.4]",
}: {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
  className?: string;
  sizes?: string;
  aspect?: string;
}) {
  return (
    <figure
      className={cn("bg-card p-2.5 pb-1 shadow-[0_18px_40px_-20px_rgb(22_20_15/0.55)] ring-1 ring-ink/5", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className={cn("relative overflow-hidden bg-line", aspect)}>
        <Image src={src} alt={alt} fill sizes={sizes} className="pointer-events-none object-cover" draggable={false} />
      </div>
      {caption && <figcaption className="hand py-2 text-center text-lg text-ink-2">{caption}</figcaption>}
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/* Buttons & links                                                             */
/* -------------------------------------------------------------------------- */

export function CtaButton({
  href,
  children,
  icon = "chevrons",
  className,
  ...rest
}: { href: string; icon?: IconName; className?: string; children: ReactNode } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className"
>) {
  return (
    <Link
      href={href}
      className={cn(
        "group label inline-flex items-center gap-3 bg-ink py-1.5 pr-5 pl-1.5 text-[13px] text-paper transition-transform hover:-translate-y-0.5",
        className,
      )}
      {...rest}
    >
      <span className="grid size-9 place-items-center overflow-hidden border-2 border-paper/10 bg-lime text-ink">
        <Icon
          name={icon}
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-[3px]"
        />
      </span>
      {children}
    </Link>
  );
}

export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group label inline-flex items-center gap-2 border-b-[1.5px] border-current pb-1.5 text-[12px]",
        className,
      )}
    >
      {children}
      <Icon
        name="arrowUpRight"
        size={12}
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Small bits                                                                  */
/* -------------------------------------------------------------------------- */

export function FolderChip({
  children,
  accent = "ink",
  className,
}: {
  children: ReactNode;
  accent?: Accent | "paper";
  className?: string;
}) {
  const cls = accent === "paper" ? "bg-paper text-ink" : cn(accents[accent].bg, accents[accent].onBg);
  return <span className={cn("folder label inline-block px-2.5 py-2 text-[11px]", cls, className)}>{children}</span>;
}

export function Scribble({
  children,
  className,
  underline = true,
}: {
  children: ReactNode;
  className?: string;
  underline?: boolean;
}) {
  return (
    <span className={cn("hand relative inline-block text-2xl text-ink sm:text-[28px]", className)}>
      {children}
      {underline && (
        <svg
          aria-hidden
          viewBox="0 0 120 12"
          preserveAspectRatio="none"
          className="absolute -bottom-2 left-[8%] h-2.5 w-[84%] text-ink"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M2 4c20-2 60-3 116-1M8 9c30-2 70-3 100-1" />
        </svg>
      )}
    </span>
  );
}

export function DateLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("label inline-flex items-center gap-2.5 text-[12px]", className)}>
      <span className="size-2 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function Avatar({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn("relative inline-block shrink-0 overflow-hidden rounded-full ring-2 ring-card", className)}
      style={{ width: size, height: size }}
    >
      <Image src="/images/avatar.jpg" alt="" fill sizes={`${size * 2}px`} className="object-cover" />
    </span>
  );
}

/** Figma-style comment pin: an avatar inside a speech-bubble shape. */
export function CommentPin({ accent = "cobalt", className }: { accent?: Accent; className?: string }) {
  return (
    <span
      className={cn("inline-grid size-14 place-items-center rounded-full rounded-bl-none p-1", accents[accent].bg, className)}
    >
      <Avatar size={44} />
    </span>
  );
}
