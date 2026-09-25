import type { ProjectKey } from "@/lib/projects";

export type Skill = {
  id: string;
  name: string;
  /** file name in /assets/icons, without .svg */
  icon: string;
  category: string;
  since: string;
  /** 0–100, drives the tile and popover bars */
  level: number;
  levelLabel: string;
  usedIn: ProjectKey[];
  note: string;
};

export const skills: Skill[] = [
  {
    id: "next",
    name: "Next.js / React",
    icon: "nextdotjs",
    category: "Frontend · Framework",
    since: "2025 · Daywell",
    level: 65,
    levelLabel: "Working daily",
    usedIn: ["daywell", "setlist"],
    note: "App Router, route groups for auth vs. app, server actions for login and signup, and React 19 components with hooks. Task rows, dialogs, the focus timer and the calendar are all React.",
  },
  {
    id: "ts",
    name: "TypeScript",
    icon: "typescript",
    category: "Language",
    since: "2025 · Daywell",
    level: 65,
    levelLabel: "Working daily",
    usedIn: ["daywell"],
    note: "Daywell is fully typed in strict mode: Supabase row types, zod-inferred form types, and typed server actions.",
  },
  {
    id: "supabase",
    name: "Supabase",
    icon: "supabase",
    category: "Backend · Auth & DB",
    since: "2025 · Daywell",
    level: 60,
    levelLabel: "Working daily",
    usedIn: ["daywell"],
    note: "Auth with email confirmation, Postgres with RLS, SSR client for server components and a browser client for queries.",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    icon: "postgresql",
    category: "Backend · Database",
    since: "2025 · Daywell",
    level: 55,
    levelLabel: "Learning",
    usedIn: ["daywell"],
    note: "Tables for tasks, events and profiles, plus hand-written migrations, triggers and row-level security policies so every user only sees their own rows.",
  },
  {
    id: "vercel",
    name: "Vercel",
    icon: "vercel",
    category: "Tooling · Deployment",
    since: "2025 · Daywell",
    level: 60,
    levelLabel: "Comfortable",
    usedIn: ["daywell", "setlist"],
    note: "Production hosting for Daywell with environment variables for Supabase and preview deploys per branch.",
  },
  {
    id: "linux",
    name: "Linux",
    icon: "linux",
    category: "OS · Dev environment",
    since: "2025",
    level: 60,
    levelLabel: "Comfortable",
    usedIn: ["daywell", "portfolio"],
    note: "My daily dev environment. Everything on this page was built from a Linux terminal: git, Node, package scripts and test runs.",
  },
  {
    id: "vitest",
    name: "Vitest",
    icon: "vitest",
    category: "Testing · Unit",
    since: "2025 · Daywell",
    level: 55,
    levelLabel: "Learning",
    usedIn: ["daywell"],
    note: "Unit tests for task status rules, date helpers, zod schemas and the verse rotation logic.",
  },
  {
    id: "playwright",
    name: "Playwright",
    icon: "playwright",
    category: "Testing · End-to-end",
    since: "2025 · Daywell",
    level: 50,
    levelLabel: "Learning",
    usedIn: ["daywell"],
    note: "End-to-end flow: sign up, log in, add a task, start it, complete it. Runs against a real Supabase project.",
  },
  {
    id: "canva",
    name: "Canva",
    icon: "canva",
    category: "Design · Visuals",
    since: "2025",
    level: 70,
    levelLabel: "Comfortable",
    usedIn: ["portfolio"],
    note: "Where I rough out visuals before building them, and where my resume lives. I sketch the look first, then hand the direction to Claude Code.",
  },
];

/** Platforms from technical + automation roles. Only real products, no ratings. */
export type Tool = { name: string; /** path under /assets/icons */ src: string };

export const toolGroups: { group: string; items: Tool[] }[] = [
  {
    group: "CRM & automation",
    items: [
      { name: "GoHighLevel", src: "gohighlevel.png" },
      { name: "ActiveCampaign", src: "activecampaign.svg" },
      { name: "Typeform", src: "typeform.svg" },
      { name: "Calendly", src: "calendly.svg" },
    ],
  },
  {
    group: "Data & productivity",
    items: [
      { name: "SQL", src: "sql.svg" },
      { name: "Microsoft Excel", src: "microsoftexcel.svg" },
      { name: "Google Workspace", src: "googleworkspace.svg" },
      { name: "ClickUp", src: "clickup.svg" },
    ],
  },
  {
    group: "Creative & support",
    items: [
      { name: "Canva", src: "canva.svg" },
      { name: "Loom", src: "loom.svg" },
      { name: "Descript", src: "descript.svg" },
      { name: "Buffer", src: "buffer.svg" },
    ],
  },
];

export const aiTools = [
  { name: "ChatGPT", src: "openai.svg" },
  { name: "Grok", src: "grok.svg" },
  { name: "OpenAI API", src: "code.svg" },
];
