"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BaseImage } from "@/components/common/BaseImage";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import type { FoodItem } from "@/modules/food/types/food.types";

export function FoodCard({ food }: { food: FoodItem }) {
  const dispatch = useAppDispatch();
  const handleAdd = () => {
    dispatch(addToCart({ id: food._id, name: food.name, price: food.price, image: food.image }));
    toast.success(`Added ${food.name} to cart`);
  };

  return (
    <Card className="group flex flex-col overflow-hidden">
      <Link href={`/food-details/${food._id}`} className="block">
        <BaseImage
          src={food.image ?? null}
          alt={food.name}
          fill
          sizes="(max-width: 640px) 100vw, 25vw"
          containerClassName="aspect-[4/3] w-full"
          className="transition group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold">{food.name}</h3>
          {food.rating ? (
            <Badge variant="secondary" className="gap-1">
              <Icon icon="solar:star-bold" className="h-3 w-3 text-yellow-500" />
              {food.rating.toFixed(1)}
            </Badge>
          ) : null}
        </div>
        {food.description ? <p className="line-clamp-2 text-xs text-muted-foreground">{food.description}</p> : null}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold">${food.price?.toFixed(2)}</span>
          <Button size="sm" onClick={handleAdd}>
            <Icon icon="solar:add-circle-linear" className="h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </Card>
  );
}
