"use client";

import { Icon } from "@iconify/react";
import { useMultipageModalSelector } from "@/components/rest-os-ui/modal/multipage-modal/provider/MultipageModalContext";
import { useRequireAuth } from "@/modules/blog/comments/hooks/useRequireAuth";

export function BlogHeroSection() {
  const { open, goTo } = useMultipageModalSelector();
  const { requireAuth } = useRequireAuth();

  const handleWrite = () => {
    if (!requireAuth()) return;
    try {
      open("blog-create");
    } catch {
      goTo("blog-create");
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-silk-with-hover px-3 py-1 text-[11px] font-semibold text-primary">
          <Icon icon="solar:notebook-bookmark-bold" className="h-3.5 w-3.5" />
          Blog
        </span>
        <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Insight and Updates
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
          A collection of hand-picked articles for foodies, by foodies. Deep
          dives, insights, and honest advice to navigate the culinary
          landscape.
        </p>
        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleWrite}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-white text-sm font-semibold shadow-sm shadow-primary/30 hover:bg-primary/90 transition-colors"
          >
            <Icon icon="solar:pen-new-square-bold" className="h-4 w-4" />
            Write a story
          </button>
        </div>
      </div>
    </section>
  );
}
