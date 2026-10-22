"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { nav, site, socials } from "@/content/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/primitives";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("relative grid size-8 place-items-center rounded-full bg-lime text-ink", className)}>
      <Icon name="bird" size={20} />
    </span>
  );
}

/** “EM” / “PH” chips: hover to preview, click to copy. */
function CopyChip({ short, value, label }: { short: string; value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          window.location.href = short === "EM" ? `mailto:${value}` : `tel:${value.replace(/\s/g, "")}`;
        }
      }}
      className="group relative grid size-8 place-items-center rounded-full bg-paper font-mono text-[11px] ring-1 ring-line transition-colors hover:bg-cobalt hover:text-white"
      aria-label={`Copy ${label}: ${value}`}
    >
      {short}
      <span
        role="status"
        className={cn(
          "label pointer-events-none absolute top-[calc(100%+10px)] right-0 bg-cobalt px-3 py-2.5 whitespace-nowrap text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100",
          copied ? "translate-y-0 opacity-100" : "-translate-y-1",
        )}
      >
        {copied ? "Copied!" : value}
      </span>
    </button>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-(--nav-h) border-b border-line bg-card/95 backdrop-blur-md">
        <div className="flex h-full items-stretch">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex w-16 shrink-0 items-center justify-center border-r border-line transition-colors hover:bg-paper"
            aria-label={`${site.name} — home`}
          >
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-stretch lg:flex">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "label flex items-center gap-2 px-4 text-[12px] transition-colors",
                    active ? "bg-lime" : "hover:bg-paper",
                  )}
                >
                  <Icon name={item.icon} size={15} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 pr-3 sm:pr-4">
            <div className="hidden items-center gap-2 lg:flex">
              <CopyChip short="EM" value={site.email} label="email" />
              <Avatar size={32} className="mx-1 ring-line" />
              <Link
                href="/contact"
                className={cn(
                  "label flex h-9 items-center gap-2 border-[1.5px] border-ink px-3.5 text-[12px] transition-colors",
                  isActive(pathname, "/contact") ? "bg-ink text-paper" : "hover:bg-ink hover:text-paper",
                )}
              >
                <Icon name="send" size={14} />
                Contact
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="label flex h-9 items-center gap-2.5 border-[1.5px] border-ink px-3 text-[13px] lg:hidden"
            >
              {open ? "Close" : "Menu"}
              <Icon name={open ? "close" : "menu"} size={16} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-x-0 top-(--nav-h) bottom-0 z-40 flex flex-col overflow-y-auto bg-paper lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="flex flex-col px-4 pt-6">
              {[...nav, { label: "Contact", href: "/contact", icon: "send" as const }].map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "display flex items-center justify-between border-b border-line py-4 text-[clamp(1.75rem,8vw,3rem)]",
                        active && "text-cobalt",
                      )}
                    >
                      {item.label}
                      <Icon name={item.icon} size={22} />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div className="mt-auto grid gap-3 px-4 py-8">
              <a href={`mailto:${site.email}`} className="label flex items-center gap-2 text-[13px]">
                <Icon name="mail" size={14} /> {site.email}
              </a>
              <div className="mt-2 flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid size-10 place-items-center bg-card ring-1 ring-line"
                  >
                    <Icon name={s.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
