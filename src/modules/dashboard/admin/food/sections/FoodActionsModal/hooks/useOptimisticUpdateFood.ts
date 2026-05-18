"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { useUpdateFoodMutation } from "@/redux/featureApi/foodApi";
import foodApi from "@/redux/featureApi/foodApi";
import { useAppDispatch, useAppStore } from "@/redux/hooks";
import type { FoodItem } from "@/modules/dashboard/admin/food/types/food.types";

export type FoodUpdatePayload = {
  foodName?: string;
  foodCategory?: string;
  price?: string;
  description?: string;
  quantity?: string;
  made_by?: string;
  food_origin?: string;
};

type Vars = {
  foodId: string;
  payload: FoodUpdatePayload;
  file?: File | null;
};

const buildItemPatch = (payload: FoodUpdatePayload): Partial<FoodItem> => ({
  ...(payload.foodName !== undefined && { foodName: payload.foodName }),
  ...(payload.foodCategory !== undefined && {
    foodCategory: payload.foodCategory,
  }),
  ...(payload.description !== undefined && {
    description: payload.description,
  }),
  ...(payload.made_by !== undefined && { made_by: payload.made_by }),
  ...(payload.food_origin !== undefined && {
    food_origin: payload.food_origin,
  }),
  ...(payload.price !== undefined && { price: Number(payload.price) }),
  ...(payload.quantity !== undefined && {
    quantity: Number(payload.quantity),
  }),
});

export function useOptimisticUpdateFood() {
  const [updateFood, mutation] = useUpdateFoodMutation();
  const dispatch = useAppDispatch();
  const store = useAppStore();

  const run = useCallback(
    async ({ foodId, payload, file }: Vars) => {
      const patch = buildItemPatch(payload);
      const undoFns: Array<() => void> = [];

      // Patch detail cache
      undoFns.push(
        dispatch(
          foodApi.util.updateQueryData(
            "getSingleFood",
            foodId,
            (draft: any) => {
              if (!draft) return;
              if (draft.food) Object.assign(draft.food, patch);
              else Object.assign(draft, patch);
            },
          ),
        ).undo,
      );

      // Patch every cached list query
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
                  const idx = draft.data.findIndex(
                    (f: FoodItem) => f._id === foodId,
                  );
                  if (idx !== -1) {
                    draft.data[idx] = { ...draft.data[idx], ...patch };
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

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (file) formData.append("file", file);

      try {
        await updateFood({ id: foodId, data: formData }).unwrap();
        toast.success("Food updated");
        return true;
      } catch (e: any) {
        rollback();
        toast.error(e?.data?.message ?? "Failed to update food");
        return false;
      }
    },
    [dispatch, store, updateFood],
  );

  return { run, isLoading: mutation.isLoading };
}
