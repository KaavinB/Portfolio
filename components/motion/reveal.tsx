"use client";

import { useCallback, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";

type Variant = "lines" | "fade";

type RevealProps = {
  as?: "div" | "section" | "p" | "ul" | "ol" | "li" | "h2" | "h3" | "span" | "figure" | "dl";
  variant?: Variant;
  /** seconds */
  delay?: number;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

/**
 * Marks an element as revealed once it enters the viewport. The motion itself
 * lives in CSS (`[data-reveal]`), so each variant can move differently and
 * reduced-motion users simply see the content.
 */
export function Reveal({ as: Tag = "div", variant = "fade", delay = 0, children, style, ...rest }: RevealProps) {
  const observe = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.inview = "true";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={observe}
      data-reveal={variant}
      style={{ ...style, "--reveal-delay": `${delay}s` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Each line slides up from behind its own mask; use inside a `lines` reveal. */
export function MaskedLines({ lines }: { lines: string[] }) {
  return lines.map((line, i) => (
    <span key={i} className="mask-line" style={{ "--i": i } as CSSProperties}>
      <span>{line}</span>
    </span>
  ));
}
