"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { useDeleteFoodMutation } from "@/redux/featureApi/foodApi";
import foodApi from "@/redux/featureApi/foodApi";
import { useAppDispatch, useAppStore } from "@/redux/hooks";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

export function useOptimisticDeleteFood() {
  const [deleteFood, mutation] = useDeleteFoodMutation();
  const dispatch = useAppDispatch();
  const store = useAppStore();

  const run = useCallback(
    async (foodId: string) => {
      const undoFns: Array<() => void> = [];

      try {
        const state = store.getState();
        const argsList = foodApi.util.selectCachedArgsForQuery(
          state,
          "getAllFoods",
        );
        argsList.forEach((args) => {
          undoFns.push(
            dispatch(
              foodApi.util.updateQueryData(
                "getAllFoods",
                args,
                (draft: any) => {
                  if (!draft?.data) return;
                  draft.data = draft.data.filter(
                    (f: FoodItem) => f._id !== foodId,
                  );
                  if (draft.meta?.total) {
                    draft.meta.total = Math.max(0, draft.meta.total - 1);
                  }
                },
              ),
            ).undo,
          );
        });
      } catch {
        // best-effort
      }

      const rollback = () => undoFns.forEach((fn) => fn());

      try {
        await deleteFood(foodId).unwrap();
        toast.success("Food deleted");
        return true;
      } catch (e: any) {
        rollback();
        toast.error(e?.data?.message ?? "Failed to delete food");
        return false;
      }
    },
    [dispatch, store, deleteFood],
  );

  return { run, isLoading: mutation.isLoading };
}
