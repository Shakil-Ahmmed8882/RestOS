"use client";

import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import type { BlogItem, BlogAuthor } from "@/modules/blog/types/blog.types";

type Props = {
  blog: BlogItem;
  onShare?: () => void;
};

function authorOf(input: unknown): BlogAuthor {
  if (!input) return { name: "Unknown" };
  if (typeof input === "string") return { name: "User" };
  const u = input as Record<string, any>;
  // server may return { name, user: { name, photo } } or plain user
  if (u?.user && typeof u.user === "object") {
    return {
      _id: u.user?._id,
      name: u.user?.name ?? u?.name ?? "Author",
      photo: u.user?.photo ?? u?.photo ?? null,
    };
  }
  return {
    _id: u?._id,
    name: u?.name ?? "Author",
    photo: u?.photo ?? null,
  };
}

function fmtDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogDetailsHeroSection(props: Props) {
  const { blog, onShare } = props;

  if (!blog) return null;

  const author = authorOf(blog?.author);
  const category = blog?.category;
  const image = blog?.image;
  const tags = blog?.tags ?? [];

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 flex-wrap text-[11px]">
        {category && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-0.5 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {category}
          </span>
        )}
        <span className="text-muted-foreground">
          {fmtDate(blog?.createdAt)}
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
        {blog?.title ?? "Untitled"}
      </h1>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author?.photo ?? undefined} alt={author?.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
              {author?.name?.[0]?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {author?.name}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {(blog?.upvotes ?? 0).toLocaleString()} upvotes ·{" "}
              {(blog?.commentsCount ?? 0).toLocaleString()} comments
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onShare}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-silk-with-hover text-xs font-medium text-foreground hover:text-primary transition-colors"
        >
          <Icon icon="solar:share-linear" className="h-3.5 w-3.5" />
          Share
        </button>
      </div>

      {image && (
        <div className="relative overflow-hidden rounded-2xl h-72 sm:h-96">
          <BaseImage
            src={image}
            alt={blog?.title}
            className="h-full w-full"
            sizes="(min-width: 1024px) 768px, 100vw"
          />
        </div>
      )}

      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((t) =>
            t ? (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full bg-silk-with-hover px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                <Icon icon="solar:hashtag-linear" className="h-3 w-3" />
                {t}
              </span>
            ) : null,
          )}
        </div>
      )}
    </section>
  );
}
