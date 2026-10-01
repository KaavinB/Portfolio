"use client";

import { useEffect } from "react";

/**
 * Turns the page Chelsea navy while any of the target sections owns the
 * viewport. Colours are CSS tokens, so the swap is one attribute on <html>.
 */
export function ThemeObserver({ targets }: { targets: string[] }) {
  useEffect(() => {
    const els = targets.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const html = document.documentElement;
    const inside = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inside.add(e.target);
          else inside.delete(e.target);
        }
        if (inside.size) html.dataset.theme = "navy";
        else delete html.dataset.theme;
      },
      // the switch happens once a section's top passes the middle of the screen
      { rootMargin: "0px 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      delete html.dataset.theme;
    };
  }, [targets]);

  return null;
}
