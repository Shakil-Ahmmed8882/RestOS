"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { useGetAllBlogsQuery } from "@/redux/featureApi/blogApi";
import { useDebounce } from "@/hooks/useDebounce";
import { useBlogActionsSelector } from "@/modules/dashboard/admin/blogs/actions";
import { useOptimisticUpdateBlog } from "@/modules/dashboard/admin/blogs/actions/hooks/useOptimisticUpdateBlog";
import { DataBoundary } from "@/components/rest-os-ui/layouts/wrapper/DataBoundary";
import { BlogRow } from "../components/BlogRow";
import { BlogsSearchBar } from "../components/BlogsSearchBar";
import { AllBlogsSkeleton } from "../skeletons/AllBlogsSkeleton";
import type { TBlog } from "@/modules/dashboard/admin/blogs/types";

const PAGE_LIMIT = 12;

type TabId = "all" | "pending" | "approved";

const TABS: Array<{ id: TabId; label: string; icon: string }> = [
  { id: "all", label: "All", icon: "solar:documents-linear" },
  { id: "pending", label: "Pending review", icon: "solar:hourglass-linear" },
  { id: "approved", label: "Approved", icon: "solar:check-circle-linear" },
];

export function AllBlogsSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState<TabId>("all");
  const debounced = useDebounce(search, 350);

  const { openEdit, openDelete } = useBlogActionsSelector();
  const { run: runUpdate, isLoading: approving } = useOptimisticUpdateBlog();
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const args = useMemo(() => {
    const params: Array<{ name: string; value: string }> = [
      { name: "page", value: String(page) },
      { name: "limit", value: String(PAGE_LIMIT) },
    ];
    if (debounced.trim())
      params.push({ name: "searchTerm", value: debounced.trim() });
    if (tab !== "all") params.push({ name: "status", value: tab });
    return params;
  }, [page, debounced, tab]);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAllBlogsQuery(args);

  const blogs: TBlog[] = Array.isArray(data?.data) ? data.data : [];
  const meta = data?.meta ?? { total: blogs.length, page, limit: PAGE_LIMIT };
  const totalPages = Math.max(
    1,
    Math.ceil((meta.total ?? 0) / (meta.limit ?? PAGE_LIMIT)),
  );

  const handleApprove = async (blog: TBlog) => {
    if (!blog?._id) return;
    setApprovingId(blog._id);
    const ok = await runUpdate({
      blogId: blog._id,
      payload: { status: "approved" },
    });
    setApprovingId(null);
    if (ok) {
      toast.success("Blog approved", {
        description: "It's now live on the public site.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="inline-flex rounded-full bg-silk-with-hover p-1 text-xs">
          {TABS.map((t) => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTab(t.id);
                  setPage(1);
                }}
                className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full transition-colors ${
                  isActive
                    ? "bg-white dark:bg-zinc-900 text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon icon={t.icon} className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
        <BlogsSearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
      </div>

      <DataBoundary
        isLoading={isLoading && blogs.length === 0}
        isError={isError}
        onReset={() => refetch()}
        skeleton={<AllBlogsSkeleton />}
      >
        {blogs.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-12 text-center">
            <Icon
              icon={
                tab === "pending"
                  ? "solar:hourglass-linear"
                  : "solar:document-text-linear"
              }
              className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40"
            />
            <p className="text-sm font-semibold text-foreground">
              {tab === "pending"
                ? "Nothing waiting for review"
                : "No blogs found"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {debounced
                ? "Try a different keyword"
                : tab === "pending"
                  ? "Pending submissions show up here."
                  : "No blogs have been published yet"}
            </p>
          </div>
        ) : (
          <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-3 sm:p-4 space-y-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            {blogs.map((blog) =>
              blog?._id ? (
                <BlogRow
                  key={blog._id}
                  blog={blog}
                  isApproving={approving && approvingId === blog._id}
                  onApprove={handleApprove}
                  onView={(id) => router.push(`/blog/${id}`)}
                  onEdit={(b) =>
                    b?._id &&
                    openEdit({
                      blogId: b._id,
                      blogTitle: b?.title ?? "Untitled",
                    })
                  }
                  onDelete={(b) =>
                    b?._id &&
                    openDelete({
                      blogId: b._id,
                      blogTitle: b?.title ?? "Untitled",
                    })
                  }
                />
              ) : null,
            )}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              disabled={page === 1 || isFetching}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-9 w-9 rounded-full flex items-center justify-center bg-white dark:bg-zinc-900/60 text-muted-foreground hover:text-foreground disabled:opacity-40"
            >
              <Icon icon="solar:alt-arrow-left-linear" className="h-4 w-4" />
            </button>
            <span className="text-xs font-medium text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages || isFetching}
              onClick={() => setPage((p) => p + 1)}
              className="h-9 w-9 rounded-full flex items-center justify-center bg-white dark:bg-zinc-900/60 text-muted-foreground hover:text-foreground disabled:opacity-40"
            >
              <Icon icon="solar:alt-arrow-right-linear" className="h-4 w-4" />
            </button>
          </div>
        )}
      </DataBoundary>
    </div>
  );
}
