"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import {
  CommentsProvider,
  CommentsSection,
} from "@/modules/blog/comments";
import { useBlogDetails } from "./hooks/useBlogDetails";
import { BlogDetailsHeroSection } from "./sections/BlogDetailsHeroSection";
import { BlogDetailsBodySection } from "./sections/BlogDetailsBodySection";
import { BlogDetailsSkeleton } from "./loading/placeholder/BlogDetailsSkeleton";

type Props = {
  blogId: string;
};

export function BlogDetailsHomeLayout(props: Props) {
  const { blogId } = props;
  const router = useRouter();
  const { blog, isLoading, error } = useBlogDetails({ blogId });

  if (isLoading) {
    return (
      <ErrorBoundary>
        <BlogDetailsSkeleton />
      </ErrorBoundary>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <Icon
          icon="solar:document-text-linear"
          className="h-12 w-12 text-muted-foreground/50"
        />
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Article not found
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            The post you're looking for may have been removed.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/blog")}
          className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90"
        >
          <Icon icon="solar:arrow-left-linear" className="h-4 w-4" />
          Back to articles
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
        <button
          type="button"
          onClick={() => router.push("/blog")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <Icon icon="solar:arrow-left-linear" className="h-3.5 w-3.5" />
          All articles
        </button>

        <BlogDetailsHeroSection blog={blog} />
        <BlogDetailsBodySection blog={blog} />

        <hr className="border-t border-zinc-200/60 dark:border-white/[0.06]" />

        <CommentsProvider blogId={blogId}>
          <CommentsSection />
        </CommentsProvider>
      </article>
    </ErrorBoundary>
  );
}
