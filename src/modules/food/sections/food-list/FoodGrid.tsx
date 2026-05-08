"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
      const cards = gridRef.current?.querySelectorAll(".food-card");
      if (!cards) return;

      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    }, gridRef);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <CustomSuspense isLoading={isLoading} fallback={<FoodGridSkeleton />}>
      <NoResultFoundWrapper data={items} title="No dishes match your filters" description="Try changing the search or category.">
        <motion.div
          ref={gridRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {items.map((food) => (
            <div key={food._id} className="food-card">
              <FoodCard food={food} />
            </div>
          ))}
        </motion.div>
      </NoResultFoundWrapper>
    </CustomSuspense>
  );
}
