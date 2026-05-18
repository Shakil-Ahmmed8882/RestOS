"use client";

import { Icon } from "@iconify/react";
import type { TUserDetail } from "../types";

type Props = {
  user: TUserDetail;
};

type DetailItem = {
  label: string;
  value: string;
};

function DetailField({ label, value }: DetailItem) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] sm:text-xs font-medium text-muted-foreground/80">
        {label}
      </p>
      <p className="text-sm font-semibold text-foreground truncate">{value}</p>
    </div>
  );
}

export function UserBioDetailsSection(props: Props) {
  const { user } = props;

  const isActive = user.status === "ACTIVE";
  const joinedYear = user.createdAt ? new Date(user.createdAt).getFullYear() : "—";
  const cuisines = user.cuisinePreferences ?? [];
  const restrictions = user.dietaryRestrictions ?? [];
  const tags = [...cuisines, ...restrictions].slice(0, 4);

  const leftColumn: DetailItem[] = [
    { label: "Email", value: user.email },
    { label: "Dining Frequency", value: user.diningFrequency || "—" },
    { label: "Contact Number", value: user.contactNumber || "—" },
    { label: "Location", value: user.location || "—" },
  ];

  const rightColumn: DetailItem[] = [
    { label: "Role", value: user.role ? user.role.toLowerCase() : "—" },
    { label: "Favorite Restaurants", value: user.favoriteRestaurants?.[0] ?? "—" },
    { label: "Joined", value: String(joinedYear) },
    { label: "Member Status", value: isActive ? "Active" : "Inactive" },
  ];

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-6 sm:p-8 flex flex-col gap-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] relative">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">
          Bio & other details
        </h3>
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            isActive ? "bg-emerald-500" : "bg-zinc-400"
          } ring-4 ring-emerald-500/15`}
          aria-label={isActive ? "Online" : "Offline"}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
        {leftColumn.map((item) => (
          <DetailField key={item.label} {...item} />
        ))}
        {rightColumn.map((item) => (
          <DetailField key={item.label} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-2">
        <div className="space-y-2">
          <p className="text-[11px] sm:text-xs font-medium text-muted-foreground/80">
            Availability
          </p>
          {isActive ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available for Collaboration
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-500">
              Currently Unavailable
            </span>
          )}
        </div>
        <div className="space-y-2">
          <p className="text-[11px] sm:text-xs font-medium text-muted-foreground/80">
            Badges
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-500">
            <Icon icon="solar:medal-ribbons-star-bold" className="h-3.5 w-3.5" />
            {isActive ? "Top Collaborator" : "New Member"}
          </span>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] sm:text-xs font-medium text-muted-foreground/80">
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-zinc-500 dark:text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
