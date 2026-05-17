"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAllSearchResultsQuery } from "@/redux/featureApi/searchApi";
import { useDebounce } from "@/hooks/useDebounce";
import { flattenSearchResults, groupCount } from "../utils/flattenResults";
import { useRecentSearches } from "../hooks/useRecentSearches";
import type { TFlattenedRow, TSearchGroup } from "../types";

export const useGlobalSearchContextHelper = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const debouncedTerm = useDebounce(term, 300);
  const shouldFetch = debouncedTerm.trim().length >= 2;

  const queryArgs = useMemo(
    () =>
      shouldFetch
        ? [
            { name: "searchTerm", value: debouncedTerm.trim() },
            { name: "page", value: "1" },
            { name: "limit", value: "6" },
          ]
        : undefined,
    [shouldFetch, debouncedTerm],
  );

  const { data, isFetching, error } = useGetAllSearchResultsQuery(queryArgs, {
    skip: !shouldFetch,
  });

  const groups = (data?.data ?? []) as TSearchGroup[];
  const rows = useMemo(() => flattenSearchResults(groups), [groups]);
  const counts = useMemo(() => groupCount(groups), [groups]);

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

  const status: "idle" | "searching" | "results" | "no-results" | "error" =
    !shouldFetch
      ? "idle"
      : error
        ? "error"
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
  };
};
