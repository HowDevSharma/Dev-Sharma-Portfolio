# Marlo Finch — portfolio template

A Next.js rebuild and rebrand of a design-tool-style portfolio: selection frames, sticky notes, multiplayer cursors, rulers, a grid canvas and draggable stickers. All copy, names and images are placeholders for a fictional designer called **Marlo Finch**, so the site can be re-skinned for any client.

**Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion (`motion/react`), Lenis smooth scroll, TypeScript.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build; every page is statically generated
```

## Pages

| Route | What's on it |
| --- | --- |
| `/` | Hero with live clock and draggable notes, scroll-inked intro, stacked "file drawer" project cards |
| `/about` | Bio, values and career path, with a floating section nav that tracks your scroll position |
| `/work`, `/work/[slug]` | Case-study grid and full case studies (4 included) |
| `/services` | Service bands, a pinned sideways-scrolling process, a draggable toolkit board, FAQ threads |
| `/journal`, `/journal/[slug]` | Article grid and article pages (8 included) |
| `/playground` | A pinboard of photos and stickers you can drag around |
| `/contact` | Two-step note form posting to `/api/contact` |

## Rebranding for a new client

You shouldn't need to touch components. Everything lives in five places:

1. **Copy:** `src/content/site.ts` (name, contact details, every page's text), `src/content/projects.ts` (case studies) and `src/content/journal.ts` (articles). Case-study and article bodies are small arrays of blocks (`p`, `points`, `quotes`, `image`), so there's no markdown pipeline to maintain.
2. **Colours:** the `@theme` block at the top of `src/app/globals.css`. Components use the named tokens (`ink`, `paper`, `cobalt`, `lime`, `tangerine`, `lilac`, plus their `-soft` and `-deep` shades), never raw hex. If you rename an accent, update the lookup tables in `src/lib/utils.ts` too.
3. **Fonts:** `src/app/layout.tsx`. There are four roles: display (Unbounded), sans (Bricolage Grotesque), mono (Space Mono) and hand (Gochi Hand). Swap any `next/font/google` import and keep its CSS variable name.
4. **Images:** `public/images/`. Keep the filenames or update the paths in the content files. The favicon is `src/app/icon.svg`.
5. **Logo and mascot:** the `Logo` component in `src/components/layout/Nav.tsx` and the finch in `src/components/layout/Mascot.tsx`.

## Before going live

- **The contact form doesn't deliver mail yet.** `src/app/api/contact/route.ts` validates the note and replies `ok`, but doesn't send it anywhere. Hook up Resend, Postmark, Formspree or a Slack webhook at the marked line.
- Replace the `#` social links in `socials` (`site.ts`) and set `site.url` for correct Open Graph URLs.
- Every name, company, metric and quote is fictional sample content. Each case study ends with a disclaimer (`projectDisclaimer` in `projects.ts`); remove it once the content is real.
- Photos are placeholders from [Lorem Picsum](https://picsum.photos), which serves images from Unsplash under the Unsplash License. Swap them for the client's own.

## Behaviour notes

- A preloader types greetings on the first visit of each browser session. Returning visitors and people with reduced motion set never see it. Edit the greetings in `greetings` (`site.ts`).
- The "YOU" cursor only appears on devices with a precise pointer. Touch devices keep the native behaviour.
- With `prefers-reduced-motion` turned on, smooth scrolling, entrance animations and the pinned horizontal scroll are all switched off.
