"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useGetAllBlogsQuery } from "@/redux/featureApi/blogApi";
import { useDebounce } from "@/hooks/useDebounce";
import { useBlogActionsSelector } from "@/modules/dashboard/admin/blogs/actions";
import { BlogRow } from "../components/BlogRow";
import { BlogsSearchBar } from "../components/BlogsSearchBar";
import { AllBlogsSkeleton } from "../skeletons/AllBlogsSkeleton";
import type { TBlog } from "@/modules/dashboard/admin/blogs/types";

const PAGE_LIMIT = 12;

export function AllBlogsSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debounced = useDebounce(search, 350);

  const { openEdit, openDelete } = useBlogActionsSelector();

  const args = useMemo(
    () => [
      { name: "page", value: String(page) },
      { name: "limit", value: String(PAGE_LIMIT) },
      ...(debounced.trim() ? [{ name: "searchTerm", value: debounced.trim() }] : []),
    ],
    [page, debounced],
  );

  const { data, isLoading, isFetching } = useGetAllBlogsQuery(args);

  const blogs: TBlog[] = Array.isArray(data?.data) ? data.data : [];
  const meta = data?.meta ?? { total: blogs.length, page, limit: PAGE_LIMIT };
  const totalPages = Math.max(1, Math.ceil((meta.total ?? 0) / (meta.limit ?? PAGE_LIMIT)));

  if (isLoading && blogs.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BlogsSearchBar
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
          />
        </div>
        <AllBlogsSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <BlogsSearchBar
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
      </div>

      {blogs.length === 0 ? (
        <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-12 text-center">
          <Icon
            icon="solar:document-text-linear"
            className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40"
          />
          <p className="text-sm font-semibold text-foreground">No blogs found</p>
          <p className="text-xs text-muted-foreground mt-1">
            {debounced ? "Try a different keyword" : "No blogs have been published yet"}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-3 sm:p-4 space-y-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          {blogs.map((blog) => (
            <BlogRow
              key={blog._id}
              blog={blog}
              onView={(id) => router.push(`/blogs/${id}`)}
              onEdit={(b) =>
                openEdit({ blogId: b._id, blogTitle: b.title ?? "Untitled" })
              }
              onDelete={(b) =>
                openDelete({ blogId: b._id, blogTitle: b.title ?? "Untitled" })
              }
            />
          ))}
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
    </div>
  );
}
