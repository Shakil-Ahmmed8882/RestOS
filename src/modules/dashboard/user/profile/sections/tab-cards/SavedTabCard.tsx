"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import type { SavedItem } from "../../types";

type Props = { item?: SavedItem | null };

export function SavedTabCard(props: Props) {
  const { item } = props;
  const blog = item?.blog;
  if (!blog?._id) return null;

  return (
    <Link
      href={`/blog/${blog._id}`}
      className="group relative aspect-square rounded-xl overflow-hidden bg-silk-with-hover block"
    >
      <BaseImage src={blog?.image} alt={blog?.title ?? "Saved"} imgClass="!w-full !h-full" />

      <span className="absolute top-2 right-2 inline-flex items-center justify-center size-6 rounded-full bg-white/90 backdrop-blur text-primary shadow-sm">
        <Icon icon="solar:bookmark-bold" className="size-3.5" />
      </span>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="absolute inset-x-0 bottom-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-sm font-semibold line-clamp-2">{blog?.title ?? "Untitled"}</p>
      </div>
    </Link>
  );
}
