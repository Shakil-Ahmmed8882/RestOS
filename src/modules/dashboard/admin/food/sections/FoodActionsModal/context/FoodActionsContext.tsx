"use client";

import { type ReactNode } from "react";
import { makeSelectorContext } from "@/components/rest-os-ui/shared-context/makeSelectorContext";
import { useContextSelector } from "@/components/rest-os-ui/shared-context/useContextSelector";
import {
  useFoodActionsContextHelper,
  type FoodListMutators,
} from "./useFoodActionsContextHelper";

type TFoodActions = ReturnType<typeof useFoodActionsContextHelper>;

export const { Context, Provider } =
  makeSelectorContext<TFoodActions>("FoodActions");

type Props = {
  children: ReactNode;
  mutators?: FoodListMutators;
};

export const FoodActionsProvider = ({ children, mutators }: Props) => {
  return (
    <Provider value={useFoodActionsContextHelper(mutators)}>{children}</Provider>
  );
};

export const useFoodActionsSelector = () => ({
  mode: useContextSelector(Context, "FoodActions", (s) => s.mode),
  target: useContextSelector(Context, "FoodActions", (s) => s.target),
  isOpen: useContextSelector(Context, "FoodActions", (s) => s.isOpen),
  openCreate: useContextSelector(Context, "FoodActions", (s) => s.openCreate),
  openEdit: useContextSelector(Context, "FoodActions", (s) => s.openEdit),
  openDelete: useContextSelector(Context, "FoodActions", (s) => s.openDelete),
  close: useContextSelector(Context, "FoodActions", (s) => s.close),
  mutators: useContextSelector(Context, "FoodActions", (s) => s.mutators),
});
