import type { Accent } from "./site";

export type Block =
  | { type: "p"; text: string }
  | { type: "points"; items: { lead: string; text: string }[] }
  | { type: "quotes"; items: string[] }
  | { type: "image"; src: string; alt: string };

export type Section = { heading: string; blocks: Block[] };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  accent: Accent;
  cover: string;
  coverAlt: string;
  meta: { label: string; value: string }[];
  sections: Section[];
};

export const projectDisclaimer =
  "Sample content for template purposes. Swap in your own case studies when you're ready.";

export const projects: Project[] = [
  {
    slug: "cinder",
    title: "Cinder",
    summary: "Helping grid operators see trouble coming before the phones start ringing.",
    date: "2026-08-12",
    tags: ["Climate Tech", "Data Viz"],
    accent: "cobalt",
    cover: "/images/work-cinder.jpg",
    coverAlt: "Wind turbines beside a winding road under a bright sky",
    meta: [
      { label: "Role", value: "Design Lead" },
      { label: "Timeline", value: "14 weeks" },
      { label: "Team", value: "3 engineers, PM, data scientist" },
      { label: "Platform", value: "Web + control-room wall" },
    ],
    sections: [
      {
        heading: "The problem",
        blocks: [
          {
            type: "p",
            text: "Cinder's customers are regional energy utilities. Their control-room operators watch thousands of sensors across substations, lines and transformers, and when something goes wrong they have minutes — sometimes seconds — to decide what to do. The existing product showed them everything. That was the problem.",
          },
          {
            type: "p",
            text: "A normal afternoon produced around 1,200 alarms. Most were noise: duplicate readings, sensors reporting their own maintenance windows, a single fault echoing down a line and triggering twenty more. Operators had learned to scroll past the red — so when a genuinely serious alarm arrived, it looked exactly like the 300 before it.",
          },
          {
            type: "quotes",
            items: [
              "I don't read the alarm list. I read the phone.",
              "By the time the map is useful, a customer has already called us.",
              "Everything is red, so nothing is red.",
            ],
          },
          {
            type: "p",
            text: "The product wasn't failing because it lacked data. It was failing because it had never been designed around a decision.",
          },
        ],
      },
      {
        heading: "Digging in",
        blocks: [
          {
            type: "p",
            text: "I spent the first three weeks in two control rooms, sitting behind operators on day and night shifts. I logged every alarm they acted on and every one they ignored, and asked them to talk me through the difference. A pattern showed up quickly:",
          },
          {
            type: "points",
            items: [
              { lead: "Operators triage by consequence, not by sensor.", text: "“How many customers could lose power?” mattered far more than which device fired." },
              { lead: "Related alarms read as separate events.", text: "A single fault could appear as twenty rows, scattered across the list." },
              { lead: "The map and the list lived in different tabs.", text: "Operators kept both open on separate monitors and matched them up by eye." },
            ],
          },
          {
            type: "p",
            text: "With our data scientist, we prototyped a model that clustered related alarms into a single “incident” and estimated its impact. The design question became: how do you show one incident with confidence, without hiding the raw alarms operators are trained to trust?",
          },
        ],
      },
      {
        heading: "What we built",
        blocks: [
          {
            type: "p",
            text: "The new triage view leads with incidents, ranked by estimated customer impact. Each card shows what happened, where, how sure the system is about the grouping and what's likely to happen next. One click expands it to reveal every underlying alarm, so nothing is ever hidden — just organised.",
          },
          { type: "image", src: "/images/cinder-1.jpg", alt: "A dark blue wave curling over" },
          {
            type: "p",
            text: "We rebuilt the map to sit beside the list instead of behind a tab. Selecting an incident highlights the affected network; hovering a substation filters the list. For the control-room video wall we designed a “glance mode” with a larger type scale, fewer colours and nothing that needs a mouse.",
          },
          {
            type: "p",
            text: "Colour got a strict budget. Red is reserved for incidents that need action now; everything else uses a calmer amber-to-grey scale. That change took four rounds of debate and one very convincing night-shift operator.",
          },
        ],
      },
      {
        heading: "The results",
        blocks: [
          {
            type: "p",
            text: "In a six-week pilot with two utilities, the median time from alarm to acknowledged incident fell from 7 minutes to 2 minutes 40 seconds. The number of rows operators scanned during a storm dropped by 84%, and both pilot customers moved to company-wide rollouts.",
          },
          {
            type: "quotes",
            items: [
              "It feels like someone finally sorted the post before handing it to me.",
              "During the October storm I didn't need the phone once.",
            ],
          },
          {
            type: "p",
            text: "My favourite result wasn't on a dashboard: operators started leaving the triage view on the big wall by default, instead of the old camera feed.",
          },
        ],
      },
      {
        heading: "Constraints",
        blocks: [
          {
            type: "points",
            items: [
              { lead: "Safety first, always.", text: "Any change to how alarms appeared went through the utilities' own safety review. We designed with their compliance leads, not around them." },
              { lead: "The raw list couldn't disappear.", text: "Regulations require operators to see every alarm, so grouping had to be additive and reversible." },
              { lead: "Fourteen weeks, one release train.", text: "We shipped in three slices — grouping, map linking, glance mode — each usable on its own." },
            ],
          },
        ],
      },
      {
        heading: "In hindsight",
        blocks: [
          {
            type: "p",
            text: "I'd bring the data scientist into the control room earlier. Our first model grouped alarms by network topology, while operators thought in crews and districts. A day of shadowing together would have saved us a sprint.",
          },
          { type: "image", src: "/images/cinder-2.jpg", alt: "Soft white clouds over a blue sky" },
          {
            type: "p",
            text: "I'd also build a harness for replaying past storms sooner. Recreating a bad night on demand turned out to be the most persuasive design tool we had.",
          },
        ],
      },
      {
        heading: "Takeaways",
        blocks: [
          {
            type: "points",
            items: [
              { lead: "Design for the decision, not the data.", text: "Operators ask “what do I do first?” Every screen should answer that before anything else." },
              { lead: "Trust needs an escape hatch.", text: "People accepted automatic grouping because they could always open it up and see the raw truth underneath." },
              { lead: "Calm is a feature.", text: "Taking colour away did more for urgency than adding it ever had." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "tallybird",
    title: "Tallybird",
    summary: "Turning quarterly tax dread into a two-minute Sunday check-in.",
    date: "2025-09-03",
    tags: ["Fintech", "Mobile"],
    accent: "ink",
    cover: "/images/work-tallybird.jpg",
    coverAlt: "A laptop and an open notebook on a wooden desk",
    meta: [
      { label: "Role", value: "Senior Product Designer" },
      { label: "Timeline", value: "6 months" },
      { label: "Team", value: "4 engineers, 1 PM, me" },
      { label: "Platform", value: "iOS & Android" },
    ],
    sections: [
      {
        heading: "The problem",
        blocks: [
          {
            type: "p",
            text: "Tallybird is a money app for freelancers: invoices, expenses and a running estimate of what you owe the tax office. When I joined, the estimate existed — but almost nobody looked at it. People ignored the app for months, then opened it in a panic the week their quarterly payment was due.",
          },
          {
            type: "p",
            text: "Support volume spiked four times a year like clockwork, with the same questions every time: Is this number right? Why did it change? Can I trust it enough to actually pay it?",
          },
          {
            type: "quotes",
            items: [
              "I open the app when I'm already stressed, which is the worst time to learn a new screen.",
              "The number goes up and I don't know why, so I don't believe it.",
              "I just want someone to tell me I'm fine.",
            ],
          },
        ],
      },
      {
        heading: "Digging in",
        blocks: [
          {
            type: "p",
            text: "Over three months I ran fortnightly interviews with 26 freelancers — designers, electricians, translators, a dog groomer. I asked them to show me their banking app, their notes app and the spreadsheet most of them kept “just in case”. Three things kept coming up:",
          },
          {
            type: "points",
            items: [
              { lead: "The estimate had no story.", text: "It was a single number with no explanation of what had moved it." },
              { lead: "Categorising expenses felt like homework.", text: "People put it off, which made the estimate wrong, which made them trust it less." },
              { lead: "Nobody wanted a dashboard.", text: "They wanted a nudge at a sensible time and a quick way to say “yes, that's right”." },
            ],
          },
        ],
      },
      {
        heading: "What we built",
        blocks: [
          {
            type: "p",
            text: "We replaced the home dashboard with a weekly check-in: a short, swipeable stack of cards that arrives on Sunday evening. Each card asks one question — “Was this €42 at the hardware store a business expense?” — and most can be answered with a single tap. Two minutes, done.",
          },
          { type: "image", src: "/images/tallybird-1.jpg", alt: "Hands holding a phone above a laptop keyboard" },
          {
            type: "p",
            text: "The tax estimate got a timeline. Tap the number and you see what changed it this week, in plain language: “Up €180 because you invoiced Studio Nine.” For the first time, the number had a memory.",
          },
          {
            type: "p",
            text: "We also added a “safe to spend” figure beside the estimate, which turned out to be what people really wanted to know. Tax stopped being a scary number and became a line in a budget.",
          },
        ],
      },
      {
        heading: "The results",
        blocks: [
          {
            type: "p",
            text: "Weekly active usage tripled within four months of launch. 71% of people who started a check-in finished it, and expenses categorised before the quarterly deadline went from 38% to 86%. Tax-season support tickets dropped by 60%.",
          },
          {
            type: "quotes",
            items: [
              "It's the only finance app I don't feel guilty opening.",
              "I paid my tax bill in October without calling my accountant. First time ever.",
            ],
          },
        ],
      },
      {
        heading: "Constraints",
        blocks: [
          {
            type: "points",
            items: [
              { lead: "Regulated advice.", text: "We could explain numbers but never tell anyone what to do with their money — which shaped every line of copy." },
              { lead: "Two platforms, one small team.", text: "Every pattern had to feel native on iOS and Android without doubling the build." },
              { lead: "Existing users.", text: "Thousands of people knew the old dashboard, so we ran both side by side for six weeks and let people switch." },
            ],
          },
        ],
      },
      {
        heading: "In hindsight",
        blocks: [
          {
            type: "p",
            text: "We launched check-ins on Sunday evening because that's when our interviewees said they did admin. For a big chunk of users — tradespeople especially — Monday morning worked far better. I'd make timing a setting from day one instead of learning it from analytics.",
          },
          { type: "image", src: "/images/tallybird-2.jpg", alt: "A pour-over coffee setup on a café counter" },
        ],
      },
      {
        heading: "Takeaways",
        blocks: [
          {
            type: "points",
            items: [
              { lead: "Rhythm beats features.", text: "A small, predictable habit did more than any new screen." },
              { lead: "Numbers need narratives.", text: "People trust a figure when they can see what moved it." },
              { lead: "Answer the real question.", text: "Users asked about tax. What they meant was “am I okay?”" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "dockhand",
    title: "Dockhand",
    summary: "Giving a 40-person warehouse floor one screen everyone actually trusts.",
    date: "2024-01-22",
    tags: ["Logistics", "0 → 1"],
    accent: "tangerine",
    cover: "/images/work-dockhand.jpg",
    coverAlt: "A rail freight yard at sunset",
    meta: [
      { label: "Role", value: "Founding Designer" },
      { label: "Timeline", value: "5 months" },
      { label: "Team", value: "2 engineers, founder, me" },
      { label: "Platform", value: "Tablet + web" },
    ],
    sections: [
      {
        heading: "The problem",
        blocks: [
          {
            type: "p",
            text: "Dockhand started with a founder who'd run warehouses for a decade and a simple observation: the most important system in most small warehouses is a whiteboard. Orders, priorities, who's on which aisle, which truck is late — all in marker, rubbed out and rewritten several times a shift.",
          },
          {
            type: "p",
            text: "The whiteboard worked because everyone could see it. It failed because nobody could trust it. By mid-afternoon it was a layer cake of half-erased decisions, and pickers had learned to ask a supervisor instead of looking.",
          },
          {
            type: "quotes",
            items: [
              "The board says aisle 12. Kev says aisle 4. I go with Kev.",
              "I spend half my shift walking to find out what I'm meant to be doing.",
            ],
          },
        ],
      },
      {
        heading: "Digging in",
        blocks: [
          {
            type: "p",
            text: "I spent my first month on the warehouse floor with a clipboard and a pair of steel-capped boots. I shadowed pickers, packers and both shift supervisors, and timed everything — including walks to the board, which added up to about 40 minutes per person per shift.",
          },
          {
            type: "points",
            items: [
              { lead: "Gloves change everything.", text: "Pickers wear thick gloves and carry scanners, so small tap targets were a non-starter." },
              { lead: "Nobody reads in a warehouse.", text: "People glance. Anything that took more than a second to parse was ignored." },
              { lead: "Plans change fast.", text: "Priorities shifted every time a truck was early or late, and the system had to keep up." },
            ],
          },
        ],
      },
      {
        heading: "What we built",
        blocks: [
          {
            type: "p",
            text: "A rugged tablet app, mounted on every trolley, that shows exactly one thing: the next pick. Big type, huge buttons, aisle colours that match the paint on the floor. Swipe to confirm and the next pick slides in.",
          },
          { type: "image", src: "/images/dockhand-1.jpg", alt: "Parallel railway tracks running between concrete walls" },
          {
            type: "p",
            text: "For supervisors, a web dashboard that replaced the whiteboard — deliberately designed to feel like one. Drag an order to reprioritise it and every trolley updates within seconds. We even kept a handwritten font for notes, because supervisors said it made the screen feel like theirs.",
          },
          {
            type: "p",
            text: "And we kept one big screen on the wall, in the same spot as the old board. Old habits are worth respecting when they're load-bearing.",
          },
        ],
      },
      {
        heading: "The results",
        blocks: [
          {
            type: "p",
            text: "At the first site to go live, walks to “check the board” dropped to nearly zero, picks per hour rose by 23% and mis-picks halved. Two more warehouses signed up after visiting — still Dockhand's best sales channel.",
          },
          {
            type: "quotes",
            items: ["It's the board, but it doesn't lie.", "New starters are useful on day one now."],
          },
        ],
      },
      {
        heading: "Constraints",
        blocks: [
          {
            type: "points",
            items: [
              { lead: "Terrible Wi-Fi.", text: "Whole aisles had no signal, so the tablet app had to work offline and sync gracefully." },
              { lead: "Five months to first customer.", text: "A founder's savings account is a very motivating project plan." },
              { lead: "No training budget.", text: "If it needed a manual, it had failed." },
            ],
          },
        ],
      },
      {
        heading: "In hindsight",
        blocks: [
          {
            type: "p",
            text: "I designed the supervisor dashboard for a 27-inch monitor. Most supervisors ended up using it on their phones while walking the floor. The mobile-first pass arrived three months later than it should have.",
          },
          { type: "image", src: "/images/dockhand-2.jpg", alt: "Blurred cyclists riding past in black and white" },
        ],
      },
      {
        heading: "Takeaways",
        blocks: [
          {
            type: "points",
            items: [
              { lead: "Go where the work is.", text: "A month on the floor taught me more than any number of remote calls could have." },
              { lead: "Respect the old tool.", text: "The whiteboard was a design spec in disguise." },
              { lead: "Design for gloves.", text: "Physical context is part of the interface." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "loam",
    title: "Loam",
    summary: "Getting research out of slide decks and into the rooms where decisions happen.",
    date: "2023-03-14",
    tags: ["B2B SaaS", "Design System"],
    accent: "lilac",
    cover: "/images/work-loam.jpg",
    coverAlt: "Dozens of book pages laid out in a grid",
    meta: [
      { label: "Role", value: "Product Designer" },
      { label: "Timeline", value: "10 weeks" },
      { label: "Team", value: "2 engineers, 1 researcher" },
      { label: "Platform", value: "Web" },
    ],
    sections: [
      {
        heading: "The problem",
        blocks: [
          {
            type: "p",
            text: "Loam is a research repository for product teams — a home for interview recordings, notes and insights. Its customers all had the same complaint: they were doing great research, then watching it vanish. A study would be presented once, as a sixty-slide deck, and never opened again.",
          },
          {
            type: "p",
            text: "Loam's first version stored everything faithfully and surfaced almost nothing. Search returned walls of transcript. Tags were free text, so one team had “onboarding”, “on-boarding”, “Onboarding” and “first run” all meaning the same thing.",
          },
          {
            type: "quotes",
            items: [
              "I know we interviewed someone about this last year. I just can't find it.",
              "Nobody outside research ever logs in.",
            ],
          },
        ],
      },
      {
        heading: "Digging in",
        blocks: [
          {
            type: "p",
            text: "I interviewed researchers, but also the people researchers were trying to reach: PMs, engineers, designers and one very busy VP of product. The gap was clear — researchers wanted a library, everyone else wanted a highlight reel.",
          },
          {
            type: "points",
            items: [
              { lead: "Tags needed structure.", text: "A light, shared taxonomy with suggestions beat both free-text chaos and a rigid hierarchy." },
              { lead: "Evidence beats summaries.", text: "A twenty-second clip of a real user persuaded stakeholders far more than a paragraph about them." },
              { lead: "Research needed to travel.", text: "Insights had to show up where decisions happen — in Slack, in Jira, in product reviews." },
            ],
          },
        ],
      },
      {
        heading: "What we built",
        blocks: [
          {
            type: "p",
            text: "A tagging model with suggested tags, merge tools and a gentle nudge whenever someone tried to create a near-duplicate. A highlight-reel builder that turns tagged clips into a shareable two-minute story. And embeddable insight cards that unfurl in Slack and Jira with the clip, the quote and a link back to the source.",
          },
          { type: "image", src: "/images/loam-1.jpg", alt: "An open book lying on a table" },
          {
            type: "p",
            text: "Underneath it all I built Loam's first component library, so two engineers could ship new views without a designer in every stand-up.",
          },
        ],
      },
      {
        heading: "The results",
        blocks: [
          {
            type: "p",
            text: "Monthly viewers outside the research team grew fivefold in a quarter. Highlight reels became the most-shared object in the product, and two customers told us they now open every roadmap review with one.",
          },
          { type: "quotes", items: ["Our PMs quote users now. Actual users, with names."] },
        ],
      },
      {
        heading: "Constraints",
        blocks: [
          {
            type: "points",
            items: [
              { lead: "Ten weeks, on contract.", text: "I had to leave behind a system the team could run without me." },
              { lead: "Messy legacy data.", text: "Years of inconsistent tags had to be migrated, not wiped." },
              { lead: "Sensitive recordings.", text: "Every sharing feature needed permission controls researchers trusted." },
            ],
          },
        ],
      },
      {
        heading: "In hindsight",
        blocks: [
          {
            type: "p",
            text: "I'd document the component library more generously. It was used — and occasionally misused — long after I left, and a few more usage notes would have gone a long way.",
          },
          { type: "image", src: "/images/loam-2.jpg", alt: "Parcels tied with string beside old photographs and a pen" },
        ],
      },
      {
        heading: "Takeaways",
        blocks: [
          {
            type: "points",
            items: [
              { lead: "Design for the second audience.", text: "The people who consume research matter as much as the people who produce it." },
              { lead: "Structure should feel like help.", text: "Good suggestions beat strict rules." },
              { lead: "Leave the team stronger.", text: "On a contract, the system you leave behind is the real deliverable." },
            ],
          },
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
