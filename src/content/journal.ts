import type { Accent } from "./site";
import type { Section } from "./projects";

export type JournalCategory = "Craft" | "Research" | "Stories" | "Studio" | "Process";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: JournalCategory;
  accent: Accent;
  cover: string;
  coverAlt: string;
  summary: string;
  /** Opening paragraphs, shown before the first heading. */
  intro: string[];
  sections: Section[];
};

export const journal = {
  title: "Journal",
  moreLabel: "more notes",
};

export const posts: Post[] = [
  {
    slug: "the-case-for-boring-interfaces",
    title: "The Case for Boring Interfaces",
    date: "2026-01-14",
    category: "Craft",
    accent: "cobalt",
    cover: "/images/journal-1.jpg",
    coverAlt: "A small island on a calm, pale sea",
    summary:
      "Why the most useful software often looks the least exciting — and how to tell good boring from bad boring.",
    intro: [
      "Every few months someone shows me a dashboard concept with glassy cards, animated gradients and a chart that spins into place. It looks incredible in a portfolio. Then I imagine using it at 3am, on the fortieth alarm of the night, and I start reaching for the grey.",
      "Boring interfaces get a bad reputation. But in software people use all day, predictability is a feature. When buttons live where you expect, when colour only appears when it means something, when a table is just a table, people stop thinking about the tool and start thinking about the work.",
    ],
    sections: [
      {
        heading: "Good boring vs. bad boring",
        blocks: [
          {
            type: "p",
            text: "Bad boring is lazy: default components, no hierarchy, every piece of information shouting at the same volume. Good boring is disciplined. It's a type scale with four sizes instead of eleven. It's a colour budget. It's a layout that stays still so the data can move.",
          },
          {
            type: "p",
            text: "The test I use: could a new user find the three most important things on this screen in five seconds? If yes, the screen is allowed to be as plain as it likes.",
          },
        ],
      },
      {
        heading: "Where the delight goes",
        blocks: [
          {
            type: "p",
            text: "None of this means joyless. Delight just moves — to a transition that explains where something went, an empty state with a sense of humour, a keyboard shortcut that makes power users grin. Small, earned moments land harder against a calm background.",
          },
          {
            type: "p",
            text: "So I'll keep making boring interfaces. Deliberately, carefully boring. The kind people forget they're using.",
          },
        ],
      },
    ],
  },
  {
    slug: "notes-from-forty-user-interviews",
    title: "Notes From Forty User Interviews",
    date: "2026-03-09",
    category: "Research",
    accent: "tangerine",
    cover: "/images/journal-2.jpg",
    coverAlt: "Two coffee cups on a long wooden café table",
    summary:
      "A year of fortnightly interviews: what to ask, what to avoid, and why silence is the best question you have.",
    intro: [
      "Last year I ran forty user interviews for a single product. Not in one big study, but two at a time, every other Thursday, for a year. It changed how I design more than any course or book has.",
      "These are the notes I kept coming back to.",
    ],
    sections: [
      {
        heading: "Ask about yesterday, not someday",
        blocks: [
          {
            type: "p",
            text: "“Would you use a feature that…” gets you polite fiction. “Tell me about the last time you sent an invoice” gets you the truth — the spreadsheet they didn't mention, the reminder on their phone, the step they always skip. Past behaviour is data. Future intentions are vibes.",
          },
        ],
      },
      {
        heading: "Let the silence sit",
        blocks: [
          {
            type: "p",
            text: "My most useful interview technique is saying nothing. When someone finishes an answer, wait three seconds longer than feels comfortable. Nine times out of ten they fill the gap with the thing they were almost too polite to say.",
          },
        ],
      },
      {
        heading: "Share the tape",
        blocks: [
          {
            type: "p",
            text: "An insight in a report is easy to ignore. A thirty-second clip of a real person sighing at your onboarding is not. I started ending every sprint review with one clip. Within a month, engineers were asking to sit in on calls.",
          },
        ],
      },
    ],
  },
  {
    slug: "designing-for-someones-worst-day",
    title: "Designing for Someone's Worst Day",
    date: "2026-04-22",
    category: "Craft",
    accent: "lilac",
    cover: "/images/journal-3.jpg",
    coverAlt: "Dark storm clouds gathering over the sea",
    summary:
      "The people using your product might be stressed, tired or scared. Designing for that moment makes everything better.",
    intro: [
      "Most personas describe someone on a good day: coffee in hand, ten minutes to spare, mildly curious about your new feature. Real people arrive differently. They open the finance app because a payment bounced. They open the grid dashboard because a storm is rolling in.",
      "I've started writing a second persona for every project — the same person, on their worst day. It's the most useful design artefact I make.",
    ],
    sections: [
      {
        heading: "What changes on a bad day",
        blocks: [
          {
            type: "p",
            text: "Attention narrows. Reading drops to scanning. Patience for anything clever evaporates. Error messages get read three times, looking for blame. The interface that felt friendly on Tuesday feels patronising on Friday night.",
          },
          {
            type: "p",
            text: "So I check every critical flow against the worst-day persona. Is the next step obvious without reading? Does every error say what happened and what to do? Can a mistake be undone?",
          },
        ],
      },
      {
        heading: "Kindness is a spec",
        blocks: [
          {
            type: "p",
            text: "Designing for stress isn't about softer colours or reassuring illustrations. It's about removing doubt: a clear status, a visible save, an honest estimate. Get those right on the worst day and the good days take care of themselves.",
          },
        ],
      },
    ],
  },
  {
    slug: "what-a-warehouse-taught-me-about-trust",
    title: "What a Warehouse Taught Me About Trust",
    date: "2026-06-05",
    category: "Stories",
    accent: "lime",
    cover: "/images/journal-4.jpg",
    coverAlt: "A narrow alley between old brick buildings",
    summary:
      "A month on a warehouse floor, a whiteboard nobody believed, and what it taught me about tools people rely on.",
    intro: [
      "When I joined Dockhand as its first designer, the founder handed me a pair of steel-capped boots and said, “You're on the early shift.” For a month I pushed trolleys, watched pickers and drank terrible coffee. It was the best research I've ever done.",
      "What I learned most about wasn't logistics. It was trust.",
    ],
    sections: [
      {
        heading: "Trust is earned in seconds",
        blocks: [
          {
            type: "p",
            text: "Pickers decided whether to believe a screen almost instantly. If it was wrong once — a pick already gone, an aisle that didn't match — they'd ignore it for the rest of the shift and go ask a supervisor. One bad moment undid a hundred good ones.",
          },
          {
            type: "p",
            text: "That shaped everything. We showed when data was last synced. We made it obvious when a tablet was offline. We'd rather say “not sure” than be confidently wrong.",
          },
        ],
      },
      {
        heading: "Respect the workaround",
        blocks: [
          {
            type: "p",
            text: "The whiteboard everyone complained about was also the thing everyone used. So instead of replacing it, we rebuilt it — same spot on the wall, same layout, but live. The best decision on that project was the one we didn't make: getting rid of the familiar thing.",
          },
        ],
      },
    ],
  },
  {
    slug: "small-type-big-decisions",
    title: "Small Type, Big Decisions",
    date: "2026-07-28",
    category: "Craft",
    accent: "cobalt",
    cover: "/images/journal-5.jpg",
    coverAlt: "A vintage typewriter on a wooden desk with notebooks and glasses",
    summary:
      "Labels, timestamps and helper text are the smallest words on a screen — and often the ones doing the most work.",
    intro: [
      "Designers love a big headline. But the words that decide whether a product feels trustworthy are usually set in small grey type: the label under a field, the timestamp on a save, the line of helper text beside a scary button.",
      "I've started reviewing screens with the headings hidden. What's left tells you how clear the product really is.",
    ],
    sections: [
      {
        heading: "Microcopy is interface",
        blocks: [
          {
            type: "p",
            text: "“Saved” is fine. “Saved 2 minutes ago” is better. “Saved 2 minutes ago · synced with your team” is a feature. Each version costs the same to build, but the last one answers the question the user was about to ask.",
          },
          {
            type: "p",
            text: "Likewise, a button that says “Delete” makes people hesitate. A button that says “Delete 3 invoices” lets them act. Specific words are faster to trust.",
          },
        ],
      },
      {
        heading: "Give small text a system",
        blocks: [
          {
            type: "p",
            text: "Small type needs as much structure as big type. I define a handful of roles — label, meta, hint, warning — each with its own size, weight and colour, plus guidelines for when to use them. It keeps screens consistent long after the designer has moved on.",
          },
        ],
      },
    ],
  },
  {
    slug: "a-desk-worth-sitting-at",
    title: "A Desk Worth Sitting At",
    date: "2026-08-17",
    category: "Studio",
    accent: "tangerine",
    cover: "/images/journal-6.jpg",
    coverAlt: "A studio wall with framed prints, a hanging jacket and a desk",
    summary:
      "A tour of the small Lisbon studio where most of this work happens, and the few objects that earn their place on the desk.",
    intro: [
      "My studio is a rented room above a bakery in Arroios. It smells like bread from 6am and has one window that catches the afternoon light perfectly. It's small enough that everything in it has to justify itself.",
    ],
    sections: [
      {
        heading: "What stays on the desk",
        blocks: [
          {
            type: "p",
            text: "A notebook for thinking before screens, always open to a fresh page. A timer for forty-five-minute focus blocks. A second monitor turned vertical for long documents and specs. A small plant that is, against all odds, still alive.",
          },
          {
            type: "p",
            text: "Everything else lives in drawers. A clear desk isn't about aesthetics — it's about lowering the number of things asking for my attention.",
          },
        ],
      },
      {
        heading: "Rituals over tools",
        blocks: [
          {
            type: "p",
            text: "I've tried every productivity app going. What stuck were rituals: writing the day's one important question on a sticky note before opening the laptop, leaving a note for tomorrow-me at the end of each day, and a walk up to the miradouro whenever a problem won't budge. The tools changed. The rituals stayed.",
          },
        ],
      },
    ],
  },
  {
    slug: "prototypes-are-questions",
    title: "Prototypes Are Questions",
    date: "2026-09-02",
    category: "Process",
    accent: "lime",
    cover: "/images/journal-7.jpg",
    coverAlt: "A neat flat-lay of a wallet, phone, watch, glasses and headphones",
    summary:
      "Every prototype should exist to answer one question. If you can't name it, you're decorating, not testing.",
    intro: [
      "It's easy to treat prototypes as small versions of the final product. They're not. A good prototype is a question you can hold in your hand.",
      "Before I build anything clickable, I write down the one thing I want to learn. Will people notice the save state? Does grouping alarms make triage faster? Can someone wearing gloves hit this button?",
    ],
    sections: [
      {
        heading: "Fidelity follows the question",
        blocks: [
          {
            type: "p",
            text: "Once the question is clear, the right fidelity usually is too. Testing a flow? Paper or grey boxes will do. Testing whether an animation explains where something went? That needs real motion. Testing trust in a number? You need realistic data, or people will spot the fake and tell you nothing useful.",
          },
        ],
      },
      {
        heading: "Throw them away",
        blocks: [
          {
            type: "p",
            text: "The best prototypes are disposable. When one has answered its question, I archive it and move on — no polishing, no pixel-perfecting. Getting attached to a prototype is how teams accidentally ship their first guess.",
          },
        ],
      },
    ],
  },
  {
    slug: "leaving-room-for-weather",
    title: "Leaving Room for Weather",
    date: "2026-05-19",
    category: "Process",
    accent: "lilac",
    cover: "/images/journal-8.jpg",
    coverAlt: "A deep blue fjord between steep rocky cliffs",
    summary:
      "Project plans assume clear skies. Here's how I build in space for the storms that always arrive.",
    intro: [
      "Every project plan I've seen assumes good weather: stakeholders available, APIs documented, research recruited on time. Every project I've worked on had at least one storm.",
      "I've stopped fighting that and started planning for it.",
    ],
    sections: [
      {
        heading: "Plan in slices",
        blocks: [
          {
            type: "p",
            text: "Instead of one big release, I plan projects as a series of slices that are each useful on their own. If a storm hits halfway through, we still ship something real. At Cinder that meant grouping, map linking and glance mode as three separate releases — any one of them was worth shipping.",
          },
        ],
      },
      {
        heading: "Protect a buffer",
        blocks: [
          {
            type: "p",
            text: "I keep roughly a fifth of every timeline unassigned. Not hidden padding — an explicit, visible buffer everyone knows about. When it isn't needed, we spend it on polish and debt. When it is, nobody has to panic.",
          },
          {
            type: "p",
            text: "Weather is going to happen. The work is deciding, in advance, what you'll protect when it does.",
          },
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
