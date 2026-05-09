import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { BlogGrid } from "@/modules/blog/sections/blog-list/BlogGrid";

export function BlogHomeLayout() {
  return (
    <ErrorBoundary>
      <div className="bg-background text-foreground dark:bg-background">
        <BlogGrid />
      </div>
    </ErrorBoundary>
  );
}
