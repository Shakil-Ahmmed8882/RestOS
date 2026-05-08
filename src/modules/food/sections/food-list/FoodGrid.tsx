"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomSuspense } from "@/components/common/CustomSuspense";
import { NoResultFoundWrapper } from "@/components/common/NoResultFoundWrapper";
import { FoodCard } from "@/modules/food/sections/food-list/FoodCard";
import { FoodGridSkeleton } from "@/modules/food/placeholder/FoodGridSkeleton";
import { useFoods } from "@/modules/food/hooks/useFoods";
import type { FoodItem } from "@/modules/food/types/food.types";

gsap.registerPlugin(ScrollTrigger);

export function FoodGrid() {
  const { data, isLoading } = useFoods();
  const gridRef = useRef<HTMLDivElement>(null);
  const items = (data?.data as FoodItem[]) ?? [];

  useEffect(() => {
    if (!gridRef.current || items.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.from(".food-card", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.05,
      });
    }, gridRef);
    return () => ctx.revert();
  }, [items.length]);

  return (
    <CustomSuspense isLoading={isLoading} fallback={<FoodGridSkeleton />}>
      <NoResultFoundWrapper data={items} title="No dishes match your filters" description="Try changing the search or category.">
        <AnimatePresence mode="wait">
          <motion.div
            ref={gridRef}
            key={items.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 "
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
  );
}
