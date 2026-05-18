"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import type { BlogItem } from "@/modules/blog/types/blog.types";

type Props = {
  blog: BlogItem | null | undefined;
  onOpenComments: (blog: BlogItem) => void;
};

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogListCard(props: Props) {
  const { blog, onOpenComments } = props;
  const router = useRouter();

  if (!blog) return null;

  const title = blog?.title ?? "Untitled";
  const image = blog?.image;
  const category = blog?.category;
  const excerpt = blog?.excerpt ?? blog?.description ?? blog?.content;
  const comments = blog?.commentsCount ?? 0;

  const handleCardClick = () => {
    if (!blog?._id) return;
    router.push(`/blog/${blog._id}`);
  };

  return (
    <article className="group relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/60 ring-1 ring-zinc-200/60 dark:ring-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] dark:hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]">
      <button
        type="button"
        onClick={handleCardClick}
        className="relative block w-full h-52 sm:h-56 overflow-hidden text-left"
      >
        <BaseImage
          src={image}
          alt={title}
          className="h-full w-full"
          imgClass="transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </button>

      <div className="p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {category && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-1 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {category}
              </span>
            )}
            <span>·</span>
            <span>{formatDate(blog?.createdAt)}</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenComments(blog);
            }}
            aria-label="Open comments"
            className="group/comments inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover/comments:bg-primary group-hover/comments:text-white">
              <Icon
                icon="solar:chat-round-dots-bold"
                className="h-3.5 w-3.5"
              />
            </span>
            {comments}
          </button>
        </div>

        <button
          type="button"
          onClick={handleCardClick}
          className="block text-left w-full"
        >
          <h3 className="text-base sm:text-lg font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {excerpt}
            </p>
          )}
        </button>

        <button
          type="button"
          onClick={handleCardClick}
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Learn More
          <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
