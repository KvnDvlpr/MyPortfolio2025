"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";

import { FileTextIcon } from "@/components/animated-icons/file-text";
import { useCvDialog } from "@/components/cv/cv-dialog";
import { KvnMark } from "@/components/icons/kvn-mark";
import { ActionButton } from "@/components/motion/action-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { duration, easeOutExpo, transitions } from "@/lib/motion";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [hovered, setHovered] = useState<string | null>(null);
  const cv = useCvDialog();

  // solid background + border once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // highlight the link of the section in the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main section[id], footer#contact").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const openCv = () => {
    setMenuOpen(false);
    cv.open();
  };

  // the underline previews the hovered link, then settles back on the active one
  const underlined = hovered ?? active;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-100 flex h-header items-center border-b backdrop-blur-[14px] transition-[border-color,background] duration-300",
        scrolled ? "border-line bg-[var(--header-bg-solid)]" : "border-transparent bg-[var(--header-bg)]"
      )}
    >
      <nav className="container-page flex items-center justify-between">
        <motion.a
          href="#home"
          initial="rest"
          whileHover="hover"
          whileFocus="hover"
          className="inline-flex items-center gap-2.5 font-heading text-[1.05rem] font-bold tracking-[-0.01em]"
        >
          <span className="grid size-[34px] place-items-center rounded-tile bg-brand text-on-brand">
            <motion.span
              className="grid"
              variants={{ rest: { y: 0, rotate: 0 }, hover: { y: -2, rotate: -6 } }}
              transition={transitions.press}
            >
              <KvnMark className="size-5" />
            </motion.span>
          </span>
          <span>{site.name}</span>
        </motion.a>

        {/* desktop links */}
        <ul className="mr-7 ml-auto hidden items-center gap-7 nav:flex" onMouseLeave={() => setHovered(null)}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onMouseEnter={() => setHovered(link.id)}
                data-active={active === link.id || undefined}
                className="relative block text-[0.92rem] font-medium text-ink-2 transition-colors duration-200 hover:text-ink data-active:text-ink"
              >
                {link.label}
                {underlined === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-sage"
                    transition={transitions.overlay}
                  />
                )}
              </a>
            </li>
          ))}
          <li>
            <ActionButton
              onClick={openCv}
              variant="brand"
              icon={FileTextIcon}
              iconSide="start"
              className="h-auto rounded-full py-2 pr-[1.1rem] pl-[0.95rem] text-[0.9rem] font-semibold shadow-none"
            >
              View CV
            </ActionButton>
          </li>
        </ul>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobileNav"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex flex-col gap-[5px] p-1.5 nav:hidden"
          >
            <HamburgerBar open={menuOpen} openState={{ y: 7, rotate: 45 }} />
            <HamburgerBar open={menuOpen} openState={{ opacity: 0, scaleX: 0.4 }} />
            <HamburgerBar open={menuOpen} openState={{ y: -7, rotate: -45 }} />
          </button>
        </div>
      </nav>

      {/* mobile panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            id="mobileNav"
            key="mobileNav"
            variants={panel}
            initial="hidden"
            animate="shown"
            exit="hidden"
            className="fixed inset-x-0 top-header flex flex-col border-b border-line bg-[var(--menu-bg)] px-5 pt-3 pb-5 shadow-soft-md nav:hidden"
          >
            {navLinks.map((link) => (
              <motion.li key={link.id} variants={panelItem}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  data-active={active === link.id || undefined}
                  className="block py-3.5 text-base font-medium text-ink-2 transition-colors hover:text-ink data-active:text-ink"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
            <li>
              <ActionButton
                onClick={openCv}
                variant="brand"
                icon={FileTextIcon}
                iconSide="start"
                noLift
                className="mt-2 h-auto w-full rounded-full py-3.5 text-[0.9rem] font-semibold shadow-none"
              >
                View CV
              </ActionButton>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

const panel: Variants = {
  hidden: { opacity: 0, y: -8, transition: { duration: duration.feedback, ease: easeOutExpo } },
  shown: { opacity: 1, y: 0, transition: { duration: duration.state, ease: easeOutExpo, staggerChildren: 0.03 } },
};
const panelItem: Variants = {
  hidden: { opacity: 0, x: -6 },
  shown: { opacity: 1, x: 0, transition: transitions.state },
};

function HamburgerBar({ open, openState }: { open: boolean; openState: Record<string, number> }) {
  return (
    <motion.span
      className="block h-0.5 w-6 rounded-full bg-ink"
      initial={false}
      animate={open ? openState : { y: 0, rotate: 0, opacity: 1, scaleX: 1 }}
      transition={transitions.overlay}
    />
  );
}
