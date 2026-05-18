"use client";

import { useCallback, useMemo, useState } from "react";
import type { TFoodCategory } from "../../../types";

export type TCategoryActionMode = "create" | "edit" | "delete" | null;

/**
 * Optional list mutators wired by the parent that owns the live list.
 *
 * The infinite-scroll controller keeps items in its own local state. The
 * RTK Query cache patch alone doesn't reach that state. The parent
 * passes these so modal sections can sync the visible list post-success.
 */
export type CategoryListMutators = {
  onCreated?: (row: TFoodCategory) => void;
  onUpdated?: (row: TFoodCategory) => void;
  onDeleted?: (id: string) => void;
};

export const useCategoryActionsContextHelper = (
  mutators?: CategoryListMutators,
) => {
  const [mode, setMode] = useState<TCategoryActionMode>(null);
  const [target, setTarget] = useState<TFoodCategory | null>(null);

  const openCreate = useCallback(() => {
    setTarget(null);
    setMode("create");
  }, []);

  const openEdit = useCallback((c: TFoodCategory) => {
    setTarget(c);
    setMode("edit");
  }, []);

  const openDelete = useCallback((c: TFoodCategory) => {
    setTarget(c);
    setMode("delete");
  }, []);

  const close = useCallback(() => {
    setMode(null);
    setTarget(null);
  }, []);

  // Stabilise the mutators so context consumers don't re-render on
  // every parent render. Identity changes only when actual handlers change.
  const stableMutators = useMemo<CategoryListMutators>(
    () => ({
      onCreated: mutators?.onCreated,
      onUpdated: mutators?.onUpdated,
      onDeleted: mutators?.onDeleted,
    }),
    [mutators?.onCreated, mutators?.onUpdated, mutators?.onDeleted],
  );

  return {
    mode,
    target,
    isOpen: mode !== null,
    openCreate,
    openEdit,
    openDelete,
    close,
    mutators: stableMutators,
  };
};
