"use client";

import { useCallback, useState } from "react";

export type TFoodActionMode = "edit" | "delete" | null;

export type TFoodActionTarget = {
  foodId: string;
  foodName: string;
};

export const useFoodActionsContextHelper = () => {
  const [mode, setMode] = useState<TFoodActionMode>(null);
  const [target, setTarget] = useState<TFoodActionTarget | null>(null);

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

  return {
    mode,
    target,
    isOpen: mode !== null,
    openEdit,
    openDelete,
    close,
  };
};
