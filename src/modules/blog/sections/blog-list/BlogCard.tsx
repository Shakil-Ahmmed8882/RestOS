"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BaseImage } from "@/components/common/BaseImage";
import { SaveButton } from "@/modules/saves";
import type { BlogItem } from "@/modules/blog/types/blog.types";

export function BlogCard({ blog }: { blog: BlogItem }) {
  return (
    <Card className="group overflow-hidden">
      <div className="relative">
        <BaseImage
          src={blog.image ?? null}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          containerClassName="aspect-[16/10] w-full"
          className="transition group-hover:scale-105"
        />
        <div className="absolute right-3 top-3">
          <SaveButton type="blog" itemId={blog._id} variant="icon" size="sm" />
        </div>
      </div>
      <div className="space-y-3 p-5">
        {blog.category ? <Badge variant="secondary">{blog.category}</Badge> : null}
        <Link href={`/blog/${blog._id}`} className="block">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug group-hover:text-primary">{blog.title}</h3>
        </Link>
        {blog.excerpt ? <p className="line-clamp-2 text-sm text-muted-foreground">{blog.excerpt}</p> : null}
        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={blog.author?.photo ?? undefined} alt={blog.author?.name ?? "Author"} />
              <AvatarFallback>{blog.author?.name?.[0]?.toUpperCase() ?? "A"}</AvatarFallback>
            </Avatar>
            <span>{blog.author?.name ?? "Anonymous"}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Icon icon="solar:arrow-up-linear" className="h-3.5 w-3.5" />
              {blog.upvotes ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="solar:chat-line-linear" className="h-3.5 w-3.5" />
              {blog.commentsCount ?? 0}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
