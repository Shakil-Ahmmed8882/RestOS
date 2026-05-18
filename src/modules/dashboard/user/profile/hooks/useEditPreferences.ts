"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useUpdateMyPreferencesMutation } from "@/redux/featureApi/profileApi";

type PrefField =
  | "cuisinePreferences"
  | "favoriteRestaurants"
  | "dietaryRestrictions"
  | "preferredMealTimes"
  | "paymentMethods";

// Chip-level preference editor — atomic add/remove/replace via PATCH.
export function useEditPreferences() {
  const [pendingField, setPendingField] = useState<PrefField | null>(null);
  const [updatePrefs] = useUpdateMyPreferencesMutation();

  const mutate = async (field: PrefField, action: "add" | "remove" | "replace", values: string[]) => {
    setPendingField(field);
    try {
      await updatePrefs({ field, action, values }).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Failed to update preferences");
    } finally {
      setPendingField(null);
    }
  };

  return { mutate, pendingField };
}
