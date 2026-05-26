"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { ConfirmDestructiveSection } from "@/components/rest-os-ui/modal/confirm-destructive";
import { useDeleteBlogMutation } from "@/redux/featureApi/blogApi";
import type { BlogItem } from "@/modules/blog/types/blog.types";

type Props = { blog: BlogItem | null | undefined };

const STATUS_STYLES: Record<
  NonNullable<BlogItem["status"]> | "unknown",
  { label: string; className: string; icon: string }
> = {
  approved: {
    label: "Approved",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: "solar:check-circle-bold",
  },
  pending: {
    label: "Pending",
    className: "bg-primary/10 text-primary",
    icon: "solar:clock-circle-bold",
  },
  "test-approved": {
    label: "Test",
    className: "bg-primary/10 text-primary",
    icon: "solar:test-tube-bold",
  },
  unknown: {
    label: "Draft",
    className: "bg-zinc-100 text-muted-foreground dark:bg-white/[0.06]",
    icon: "solar:document-text-bold",
  },
};

export function MyBlogCard({ blog }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteBlog, { isLoading: deleting }] = useDeleteBlogMutation();

  if (!blog?._id) return null;

  const status = STATUS_STYLES[blog.status ?? "unknown"] ?? STATUS_STYLES.unknown;

  const handleDelete = async () => {
    try {
      await deleteBlog(blog._id).unwrap();
      toast.success("Blog deleted");
      setConfirmOpen(false);
    } catch (err) {
      const e = err as { data?: { message?: string } };
      toast.error(e?.data?.message ?? "Delete failed. Try again.");
    }
  };

  return (
    <>
      <article className="group overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200/60 transition-shadow hover:ring-primary/30 dark:bg-zinc-900/60 dark:ring-white/[0.04]">
        <Link href={`/blogs/${blog._id}`} className="block">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800/40">
            <BaseImage
              src={blog?.image ?? ""}
              alt={blog?.title ?? "My blog"}
              className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
              <Icon icon="solar:document-text-bold" className="h-3 w-3" />
              {blog?.category ?? "Blog"}
            </span>
            <span
              className={cn(
                "absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur",
                status.className,
              )}
            >
              <Icon icon={status.icon} className="h-3 w-3" />
              {status.label}
            </span>
          </div>
        </Link>

        <div className="space-y-3 p-4">
          <Link
            href={`/blogs/${blog._id}`}
            className="line-clamp-2 block text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            {blog?.title ?? "Untitled"}
          </Link>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <Icon icon="solar:arrow-up-bold" className="h-3.5 w-3.5 text-emerald-500" />
                <span className="tabular-nums">{blog?.upvotes ?? 0}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <Icon icon="solar:chat-round-bold" className="h-3.5 w-3.5 text-primary" />
                <span className="tabular-nums">{blog?.commentsCount ?? 0}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Link
                href={`/blogs/${blog._id}/edit`}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary dark:bg-white/[0.06]"
                aria-label="Edit blog"
                title="Edit"
              >
                <Icon icon="solar:pen-bold" className="h-3.5 w-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                disabled={deleting}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/15 disabled:opacity-60"
                aria-label="Delete blog"
                title="Delete"
              >
                <Icon icon="solar:trash-bin-trash-bold" className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </article>

      <MultipageModal
        open={confirmOpen}
        onOpenChange={(next) => !next && setConfirmOpen(false)}
        initialPageId="confirm-blog-delete"
      >
        <MultipageModal.Page id="confirm-blog-delete" maxWidth="max-w-[460px]">
          <ConfirmDestructiveSection
            subject="this blog"
            itemName={blog?.title ?? "this blog"}
            isLoading={deleting}
            onConfirm={handleDelete}
            onCancel={() => setConfirmOpen(false)}
          />
        </MultipageModal.Page>
      </MultipageModal>
    </>
  );
}
