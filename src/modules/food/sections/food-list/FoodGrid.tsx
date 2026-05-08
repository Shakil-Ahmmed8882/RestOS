"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { CustomSuspense } from "@/components/common/CustomSuspense";
import { NoResultFoundWrapper } from "@/components/common/NoResultFoundWrapper";
import { FoodCard } from "@/modules/food/sections/food-list/FoodCard";
import { useFoods } from "@/modules/food/hooks/useFoods";
import { useFoodFilter } from "@/modules/food/providers/FoodFilterProvider";
import type { FoodItem } from "@/modules/food/types/food.types";
import { FoodCardSkeleton } from "../../placeholder/FoodGridSkeleton";

export function FoodGrid() {
  const { data, isLoading, isFetching, accumulate } = useFoods();
  const { filters, setPage } = useFoodFilter();
  const gridRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const totalRef = useRef(0);
  const items = accumulate ? accumulate() : [];

  useEffect(() => {
    if (data?.meta?.total) {
      totalRef.current = data.meta.total;
    }
  }, [data?.meta?.total]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && !isFetching && items.length < totalRef.current) {
          setPage(filters.page + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [isLoading, isFetching, items.length, filters.page, totalRef, setPage]);

  return (
    <>
      <CustomSuspense isLoading={!isLoading || isFetching} fallback={<FoodCardSkeleton />}>
        <NoResultFoundWrapper data={items} title="No dishes match your filters" description="Try changing the search or category.">
          <AnimatePresence mode="wait">
            <motion.div
              ref={gridRef}
              key={filters.page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((food) => (
                <div key={food._id} className="food-card">
                  <FoodCard food={food} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </NoResultFoundWrapper>
      </CustomSuspense>

      {isFetching && items.length > 0 && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Icon icon="eos-icons:loading" className="h-5 w-5" />
            <span className="text-sm">Loading more dishes...</span>
          </div>
        </div>
      )}

      <div ref={sentinelRef} className="h-4" />
    </>
  );
}
