"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { person, sections } from "@/lib/content";

type SectionId = (typeof sections)[number]["id"];

export function Nav() {
  const [active, setActive] = useState<SectionId | null>(null);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    if (next !== solid) setSolid(next);
  });

  // Active section: whichever one crosses a line a third of the way down the screen.
  useEffect(() => {
    const ids = ["top", ...sections.map((s) => s.id)];
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          setActive(e.target.id === "top" ? null : (e.target.id as SectionId));
        }
      },
      { rootMargin: "-33% 0px -66% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggle = useCallback((next: boolean) => {
    setOpen(next);
    window.dispatchEvent(new CustomEvent("menu-toggle", { detail: next }));
  }, []);

  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();
    const button = menuButton.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && toggle(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      button?.focus();
    };
  }, [open, toggle]);

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    toggle(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
      history.replaceState(null, "", `#${id}`);
    });
  };

  return (
    <header data-solid={solid || open || undefined} className="fixed inset-x-0 top-0 z-50 text-fg data-[solid]:bg-bg">
      <nav aria-label="Primary" className="flex h-(--nav-h) items-center justify-between gap-6 px-(--gutter)">
        <a href="#top" className="display text-[17px] tracking-[-0.01em] whitespace-nowrap">
          <span className="sm:hidden">{person.firstName}</span>
          <span className="hidden sm:inline">{person.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "location" : undefined}
                className="nav-link relative block px-3 py-2 text-[15px] text-muted transition-colors hover:text-fg aria-[current]:text-hi"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          ref={menuButton}
          type="button"
          className="-mr-2 px-2 py-3 text-[15px] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => toggle(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-hi"
        style={{ scaleX: scrollYProgress }}
      />

      {open && (
        <div
          id="mobile-menu"
          data-lenis-prevent
          className="fixed inset-x-0 top-(--nav-h) bottom-0 flex flex-col justify-between overflow-y-auto bg-bg px-(--gutter) pt-8 pb-10 md:hidden"
        >
          <ul>
            {sections.map((s, i) => (
              <li key={s.id} className="border-t border-rule last:border-b">
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={`#${s.id}`}
                  onClick={(e) => go(e, s.id)}
                  aria-current={active === s.id ? "location" : undefined}
                  className="flex items-center justify-between py-4 aria-[current]:text-hi"
                >
                  <span className="display text-[40px] leading-none tracking-[-0.03em]">{s.label}</span>
                  <span className="label text-hi">{String(i + 1).padStart(2, "0")}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href={`mailto:${person.email}`} className="mt-10 text-[17px]">
            {person.email} <span className="arrow">↗</span>
          </a>
        </div>
      )}
    </header>
  );
}
