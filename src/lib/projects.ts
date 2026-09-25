export type ProjectKey = "daywell" | "setlist" | "portfolio";

export type Project = {
  label: string;
  tagline: string;
  year: string;
  kind: string;
  tags: string[];
  host: string;
  live: string;
  source: string;
  preview: string;
  gallery: { src: string; alt: string }[];
  previewAlt: string;
  logo?: string;
  /** intrinsic size of `logo`, for next/image */
  logoWidth?: number;
  logoHeight?: number;
  mark?: "kvn";
  /** crumpled paper note on the pile */
  note: string;
  /** whether the live site can be shown in the in-page iframe preview */
  embeddable: boolean;
  desc: string;
  does: string[];
  built: string[];
};

export const projects: Record<ProjectKey, Project> = {
  daywell: {
    label: "Daywell",
    tagline: "A planner for work, studies, and your walk with God.",
    year: "2025",
    kind: "Full-stack web app",
    tags: ["Supabase auth", "Recurring tasks", "Focus timer"],
    host: "daywell-project.vercel.app",
    live: "https://daywell-project.vercel.app",
    source: "https://github.com/KvnDvlpr/daywell",
    preview: "/assets/daywell-preview.jpg",
    gallery: [{ src: "/assets/daywell-preview.jpg", alt: "Daywell login screen with its sun mascot" }],
    previewAlt: "Daywell login screen with its sun mascot",
    logo: "/assets/daywell-icon.png",
    logoWidth: 144,
    logoHeight: 127,
    note: "A planner for work, studies and your walk with God.",
    embeddable: true,
    desc: "Full-stack daily planner: auth, tasks that repeat on their own, a focus timer, a calendar, a verse of the day, and daily progress. I directed Claude Code from the first spec to production and owned every decision about the data model, security and design.",
    does: [
      "Supabase Auth with email confirmation",
      "Repeating tasks with a focus countdown",
      "Calendar with events and an upcoming list",
      "Verse of the day, rotating by day of year",
      "Row-level security per user",
    ],
    built: [
      "Next.js 16 App Router + server actions",
      "TypeScript, React 19, TanStack Query",
      "Tailwind v4 + shadcn/ui",
      "react-hook-form + zod validation",
      "Vitest unit tests, Playwright E2E",
    ],
  },
  setlist: {
    label: "Exalting AGHAM",
    tagline: "Plan your worship. Lead the congregation.",
    year: "2026",
    kind: "Installable web app",
    tags: ["Lineups", "Chords & lyrics", "Installable (PWA)"],
    host: "setlist-agham.vercel.app",
    live: "https://setlist-agham.vercel.app",
    source: "https://github.com/KvnDvlpr",
    preview: "/assets/setlist-inside.jpg",
    gallery: [
      { src: "/assets/setlist-preview.jpg", alt: "Exalting AGHAM landing screen" },
      { src: "/assets/setlist-inside.jpg", alt: "Exalting AGHAM lineups page with Worship and Praise sets" },
    ],
    previewAlt: "Exalting AGHAM lineups page showing a Sunday Service with Worship and Praise song sets",
    logo: "/assets/exalting-agham.png",
    logoWidth: 512,
    logoHeight: 512,
    note: "Lineups, chords and lyrics for a worship team.",
    embeddable: true,
    desc: "A setlist manager I built for Exalting AGHAM, our church youth worship team. Schedule a lineup for a service, group songs into Worship and Praise sets, flip between chords and lyrics on stage, and share the playlist with the team. It installs to the home screen so members can pull up the setlist on their phones during practice and service, and I keep shipping fixes from their feedback.",
    does: [
      "Lineups by date, venue and service, with scripture references",
      "Worship and Praise sets with one-tap chords or lyrics",
      "Quick search across chords and lyrics",
      "Songs library and song-lead assignments",
      "Log in, sign up, or continue as guest",
    ],
    built: [
      "Next.js App Router, deployed on Vercel",
      "Installable web app (PWA), phone-first for on-stage use",
      "React + Tailwind CSS, light and dark friendly",
      "Built with Claude Code as pair programmer, maintained from team feedback",
    ],
  },
  portfolio: {
    label: "This portfolio",
    tagline: "Rebuilt with AI on Next.js, Tailwind and shadcn/ui.",
    year: "2025",
    kind: "Website",
    tags: ["Next.js", "Light & dark", "One-page CV"],
    host: "kvndvlpr.github.io",
    live: "https://kvndvlpr.github.io/MyPortfolio2025/",
    source: "https://github.com/KvnDvlpr/MyPortfolio2025",
    preview: "/assets/portfolio-preview.jpg",
    gallery: [{ src: "/assets/portfolio-preview.jpg", alt: "Hero section of this portfolio" }],
    previewAlt: "Hero section of this portfolio",
    mark: "kvn",
    note: "Rebuilt with AI on Next.js, Tailwind and shadcn/ui.",
    embeddable: false,
    desc: "Started as hand-written HTML, CSS and vanilla JavaScript, then migrated to Next.js with Tailwind CSS and shadcn/ui. It keeps the card deck, the crumpled-paper projects, the skills explorer, the CV viewer, light and dark themes, and the contact form, now as typed React components.",
    does: [
      "Stacked glass card deck about who I am",
      "Crumpled-paper project notes with live app previews",
      "Technologies explorer with hover and tap popovers",
      "In-page CV viewer with a downloadable PDF",
      "Light / dark theme that remembers your choice",
    ],
    built: [
      "Next.js App Router, TypeScript, React 19",
      "Tailwind CSS v4 + shadcn/ui (Radix)",
      "SVG turbulence filter for the paper texture",
      "Responsive, keyboard-accessible, reduced-motion aware",
    ],
  },
};

/** Short label + link per project, used by the skills popovers. */
export const projectLinks = Object.fromEntries(
  Object.entries(projects).map(([key, p]) => [key, { label: p.label, href: key === "portfolio" ? "#projects" : p.live }])
) as Record<ProjectKey, { label: string; href: string }>;
