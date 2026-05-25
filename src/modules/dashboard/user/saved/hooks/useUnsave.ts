"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { useUnsaveItemMutation } from "@/redux/featureApi/saveApi";
import type { SaveType } from "@/modules/dashboard/user/saved/types";

export function useUnsave() {
  const [unsave, state] = useUnsaveItemMutation();

  const remove = useCallback(
    async (type: SaveType, itemId: string) => {
      if (!itemId) return;
      try {
        await unsave({ type, itemId }).unwrap();
        toast.success(type === "blog" ? "Blog removed from saved" : "Food removed from saved");
      } catch (e: unknown) {
        const message =
          (e as { data?: { message?: string } })?.data?.message ?? "Couldn't unsave. Try again.";
        toast.error(message);
      }
    },
    [unsave],
  );

  return { remove, isLoading: state.isLoading };
}
