"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { CustomSuspense } from "@/components/common/CustomSuspense";
import { NoResultFoundWrapper } from "@/components/common/NoResultFoundWrapper";
import { FoodCard } from "@/modules/food/sections/food-list/FoodCard";
import { useFoods } from "@/modules/food/hooks/useFoods";
import { useFoodFilter } from "@/modules/food/providers/FoodFilterProvider";
import { FoodCardSkeleton } from "../../placeholder/FoodGridSkeleton";
import { CardSkeletonV2List } from "@/components/rest-os-ui/placeholder/skeletons/CardSkeletons";

export function FoodGrid() {
  const { data, isLoading, isFetching, accumulate } = useFoods();
  const { filters, setPage } = useFoodFilter();

  const gridRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const items = accumulate ? accumulate() : [];

  return (
    <>
      <CustomSuspense isLoading={isLoading || isFetching} fallback={<CardSkeletonV2List count={9} />}>
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

   

      <div ref={sentinelRef} className="h-4" />
    </>
  );
}
