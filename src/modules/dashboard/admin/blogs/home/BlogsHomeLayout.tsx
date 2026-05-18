"use client";

import {
  BlogActionsProvider,
  BlogActionsModalLayout,
} from "@/modules/dashboard/admin/blogs/actions";
import { AllBlogsSection } from "./sections/AllBlogsSection";

export function BlogsHomeLayout() {
  return (
    <BlogActionsProvider>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            All blogs
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review, edit and moderate community posts
          </p>
        </div>
        <AllBlogsSection />
      </div>
      <BlogActionsModalLayout />
    </BlogActionsProvider>
  );
}
