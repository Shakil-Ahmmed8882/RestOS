"use client";

import { type ReactNode } from "react";
import { makeSelectorContext } from "@/components/rest-os-ui/shared-context/makeSelectorContext";
import { useContextSelector } from "@/components/rest-os-ui/shared-context/useContextSelector";
import { useFoodActionsContextHelper } from "./useFoodActionsContextHelper";

type TFoodActions = ReturnType<typeof useFoodActionsContextHelper>;

export const { Context, Provider } = makeSelectorContext<TFoodActions>("FoodActions");

export const FoodActionsProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={useFoodActionsContextHelper()}>{children}</Provider>;
};

export const useFoodActionsSelector = () => ({
  mode: useContextSelector(Context, "FoodActions", (s) => s.mode),
  target: useContextSelector(Context, "FoodActions", (s) => s.target),
  isOpen: useContextSelector(Context, "FoodActions", (s) => s.isOpen),
  openEdit: useContextSelector(Context, "FoodActions", (s) => s.openEdit),
  openDelete: useContextSelector(Context, "FoodActions", (s) => s.openDelete),
  close: useContextSelector(Context, "FoodActions", (s) => s.close),
});
