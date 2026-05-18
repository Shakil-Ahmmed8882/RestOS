"use client";

import { Icon } from "@iconify/react";
import { BaseAvatar } from "@/components/rest-os-ui/images/variations/avatar/BaseAvatar";
import { BaseButton } from "@/components/rest-os-ui/buttons/BaseButton";
import { ShowIf } from "@/components/rest-os-ui/guard/ShowIf";
import type { ProfileSocial, ProfileStats, ProfileUser } from "../types";

type Props = {
  user: ProfileUser;
  stats: ProfileStats;
  onEdit: () => void;
};

export function ProfileHeaderSection(props: Props) {
  const { user, stats, onEdit } = props;

  const isAdmin = user?.role === "ADMIN";
  const subtitle = [user?.role ? toTitle(user.role) : null, user?.location].filter(Boolean).join(" • ");

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_320px] gap-6 lg:gap-10 items-start">
      {/* Left — avatar */}
      <div className="flex flex-col items-center lg:items-start gap-3">
        <div className="relative">
          <BaseAvatar
            src={user?.photo}
            name={user?.name}
            size="xl"
            ring
            className="!size-32 ring-4 ring-white dark:ring-zinc-900"
          />
          <ShowIf condition={isAdmin}>
            <span className="absolute -bottom-1 -right-1 inline-flex size-7 items-center justify-center rounded-full bg-primary text-white shadow-sm">
              <Icon icon="solar:verified-check-bold" className="size-4" />
            </span>
          </ShowIf>
        </div>
      </div>

      {/* Middle — identity + actions */}
      <div className="space-y-3 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground truncate">
            {user?.name ?? "Unnamed user"}
          </h1>
          <ShowIf condition={isAdmin}>
            <Icon icon="solar:verified-check-bold" className="size-5 text-primary" aria-label="Verified admin" />
          </ShowIf>
        </div>

        <ShowIf condition={!!subtitle}>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </ShowIf>

        <ShowIf condition={!!user?.bio}>
          <p className="text-sm text-foreground/80 leading-relaxed max-w-prose">{user?.bio}</p>
        </ShowIf>

        <SocialPillRow socialMedia={user?.socialMedia} />

        <SocialProofLine
          upvotes={stats?.totalUpvotesReceived ?? 0}
          comments={stats?.commentsCount ?? 0}
        />

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <BaseButton intent="primary" size="sm" className="rounded-full px-5" onClick={onEdit}>
            <Icon icon="solar:pen-2-linear" className="size-4 mr-1.5" />
            Edit profile
          </BaseButton>
          <BaseButton intent="ghost" size="sm" className="rounded-full size-9 px-0" aria-label="More options">
            <Icon icon="solar:menu-dots-bold" className="size-4" />
          </BaseButton>
        </div>
      </div>

      {/* Right — quick stats strip (desktop only) */}
      <StatsStrip stats={stats} />
    </section>
  );
}

function StatsStrip({ stats }: { stats: ProfileStats }) {
  const items = [
    { label: "Publications", value: stats?.blogsCount ?? 0, icon: "solar:gallery-wide-linear" },
    { label: "Saved", value: stats?.savedCount ?? 0, icon: "solar:bookmark-linear" },
    { label: "Orders", value: stats?.ordersCount ?? 0, icon: "solar:bag-3-linear" },
    { label: "Upvotes", value: stats?.totalUpvotesReceived ?? 0, icon: "solar:heart-linear" },
  ];

  return (
    <div className="hidden xl:block">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2.5">
        At a glance
      </p>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl bg-silk-with-hover px-3 py-2.5 flex items-center gap-2.5"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon icon={item.icon} className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-base font-semibold leading-none text-foreground">{item.value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialPillRow({ socialMedia }: { socialMedia?: ProfileSocial }) {
  const links = [
    { key: "instagram", value: socialMedia?.instagram, icon: "solar:instagram-linear" },
    { key: "facebook", value: socialMedia?.facebook, icon: "solar:facebook-linear" },
    { key: "twitter", value: socialMedia?.twitter, icon: "ri:twitter-x-line" },
  ].filter((l) => !!l.value);

  if (!links.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {links.map((l) => (
        <a
          key={l.key}
          href={normalizeUrl(l.value!)}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium hover:bg-primary/15 transition-colors"
        >
          <Icon icon={l.icon} className="size-3.5" />
          <span className="max-w-[140px] truncate">{stripProtocol(l.value!)}</span>
        </a>
      ))}
    </div>
  );
}

function SocialProofLine({ upvotes, comments }: { upvotes: number; comments: number }) {
  if (!upvotes && !comments) return null;
  const parts: string[] = [];
  if (upvotes) parts.push(`${upvotes} upvote${upvotes === 1 ? "" : "s"}`);
  if (comments) parts.push(`${comments} comment${comments === 1 ? "" : "s"}`);
  return <p className="text-xs text-muted-foreground">Engaged via {parts.join(" · ")}</p>;
}

function toTitle(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function normalizeUrl(raw: string) {
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}

function stripProtocol(raw: string) {
  return raw.replace(/^https?:\/\//i, "").replace(/^www\./i, "");
}
