"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { BaseInput } from "@/components/rest-os-ui/forms";
import { BaseButton } from "@/components/rest-os-ui/buttons/BaseButton";
import { ShowIf } from "@/components/rest-os-ui/guard/ShowIf";
import { useEditPreferences } from "../../hooks/useEditPreferences";

type Field =
  | "cuisinePreferences"
  | "favoriteRestaurants"
  | "dietaryRestrictions"
  | "preferredMealTimes"
  | "paymentMethods";

type Props = {
  label: string;
  field: Field;
  values: string[];
  suggestions?: string[];
  freeText?: boolean;
};

// Chip add/remove backed by PATCH /profile/me/preferences (atomic add/remove).
// Optimistic feel comes from the RTK Query cache tag invalidation re-fetch;
// for this preference surface the call is cheap enough that an explicit
// optimistic patch is unnecessary.
export function PreferenceChipsEditor(props: Props) {
  const { label, field, values, suggestions = [], freeText = true } = props;
  const { mutate, pendingField } = useEditPreferences();
  const [draft, setDraft] = useState("");

  const isPending = pendingField === field;

  const handleAdd = async (raw: string) => {
    const value = raw.trim();
    if (!value || values.includes(value)) return;
    await mutate(field, "add", [value]);
    setDraft("");
  };

  const handleRemove = (value: string) => {
    mutate(field, "remove", [value]);
  };

  const remainingSuggestions = suggestions.filter((s) => !values.includes(s));

  return (
    <div className="space-y-2.5">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>

      <ShowIf condition={values.length > 0}>
        <div className="flex flex-wrap gap-1.5">
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium"
            >
              {v}
              <button
                type="button"
                onClick={() => handleRemove(v)}
                disabled={isPending}
                className="hover:text-primary/70 transition-colors disabled:opacity-50"
                aria-label={`Remove ${v}`}
              >
                <Icon icon="solar:close-circle-bold" className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
      </ShowIf>

      <ShowIf condition={remainingSuggestions.length > 0}>
        <div className="flex flex-wrap gap-1.5">
          {remainingSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleAdd(s)}
              disabled={isPending}
              className="inline-flex items-center gap-1 rounded-full bg-silk-with-hover px-3 py-1 text-xs font-medium text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Icon icon="solar:add-circle-linear" className="size-3.5" />
              {s}
            </button>
          ))}
        </div>
      </ShowIf>

      <ShowIf condition={freeText}>
        <div className="flex items-center gap-2 pt-1">
          <BaseInput
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd(draft);
              }
            }}
            placeholder={`Add ${label.toLowerCase()}…`}
            disabled={isPending}
            className="h-10"
          />
          <BaseButton
            type="button"
            intent="primary-light"
            size="sm"
            className="rounded-xl shrink-0"
            isLoading={isPending}
            onClick={() => handleAdd(draft)}
          >
            Add
          </BaseButton>
        </div>
      </ShowIf>
    </div>
  );
}
