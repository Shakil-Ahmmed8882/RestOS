"use client";

import { Icon } from "@iconify/react";
import { BaseAvatar } from "@/components/rest-os-ui/images/variations/avatar/BaseAvatar";
import { ShowIf } from "@/components/rest-os-ui/guard/ShowIf";
import type { ProfileRecommendation } from "../types";

type Props = {
  recommendations: ProfileRecommendation[];
};

export function ProfileRecommendationsPanel(props: Props) {
  const { recommendations } = props;
  const items = (recommendations ?? []).slice(0, 4);

  return (
    <section className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">Suggested for you</h2>
        <ShowIf condition={items.length > 0}>
          <button
            type="button"
            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            See all
          </button>
        </ShowIf>
      </div>

      <ShowIf condition={items.length === 0}>
        <div className="rounded-xl bg-silk-with-hover py-6 px-4 text-center">
          <Icon
            icon="solar:users-group-rounded-linear"
            className="size-6 mx-auto text-muted-foreground mb-1.5"
          />
          <p className="text-sm font-medium text-foreground">No suggestions yet</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Engage with blogs to discover new people
          </p>
        </div>
      </ShowIf>

      <ShowIf condition={items.length > 0}>
        <div className="grid grid-cols-2 gap-2.5">
          {items.map((rec) => (
            <RecommendationCard key={rec?._id} rec={rec} />
          ))}
        </div>
      </ShowIf>
    </section>
  );
}

function RecommendationCard({ rec }: { rec: ProfileRecommendation }) {
  if (!rec?._id) return null;
  return (
    <div className="rounded-xl bg-silk-with-hover px-3 py-3 flex flex-col items-center text-center gap-1.5 hover:bg-primary/5 transition-colors cursor-pointer">
      <BaseAvatar src={rec?.photo} name={rec?.name} size="md" />
      <p className="text-xs font-medium text-foreground truncate w-full">{rec?.name ?? "User"}</p>
      <button
        type="button"
        className="text-[11px] font-semibold text-primary mt-0.5 hover:text-primary/80 transition-colors"
      >
        Follow
      </button>
    </div>
  );
}
