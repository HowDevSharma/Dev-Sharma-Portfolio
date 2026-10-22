# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Next.js 16, hot reload)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint (flat config: core-web-vitals + typescript)
```

No test framework is configured. No CI/CD pipeline exists.

## Architecture

Next.js 16 App Router portfolio site. React 19, Tailwind CSS v4 (configured via `@theme` in globals.css, no tailwind.config file), TypeScript strict, Motion (framer-motion successor) for animations, Lenis for smooth scrolling.

### Content system

All content is structured TypeScript data — **not markdown**. Three files drive the entire site:

- `src/content/site.ts` — Identity, bio, career path, services, FAQ, hero/intro/about/contact copy, social links, playground photos. Every page reads from this.
- `src/content/projects.ts` — Four case studies with typed block arrays (p, points, quotes, image). Helpers: `getProject(slug)`, `getNextProject(slug)`.
- `src/content/journal.ts` — Eight blog posts using the same block system. Helper: `getPost(slug)`.

Articles render via `ArticleBody` which maps block types to components — not a markdown pipeline.

### Key interaction patterns

| Feature | Mechanism | Where |
|---------|-----------|-------|
| Smooth scroll | Lenis (global, layout-level) | `SmoothScroll` in layout chrome |
| Scroll-spy side nav | `IntersectionObserver` + `lenis.scrollTo()` | `SectionNav` on about page (xl only) |
| Horizontal scroll section | `useScroll` + `useTransform` mapping scrollY→translateX, sticky pin | `ProcessScroller` on services (lg+) |
| Drag-and-drop | `Canvas` + `Draggable` motion wrappers | Toolkit (services), PlaygroundCanvas |
| Sticky card stack | `md:sticky` with offset tabs creating file-drawer effect | `ProjectStack` on work page |
| Sticky article header | `lg:sticky` on left column | Journal detail page |
| Scroll-triggered reveals | `Reveal` (fade+translate) and `Pop` (spring scale+rotate) | Used across all pages |
| Custom cursor | CSS `cursor: none` + JS-tracked div | Layout chrome (pointer:fine only) |
| Preloader | CSS animation, auto-hides after 4s, skipped on revisit via `data-seen` | Layout chrome |

### Component primitives (`src/components/ui/`)

- `motion.tsx` — `Canvas` (drag constraint container), `Draggable` (drag-enabled wrapper)
- `primitives.tsx` — `SplitTitle`, `Polaroid`, `StickyNote`, `SelectionFrame`, `CursorTag`, `Scribble`, `Avatar`, `ArrowLink`, `FolderChip`, `DateLabel`, `DoodleArrow`
- `Icon.tsx` — SVG icon map (arrow, mail, check, pencil, search, chat, lamp, steps, linkedin, instagram, dribbble, spark)

### Styling

Light-only design. Color scheme defined in `globals.css` `@theme` block:
- Neutrals: paper (#fbf8f1), card, ink, ink-2, ink-3, line, grid
- Accents: cobalt, lime, tangerine, lilac, butter — each with soft/deep variants
- Accent type (`Accent`) is used per-project and per-post to tint cards, frames, and highlights

Four Google Fonts loaded via `next/font` in layout.tsx: Unbounded (display), Bricolage Grotesque (sans), Space Mono (mono), Gochi Hand (hand).

Custom breakpoint: `xs: 30rem` (480px) alongside standard Tailwind breakpoints.

### Images

All 35 images are static JPGs in `public/images/` referenced as string paths (no static imports). Categories: avatar/portrait, project covers and screenshots, journal covers, playground photos, contact photos.

### Contact form

Two-step wizard (message → email) using `AnimatePresence`. POSTs to `/api/contact/route.ts` which validates but has no delivery provider wired up (placeholder for email/CRM).

## Rebranding guide

To replace the template identity, edit in this order:

1. **`src/content/site.ts`** — Name, role, location, email, URL, bio, career, services, all page copy, social links
2. **`src/content/projects.ts`** — Case studies (or clear and add your own)
3. **`src/content/journal.ts`** — Blog posts (or clear and add your own)
4. **`public/images/`** — Replace all 35 JPGs (keep filenames or update refs in content files)
5. **`src/components/layout/Mascot.tsx`** — The SVG finch mascot (aria-label and JSDoc say "finch")
6. **`src/components/ui/primitives.tsx`** — Hardcoded `/images/avatar.jpg` in Avatar component
7. **`src/app/globals.css`** — Accent colors in `@theme` block (optional)
8. **`src/app/layout.tsx`** — Font choices (optional)
9. **`src/app/icon.svg`** — Favicon

The template disclaimers in `projects.ts` (`projectDisclaimer`) should be removed after adding real content.
