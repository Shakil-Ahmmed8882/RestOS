"use client";

import { useCallback, useMemo, useState } from "react";
import type { FoodCacheRow } from "@/redux/featureApi/optimistic/food";

export type TFoodActionMode = "create" | "edit" | "delete" | null;

export type TFoodActionTarget = {
  foodId: string;
  foodName: string;
};

/**
 * Mutators wired by the page that owns the visible list.
 * After a successful mutation the modal section calls these so the
 * infinite-scroll / paginated list updates without a refresh.
 */
export type FoodListMutators = {
  onCreated?: (row: FoodCacheRow) => void;
  onUpdated?: (row: FoodCacheRow) => void;
  onDeleted?: (id: string) => void;
};

export const useFoodActionsContextHelper = (mutators?: FoodListMutators) => {
  const [mode, setMode] = useState<TFoodActionMode>(null);
  const [target, setTarget] = useState<TFoodActionTarget | null>(null);

  const openCreate = useCallback(() => {
    setTarget(null);
    setMode("create");
  }, []);

  const openEdit = useCallback((t: TFoodActionTarget) => {
    setTarget(t);
    setMode("edit");
  }, []);

  const openDelete = useCallback((t: TFoodActionTarget) => {
    setTarget(t);
    setMode("delete");
  }, []);

  const close = useCallback(() => {
    setMode(null);
    setTarget(null);
  }, []);

  const stableMutators = useMemo<FoodListMutators>(
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
