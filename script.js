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
// Tech stack explorer
// ------------------------------------------------------------
const PROJECTS = {
  daywell: { label: "Daywell", href: "https://daywell-project.vercel.app" },
  portfolio: { label: "This portfolio", href: "#projects" },
};

const SKILLS = [
  {
    id: "html",
    name: "HTML",
    icon: "html5",
    category: "Language · Markup",
    since: "2025",
    level: 80,
    levelLabel: "Comfortable",
    usedIn: ["portfolio", "daywell"],
    note: "Where I started. Semantic structure, accessible forms, and clean documents. This portfolio is hand-written HTML with no framework.",
  },
  {
    id: "css",
    name: "CSS",
    icon: "css",
    category: "Language · Styling",
    since: "2025",
    level: 75,
    levelLabel: "Comfortable",
    usedIn: ["portfolio"],
    note: "Grid, Flexbox, custom properties and backdrop-filter. The stacked glass card deck above is CSS transforms plus a few lines of JS.",
  },
  {
    id: "js",
    name: "JavaScript",
    icon: "javascript",
    category: "Language",
    since: "2025",
    level: 70,
    levelLabel: "Comfortable",
    usedIn: ["portfolio", "daywell"],
    note: "DOM, events, IntersectionObserver, pointer events. Everything interactive on this page is vanilla JavaScript.",
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
    id: "sql",
    name: "SQL",
    icon: "postgresql",
    category: "Language · Data",
    since: "2025 · Daywell",
    level: 55,
    levelLabel: "Learning",
    usedIn: ["daywell"],
    note: "Wrote the Daywell schema, migrations, triggers and row-level security policies by hand in Postgres.",
  },
  {
    id: "react",
    name: "React 19",
    icon: "react",
    category: "Frontend · Library",
    since: "2025 · Daywell",
    level: 65,
    levelLabel: "Working daily",
    usedIn: ["daywell"],
    note: "Components, hooks, and the React Compiler. Task rows, dialogs, the focus timer and the calendar are all React.",
  },
  {
    id: "next",
    name: "Next.js 16",
    icon: "nextdotjs",
    category: "Frontend · Framework",
    since: "2025 · Daywell",
    level: 65,
    levelLabel: "Working daily",
    usedIn: ["daywell"],
    note: "App Router, route groups for auth vs. app, server actions for login/signup/logout, and a proxy for session refresh and redirects.",
  },
  {
    id: "tailwind",
    name: "Tailwind v4",
    icon: "tailwindcss",
    category: "Frontend · Styling",
    since: "2025 · Daywell",
    level: 70,
    levelLabel: "Comfortable",
    usedIn: ["daywell"],
    note: "Utility-first styling with a custom leaf/cloud/mist/ink palette and Manrope + Plus Jakarta Sans typography.",
  },
  {
    id: "shadcn",
    name: "shadcn/ui",
    icon: "shadcnui",
    category: "Frontend · Components",
    since: "2025 · Daywell",
    level: 65,
    levelLabel: "Comfortable",
    usedIn: ["daywell"],
    note: "Dialogs, dropdowns, forms and toasts built on Radix primitives, restyled into quiet glass cards.",
  },
  {
    id: "radix",
    name: "Radix UI",
    icon: "radixui",
    category: "Frontend · Primitives",
    since: "2025 · Daywell",
    level: 55,
    levelLabel: "Learning",
    usedIn: ["daywell"],
    note: "Accessible primitives under shadcn. Confirmation modals for sign out, mark done, delete and discard.",
  },
  {
    id: "tanstack",
    name: "TanStack Query",
    icon: "reactquery",
    category: "Frontend · Data fetching",
    since: "2025 · Daywell",
    level: 60,
    levelLabel: "Working daily",
    usedIn: ["daywell"],
    note: "Query hooks for tasks and events, cache invalidation after mutations, and loading skeletons per route.",
  },
  {
    id: "rhf",
    name: "react-hook-form",
    icon: "reacthookform",
    category: "Frontend · Forms",
    since: "2025 · Daywell",
    level: 60,
    levelLabel: "Working daily",
    usedIn: ["daywell"],
    note: "Task, event and auth forms with resolver-based validation and unsaved-changes guards.",
  },
  {
    id: "zod",
    name: "zod",
    icon: "zod",
    category: "Validation",
    since: "2025 · Daywell",
    level: 60,
    levelLabel: "Working daily",
    usedIn: ["daywell"],
    note: "Shared schemas for task, event and auth. Same schema validates the form and the server action.",
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
    note: "Tables for tasks, events and profiles, plus triggers and policies so every user only sees their own rows.",
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
    id: "git",
    name: "Git & GitHub",
    icon: "github",
    category: "Tooling · Version control",
    since: "2025",
    level: 65,
    levelLabel: "Comfortable",
    usedIn: ["daywell", "portfolio"],
    note: "Branches, commits, and GitHub Pages for this site. Daywell deploys from GitHub to Vercel on every push.",
  },
  {
    id: "vercel",
    name: "Vercel",
    icon: "vercel",
    category: "Tooling · Deployment",
    since: "2025 · Daywell",
    level: 60,
    levelLabel: "Comfortable",
    usedIn: ["daywell"],
    note: "Production hosting for Daywell with environment variables for Supabase and preview deploys per branch.",
  },
  {
    id: "eslint",
    name: "ESLint",
    icon: "eslint",
    category: "Tooling · Code quality",
    since: "2025 · Daywell",
    level: 55,
    levelLabel: "Comfortable",
    usedIn: ["daywell"],
    note: "Next.js config plus React Compiler rules. Lint and typecheck both run before every deploy.",
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
  btn.innerHTML = `<img src="./assets/icons/${s.icon}.svg" alt="" loading="lazy" />`;

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
      return `<li><a href="${p.href}" ${ext ? 'target="_blank" rel="noopener"' : ""}>${p.label}${ext ? " ↗" : ""}</a></li>`;
    })
    .join("");
  skillPopBody.innerHTML = `
    <button type="button" class="pop-close" aria-label="Close">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
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

  const subject = `[Portfolio] ${data.topic} — from ${data.name.trim()}`;
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
