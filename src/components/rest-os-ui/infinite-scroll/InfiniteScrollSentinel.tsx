"use client";

import { useEffect } from "react";
import { useIntersection } from "./hooks/useIntersection";
import type { InfiniteScrollObserverOptions } from "./types";

interface Props {
  /** Called when the sentinel enters the observer rootMargin. */
  onIntersect: () => void;
  /** Disable observation (e.g. when loading/done/error). */
  enabled?: boolean;
  /** Observer tuning. */
  observer?: InfiniteScrollObserverOptions;
  /**
   * Class applied to the sentinel element.
   * Default has zero height — invisible but observable.
   */
  className?: string;
  /** Optional inline content rendered inside the sentinel (e.g. a loader). */
  children?: React.ReactNode;
}

/**
 * Headless trigger element. Drop it after your list:
 *
 *   <ul>{items.map(...)}</ul>
 *   <InfiniteScrollSentinel onIntersect={loadMore} enabled={hasMore} />
 *
 * It does not assume a scroll container — pass `observer.root` if your
 * list lives inside a scrollable panel rather than the document.
 */
export function InfiniteScrollSentinel(props: Props) {
  const { onIntersect, enabled = true, observer, className, children } = props;

  const { ref, isIntersecting } = useIntersection<HTMLDivElement>(observer, enabled);

  useEffect(() => {
    if (enabled && isIntersecting) onIntersect();
    // Re-run when the sentinel transitions into view OR when the
    // consumer toggles `enabled` (e.g. after a successful page load,
    // they re-enable it; if still intersecting, fire again).
  }, [enabled, isIntersecting, onIntersect]);

  return (
    <div ref={ref} aria-hidden="true" className={className ?? "h-1 w-full"}>
      {children}
    </div>
  );
}
