"use client";

import { useEffect, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 transition-colors hover:text-hi"
      onClick={() => navigator.clipboard?.writeText(email).then(() => setCopied(true), () => {})}
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </button>
  );
}
