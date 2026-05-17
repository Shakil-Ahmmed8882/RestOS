"use client";

import { useCallback } from "react";
import {
  CategoryActionsProvider,
  CategoryActionsModalLayout,
} from "./sections/CategoryActionsModal";
import { CategoryGridSection } from "./sections/CategoryGridSection";
import { useFoodCategories } from "./hooks/useFoodCategories";
import type { TFoodCategory } from "./types";

export function FoodCategoriesHomeLayout() {
  const categories = useFoodCategories();
  const { prependItem, replaceItem, removeItem } = categories;

  // Mutators that sync the infinite-scroll controller's local items
  // with optimistic post-success updates from the modal sections. The
  // RTK Query cache is patched separately by the helpers — these mirror
  // the change into the visible list so the UI updates without a refresh.
  const onCreated = useCallback(
    (row: TFoodCategory) => prependItem(row),
    [prependItem],
  );
  const onUpdated = useCallback(
    (row: TFoodCategory) => replaceItem((c) => c._id === row._id, row),
    [replaceItem],
  );
  const onDeleted = useCallback(
    (id: string) => removeItem((c) => c._id === id),
    [removeItem],
  );

  return (
    <CategoryActionsProvider mutators={{ onCreated, onUpdated, onDeleted }}>
      <CategoryGridSection categories={categories} />
      <CategoryActionsModalLayout />
    </CategoryActionsProvider>
  );
}
