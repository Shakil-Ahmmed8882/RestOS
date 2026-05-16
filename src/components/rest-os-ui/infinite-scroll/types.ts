import type { ReactNode } from "react";

/**
 * Status reflects the lifecycle of an infinite scroll controller.
 * - idle:    no fetch in flight, may or may not have data yet
 * - loading: a fetch is in flight (initial or subsequent page)
 * - error:   the last fetch failed; consumer can retry
 * - done:    no more pages remain
 */
export type InfiniteScrollStatus = "idle" | "loading" | "error" | "done";

/**
 * Slot renderers — every visual surface is opt-in.
 * Returning null or omitting them hides that slot entirely.
 */
export interface InfiniteScrollSlots {
  /** Shown while a subsequent page is being fetched. */
  loader?: ReactNode | (() => ReactNode);
  /** Shown after the last page has been loaded. */
  endMessage?: ReactNode | (() => ReactNode);
  /** Shown when a fetch fails. Receives a retry callback. */
  error?: ReactNode | ((retry: () => void, error: unknown) => ReactNode);
  /** Shown for the very first load (before any items exist). */
  initialLoader?: ReactNode | (() => ReactNode);
  /** Shown when the first load completes with zero items. */
  empty?: ReactNode | (() => ReactNode);
}

/**
 * Tuning knobs for the intersection-observer based trigger.
 * `rootMargin` lets you start loading BEFORE the sentinel is visible
 * — the natural "prefetch" knob from the IntersectionObserver API.
 */
export interface InfiniteScrollObserverOptions {
  /** CSS margin string applied to the observer root. Default: "200px". */
  rootMargin?: string;
  /** Visibility threshold(s). Default: 0. */
  threshold?: number | number[];
  /**
   * Scroll container. Defaults to viewport.
   * Pass a ref to scope the observer to a custom container.
   */
  root?: Element | Document | null;
}
