"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { DataBoundary } from "@/components/rest-os-ui/layouts/wrapper/DataBoundary";
import { BaseButton } from "@/components/rest-os-ui/buttons/BaseButton";
import { useMyProfile } from "./hooks/useMyProfile";
import { ProfileHeaderSection } from "./sections/ProfileHeaderSection";
import { ProfileHighlightsRow } from "./sections/ProfileHighlightsRow";
import { ProfileRecommendationsPanel } from "./sections/ProfileRecommendationsPanel";
import { ProfileTabsStrip } from "./sections/ProfileTabsStrip";
import { ProfileTabContent } from "./sections/ProfileTabContent";
import { ProfileHeaderSkeleton } from "./skeletons/ProfileHeaderSkeleton";
import { EditProfileModal } from "./sections/edit-profile/EditProfileModal";
import type { ProfileTabKey } from "./types";

// Compact two-column composition: main column holds the identity card,
// tastes strip and tab content; the rail holds suggested people. Stacks on
// narrow viewports — no large empty zones at any breakpoint.
export function UserProfileHomeLayout() {
  const { user, stats, highlights, recommendations, isLoading, error, refetch } = useMyProfile();

  const [activeTab, setActiveTab] = useState<ProfileTabKey>("blogs");
  const [editOpen, setEditOpen] = useState(false);

  return (
    <DataBoundary
      isLoading={isLoading}
      isError={error}
      onReset={() => refetch()}
      skeleton={<ProfileHeaderSkeleton />}
    >
      {!user?._id ? (
        <ProfileNotFound onRetry={() => refetch()} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-3 sm:gap-4">
          {/* Main column */}
          <div className="space-y-3 sm:space-y-4 min-w-0">
            <div className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-4 sm:p-5">
              <ProfileHeaderSection
                user={user}
                stats={stats}
                onEdit={() => setEditOpen(true)}
              />
            </div>

            <ProfileHighlightsRow highlights={highlights} onAdd={() => setEditOpen(true)} />

            {/* Tabs + content live in one shared panel */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-4 sm:p-5">
              <ProfileTabsStrip active={activeTab} stats={stats} onChange={setActiveTab} />
              <div className="pt-4">
                <ProfileTabContent key={activeTab} tab={activeTab} />
              </div>
            </div>
          </div>

          {/* Right rail */}
          <aside className="space-y-3 sm:space-y-4 min-w-0">
            <ProfileRecommendationsPanel recommendations={recommendations} />
            <CompletenessCard user={user} onEdit={() => setEditOpen(true)} />
          </aside>
        </div>
      )}

      <EditProfileModal isOpen={editOpen} onOpenChange={setEditOpen} user={user} />
    </DataBoundary>
  );
}

// Surfaces missing profile fields so the rail stays useful instead of empty.
function CompletenessCard({ user, onEdit }: { user: any; onEdit: () => void }) {
  const checks = [
    { key: "photo", label: "Profile photo", done: !!user?.photo },
    { key: "bio", label: "Short bio", done: !!user?.bio },
    { key: "location", label: "Location", done: !!user?.location },
    { key: "contactNumber", label: "Contact number", done: !!user?.contactNumber },
    {
      key: "cuisinePreferences",
      label: "Tastes",
      done: (user?.cuisinePreferences ?? []).length > 0,
    },
    {
      key: "socialMedia",
      label: "Social link",
      done: !!(user?.socialMedia?.instagram || user?.socialMedia?.facebook || user?.socialMedia?.twitter),
    },
  ];
  const done = checks.filter((c) => c.done).length;
  const pct = Math.round((done / checks.length) * 100);

  if (pct === 100) return null;

  return (
    <section className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">Complete profile</h2>
        <span className="text-xs font-semibold text-primary tabular-nums">{pct}%</span>
      </div>

      <div className="h-1.5 w-full rounded-full bg-silk-with-hover overflow-hidden mb-3">
        <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>

      <ul className="space-y-1">
        {checks
          .filter((c) => !c.done)
          .slice(0, 4)
          .map((c) => (
            <li key={c.key}>
              <button
                type="button"
                onClick={onEdit}
                className="w-full flex items-center gap-2 text-xs text-foreground/80 hover:text-primary transition-colors px-1.5 py-1 rounded cursor-pointer"
              >
                <Icon
                  icon="solar:add-circle-linear"
                  className="size-3.5 text-muted-foreground"
                />
                <span className="truncate">{c.label}</span>
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}

function ProfileNotFound({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-10 text-center space-y-4 ring-1 ring-zinc-200/60 dark:ring-white/[0.04]">
      <Icon icon="solar:user-cross-linear" className="size-12 mx-auto text-muted-foreground/60" />
      <div>
        <h3 className="text-lg font-semibold text-foreground">Profile unavailable</h3>
        <p className="text-sm text-muted-foreground mt-1">
          We couldn't load your profile. Sign in again or retry.
        </p>
      </div>
      <BaseButton intent="primary" size="sm" className="rounded-full px-5" onClick={onRetry}>
        Try again
      </BaseButton>
    </div>
  );
}
