"use client";

import { useState } from "react";

type Props = {
  text?: string;
  /** Character threshold before truncating. Default 320. */
  limit?: number;
};

/**
 * Inline truncated paragraph with see more / see less toggle.
 *
 * The truncation runs on character count rather than a CSS clamp so the
 * collapsed and expanded states share the exact same prose styles and
 * the "see more" affordance is always discoverable on long copy.
 */
export function TruncatedDescription(props: Props) {
  const { text, limit = 320 } = props;
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > limit;
  const visible = expanded || !isLong ? text : `${text.slice(0, limit).trimEnd()}…`;

  return (
    <p className="text-sm sm:text-base leading-relaxed text-foreground/85 whitespace-pre-wrap">
      {visible}
      {isLong && (
        <>
          {" "}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="font-semibold text-primary hover:underline"
          >
            {expanded ? "See less" : "See more"}
          </button>
        </>
      )}
    </p>
  );
}
