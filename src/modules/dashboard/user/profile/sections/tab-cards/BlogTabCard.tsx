"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import { ShowIf } from "@/components/rest-os-ui/guard/ShowIf";
import type { BlogItem } from "../../types";

type Props = { blog?: BlogItem | null };

export function BlogTabCard(props: Props) {
  const { blog } = props;
  if (!blog?._id) return null;

  return (
    <Link
      href={`/blog/${blog._id}`}
      className="group relative aspect-square rounded-xl overflow-hidden bg-silk-with-hover block"
    >
      <BaseImage src={blog?.image} alt={blog?.title ?? "Blog"} imgClass="!w-full !h-full" />

      <ShowIf condition={!!blog?.status && blog.status !== "approved"}>
        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-primary/10 backdrop-blur text-primary text-[10px] font-semibold px-2 py-0.5">
          <Icon icon="solar:clock-circle-linear" className="size-3" />
          {blog?.status}
        </span>
      </ShowIf>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="absolute inset-x-0 bottom-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-sm font-semibold line-clamp-2">{blog?.title ?? "Untitled"}</p>
        <div className="mt-1.5 flex items-center gap-3 text-[11px] text-white/85">
          <span className="inline-flex items-center gap-1">
            <Icon icon="solar:heart-linear" className="size-3.5" />
            {blog?.upvotes ?? 0}
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon icon="solar:chat-round-line-linear" className="size-3.5" />
            {blog?.commentsCount ?? 0}
          </span>
        </div>
      </div>
    </Link>
  );
}
