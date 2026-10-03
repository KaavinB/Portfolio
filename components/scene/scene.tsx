"use client";

import { useEffect, useRef } from "react";
import "./scene.css";

// Start fetching three.js as soon as this module runs in the browser rather
// than after hydration; it is the largest chunk on the page.
const sculpture = typeof window === "undefined" ? null : import("./sculpture");

/** Lets the hero intro start (see the head script in the layout). */
const markReady = () => document.documentElement.classList.add("scene-ready");

/**
 * Fixed full-viewport layer for the sculpture. three.js loads in parallel with
 * the page rather than blocking first paint; without WebGL the page simply has
 * no drawing.
 */
export function Scene() {
  const root = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    sculpture
      ?.then(({ mountSculpture }) => {
        if (cancelled || !root.current || !host.current) return;
        dispose = mountSculpture({ root: root.current, host: host.current, onReady: markReady });
      })
      .catch(markReady);
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <div ref={root} className="scene" aria-hidden="true">
      <div ref={host} className="scene-canvas" />
    </div>
  );
}
