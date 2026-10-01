"use client";

import { useEffect, useRef } from "react";
import "./scene.css";

/**
 * Fixed full-viewport layer for the sculpture. three.js is loaded after the
 * page is interactive so it never blocks first paint; without WebGL the page
 * simply has no drawing.
 */
export function Scene() {
  const root = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import("./sculpture").then(({ mountSculpture }) => {
      if (cancelled || !root.current || !host.current) return;
      dispose = mountSculpture({ root: root.current, host: host.current });
    });
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
