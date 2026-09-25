// ------------------------------------------------------------
// Icons: Lucide paths with hover animations (a vanilla port of
// lucide-animated.com, which ships React + Motion). Each icon is
// plain SVG; the motion lives in style.css and runs when the
// enclosing <a>/<button> is hovered or focused.
// ------------------------------------------------------------
const LI = {
  "arrow-right": '<path class="li-shaft" d="M5 12h14"/><path class="li-head" d="m12 5 7 7-7 7"/>',
  "arrow-up-right": '<g class="li-g"><path d="M7 7h10"/><path d="M17 7v10"/><path d="M7 17 17 7"/></g>',
  "arrow-up": '<g class="li-g"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></g>',
  "chevron-left": '<path class="li-g" d="m15 18-6-6 6-6"/>',
  "chevron-right": '<path class="li-g" d="m9 18 6-6-6-6"/>',
  download:
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><g class="li-g"><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></g>',
  send:
    '<g class="li-g"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></g><path class="li-trail" pathLength="100" stroke-width="1" stroke-dasharray="100" d="M-3 28C-.5 26.8 1.6 24.6 3.3 22 4.8 19.7 5.2 17.6 4.2 16.1 3.2 14.7 1.4 14.5.3 15.8c-1.2 1.4-.9 3.6.9 4.6 2.2 1.1 5.2-1 7.8-4.6"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path class="li-flap" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  phone:
    '<path class="li-g" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  "map-pin":
    '<g class="li-g"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle class="li-draw li-d2" pathLength="100" cx="12" cy="10" r="3"/></g>',
  github:
    '<path class="li-draw li-body" pathLength="100" d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path class="li-draw li-tail" pathLength="100" d="M9 18c-4.51 2-5-2-7-2"/>',
  linkedin:
    '<path class="li-draw" pathLength="100" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect class="li-draw li-d2" pathLength="100" width="4" height="12" x="2" y="9"/><circle class="li-draw li-d3" pathLength="100" cx="4" cy="4" r="2"/>',
  facebook: '<path class="li-draw" pathLength="100" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram:
    '<rect class="li-draw" pathLength="100" width="20" height="20" x="2" y="2" rx="5" ry="5"/><path class="li-draw li-d2" pathLength="100" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line class="li-draw li-d3" pathLength="100" x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  sun:
    '<circle cx="12" cy="12" r="4"/>' +
    ["M12 2v2", "m19.07 4.93-1.41 1.41", "M20 12h2", "m17.66 17.66 1.41 1.41", "M12 20v2", "m6.34 17.66-1.41 1.41", "M2 12h2", "m4.93 4.93 1.41 1.41"]
      .map((d, i) => `<path class="li-ray" style="--i:${i}" d="${d}"/>`)
      .join(""),
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  x: '<path class="li-draw" pathLength="100" d="M18 6 6 18"/><path class="li-draw li-d2" pathLength="100" d="m6 6 12 12"/>',
  eye: '<path class="li-lid" d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle class="li-pupil" cx="12" cy="12" r="3"/>',
  "file-text":
    '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path class="li-draw li-line" style="--i:0" pathLength="100" d="M10 9H8"/><path class="li-draw li-line" style="--i:1" pathLength="100" d="M16 13H8"/><path class="li-draw li-line" style="--i:2" pathLength="100" d="M16 17H8"/>',
  sparkles:
    '<path class="li-spark" d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path class="li-star" style="--i:0" d="M20 3v4"/><path class="li-star" style="--i:0" d="M22 5h-4"/><path class="li-star" style="--i:1" d="M4 17v2"/><path class="li-star" style="--i:1" d="M5 18H3"/>',
  monitor: '<rect x="2" y="4" width="20" height="13" rx="2"/><path class="li-g" d="M8 21h8M12 17v4"/>',
  // deck ("Beyond the code") card icons
  "graduation-cap":
    '<g class="li-g"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path class="li-draw" pathLength="100" d="M22 10v6"/></g><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  flame:
    '<path class="li-flame" d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  users:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path class="li-draw li-d2" pathLength="100" d="M22 21v-2a4 4 0 0 0-3-3.87"/><path class="li-draw li-d2" pathLength="100" d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  camera:
    '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle class="li-lens" cx="12" cy="13" r="3"/>',
  piano:
    '<path d="M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-7.5c0-1.4-1.1-2.5-2.5-2.5Z"/><path d="M2 14h20"/>' +
    [6, 10, 14, 18].map((x, i) => `<path class="li-key" style="--i:${i}" d="M${x} 14v4"/>`).join(""),
  "pen-tool":
    '<g class="li-g"><path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/><path class="li-draw" pathLength="100" d="m2.3 2.3 7.286 7.286"/><circle cx="11" cy="11" r="2"/></g>',
  "book-open":
    '<g class="li-book"><path class="li-draw li-d2" pathLength="100" d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></g>',
  smartphone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
};

function li(name, cls = "") {
  return `<svg class="li li-${name}${cls ? " " + cls : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${LI[name]}</svg>`;
}

// <span data-li="name" class="..."></span> placeholders in the HTML become inline SVGs
document.querySelectorAll("[data-li]").forEach((el) => {
  const tpl = document.createElement("template");
  tpl.innerHTML = li(el.dataset.li, el.className);
  el.replaceWith(tpl.content.firstElementChild);
});

// ------------------------------------------------------------
// Theme: light / dark toggle (initial value is set inline in <head>)
// ------------------------------------------------------------
const themeToggle = document.getElementById("themeToggle");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme, persist) {
  document.documentElement.setAttribute("data-theme", theme);
  const dark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  if (persist) {
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* storage unavailable */
    }
  }
}

applyTheme(document.documentElement.getAttribute("data-theme") || "light", false);

themeToggle.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next, true);
});

// follow the OS only while the visitor has not picked a side
systemDark.addEventListener("change", (e) => {
  let stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (err) {
    /* ignore */
  }
  if (!stored) applyTheme(e.matches ? "dark" : "light", false);
});

// ------------------------------------------------------------
// Header: shadow on scroll
// ------------------------------------------------------------
const header = document.getElementById("siteHeader");

function onScroll() {
  header.classList.toggle("scrolled", window.scrollY > 8);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ------------------------------------------------------------
// Hero: mouse parallax + orbit radius
// ------------------------------------------------------------
const heroVisual = document.getElementById("heroVisual");
const heroSection = document.getElementById("home");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setOrbitRadius() {
  const r = heroVisual.querySelector(".orbit").getBoundingClientRect().width / 2;
  heroVisual.querySelectorAll(".orbit-item").forEach((el) => el.style.setProperty("--r", `${r}px`));
}
setOrbitRadius();
window.addEventListener("resize", setOrbitRadius);

if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  heroSection.addEventListener("pointermove", (e) => {
    const r = heroSection.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    heroVisual.style.setProperty("--mx", mx.toFixed(3));
    heroVisual.style.setProperty("--my", my.toFixed(3));
  });
  heroSection.addEventListener("pointerleave", () => {
    heroVisual.style.setProperty("--mx", 0);
    heroVisual.style.setProperty("--my", 0);
  });
}

// ------------------------------------------------------------
// Mobile nav
// ------------------------------------------------------------
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", String(open));
}

hamburger.addEventListener("click", () => {
  setMenu(!navLinks.classList.contains("open"));
});

navLinks.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("click", () => setMenu(false));
});

// ------------------------------------------------------------
// Active nav link while scrolling
// ------------------------------------------------------------
const sections = [...document.querySelectorAll("main section[id]")];
const linkFor = (id) => navLinks.querySelector(`a[href="#${id}"]`);

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
      const link = linkFor(entry.target.id);
      if (link) link.classList.add("active");
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => activeObserver.observe(s));

// ------------------------------------------------------------
// Scroll reveal
// ------------------------------------------------------------
const revealTargets = document.querySelectorAll(
  ".section-heading, .about-body, .project, .stack-layout, .contact-card, .hero-copy, .hero-visual"
);

revealTargets.forEach((el, i) => {
  el.classList.add("reveal");
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealTargets.forEach((el) => revealObserver.observe(el));

// ------------------------------------------------------------
// Card deck: one card at a time, Next reveals the following one
// ------------------------------------------------------------
const deck = document.getElementById("deck");
const deckCards = [...document.querySelectorAll(".deck-card")];
const deckPrev = document.getElementById("deckPrev");
const deckNext = document.getElementById("deckNext");
const deckCounter = document.getElementById("deckCounter");
const deckProgress = document.getElementById("deckProgress");
let deckIndex = 0;

function renderDeck() {
  deckCards.forEach((card, i) => {
    const offset = i - deckIndex;
    card.classList.remove("is-active", "is-next", "is-next2", "is-gone", "is-hidden");
    if (offset === 0) card.classList.add("is-active");
    else if (offset === 1) card.classList.add("is-next");
    else if (offset === 2) card.classList.add("is-next2");
    else if (offset < 0) card.classList.add("is-gone");
    else card.classList.add("is-hidden");
    card.setAttribute("aria-hidden", String(offset !== 0));
  });
  deckCounter.textContent = `${deckIndex + 1} / ${deckCards.length}`;
  deckProgress.style.width = `${((deckIndex + 1) / deckCards.length) * 100}%`;
  deckPrev.disabled = deckIndex === 0;
  const last = deckIndex === deckCards.length - 1;
  deckNext.querySelector("span").textContent = last ? "Start over" : "Next";
  deckNext.classList.toggle("is-restart", last);
}

function goDeck(step) {
  const n = deckCards.length;
  if (step > 0 && deckIndex === n - 1) deckIndex = 0;
  else deckIndex = Math.min(n - 1, Math.max(0, deckIndex + step));
  renderDeck();
}

deckNext.addEventListener("click", () => goDeck(1));
deckPrev.addEventListener("click", () => goDeck(-1));
deck.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") { e.preventDefault(); goDeck(1); }
  if (e.key === "ArrowLeft") { e.preventDefault(); goDeck(-1); }
});

// swipe / drag on the active card
let swipeX = null;
deck.addEventListener("pointerdown", (e) => { swipeX = e.clientX; });
deck.addEventListener("pointerup", (e) => {
  if (swipeX === null) return;
  const dx = e.clientX - swipeX;
  swipeX = null;
  if (dx < -50) goDeck(1);
  else if (dx > 50) goDeck(-1);
});
deck.addEventListener("pointercancel", () => { swipeX = null; });

// hide placeholder art gracefully if an image is missing
deckCards.forEach((c) => {
  const img = c.querySelector(".deck-img");
  img.addEventListener("error", () => img.remove());
});

renderDeck();

// ------------------------------------------------------------
// Technologies explorer
// ------------------------------------------------------------
const PROJECT_DATA = {
  daywell: {
    label: "Daywell",
    tagline: "A planner for work, studies, and your walk with God.",
    year: "2025",
    kind: "Full-stack web app",
    tags: ["Supabase auth", "Recurring tasks", "Focus timer"],
    host: "daywell-project.vercel.app",
    live: "https://daywell-project.vercel.app",
    source: "https://github.com/KvnDvlpr/daywell",
    preview: "./assets/daywell-preview.jpg",
    gallery: [{ src: "./assets/daywell-preview.jpg", alt: "Daywell login screen with its sun mascot" }],
    previewAlt: "Daywell login screen with its sun mascot",
    logo: "./assets/daywell-icon.png",
    embeddable: true,
    desc:
      "Full-stack daily planner: auth, tasks that repeat on their own, a focus timer, a calendar, a verse of the day, and daily progress. I directed Claude Code from the first spec to production and owned every decision about the data model, security and design.",
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
    preview: "./assets/setlist-inside.jpg",
    gallery: [
      { src: "./assets/setlist-preview.jpg", alt: "Exalting AGHAM landing screen" },
      { src: "./assets/setlist-inside.jpg", alt: "Exalting AGHAM lineups page with Worship and Praise sets" },
    ],
    previewAlt: "Exalting AGHAM lineups page showing a Sunday Service with Worship and Praise song sets",
    logo: "./assets/exalting-agham.png",
    embeddable: true,
    desc:
      "A setlist manager I built for Exalting AGHAM, our church youth worship team. Schedule a lineup for a service, group songs into Worship and Praise sets, flip between chords and lyrics on stage, and share the playlist with the team. It installs to the home screen so members can pull up the setlist on their phones during practice and service, and I keep shipping fixes from their feedback.",
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
    tagline: "Hand-built with AI, no framework, deployed on GitHub Pages.",
    year: "2025",
    kind: "Website",
    tags: ["No framework", "Light & dark", "One-page CV"],
    host: "kvndvlpr.github.io",
    live: "https://kvndvlpr.github.io/MyPortfolio2025/",
    source: "https://github.com/KvnDvlpr/MyPortfolio2025",
    preview: "./assets/portfolio-preview.jpg",
    gallery: [{ src: "./assets/portfolio-preview.jpg", alt: "Hero section of this portfolio" }],
    previewAlt: "Hero section of this portfolio",
    mark: "kvn",
    embeddable: false,
    desc:
      "Semantic HTML, a small token-based CSS system, and vanilla JavaScript for the card deck, the crumpled-paper projects, the skills explorer, the CV viewer, light and dark themes, and the contact form. No build step, loads in under a second.",
    does: [
      "Stacked glass card deck about who I am",
      "Crumpled-paper project notes with live app previews",
      "Technologies explorer with hover and tap popovers",
      "In-page CV viewer with a one-page PDF",
      "Light / dark theme that remembers your choice",
    ],
    built: [
      "HTML, CSS custom properties, vanilla JS",
      "SVG turbulence filter for the paper texture",
      "Responsive, keyboard-accessible, reduced-motion aware",
      "GitHub Pages, zero dependencies",
    ],
  },
};

// used by the skills popovers
const PROJECTS = Object.fromEntries(
  Object.entries(PROJECT_DATA).map(([key, p]) => [key, { label: p.label, href: key === "portfolio" ? "#projects" : p.live }])
);

const SKILLS = [
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

const logoGrid = document.getElementById("logoGrid");
const logoWrap = document.getElementById("logoWrap");
const skillPop = document.getElementById("skillPop");
const skillPopBody = document.getElementById("skillPopBody");
let openTile = null;
let hideTimer = null;

SKILLS.forEach((s) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "logo-tile";
  btn.dataset.id = s.id;
  btn.setAttribute("aria-label", s.name);
  btn.setAttribute("aria-describedby", "skillPop");
  btn.innerHTML = `
    <span class="tile-logo"><img src="./assets/icons/${s.icon}.svg" alt="" loading="lazy" /></span>
    <span class="tile-text"><span class="tile-name">${s.name}</span><span class="tile-cat">${s.category}</span></span>
    <span class="tile-meta"><strong>${s.levelLabel}</strong><span class="tile-bar"><span style="transform:scaleX(${s.level / 100})"></span></span></span>`;

  // desktop: hover
  btn.addEventListener("pointerenter", (e) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(hideTimer);
    showPop(btn, s);
  });
  btn.addEventListener("pointerleave", (e) => {
    if (e.pointerType !== "mouse") return;
    scheduleHide();
  });
  btn.addEventListener("focus", () => showPop(btn, s));
  btn.addEventListener("blur", scheduleHide);

  // touch / click: toggle
  btn.addEventListener("click", () => {
    if (openTile === btn && skillPop.classList.contains("is-visible")) hidePop();
    else showPop(btn, s);
  });

  logoGrid.appendChild(btn);
});

// ------------------------------------------------------------
// Tools I've worked with: platforms from technical + automation roles.
// Only real products (no concepts). `icon` = assets/icons/<icon>.svg,
// `file` = any other asset filename, `mark` = monogram fallback.
// ------------------------------------------------------------
const TOOLS = [
  {
    group: "CRM & automation",
    items: [
      { name: "GoHighLevel", file: "gohighlevel.png" },
      { name: "ActiveCampaign", icon: "activecampaign" },
      { name: "Typeform", icon: "typeform" },
      { name: "Calendly", icon: "calendly" },
    ],
  },
  {
    group: "Data & productivity",
    items: [
      { name: "SQL", icon: "sql" },
      { name: "Microsoft Excel", icon: "microsoftexcel" },
      { name: "Google Workspace", icon: "googleworkspace" },
      { name: "ClickUp", icon: "clickup" },
    ],
  },
  {
    group: "Creative & support",
    items: [
      { name: "Canva", icon: "canva" },
      { name: "Loom", icon: "loom" },
      { name: "Descript", icon: "descript" },
      { name: "Buffer", icon: "buffer" },
    ],
  },
];

const toolsGroups = document.getElementById("toolsGroups");
TOOLS.forEach((g) => {
  const col = document.createElement("div");
  col.className = "tools-group";
  const chips = g.items
    .map(
      (t) => `<li class="tool-chip"><span class="tool-ico">${
        t.icon || t.file
          ? `<img src="./assets/icons/${t.file || t.icon + ".svg"}" alt="" loading="lazy" />`
          : `<span class="tool-mark">${t.mark}</span>`
      }</span><span class="tool-name">${t.name}</span></li>`
    )
    .join("");
  col.innerHTML = `<span class="tools-label">${g.group}</span><ul aria-label="${g.group}">${chips}</ul>`;
  toolsGroups.appendChild(col);
});

skillPop.addEventListener("pointerenter", () => clearTimeout(hideTimer));
skillPop.addEventListener("pointerleave", (e) => {
  if (e.pointerType === "mouse") scheduleHide();
});

function scheduleHide() {
  clearTimeout(hideTimer);
  hideTimer = setTimeout(hidePop, 140);
}

function renderPop(s) {
  const used = s.usedIn
    .map((key) => {
      const p = PROJECTS[key];
      const ext = p.href.startsWith("http");
      return `<li><a href="${p.href}" ${ext ? 'target="_blank" rel="noopener"' : ""}>${p.label}${ext ? li("arrow-up-right", "li-xs") : ""}</a></li>`;
    })
    .join("");
  skillPopBody.innerHTML = `
    <button type="button" class="pop-close" aria-label="Close">${li("x")}</button>
    <div class="pop-head">
      <div class="pop-logo"><img src="./assets/icons/${s.icon}.svg" alt="" /></div>
      <div><h3>${s.name}</h3><p class="pop-cat">${s.category}</p></div>
    </div>
    <div class="pop-meta">
      <span>First used <strong>${s.since}</strong></span>
      <span>Level <strong>${s.levelLabel}</strong></span>
    </div>
    <div class="pop-level"><span style="width:${s.level}%"></span></div>
    <p class="pop-note">${s.note}</p>
    <ul class="pop-used">${used}</ul>
  `;
  skillPopBody.querySelector(".pop-close").addEventListener("click", hidePop);
}

function positionPop(tile) {
  const wrap = logoWrap.getBoundingClientRect();
  const t = tile.getBoundingClientRect();
  const popW = skillPop.offsetWidth;
  const popH = skillPop.offsetHeight;
  const gap = 14;

  // horizontal: center on tile, clamp inside the grid
  let left = t.left - wrap.left + t.width / 2 - popW / 2;
  left = Math.max(0, Math.min(wrap.width - popW, left));
  const arrowX = t.left - wrap.left + t.width / 2 - left;

  // vertical: below by default, above if it would run past the viewport bottom
  const spaceBelow = window.innerHeight - t.bottom;
  const above = spaceBelow < popH + gap && t.top > popH + gap;
  const top = above ? t.top - wrap.top - popH - gap : t.bottom - wrap.top + gap;

  skillPop.style.left = `${left}px`;
  skillPop.style.top = `${top}px`;
  skillPop.classList.toggle("is-above", above);
  skillPop.querySelector(".skill-pop-arrow").style.left = `${Math.max(14, Math.min(popW - 30, arrowX - 8))}px`;
}

function showPop(tile, s) {
  clearTimeout(hideTimer);
  if (openTile && openTile !== tile) openTile.classList.remove("is-open");
  openTile = tile;
  tile.classList.add("is-open");
  renderPop(s);
  skillPop.classList.remove("is-visible");
  skillPop.setAttribute("aria-hidden", "false");
  positionPop(tile);
  requestAnimationFrame(() => skillPop.classList.add("is-visible"));
}

function hidePop() {
  clearTimeout(hideTimer);
  skillPop.classList.remove("is-visible");
  skillPop.setAttribute("aria-hidden", "true");
  if (openTile) openTile.classList.remove("is-open");
  openTile = null;
}

// tap outside closes (touch), Escape closes
document.addEventListener("pointerdown", (e) => {
  if (!skillPop.classList.contains("is-visible")) return;
  if (logoWrap.contains(e.target)) return;
  hidePop();
});
window.addEventListener("resize", () => { if (openTile) positionPop(openTile); });

// ------------------------------------------------------------
// Projects: crumpled paper tabs -> detail panel
// ------------------------------------------------------------
const paperTabs = [...document.querySelectorAll(".paper")];
const projectDetail = document.getElementById("projectDetail");
let currentProject = null;

const ICON_EXT = li("arrow-up-right", "btn-icon");
const ICON_EYE = li("eye", "btn-icon");

function renderProject(key) {
  const p = PROJECT_DATA[key];
  const heroLogo =
    p.mark === "kvn"
      ? `<svg class="hero-mark" viewBox="0 0 9 9" shape-rendering="crispEdges" aria-hidden="true"><use href="#kvnMark"/></svg>`
      : `<img src="${p.logo}" alt="${p.label} logo" class="hero-logo" loading="lazy" />`;
  const listItems = (items) => items.map((t) => `<li>${t}</li>`).join("");
  projectDetail.innerHTML = `
    <div class="project-hero hero-${key}">
      ${heroLogo}
    </div>
    <div class="project-body">
      <p class="project-meta"><span class="dot"></span>Live <i>·</i> ${p.year} <i>·</i> ${p.kind}</p>
      <h3>${p.label}</h3>
      <p class="project-tagline">${p.tagline}</p>
      <p class="project-desc">${p.desc}</p>
      <ul class="project-tags" aria-label="Highlights">${listItems(p.tags)}</ul>
      <div class="project-actions">
        <a href="${p.live}" target="_blank" rel="noopener" class="btn btn-primary">Live site${ICON_EXT}</a>
        <button type="button" class="btn-more" data-more="${key}" aria-haspopup="dialog">
          See more<span class="more-arrow">${li("arrow-right")}</span>
        </button>
      </div>
    </div>
    `;
}

function selectProject(key, { animate = true } = {}) {
  if (key === currentProject) return;
  currentProject = key;
  paperTabs.forEach((t) => {
    const on = t.dataset.project === key;
    const wasOn = t.getAttribute("aria-selected") === "true";
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    t.classList.remove("is-opening", "is-closing");
    if (wasOn && !on && animate && !reduceMotion) {
      // the note we leave crumples back up
      void t.offsetWidth;
      t.classList.add("is-closing");
      t.onanimationend = (e) => {
        if (e.target === t) t.classList.remove("is-closing");
      };
    }
    if (on && animate && !reduceMotion) {
      // restart the uncrumple keyframes even if the class was just removed
      void t.offsetWidth;
      t.classList.add("is-opening");
      t.onanimationend = (e) => {
        if (e.target === t) t.classList.remove("is-opening");
      };
    }
  });
  projectDetail.setAttribute("aria-labelledby", `paperTab-${key}`);
  if (!animate || reduceMotion) {
    renderProject(key);
    return;
  }
  // old panel folds away, new one unfolds like the smoothed note
  projectDetail.classList.remove("unfold");
  projectDetail.classList.add("swap");
  setTimeout(() => {
    renderProject(key);
    projectDetail.classList.remove("swap");
    void projectDetail.offsetWidth;
    projectDetail.classList.add("unfold");
    projectDetail.onanimationend = (e) => {
      if (e.target === projectDetail) projectDetail.classList.remove("unfold");
    };
  }, 260);
}

paperTabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectProject(tab.dataset.project));
  tab.addEventListener("keydown", (e) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % paperTabs.length;
    if (e.key === "ArrowLeft") n = (i - 1 + paperTabs.length) % paperTabs.length;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = paperTabs.length - 1;
    paperTabs[n].focus();
    selectProject(paperTabs[n].dataset.project);
  });
});

selectProject("daywell", { animate: false });

// ------------------------------------------------------------
// App preview: the live project inside a modal (desktop / phone)
// ------------------------------------------------------------
const appModal = document.getElementById("appModal");
const appFrame = document.getElementById("appFrame");
const appTitle = document.getElementById("appTitle");
const appUrl = document.getElementById("appUrl");
const appOpen = document.getElementById("appOpen");
const appOpen2 = document.getElementById("appOpen2");
const appClose = document.getElementById("appClose");
const appDevice = document.getElementById("appDevice");
const appLoading = document.getElementById("appLoading");
const appLoadingText = document.getElementById("appLoadingText");
const deviceBtns = [...document.querySelectorAll(".device-btn")];
let appLastFocus = null;
let appSlowTimer = null;

function setDevice(device) {
  appDevice.classList.toggle("phone", device === "phone");
  appDevice.classList.toggle("desktop", device !== "phone");
  deviceBtns.forEach((b) => {
    const on = b.dataset.device === device;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", String(on));
  });
}

function openApp(key) {
  const p = PROJECT_DATA[key];
  if (!p || !p.embeddable) return;
  appLastFocus = document.activeElement;
  appTitle.innerHTML = `${p.label}<span class="cv-name"> · live preview</span>`;
  appUrl.textContent = p.host;
  appOpen.href = p.live;
  appOpen2.href = p.live;
  appLoadingText.textContent = "Loading the live app…";
  appLoading.classList.remove("hidden");
  setDevice("desktop");
  appFrame.src = p.live;
  clearTimeout(appSlowTimer);
  appSlowTimer = setTimeout(() => {
    appLoadingText.textContent = "Still loading… if nothing shows up, open it in a new tab.";
  }, 8000);
  appModal.classList.add("open");
  appModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  appClose.focus();
}

function closeApp() {
  if (!appModal.classList.contains("open")) return;
  appModal.classList.remove("open");
  appModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  clearTimeout(appSlowTimer);
  // stop the embedded app once the modal has faded out
  setTimeout(() => {
    if (!appModal.classList.contains("open")) appFrame.src = "about:blank";
  }, 350);
  if (appLastFocus) appLastFocus.focus();
}

appFrame.addEventListener("load", () => {
  if (appFrame.src && appFrame.src !== "about:blank") {
    clearTimeout(appSlowTimer);
    appLoading.classList.add("hidden");
  }
});
projectDetail.addEventListener("click", (e) => {
  const b = e.target.closest("[data-peek]");
  if (b) return openApp(b.dataset.peek);
  const more = e.target.closest("[data-more]");
  if (more) openGallery(more.dataset.more);
});

// "See more": lightbox with a screenshot carousel on top and the story below
const galleryModal = document.getElementById("galleryModal");
const galleryTrack = document.getElementById("galleryTrack");
const galleryDots = document.getElementById("galleryDots");
const galleryIndex = document.getElementById("galleryIndex");
const galleryTotal = document.getElementById("galleryTotal");
const galleryInfo = document.getElementById("galleryInfo");
const galleryClose = document.getElementById("galleryClose");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
let galleryKey = null;
let galleryAt = 0;
let galleryLastFocus = null;

function pad2(n) {
  return String(n).padStart(2, "0");
}

function galleryGo(i) {
  const p = PROJECT_DATA[galleryKey];
  const n = p.gallery.length;
  galleryAt = (i + n) % n;
  galleryTrack.style.transform = `translateX(${-galleryAt * 100}%)`;
  galleryIndex.textContent = pad2(galleryAt + 1);
  [...galleryDots.children].forEach((d, k) => {
    d.classList.toggle("is-active", k === galleryAt);
    d.setAttribute("aria-current", k === galleryAt ? "true" : "false");
  });
  [...galleryTrack.children].forEach((s, k) => s.classList.toggle("is-active", k === galleryAt));
}

function openGallery(key) {
  const p = PROJECT_DATA[key];
  if (!p) return;
  galleryKey = key;
  galleryLastFocus = document.activeElement;
  const listItems = (items) => items.map((t) => `<li>${t}</li>`).join("");
  galleryTrack.innerHTML = p.gallery
    .map((g) => `<figure class="gallery-slide"><img src="${g.src}" alt="${g.alt}" loading="eager" /></figure>`)
    .join("");
  galleryDots.innerHTML = p.gallery
    .map((g, k) => `<button type="button" data-go="${k}" aria-label="Screenshot ${k + 1} of ${p.gallery.length}"></button>`)
    .join("");
  galleryTotal.textContent = pad2(p.gallery.length);
  const single = p.gallery.length < 2;
  galleryPrev.hidden = single;
  galleryNext.hidden = single;
  galleryDots.hidden = single;
  galleryInfo.innerHTML = `
    <p class="project-meta"><span class="dot"></span>Live <i>·</i> ${p.year} <i>·</i> ${p.kind}</p>
    <h2 id="galleryTitle">${p.label}</h2>
    <p class="project-tagline">${p.tagline}</p>
    <p class="project-desc">${p.desc}</p>
    <ul class="project-tags" aria-label="Highlights">${listItems(p.tags)}</ul>
    <div class="gallery-actions">
      <a href="${p.live}" target="_blank" rel="noopener" class="btn btn-primary">Live site${ICON_EXT}</a>
      ${p.embeddable ? `<button type="button" class="btn btn-ghost" data-peek="${key}">${ICON_EYE}Try it inside</button>` : ""}
      <a href="${p.source}" target="_blank" rel="noopener" class="btn btn-ghost">${li("github", "btn-icon")}Source</a>
    </div>
    <div class="project-cols">
      <div><h4>What it does</h4><ul class="project-features">${listItems(p.does)}</ul></div>
      <div><h4>How it's built</h4><ul class="project-features">${listItems(p.built)}</ul></div>
    </div>`;
  galleryGo(0);
  galleryModal.classList.add("open");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  galleryClose.focus();
}

function closeGallery() {
  if (!galleryModal.classList.contains("open")) return;
  galleryModal.classList.remove("open");
  galleryModal.setAttribute("aria-hidden", "true");
  if (!appModal.classList.contains("open")) document.body.classList.remove("modal-open");
  if (galleryLastFocus && galleryLastFocus.focus) galleryLastFocus.focus();
}

galleryClose.addEventListener("click", closeGallery);
galleryPrev.addEventListener("click", () => galleryGo(galleryAt - 1));
galleryNext.addEventListener("click", () => galleryGo(galleryAt + 1));
galleryDots.addEventListener("click", (e) => {
  const d = e.target.closest("[data-go]");
  if (d) galleryGo(Number(d.dataset.go));
});
galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) closeGallery();
  const b = e.target.closest("[data-peek]");
  if (b) {
    closeGallery();
    openApp(b.dataset.peek);
  }
});
// swipe on the stage
let gSwipeX = null;
galleryTrack.addEventListener("pointerdown", (e) => (gSwipeX = e.clientX));
galleryTrack.addEventListener("pointerup", (e) => {
  if (gSwipeX === null) return;
  const dx = e.clientX - gSwipeX;
  gSwipeX = null;
  if (Math.abs(dx) > 40) galleryGo(galleryAt + (dx < 0 ? 1 : -1));
});
document.addEventListener("keydown", (e) => {
  if (!galleryModal.classList.contains("open")) return;
  if (e.key === "ArrowRight") galleryGo(galleryAt + 1);
  if (e.key === "ArrowLeft") galleryGo(galleryAt - 1);
});

deviceBtns.forEach((b) => b.addEventListener("click", () => setDevice(b.dataset.device)));
appClose.addEventListener("click", closeApp);
appModal.addEventListener("click", (e) => {
  if (e.target === appModal) closeApp();
});

// ------------------------------------------------------------
// CV viewer
// ------------------------------------------------------------
const cvModal = document.getElementById("cvModal");
const cvFrame = document.getElementById("cvFrame");
const cvClose = document.getElementById("cvClose");
let lastFocus = null;

function openCv() {
  lastFocus = document.activeElement;
  if (!cvFrame.src) cvFrame.src = "./cv.html?embed=1";
  cvModal.classList.add("open");
  cvModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  cvClose.focus();
}

function closeCv() {
  if (!cvModal.classList.contains("open")) return;
  cvModal.classList.remove("open");
  cvModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocus) lastFocus.focus();
}

document.querySelectorAll("[data-open-cv]").forEach((b) => b.addEventListener("click", openCv));
cvClose.addEventListener("click", closeCv);
cvModal.addEventListener("click", (e) => {
  if (e.target === cvModal) closeCv();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    setMenu(false);
    closeCv();
    closeApp();
    closeGallery();
    hidePop();
  }
});

// ------------------------------------------------------------
// Contact form -> opens the visitor's email app with a pre-filled message
// ------------------------------------------------------------
const CONTACT_EMAIL = "kvncrlacebuche@gmail.com";
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

function setNote(text, kind) {
  formNote.textContent = text;
  formNote.className = "form-note" + (kind ? ` ${kind}` : "");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());
  let valid = true;

  form.querySelectorAll(".field").forEach((field) => {
    const input = field.querySelector("input, textarea");
    if (!input) return;
    const ok = input.checkValidity() && input.value.trim() !== "";
    field.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    setNote("Please fill in your name, a valid email, and a message.", "error");
    return;
  }

  const subject = `[Portfolio] Message from ${data.name.trim()}`;
  const body = `${data.message.trim()}\n\n—\n${data.name.trim()}\n${data.email.trim()}`;

  window.location.href =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setNote("Opening your email app. If nothing happens, email me directly at " + CONTACT_EMAIL, "ok");
});

form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("input", () => {
    input.closest(".field").classList.remove("invalid");
    if (formNote.classList.contains("error")) {
      setNote("This opens your email app with the message pre-filled.");
    }
  });
});

// ------------------------------------------------------------
// Footer year
// ------------------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();
