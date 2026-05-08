"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { useFoodFilter } from "@/modules/food/providers/FoodFilterProvider";

interface FoodPaginationProps {
  total?: number;
  limit?: number;
}

export function FoodPagination({ total = 0, limit = 12 }: FoodPaginationProps) {
  const { filters, setPage } = useFoodFilter();
  const totalPages = Math.ceil(total / limit);
  const currentPage = filters.page;

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((page) => {
    return (
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 1 && page <= currentPage + 1)
    );
  });

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Button
        onClick={() => setPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        variant="outline"
        size="icon"
        aria-label="Previous page"
      >
        <Icon icon="solar:arrow-left-linear" className="h-4 w-4" />
      </Button>

      <div className="flex gap-1">
        {pages.map((page, idx) => {
          const prevPage = pages[idx - 1];
          const showEllipsis = prevPage && page - prevPage > 1;

          return (
            <div key={page} className="flex gap-1">
              {showEllipsis && (
                <span className="flex items-center px-2 text-muted-foreground">
                  ...
                </span>
              )}
              <Button
                onClick={() => setPage(page)}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="min-w-10"
              >
                {page}
              </Button>
            </div>
          );
        })}
      </div>

      <Button
        onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        variant="outline"
        size="icon"
        aria-label="Next page"
      >
        <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
      </Button>
    </div>
  );
}
