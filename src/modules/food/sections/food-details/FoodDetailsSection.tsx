"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Container } from "@/components/layouts/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BaseImage } from "@/components/common/BaseImage";
import { CustomSuspense } from "@/components/common/CustomSuspense";
import { useGetSingleFoodQuery } from "@/redux/featureApi/foodApi";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import type { FoodItem } from "@/modules/food/types/food.types";

export function FoodDetailsSection({ id }: { id: string }) {
  const { data, isLoading } = useGetSingleFoodQuery(id);
  const food = data as FoodItem | undefined;
  const [qty, setQty] = useState(1);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAdd = () => {
    if (!food) return;
    dispatch(addToCart({ id: food._id, name: food.name, price: food.price, image: food.image, quantity: qty }));
    toast.success(`Added ${qty} × ${food.name} to cart`);
  };

  return (
    <Container className="py-10">
      <CustomSuspense
        isLoading={isLoading}
        fallback={
          <div className="grid gap-8 md:grid-cols-2">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        }
      >
        {food ? (
          <div className="grid gap-10 md:grid-cols-2">
            <BaseImage
              src={food.image ?? null}
              alt={food.name}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              containerClassName="aspect-square w-full rounded-2xl"
            />
            <div className="flex flex-col gap-4">
              {food.category ? <Badge variant="secondary" className="w-fit">{food.category}</Badge> : null}
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{food.name}</h1>
              {food.rating ? (
                <div className="flex items-center gap-1">
                  <Icon icon="solar:star-bold" className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">{food.rating.toFixed(1)}</span>
                </div>
              ) : null}
              <p className="leading-relaxed text-muted-foreground">{food.description ?? "A delicious choice."}</p>
              {food.ingredients && food.ingredients.length > 0 ? (
                <div>
                  <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ingredients</h2>
                  <div className="flex flex-wrap gap-2">
                    {food.ingredients.map((ing) => (
                      <Badge key={ing} variant="outline">
                        {ing}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                <span className="text-3xl font-bold">${food.price?.toFixed(2)}</span>
                <div className="flex items-center rounded-md border">
                  <Button variant="ghost" size="icon" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                    <Icon icon="solar:minus-linear" className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                  <Button variant="ghost" size="icon" onClick={() => setQty((q) => q + 1)}>
                    <Icon icon="solar:add-circle-linear" className="h-4 w-4" />
                  </Button>
                </div>
                <Button size="lg" onClick={handleAdd}>
                  <Icon icon="solar:bag-3-linear" className="h-4 w-4" /> Add to cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    handleAdd();
                    router.push("/checkout");
                  }}
                >
                  Buy now
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">Dish not found.</div>
        )}
      </CustomSuspense>
    </Container>
  );
}
