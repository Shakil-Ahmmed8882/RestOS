"use client";

import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BlogStatusPill } from "./BlogStatusPill";
import {
  getAuthorName,
  type TBlog,
} from "@/modules/dashboard/admin/blogs/types";

type Props = {
  blog: TBlog | null | undefined;
  onView: (blogId: string) => void;
  onEdit: (blog: TBlog) => void;
  onDelete: (blog: TBlog) => void;
  onApprove?: (blog: TBlog) => void;
  isApproving?: boolean;
};

export function BlogRow(props: Props) {
  const { blog, onView, onEdit, onDelete, onApprove, isApproving } = props;

  if (!blog) return null;

  const author = getAuthorName(blog?.author);
  const created = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";
  const isPending = blog?.status === "pending";

  return (
    <div className="group flex items-center gap-4 p-3 rounded-xl bg-zinc-50/60 dark:bg-white/[0.02] hover:bg-zinc-100/70 dark:hover:bg-white/[0.04] transition-colors">
      <Avatar className="h-14 w-14 rounded-lg flex-shrink-0">
        <AvatarImage
          src={blog?.image}
          alt={blog?.title}
          className="object-cover"
        />
        <AvatarFallback className="rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Icon
            icon="solar:document-text-linear"
            className="h-5 w-5 text-muted-foreground"
          />
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {blog?.title ?? "Untitled"}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {blog?.category ?? "—"} • by {author} • {created}
        </p>
      </div>

      <div className="hidden md:block">
        <BlogStatusPill status={blog?.status} />
      </div>

      <div className="flex items-center gap-1">
        {isPending && onApprove && (
          <button
            type="button"
            onClick={() => onApprove(blog)}
            disabled={isApproving}
            className="h-8 px-3 rounded-full bg-primary text-white text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-primary/90 disabled:opacity-60 shadow-sm shadow-primary/30"
            title="Approve blog"
          >
            <Icon
              icon={
                isApproving
                  ? "solar:refresh-linear"
                  : "solar:check-circle-bold"
              }
              className={`h-3.5 w-3.5 ${isApproving ? "animate-spin" : ""}`}
            />
            Approve
          </button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
          onClick={() => blog?._id && onView(blog._id)}
          title="View blog"
        >
          <Icon icon="solar:eye-linear" className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
          onClick={() => onEdit(blog)}
          title="Edit blog"
        >
          <Icon icon="solar:pen-2-linear" className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-primary/10 text-primary"
          onClick={() => onDelete(blog)}
          title="Delete blog"
        >
          <Icon icon="solar:trash-bin-trash-linear" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
