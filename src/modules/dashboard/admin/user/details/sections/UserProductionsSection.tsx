"use client";

import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TUserDetail, TUserProduction } from "../types";

type Props = {
  user: TUserDetail;
};

function buildPlaceholderProductions(user: TUserDetail): TUserProduction[] {
  return Array.from({ length: 3 }).map((_, i) => ({
    id: `placeholder-${i}`,
    title: "Echoes of the Heart",
    artist: user.name,
    timing: "2:24",
    listenings: "45,48,256",
    cover: user.photo,
  }));
}

export function UserProductionsSection(props: Props) {
  const { user } = props;
  const productions = buildPlaceholderProductions(user);

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <h3 className="text-sm font-semibold text-foreground mb-5">My Productions</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-left">
              <th className="pb-3 pr-4 text-xs font-medium text-muted-foreground/80">
                Title
              </th>
              <th className="pb-3 pr-4 text-xs font-medium text-muted-foreground/80">
                Timing
              </th>
              <th className="pb-3 pr-4 text-xs font-medium text-muted-foreground/80">
                No. of listenings
              </th>
              <th className="pb-3 text-xs font-medium text-muted-foreground/80 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {productions.map((row) => (
              <tr
                key={row.id}
                className="group transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.02]"
              >
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 rounded-lg">
                      <AvatarImage src={row.cover} alt={row.title} className="object-cover" />
                      <AvatarFallback className="rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs">
                        <Icon icon="solar:music-note-linear" className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">
                        {row.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {row.artist}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4 text-muted-foreground">{row.timing}</td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {row.listenings}
                </td>
                <td className="py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      className="h-8 w-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                      title="Like"
                    >
                      <Icon icon="solar:heart-linear" className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="h-8 w-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                      title="Share"
                    >
                      <Icon icon="solar:refresh-linear" className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="h-8 w-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-sky-500 hover:bg-sky-500/10 transition-colors"
                      title="Comment"
                    >
                      <Icon icon="solar:chat-round-linear" className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
