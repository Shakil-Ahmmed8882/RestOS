"use client";

import { Icon } from "@iconify/react";
import type { TUserSocialMedia } from "../types";

type Props = {
  socialMedia?: TUserSocialMedia;
};

type SocialLink = {
  key: keyof TUserSocialMedia;
  icon: string;
  bg: string;
  label: string;
  hover: string;
};

const SOCIALS: SocialLink[] = [
  { key: "youtube", icon: "mdi:youtube", bg: "bg-red-500", label: "YouTube", hover: "hover:bg-red-600" },
  { key: "instagram", icon: "mdi:instagram", bg: "bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400", label: "Instagram", hover: "hover:brightness-110" },
  { key: "tiktok", icon: "ic:baseline-tiktok", bg: "bg-white", label: "TikTok", hover: "hover:bg-zinc-100" },
  { key: "facebook", icon: "mdi:facebook", bg: "bg-blue-600", label: "Facebook", hover: "hover:bg-blue-700" },
  { key: "twitter", icon: "mdi:twitter", bg: "bg-sky-500", label: "Twitter", hover: "hover:bg-sky-600" },
];

export function UserSocialMediaSection(props: Props) {
  const { socialMedia } = props;

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <h3 className="text-sm font-semibold text-foreground mb-5">Social Media</h3>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {SOCIALS.map((social) => {
          const url = socialMedia?.[social.key];
          const isLinked = Boolean(url);
          const iconColor = social.key === "tiktok" ? "text-zinc-900" : "text-white";

          if (!isLinked) {
            return (
              <span
                key={social.key}
                title={`${social.label} not connected`}
                className="h-10 w-10 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
              >
                <Icon icon={social.icon} className="h-5 w-5" />
              </span>
            );
          }

          return (
            <a
              key={social.key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.label}
              className={`h-10 w-10 rounded-full flex items-center justify-center ${social.bg} ${social.hover} ${iconColor} transition-all shadow-sm hover:scale-105 hover:shadow-md`}
            >
              <Icon icon={social.icon} className="h-5 w-5" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
