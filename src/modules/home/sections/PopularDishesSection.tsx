"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Container } from "@/components/layouts/Container";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BaseImage } from "@/components/common/BaseImage";
import { CustomSuspense } from "@/components/common/CustomSuspense";
import { NoResultFoundWrapper } from "@/components/common/NoResultFoundWrapper";
import { useGetTopSellingFoodsQuery } from "@/redux/featureApi/foodApi";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "sonner";

interface FoodItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  rating?: number;
  category?: string;
}

export function PopularDishesSection() {
  const { data, isLoading } = useGetTopSellingFoodsQuery();
  const items: FoodItem[] = (data?.data as FoodItem[]) ?? [];
  const dispatch = useAppDispatch();

  const handleAdd = (item: FoodItem) => {
    dispatch(addToCart({ id: item._id, name: item.name, price: item.price, image: item.image }));
    toast.success(`Added ${item.name} to cart`);
  };

  return (
    <section className="py-12">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Popular dishes</h2>
            <p className="mt-1 text-sm text-muted-foreground">Hand-picked best sellers, fresh today</p>
          </div>
          <Link href="/food" className="text-sm font-medium text-primary hover:underline">
            See all →
          </Link>
        </div>

        <CustomSuspense
          isLoading={isLoading}
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
              ))}
            </div>
          }
        >
          <NoResultFoundWrapper data={items} title="No dishes yet" description="Check back soon — fresh menus drop daily.">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.slice(0, 8).map((item) => (
                <Card key={item._id} className="group overflow-hidden">
                  <Link href={`/food-details/${item._id}`} className="block">
                    <BaseImage
                      src={item.image ?? null}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      containerClassName="aspect-[4/3] w-full"
                      className="transition group-hover:scale-105"
                    />
                  </Link>
                  <div className="space-y-2 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-1 font-semibold">{item.name}</h3>
                      {item.rating ? (
                        <Badge variant="secondary" className="gap-1">
                          <Icon icon="solar:star-bold" className="h-3 w-3 text-yellow-500" />
                          {item.rating.toFixed(1)}
                        </Badge>
                      ) : null}
                    </div>
                    {item.category ? <p className="text-xs text-muted-foreground">{item.category}</p> : null}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-lg font-bold">${item.price?.toFixed(2)}</span>
                      <Button size="sm" onClick={() => handleAdd(item)}>
                        <Icon icon="solar:add-circle-linear" className="h-4 w-4" /> Add
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </NoResultFoundWrapper>
        </CustomSuspense>
      </Container>
    </section>
  );
}
