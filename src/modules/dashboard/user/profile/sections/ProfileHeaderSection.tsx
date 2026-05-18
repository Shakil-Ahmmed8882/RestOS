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

// Compact identity header. Stats live inline under the bio (no wasted right rail),
// social pills sit next to the name. Dense, single-column composition.
export function ProfileHeaderSection(props: Props) {
  const { user, stats, onEdit } = props;
  const isAdmin = user?.role === "ADMIN";

  return (
    <section className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
      {/* Avatar — left aligned, primary-ringed */}
      <div className="relative shrink-0 mx-auto sm:mx-0">
        <BaseAvatar
          src={withCacheBust(user?.photo, user?.updatedAt)}
          name={user?.name}
          size="xl"
          className="!size-24 ring-4 ring-white dark:ring-zinc-900 shadow-sm"
        />
        <ShowIf condition={isAdmin}>
          <span className="absolute -bottom-0.5 -right-0.5 inline-flex size-6 items-center justify-center rounded-full bg-primary text-white shadow-sm ring-2 ring-white dark:ring-zinc-900">
            <Icon icon="solar:verified-check-bold" className="size-3.5" />
          </span>
        </ShowIf>
      </div>

      {/* Identity + actions */}
      <div className="flex-1 min-w-0 w-full space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate">
              {user?.name ?? "Unnamed user"}
            </h1>
            <SocialPills socialMedia={user?.socialMedia} />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <BaseButton
              intent="primary"
              size="sm"
              className="rounded-full pl-3.5 pr-4"
              onClick={onEdit}
            >
              <span className="inline-flex items-center gap-1.5">
                <Icon icon="solar:pen-2-linear" className="size-4" />
                <span>Edit</span>
              </span>
            </BaseButton>
            <BaseButton
              intent="ghost"
              size="sm"
              className="rounded-full size-8 px-0"
              aria-label="More options"
            >
              <Icon icon="solar:menu-dots-bold" className="size-4" />
            </BaseButton>
          </div>
        </div>

        <MetaLine user={user} />

        <ShowIf condition={!!user?.bio}>
          <p className="text-sm text-foreground/80 leading-relaxed max-w-prose">
            {user?.bio}
          </p>
        </ShowIf>

        <StatsInlineRow stats={stats} />
      </div>
    </section>
  );
}

function MetaLine({ user }: { user: ProfileUser }) {
  const parts: { icon: string; label: string }[] = [];
  if (user?.role) parts.push({ icon: "solar:shield-user-linear", label: toTitle(user.role) });
  if (user?.location) parts.push({ icon: "solar:map-point-linear", label: user.location });
  if (user?.diningFrequency)
    parts.push({ icon: "solar:fork-linear", label: `Dines ${user.diningFrequency.toLowerCase()}` });
  if (!parts.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
      {parts.map((p, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          <Icon icon={p.icon} className="size-3.5" />
          {p.label}
        </span>
      ))}
    </div>
  );
}

function StatsInlineRow({ stats }: { stats: ProfileStats }) {
  const items = [
    { label: "Posts", value: stats?.blogsCount ?? 0 },
    { label: "Saved", value: stats?.savedCount ?? 0 },
    { label: "Orders", value: stats?.ordersCount ?? 0 },
    { label: "Comments", value: stats?.commentsCount ?? 0 },
    { label: "Upvotes", value: stats?.totalUpvotesReceived ?? 0 },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-1">
      {items.map((it) => (
        <div key={it.label} className="inline-flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-foreground tabular-nums">{it.value}</span>
          <span className="text-[11px] text-muted-foreground uppercase tracking-wide">
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function SocialPills({ socialMedia }: { socialMedia?: ProfileSocial }) {
  const links = [
    { key: "instagram", value: socialMedia?.instagram, icon: "ri:instagram-line" },
    { key: "facebook", value: socialMedia?.facebook, icon: "ri:facebook-fill" },
    { key: "twitter", value: socialMedia?.twitter, icon: "ri:twitter-x-line" },
  ].filter((l) => !!l.value);

  if (!links.length) return null;

  return (
    <div className="inline-flex items-center gap-1">
      {links.map((l) => (
        <a
          key={l.key}
          href={normalizeUrl(l.value!)}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex size-6 items-center justify-center rounded-full text-primary/80 hover:bg-primary/10 hover:text-primary transition-colors"
          aria-label={l.key}
        >
          <Icon icon={l.icon} className="size-3.5" />
        </a>
      ))}
    </div>
  );
}

function toTitle(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function normalizeUrl(raw: string) {
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}

// Append a stable cache-buster keyed on the user's updatedAt so a re-uploaded
// avatar with the same URL still triggers a fresh fetch.
function withCacheBust(src?: string, version?: string): string | undefined {
  if (!src) return src;
  if (!version) return src;
  const v = encodeURIComponent(version);
  return src.includes("?") ? `${src}&v=${v}` : `${src}?v=${v}`;
}
