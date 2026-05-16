"use client";

import { useEffect, useRef, useState } from "react";
import type { InfiniteScrollObserverOptions } from "../types";

/**
 * Observes a single element via IntersectionObserver.
 *
 * Returns:
 *  - `ref`: attach to the element you want to observe (the "sentinel")
 *  - `isIntersecting`: current intersection state, updated reactively
 *
 * Why an observer, not a scroll listener?
 *  - No event handler firing on every scroll tick (no throttle needed).
 *  - Works for any scroll container (viewport, modal body, panel, etc.)
 *    via the `root` option — no math, no scrollTop/clientHeight juggling.
 *  - Browser-native, off the main thread.
 */
export function useIntersection<T extends Element>(
  options?: InfiniteScrollObserverOptions,
  enabled: boolean = true,
) {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Read primitives so the effect can depend on them without re-creating
  // the observer on every parent render that passes a new object literal.
  const rootMargin = options?.rootMargin ?? "200px";
  const threshold = options?.threshold ?? 0;
  const root = options?.root ?? null;

  useEffect(() => {
    if (!enabled) {
      setIsIntersecting(false);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // IntersectionObserver doesn't exist in some SSR / older browsers.
    // Silently no-op rather than crashing.
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        root: root instanceof Document ? null : root,
        rootMargin,
        threshold,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, rootMargin, threshold, root]);

  return { ref, isIntersecting };
}
