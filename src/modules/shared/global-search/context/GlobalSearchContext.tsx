"use client";

import { type ReactNode } from "react";
import { makeSelectorContext } from "@/components/rest-os-ui/shared-context/makeSelectorContext";
import { useContextSelector } from "@/components/rest-os-ui/shared-context/useContextSelector";
import { useGlobalSearchContextHelper } from "./useGlobalSearchContextHelper";

type TGlobalSearch = ReturnType<typeof useGlobalSearchContextHelper>;

export const { Context, Provider } = makeSelectorContext<TGlobalSearch>("GlobalSearch");

export const GlobalSearchProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={useGlobalSearchContextHelper()}>{children}</Provider>;
};

export const useGlobalSearchSelector = () => ({
  isOpen: useContextSelector(Context, "GlobalSearch", (s) => s.isOpen),
  term: useContextSelector(Context, "GlobalSearch", (s) => s.term),
  rows: useContextSelector(Context, "GlobalSearch", (s) => s.rows),
  counts: useContextSelector(Context, "GlobalSearch", (s) => s.counts),
  recents: useContextSelector(Context, "GlobalSearch", (s) => s.recents),
  highlight: useContextSelector(Context, "GlobalSearch", (s) => s.highlight),
  status: useContextSelector(Context, "GlobalSearch", (s) => s.status),
  isFetching: useContextSelector(Context, "GlobalSearch", (s) => s.isFetching),
  hasMore: useContextSelector(Context, "GlobalSearch", (s) => s.hasMore),
  inputRef: useContextSelector(Context, "GlobalSearch", (s) => s.inputRef),
  open: useContextSelector(Context, "GlobalSearch", (s) => s.open),
  close: useContextSelector(Context, "GlobalSearch", (s) => s.close),
  setTerm: useContextSelector(Context, "GlobalSearch", (s) => s.setTerm),
  setHighlight: useContextSelector(Context, "GlobalSearch", (s) => s.setHighlight),
  selectRow: useContextSelector(Context, "GlobalSearch", (s) => s.selectRow),
  selectRecent: useContextSelector(Context, "GlobalSearch", (s) => s.selectRecent),
  clearRecents: useContextSelector(Context, "GlobalSearch", (s) => s.clearRecents),
  onInputKeyDown: useContextSelector(Context, "GlobalSearch", (s) => s.onInputKeyDown),
  loadMore: useContextSelector(Context, "GlobalSearch", (s) => s.loadMore),
});
