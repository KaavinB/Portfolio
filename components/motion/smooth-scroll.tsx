"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Lenis on mouse/trackpad devices only. Touch keeps native momentum scrolling,
 * and reduced-motion users get the browser default.
 */
export function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      anchors: { offset: 0 },
      // the mobile menu and any element marked as its own scroller keep native scrolling
      prevent: (node) => node.closest("[data-lenis-prevent]") !== null,
    });
    document.documentElement.dataset.smooth = "on";

    const onMenu = (e: Event) => ((e as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start());
    window.addEventListener("menu-toggle", onMenu);

    return () => {
      window.removeEventListener("menu-toggle", onMenu);
      delete document.documentElement.dataset.smooth;
      lenis.destroy();
    };
  }, []);

  return null;
}
