"use client";

import { useCallback, useEffect, useState } from "react";
import type { TRecentSearch } from "../types";

const KEY = "rest-os:recent-searches";
const MAX = 8;

const read = (): TRecentSearch[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as TRecentSearch[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const write = (items: TRecentSearch[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // ignore quota errors
  }
};

export const useRecentSearches = () => {
  const [recents, setRecents] = useState<TRecentSearch[]>([]);

  useEffect(() => {
    setRecents(read());
  }, []);

  const pushTerm = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const next = [
      { term: trimmed, at: Date.now() },
      ...read().filter((r) => r.term.toLowerCase() !== trimmed.toLowerCase()),
    ].slice(0, MAX);
    write(next);
    setRecents(next);
  }, []);

  const clearAll = useCallback(() => {
    write([]);
    setRecents([]);
  }, []);

  return { recents, pushTerm, clearAll };
};
