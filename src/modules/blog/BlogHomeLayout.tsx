import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { BlogHeroSection } from "@/modules/blog/home/sections/BlogHeroSection";
import { AllBlogsSection } from "@/modules/blog/home/sections/AllBlogsSection";

export function BlogHomeLayout() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground dark:bg-background">
        <BlogHeroSection />
        <AllBlogsSection />
      </div>
    </ErrorBoundary>
  );
}
