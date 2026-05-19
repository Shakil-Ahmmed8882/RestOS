"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import { ShowIf } from "@/components/rest-os-ui/guard/ShowIf";
import type { CommentItem } from "../../types";

type Props = { item?: CommentItem | null };

// Composition: square blog thumbnail on the left always visible (this is the
// piece of context — what blog you commented on), comment quote on the right,
// optional attachment image below.
export function CommentTabCard(props: Props) {
  const { item } = props;
  if (!item?._id) return null;

  const blog = item?.blog;
  const href = blog?._id ? `/blog/${blog._id}` : "#";

  return (
    <Link
      href={href}
      className="group rounded-xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] overflow-hidden flex hover:ring-primary/30 transition-all"
    >
      {/* Blog image — prominent, always visible */}
      <div className="relative w-24 sm:w-28 shrink-0 self-stretch bg-silk-with-hover">
        <BaseImage
          src={blog?.image}
          alt={blog?.title ?? "Blog"}
          imgClass="!w-full !h-full"
        />
        <span className="absolute top-1.5 left-1.5 inline-flex size-5 items-center justify-center rounded-full bg-white/95 backdrop-blur text-primary shadow-sm">
          <Icon icon="solar:chat-round-line-bold" className="size-3" />
        </span>
      </div>

      {/* Quote + meta */}
      <div className="flex-1 min-w-0 p-3 flex flex-col gap-1.5">
        <ShowIf condition={!!blog?.title}>
          <p className="text-[11px] text-muted-foreground truncate">
            on <span className="font-semibold text-foreground/80">{blog?.title}</span>
          </p>
        </ShowIf>

        <p className="text-sm text-foreground/85 line-clamp-3 leading-snug">
          {item?.comment ?? ""}
        </p>

        <ShowIf condition={!!item?.image}>
          <div className="relative aspect-[16/9] w-full rounded-md overflow-hidden bg-silk-with-hover mt-0.5">
            <BaseImage src={item?.image} alt="Attachment" imgClass="!w-full !h-full" />
          </div>
        </ShowIf>
      </div>
    </Link>
  );
}
