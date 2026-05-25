"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAllSearchResultsQuery } from "@/redux/featureApi/searchApi";
import { useDebounce } from "@/hooks/useDebounce";
import { flattenSearchResults, groupCount } from "../utils/flattenResults";
import { useRecentSearches } from "../hooks/useRecentSearches";
import type { TFlattenedRow, TSearchGroup } from "../types";

const PAGE_SIZE = 6;

export const useGlobalSearchContextHelper = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const debouncedTerm = useDebounce(term, 300);
  // Always fetch — empty searchTerm returns the latest items per the API contract.
  // This powers the "popular/latest" initial state.
  const shouldFetch = true;
  const trimmedTerm = debouncedTerm.trim();
  const isSearching = trimmedTerm.length >= 2;

  // ── Pagination ──────────────────────────────────────────────
  // page is the highest page index requested so far. Each page's
  // result is cached independently by RTK Query via its arg.
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState<TSearchGroup[][]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Reset accumulator whenever the search term changes (empty term still fetches latest)
  useEffect(() => {
    setPage(1);
    setPages([]);
    setHasMore(true);
  }, [trimmedTerm]);

  const queryArgs = useMemo(
    () => [
      { name: "searchTerm", value: trimmedTerm },
      { name: "page", value: String(page) },
      { name: "limit", value: String(PAGE_SIZE) },
    ],
    [trimmedTerm, page],
  );

  const { data, isFetching, error } = useGetAllSearchResultsQuery(queryArgs);

  // Append the latest page to the accumulator (idempotently — guard by length)
  useEffect(() => {
    if (!data) return;
    const groups = ((data as any)?.data ?? []) as TSearchGroup[];
    const pageRows = flattenSearchResults(groups);

    setPages((prev) => {
      // Already absorbed this page index? skip.
      if (prev.length >= page) return prev;
      const next = [...prev];
      next[page - 1] = groups;
      return next;
    });

    if (pageRows.length === 0) setHasMore(false);
  }, [data, shouldFetch, page]);

  // Flatten all accumulated pages into a single row list
  const rows = useMemo(() => {
    const all: TFlattenedRow[] = [];
    pages.forEach((groups) => {
      all.push(...flattenSearchResults(groups));
    });
    return all;
  }, [pages]);

  // Counts from the union of every page's groups
  const counts = useMemo(() => {
    const acc = { blogs: 0, foods: 0, foodCategories: 0 };
    pages.forEach((groups) => {
      const c = groupCount(groups);
      acc.blogs += c.blogs;
      acc.foods += c.foods;
      acc.foodCategories += c.foodCategories;
    });
    return acc;
  }, [pages]);

  const loadMore = useCallback(() => {
    if (isFetching || !hasMore) return;
    // Only advance once the current page has been absorbed
    if (pages.length < page) return;
    setPage((p) => p + 1);
  }, [isFetching, hasMore, pages.length, page]);

  const { recents, pushTerm, clearAll } = useRecentSearches();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setTerm("");
    setHighlight(0);
  }, []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const selectRow = useCallback(
    (row: TFlattenedRow) => {
      pushTerm(term.trim() || debouncedTerm.trim());
      router.push(row.href);
      close();
    },
    [router, pushTerm, term, debouncedTerm, close],
  );

  const selectRecent = useCallback((t: string) => {
    setTerm(t);
    setHighlight(0);
  }, []);

  // Reset highlight when rows change
  useEffect(() => {
    setHighlight(0);
  }, [rows.length]);

  // Global hotkey: Cmd/Ctrl + K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  // Keyboard navigation within the modal
  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (rows.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlight((h) => (h + 1) % rows.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight((h) => (h - 1 + rows.length) % rows.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const row = rows[highlight];
        if (row) selectRow(row);
      }
    },
    [rows, highlight, selectRow],
  );

  // "latest" — no search term, showing the most-recent items per the API contract.
  // "searching" — term is set but no rows yet.
  // "results" — term is set and we have rows.
  // "no-results" — term is set and the fetch returned zero.
  // "error" — request failed.
  const status: "latest" | "searching" | "results" | "no-results" | "error" =
    error
      ? "error"
      : !isSearching
        ? "latest"
        : isFetching && rows.length === 0
          ? "searching"
          : rows.length === 0
            ? "no-results"
            : "results";

  return {
    // state
    isOpen,
    term,
    debouncedTerm,
    rows,
    counts,
    recents,
    highlight,
    isFetching,
    hasMore,
    status,
    inputRef,
    // actions
    open,
    close,
    toggle,
    setTerm,
    setHighlight,
    selectRow,
    selectRecent,
    clearRecents: clearAll,
    onInputKeyDown,
    loadMore,
  };
};
