/**
 * Site-wide copy and brand settings.
 *
 * This is the file to edit when you re-skin the template for a new person or
 * studio. Every page reads its words from here (or from projects.ts /
 * journal.ts), so the components never need to change for a rebrand.
 */

import type { IconName } from "@/components/ui/Icon";

export type Accent = "cobalt" | "lime" | "tangerine" | "lilac" | "ink";

export const site = {
  name: "Dev Sharma",
  firstName: "Dev",
  role: "Multimedia Designer",
  location: "Meerut, IN",
  timeZone: "Asia/Kolkata",
  cityLabel: "Meerut",
  email: "inform.devsharma@gmail.com",
  phone: "",
  url: "https://devsharma.studio",
  description:
    "Dev Sharma is a multimedia designer in India specialising in visual design, motion graphics, video editing, UI/UX and branding for clients across India and the United States.",
  avatar: "/images/avatar.jpg",
  availability: "Open to remote opportunities",
  copyright: "Dev Sharma",
  builtIn: "Designed & built in India",
};

export const nav = [
  { label: "Home", href: "/", icon: "home" },
  { label: "About", href: "/about", icon: "spark" },
  { label: "Work", href: "/work", icon: "folder" },
  { label: "Services", href: "/services", icon: "stack" },
  { label: "Journal", href: "/journal", icon: "nib" },
  { label: "Playground", href: "/playground", icon: "shapes" },
] as const;

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/howdevsharma", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/howdevsharma", icon: "instagram" },
  { label: "Discord", href: "https://discord.gg/W4CS4DPgKh", icon: "discord" },
] as const;

/** Greetings typed out by the first-visit preloader. */
export const greetings = ["Namaste!", "Hello!", "Sat Sri Akal!", "Hey!"];

export const home = {
  hero: {
    kicker: "hi, i'm",
    tagline: "I craft visuals, motion and interfaces that connect.",
    notes: [
      { text: "Now: founder at Devverse", accent: "lime" as Accent },
      { text: "Clients in India & the US", accent: "lilac" as Accent },
    ],
    tags: [
      { text: "Multimedia Designer", accent: "tangerine" as Accent },
      { text: "Meerut, IN", accent: "cobalt" as Accent },
    ],
    pins: [
      { comment: "those reels are fire" },
      { comment: "ok this clock is neat" },
    ],
    cta: "Say hello",
  },
  intro: {
    scribble: "the short version",
    label: "quick intro",
    // Each phrase is followed by an inline sticker: "avatar" | "knot" | "wave".
    statement: [
      { text: "I'm Dev", media: "avatar" },
      { text: "a multimedia designer who turns ideas into visuals, motion", media: "knot" },
      { text: "and interfaces that feel right", media: "wave" },
    ],
    polaroids: [
      { src: "/images/portrait.jpg", caption: "that's me", alt: "Dev working at his desk" },
      { src: "/images/workspace.jpg", caption: "the setup", alt: "Overhead view of a creative workspace" },
    ],
    skills: [
      { label: "Visual Design", accent: "tangerine" as Accent, icon: "grid" as IconName },
      { label: "Motion & Video", accent: "cobalt" as Accent, icon: "bolt" as IconName },
      { label: "UI/UX Design", accent: "lilac" as Accent, icon: "blocks" as IconName },
      { label: "Brand Identity", accent: "lime" as Accent, icon: "compass" as IconName },
    ],
  },
  featured: {
    scribble: "peek inside!",
    titleTop: "Selected",
    titleBottom: "Work",
    note: "Projects where design, motion and branding came together.",
  },
};

export const about = {
  sections: [
    { id: "bio", label: "Bio", icon: "flower" as IconName },
    { id: "values", label: "Values", icon: "squares" as IconName },
    { id: "path", label: "Path", icon: "star" as IconName },
  ],
  title: "About",
  bio: {
    label: "The long version",
    statement: home.intro.statement,
    paragraphs: [
      "I'm a multimedia designer with experience across visual design, motion graphics, video editing, UI/UX design, branding and creative direction. I've worked with creative teams, independent projects and international clients across India and the United States.",
      "Whether it's a set of Instagram Reels for a marketing team in San Diego, infographics for a financial agency in Houston, or user interfaces for a product company in India — I focus on making every visual clear, intentional and worth looking at twice.",
    ],
    notes: [
      "Right now I'm running Devverse, my independent creative studio, where I take on client work across visual design, branding, social media content, motion graphics and digital design.",
      "I hold a BCA from Chaudhary Charan Singh University and a Diploma in Graphic Design & Video Editing from Arena Animation. I speak English, Hindi and Punjabi.",
    ],
    polaroid: { src: "/images/portrait-2.jpg", caption: "that's me", alt: "Dev Sharma portrait" },
  },
  values: {
    label: "How I think",
    tag: "My values",
    items: [
      {
        title: "Clarity over decoration",
        body: "Every element should earn its place. I strip away what doesn't serve the message until the design communicates instantly — no filler, no fluff.",
        note: "simple hits harder.",
        accent: "cobalt" as Accent,
      },
      {
        title: "Context shapes craft",
        body: "A LinkedIn carousel isn't an Instagram Reel. A warehouse dashboard isn't a landing page. I design for where the work actually lives — platform, audience and intent.",
        note: "know your canvas!",
        accent: "tangerine" as Accent,
      },
      {
        title: "Show up and deliver",
        body: "No missed deadlines, no surprises. I communicate early, ask the right questions, and hand off work that's ready to use — whether the client is in Meerut or Houston.",
        note: "trust is the product.",
        accent: "lime" as Accent,
      },
      {
        title: "Motion tells the story",
        body: "A well-timed transition, a smooth edit, a kinetic title card — motion turns static ideas into things people actually feel and remember.",
        note: "make it move.",
        accent: "lilac" as Accent,
      },
    ],
  },
  path: {
    label: "Where I've been",
    tag: "My path",
    items: [
      {
        company: "Devverse",
        logo: "flame" as IconName,
        role: "Founder & Creative Lead",
        body: "Leading independent creative projects and client work across visual design, branding, social media content, motion graphics and digital design — including international clients DevCommX (San Diego) and Kemboi Financial Agency (Houston).",
        dates: "2022 – Now",
        current: true,
      },
      {
        company: "DevCommX",
        logo: "send" as IconName,
        role: "Graphic Designer & Video Editor",
        body: "Created Instagram Reels and LinkedIn carousel content for the US market. Produced creative assets supporting a marketing team that consistently exceeded 200+ client meetings per month.",
        dates: "Sep 2025 – Dec 2025",
      },
      {
        company: "Global Matrix Solution",
        logo: "grid" as IconName,
        role: "UX/UI Designer",
        body: "Designed user experiences and interfaces for web and mobile products. Worked on user research, wireframes, interaction flows and interactive prototypes.",
        dates: "Jan 2025 – Jun 2025",
      },
      {
        company: "Saffron Chariot Technologies",
        logo: "star" as IconName,
        role: "Graphic Designer & Video Editor",
        body: "Created business infographics, social media content and video assets for digital campaigns. Contributed to creative direction across multi-platform projects including client content for Kemboi Financial Agency, Houston.",
        dates: "Nov 2022 – Dec 2023",
      },
      {
        company: "DigiFi Studios",
        logo: "bolt" as IconName,
        role: "Social Media Designer",
        body: "Designed social media advertisements, banners and campaign assets for multiple brands. Focused on digital marketing creatives and conversion-oriented visual content.",
        dates: "Feb 2022 – Nov 2022",
      },
    ],
  },
};

export const contactCta = {
  title: "Say hello",
  body: "I'm happiest on projects that need strong visuals, smooth motion and clear interfaces — whether it's a brand refresh or a set of reels.",
  comment:
    "Open to remote opportunities and freelance projects — let's make something great.",
  reactions: 3,
  button: "Get in touch",
};

export const services = {
  badge: "Open to work",
  title: ["How", "I", "help"],
  intro:
    "I partner with teams and founders who need strong visuals, polished motion and clear interfaces — from the first concept to the final export.",
  cta: "Start a project",
  scribble: "the menu",
  items: [
    {
      title: "Visual & Brand Design",
      body: "Logos, brand systems, social media creatives, infographics and marketing assets that look sharp across every platform.",
      chips: ["Brand Identity", "Social Media Design", "Campaign Design", "Infographics", "Marketing Creatives"],
      accent: "lilac" as Accent,
    },
    {
      title: "Motion & Video",
      body: "Reels, short-form content, motion graphics and video editing that grab attention and hold it.",
      chips: ["Video Editing", "Motion Graphics", "Reels & Short-form", "Creative Direction", "After Effects & Premiere"],
      accent: "tangerine" as Accent,
    },
    {
      title: "UI/UX Design",
      body: "User interfaces, wireframes, prototypes and design systems for web and mobile products.",
      chips: ["UI Design", "UX Flows", "Wireframing", "Prototyping", "Responsive Interfaces"],
      accent: "lime" as Accent,
    },
    {
      title: "Creative Direction",
      body: "End-to-end creative strategy and art direction for campaigns, content and digital products.",
      chips: ["Art Direction", "Content Strategy", "Multi-platform Campaigns", "Design Systems", "Visual Storytelling"],
      accent: "cobalt" as Accent,
    },
  ],
  process: {
    title: ["The", "Process"],
    steps: [
      {
        title: "Listen",
        body: "I start by understanding the brand, the audience and the goals — before opening any design tool.",
        icon: "ear" as IconName,
        accent: "cobalt" as Accent,
      },
      {
        title: "Explore",
        body: "Moodboards, references and rough concepts. We align on direction before committing to polish.",
        icon: "search" as IconName,
        accent: "tangerine" as Accent,
      },
      {
        title: "Create",
        body: "High-fidelity designs, edits and animations — refined until every detail feels intentional.",
        icon: "pencil" as IconName,
        accent: "lilac" as Accent,
      },
      {
        title: "Deliver",
        body: "Final assets, exports and files — organised, on time and ready to publish.",
        icon: "rocket" as IconName,
        accent: "lime" as Accent,
      },
    ],
  },
  toolkit: {
    title: "Toolkit",
    groups: [
      {
        label: "Design",
        accent: "tangerine" as Accent,
        items: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "CorelDRAW", "Affinity Suite"],
      },
      {
        label: "Motion & Video",
        accent: "cobalt" as Accent,
        items: ["Adobe After Effects", "Adobe Premiere Pro", "DaVinci Resolve"],
      },
      {
        label: "UI/UX",
        accent: "lime" as Accent,
        items: ["Wireframing", "Prototyping", "Design Systems", "Responsive Interfaces"],
      },
      {
        label: "Strategy",
        accent: "lilac" as Accent,
        items: ["Brand Identity", "Art Direction", "Content Strategy", "Campaign Design"],
      },
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      {
        q: "Do you work with international clients?",
        a: "Yes — I've worked with clients in San Diego and Houston alongside Indian teams. Remote collaboration is something I do every day.",
        accent: "cobalt" as Accent,
      },
      {
        q: "What kind of projects do you take on?",
        a: "Anything from a single set of social media creatives to full brand identity, motion graphics packages and UI/UX design for web and mobile products.",
        accent: "tangerine" as Accent,
      },
      {
        q: "How do projects usually start?",
        a: "With a short call or message to understand what you need, your timeline and your budget. From there I'll share a clear scope and we get moving.",
        accent: "lime" as Accent,
      },
      {
        q: "Do you do front-end development too?",
        a: "I focus on design, but I understand responsive interfaces and can hand off specs that developers can implement directly.",
        accent: "lilac" as Accent,
      },
    ],
  },
};

export const playground = {
  hint: "drag things around!",
  items: [
    { src: "/images/play-1.jpg", caption: "the good table", x: 8, y: 6, w: 200, r: -6, accent: "cobalt" as Accent },
    { src: "/images/play-2.jpg", caption: "market haul", x: 30, y: 2, w: 230, r: 4, accent: "tangerine" as Accent },
    { src: "/images/play-3.jpg", caption: "oceanário, again", x: 58, y: 8, w: 190, r: -3, accent: "lilac" as Accent },
    { src: "/images/play-4.jpg", caption: "sunday mood", x: 80, y: 4, w: 210, r: 7, accent: "lime" as Accent },
    { src: "/images/play-5.jpg", caption: "tiny wheels", x: 4, y: 48, w: 190, r: 5, accent: "tangerine" as Accent },
    { src: "/images/play-6.jpg", caption: "tea o'clock", x: 26, y: 50, w: 230, r: -4, accent: "lime" as Accent },
    { src: "/images/play-7.jpg", caption: "stripes on stripes", x: 50, y: 46, w: 200, r: 3, accent: "cobalt" as Accent },
    { src: "/images/play-8.jpg", caption: "flowers!", x: 70, y: 52, w: 220, r: -7, accent: "lilac" as Accent },
    { src: "/images/play-9.jpg", caption: "big naps only", x: 42, y: 24, w: 240, r: 2, accent: "tangerine" as Accent },
  ],
};

export const contact = {
  scribble: "leave a note",
  title: "Say hi",
  steps: [
    {
      name: "message",
      label: "What are you working on?",
      placeholder: "A brand, a video, some reels, a wild idea…",
      type: "textarea",
    },
    {
      name: "email",
      label: "Where can I reach you?",
      placeholder: "you@company.com",
      type: "email",
    },
  ],
  success: "Got it! I'll reply within two working days.",
  aside: "open to remote work!",
  polaroids: [
    { src: "/images/contact-1.jpg", caption: "creative hours", alt: "Person working at a creative desk" },
    { src: "/images/contact-2.jpg", caption: "big ideas", alt: "Bright, colourful creative workspace" },
  ],
};
