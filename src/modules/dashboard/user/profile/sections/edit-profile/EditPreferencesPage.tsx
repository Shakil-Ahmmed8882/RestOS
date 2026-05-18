"use client";

import { PreferenceChipsEditor } from "./PreferenceChipsEditor";
import type { ProfileUser } from "../../types";

type Props = {
  user: ProfileUser;
};

const CUISINE_SUGGESTIONS = ["Italian", "Japanese", "Indian", "Mexican", "Thai", "Chinese", "French", "Mediterranean"];
const DIET_SUGGESTIONS = ["Vegetarian", "Vegan", "Gluten-free", "Halal", "Kosher", "Pescatarian"];
const MEAL_SUGGESTIONS = ["Breakfast", "Lunch", "Dinner"];
const PAYMENT_SUGGESTIONS = ["Cash", "Credit Card", "Digital Wallet"];

export function EditPreferencesPage(props: Props) {
  const { user } = props;

  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-lg font-bold tracking-tight">Food preferences</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Used to personalize recommendations and surface relevant blogs.
        </p>
      </header>

      <PreferenceChipsEditor
        label="Cuisines"
        field="cuisinePreferences"
        values={user?.cuisinePreferences ?? []}
        suggestions={CUISINE_SUGGESTIONS}
      />

      <div className="h-px bg-zinc-200/60 dark:bg-white/[0.06]" />

      <PreferenceChipsEditor
        label="Dietary restrictions"
        field="dietaryRestrictions"
        values={user?.dietaryRestrictions ?? []}
        suggestions={DIET_SUGGESTIONS}
      />

      <div className="h-px bg-zinc-200/60 dark:bg-white/[0.06]" />

      <PreferenceChipsEditor
        label="Preferred meal times"
        field="preferredMealTimes"
        values={user?.preferredMealTimes ?? []}
        suggestions={MEAL_SUGGESTIONS}
        freeText={false}
      />

      <div className="h-px bg-zinc-200/60 dark:bg-white/[0.06]" />

      <PreferenceChipsEditor
        label="Favorite restaurants"
        field="favoriteRestaurants"
        values={user?.favoriteRestaurants ?? []}
      />

      <div className="h-px bg-zinc-200/60 dark:bg-white/[0.06]" />

      <PreferenceChipsEditor
        label="Payment methods"
        field="paymentMethods"
        values={user?.paymentMethods ?? []}
        suggestions={PAYMENT_SUGGESTIONS}
        freeText={false}
      />
    </div>
  );
}
