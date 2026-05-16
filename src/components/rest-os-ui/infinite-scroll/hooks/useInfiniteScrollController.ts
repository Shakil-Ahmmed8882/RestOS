"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { InfiniteScrollStatus } from "../types";

/**
 * Return shape of a page fetch.
 * - `items` are appended to the accumulated list.
 * - `hasMore` lets you derive end-of-list however your API expresses it
 *   (totalPages, nextCursor, payload length, etc.) — keeping this hook
 *   agnostic to API shape.
 */
export type FetchPageResult<T> = {
  items: T[];
  hasMore: boolean;
};

export type FetchPage<T> = (page: number) => Promise<FetchPageResult<T>>;

export interface UseInfiniteScrollControllerOptions<T> {
  fetchPage: FetchPage<T>;
  /** Page number to start from. Default: 1. */
  initialPage?: number;
  /** Initial items, if rendered server-side / hydrated. */
  initialItems?: T[];
  /**
   * If `false`, the controller will not auto-load the first page.
   * Useful when you want the consumer to call `loadMore()` explicitly.
   * Default: true.
   */
  autoLoadInitial?: boolean;
}

export interface InfiniteScrollController<T> {
  items: T[];
  page: number;
  status: InfiniteScrollStatus;
  error: unknown;
  hasMore: boolean;
  /** Fetches the next page. No-op if loading / done. */
  loadMore: () => void;
  /** Resets state and (optionally) refetches from page 1. */
  reset: (refetch?: boolean) => void;
  /** Retries the page that just failed. */
  retry: () => void;
  /** Optimistic helpers — mutate the in-memory list without refetching. */
  prependItem: (item: T) => void;
  appendItem: (item: T) => void;
  replaceItem: (matcher: (item: T) => boolean, replacement: T) => void;
  removeItem: (matcher: (item: T) => boolean) => void;
}

/**
 * Headless infinite scroll controller.
 *
 * State machine:
 *   idle ──loadMore──► loading ──success──► idle | done
 *                                  └─error──► error ──retry──► loading
 *
 * Concurrency guarantee:
 *   A second `loadMore()` while a fetch is in flight is dropped.
 *   This is enforced via a ref guard so the latest state isn't required
 *   inside the closure — eliminates the classic double-fetch race.
 */
export function useInfiniteScrollController<T>(
  options: UseInfiniteScrollControllerOptions<T>,
): InfiniteScrollController<T> {
  const {
    fetchPage,
    initialPage = 1,
    initialItems = [],
    autoLoadInitial = true,
  } = options;

  const [items, setItems] = useState<T[]>(initialItems);
  const [page, setPage] = useState<number>(initialPage);
  const [status, setStatus] = useState<InfiniteScrollStatus>("idle");
  const [error, setError] = useState<unknown>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Ref guards prevent stale-closure double fetches AND let us cancel
  // in-flight requests on unmount / reset without aborting them mid-flight.
  const inFlightRef = useRef(false);
  const requestIdRef = useRef(0);

  // Keep a stable reference to fetchPage so the loadMore identity doesn't
  // change every render — important for effect dependencies downstream.
  const fetchPageRef = useRef(fetchPage);
  useEffect(() => {
    fetchPageRef.current = fetchPage;
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (inFlightRef.current) return;
    // We deliberately read from refs/state captured at call time. We
    // intentionally do NOT depend on `status` / `hasMore` here because
    // the guard above + the requestId check below cover correctness,
    // and we want a stable callback identity.
    if (!hasMore && status !== "idle") return;
    if (status === "loading" || status === "done") return;

    const requestId = ++requestIdRef.current;
    inFlightRef.current = true;
    setStatus("loading");
    setError(null);

    fetchPageRef
      .current(page)
      .then((result) => {
        // A reset (or unmount-driven request bump) happened mid-flight;
        // discard this stale result.
        if (requestId !== requestIdRef.current) return;

        setItems((prev) => prev.concat(result.items));
        setHasMore(result.hasMore);
        setPage((p) => p + 1);
        setStatus(result.hasMore ? "idle" : "done");
      })
      .catch((err) => {
        if (requestId !== requestIdRef.current) return;
        setError(err);
        setStatus("error");
      })
      .finally(() => {
        if (requestId === requestIdRef.current) {
          inFlightRef.current = false;
        }
      });
  }, [page, hasMore, status]);

  const reset = useCallback(
    (refetch = true) => {
      // Bumping the request id invalidates any in-flight response.
      requestIdRef.current++;
      inFlightRef.current = false;
      setItems(initialItems);
      setPage(initialPage);
      setError(null);
      setHasMore(true);
      setStatus("idle");
      // Schedule a fresh load on next tick so state has flushed.
      if (refetch) queueMicrotask(() => loadMore());
    },
    [initialItems, initialPage, loadMore],
  );

  const retry = useCallback(() => {
    if (status !== "error") return;
    setStatus("idle");
    // loadMore reads `status` from closure, so flip it then call on next tick.
    queueMicrotask(() => loadMore());
  }, [status, loadMore]);

  // Optimistic mutators — pure list edits, no network.
  const prependItem = useCallback((item: T) => {
    setItems((prev) => [item, ...prev]);
  }, []);

  const appendItem = useCallback((item: T) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const replaceItem = useCallback(
    (matcher: (item: T) => boolean, replacement: T) => {
      setItems((prev) => prev.map((it) => (matcher(it) ? replacement : it)));
    },
    [],
  );

  const removeItem = useCallback((matcher: (item: T) => boolean) => {
    setItems((prev) => prev.filter((it) => !matcher(it)));
  }, []);

  // Auto-fire the first page once on mount.
  const didAutoLoadRef = useRef(false);
  useEffect(() => {
    if (!autoLoadInitial) return;
    if (didAutoLoadRef.current) return;
    didAutoLoadRef.current = true;
    loadMore();
    // We intentionally do NOT depend on loadMore — we want exactly one
    // auto-fire on mount, regardless of subsequent identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    items,
    page,
    status,
    error,
    hasMore,
    loadMore,
    reset,
    retry,
    prependItem,
    appendItem,
    replaceItem,
    removeItem,
  };
}
