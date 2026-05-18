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
        <div className="space-y-6">
          {/* Header — avatar + identity + stats */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-5 sm:p-7">
            <ProfileHeaderSection
              user={user}
              stats={stats}
              onEdit={() => setEditOpen(true)}
            />
          </div>

          {/* Highlights + Recommendations row — stacks on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 sm:gap-6">
            <ProfileHighlightsRow highlights={highlights} onAdd={() => setEditOpen(true)} />
            <ProfileRecommendationsPanel recommendations={recommendations} />
          </div>

          {/* Tabs + content — keyed on tab so each switch starts fresh */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-5 sm:p-7">
            <ProfileTabsStrip active={activeTab} stats={stats} onChange={setActiveTab} />
            <div className="pt-6">
              <ProfileTabContent key={activeTab} tab={activeTab} />
            </div>
          </div>
        </div>
      )}

      <EditProfileModal isOpen={editOpen} onOpenChange={setEditOpen} user={user} />
    </DataBoundary>
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
