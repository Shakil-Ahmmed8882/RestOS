"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Container } from "@/components/layouts/Container";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomSuspense } from "@/components/common/CustomSuspense";
import { NoResultFoundWrapper } from "@/components/common/NoResultFoundWrapper";
import { useGetAllFoodsCategoriesQuery } from "@/redux/featureApi/foodCategoryApi";

interface CategoryItem {
  _id: string;
  name: string;
  image?: string;
  icon?: string;
}

const FALLBACK_CATEGORIES: CategoryItem[] = [
  { _id: "burger", name: "Burgers", icon: "noto:hamburger" },
  { _id: "pizza", name: "Pizza", icon: "noto:pizza" },
  { _id: "sushi", name: "Sushi", icon: "noto:sushi" },
  { _id: "dessert", name: "Desserts", icon: "noto:cake" },
  { _id: "drinks", name: "Drinks", icon: "noto:cup-with-straw" },
  { _id: "salad", name: "Salads", icon: "noto:green-salad" },
];

export function TopCategoriesSection() {
  const { data, isLoading } = useGetAllFoodsCategoriesQuery(undefined);
  const categories: CategoryItem[] = (data?.data as CategoryItem[]) ?? [];
  const items = categories.length ? categories : FALLBACK_CATEGORIES;

  return (
    <section className="py-12">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Top categories</h2>
            <p className="mt-1 text-sm text-muted-foreground">Pick what you’re craving today</p>
          </div>
          <Link href="/all-categories" className="text-sm font-medium text-primary hover:underline">
            View all →
          </Link>
        </div>

        <CustomSuspense
          isLoading={isLoading && categories.length === 0}
          fallback={
            <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-2xl" />
              ))}
            </div>
          }
        >
          <NoResultFoundWrapper data={items} title="No categories yet">
            <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
              {items.map((cat) => (
                <Link key={cat._id} href={`/food?category=${encodeURIComponent(cat.name)}`}>
                  <Card className="flex aspect-square flex-col items-center justify-center gap-2 p-4 transition hover:-translate-y-1 hover:shadow-md">
                    <Icon icon={cat.icon ?? "solar:dish-linear"} className="h-10 w-10" />
                    <span className="text-center text-sm font-medium">{cat.name}</span>
                  </Card>
                </Link>
              ))}
            </div>
          </NoResultFoundWrapper>
        </CustomSuspense>
      </Container>
    </section>
  );
}
