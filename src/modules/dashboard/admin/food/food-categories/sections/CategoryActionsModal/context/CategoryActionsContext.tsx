"use client";

import { type ReactNode } from "react";
import { makeSelectorContext } from "@/components/rest-os-ui/shared-context/makeSelectorContext";
import { useContextSelector } from "@/components/rest-os-ui/shared-context/useContextSelector";
import {
  useCategoryActionsContextHelper,
  type CategoryListMutators,
} from "./useCategoryActionsContextHelper";

type TCategoryActions = ReturnType<typeof useCategoryActionsContextHelper>;

export const { Context, Provider } =
  makeSelectorContext<TCategoryActions>("CategoryActions");

type Props = {
  children: ReactNode;
  mutators?: CategoryListMutators;
};

export const CategoryActionsProvider = ({ children, mutators }: Props) => {
  return (
    <Provider value={useCategoryActionsContextHelper(mutators)}>
      {children}
    </Provider>
  );
};

export const useCategoryActionsSelector = () => ({
  mode: useContextSelector(Context, "CategoryActions", (s) => s.mode),
  target: useContextSelector(Context, "CategoryActions", (s) => s.target),
  isOpen: useContextSelector(Context, "CategoryActions", (s) => s.isOpen),
  openCreate: useContextSelector(Context, "CategoryActions", (s) => s.openCreate),
  openEdit: useContextSelector(Context, "CategoryActions", (s) => s.openEdit),
  openDelete: useContextSelector(Context, "CategoryActions", (s) => s.openDelete),
  close: useContextSelector(Context, "CategoryActions", (s) => s.close),
  mutators: useContextSelector(Context, "CategoryActions", (s) => s.mutators),
});
