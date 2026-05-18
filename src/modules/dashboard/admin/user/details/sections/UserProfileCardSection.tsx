"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TUserDetail } from "../types";

type Props = {
  user: TUserDetail;
};

export function UserProfileCardSection(props: Props) {
  const { user } = props;
  const initial = user.name?.[0]?.toUpperCase() ?? "U";
  const roleLabel = user.role === "ADMIN" ? "Admin" : "Premium User";

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <h2 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
        {user.name}
      </h2>
      <p className="mt-1 text-xs sm:text-sm font-medium text-emerald-500">
        {roleLabel}
      </p>

      <div className="relative mt-6 sm:mt-8">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-200/60 to-transparent dark:from-white/[0.04] dark:to-transparent blur-2xl" />
        <Avatar className="relative h-40 w-40 sm:h-48 sm:w-48 ring-8 ring-zinc-100 dark:ring-white/[0.04]">
          <AvatarImage src={user.photo} alt={user.name} className="object-cover" />
          <AvatarFallback className="text-4xl font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            {initial}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
