"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import { ShowIf } from "@/components/rest-os-ui/guard/ShowIf";
import type { CommentItem } from "../../types";

type Props = { item?: CommentItem | null };

export function CommentTabCard(props: Props) {
  const { item } = props;
  if (!item?._id) return null;

  const blog = item?.blog;
  const href = blog?._id ? `/blogs/${blog._id}` : "#";

  return (
    <Link
      href={href}
      className="group rounded-xl bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] p-3.5 flex flex-col gap-3 hover:ring-primary/30 transition-all"
    >
      <ShowIf condition={!!blog?._id}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative size-9 shrink-0 rounded-md overflow-hidden bg-silk-with-hover">
            <BaseImage src={blog?.image} alt={blog?.title ?? "Blog"} imgClass="!w-full !h-full" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
              Commented on
            </p>
            <p className="text-xs font-semibold text-foreground truncate">
              {blog?.title ?? "Blog"}
            </p>
          </div>
        </div>
      </ShowIf>

      <p className="text-sm text-foreground/85 line-clamp-3 leading-relaxed">
        <Icon
          icon="solar:quote-up-square-bold"
          className="inline size-4 text-primary/60 mr-1 align-text-bottom"
        />
        {item?.comment ?? ""}
      </p>

      <ShowIf condition={!!item?.image}>
        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-silk-with-hover">
          <BaseImage src={item?.image} alt="Attachment" imgClass="!w-full !h-full" />
        </div>
      </ShowIf>
    </Link>
  );
}
