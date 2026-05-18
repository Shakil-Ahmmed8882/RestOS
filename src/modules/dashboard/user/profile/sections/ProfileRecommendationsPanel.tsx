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
    <section className="rounded-2xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">Suggested</h2>
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
        <div className="rounded-xl bg-silk-with-hover py-4 px-3 text-center">
          <Icon
            icon="solar:users-group-rounded-linear"
            className="size-4 mx-auto text-muted-foreground mb-1"
          />
          <p className="text-xs font-medium text-foreground/80">No suggestions yet</p>
        </div>
      </ShowIf>

      <ShowIf condition={items.length > 0}>
        <ul className="flex flex-col gap-1.5">
          {items.map((rec) => (
            <RecommendationRow key={rec?._id} rec={rec} />
          ))}
        </ul>
      </ShowIf>
    </section>
  );
}

function RecommendationRow({ rec }: { rec: ProfileRecommendation }) {
  if (!rec?._id) return null;
  return (
    <li className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-silk-with-hover transition-colors cursor-pointer">
      <BaseAvatar src={rec?.photo} name={rec?.name} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-foreground truncate">{rec?.name ?? "User"}</p>
        <ShowIf condition={!!rec?.bio}>
          <p className="text-[11px] text-muted-foreground truncate">{rec?.bio}</p>
        </ShowIf>
      </div>
      <button
        type="button"
        className="text-[11px] font-semibold text-primary px-2 py-1 rounded-full hover:bg-primary/10 transition-colors shrink-0"
      >
        Follow
      </button>
    </li>
  );
}
