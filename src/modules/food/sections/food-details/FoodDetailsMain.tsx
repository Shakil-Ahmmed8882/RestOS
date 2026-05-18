"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BaseImage } from "@/components/common/BaseImage";
import { CustomSuspense } from "@/components/common/CustomSuspense";
import { useGetSingleFoodQuery } from "@/redux/featureApi/foodApi";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import { useAuthGuard } from "@/modules/food/components/AuthGuard";
import { FoodDetailsSkeleton } from "@/components/rest-os-ui/placeholder/skeletons/FoodDetailsSkeleton";

export function FoodDetailsMain({ id }: { id: string }) {
  const { data, isLoading } = useGetSingleFoodQuery(id);
  const food = data?.food;
  const [qty, setQty] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useAppDispatch();
  const { requireAuth } = useAuthGuard();

  const displayName = food?.foodName || "Untitled Dish";
  const displayImage = food?.foodImage || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop";
  const displayRating = food?.averageRating || 0;
  const maxQuantity = food?.quantity || 10;

  const handleQuantityChange = (value: number) => {
    const newQty = Math.max(1, Math.min(value, maxQuantity));
    setQty(newQty);
  };

  const handleAddToCart = () => {
    if (!requireAuth() || !food) return;
    dispatch(addToCart({
      id: food._id,
      name: food.foodName,
      price: food.price,
      image: food?.foodImage,
      quantity: qty,
    }));
    toast.success(`Added ${qty} × ${food.foodName} to cart`);
  };

  const handleFavorite = () => {
    if (!requireAuth()) return;
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };


  return (
    <CustomSuspense isLoading={isLoading} fallback={<FoodDetailsSkeleton />}>
      {food ? (
        <div className="grid gap-10 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative">
            <BaseImage
              src={displayImage}
              alt={displayName}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              containerClassName="aspect-square w-full rounded-2xl"
              className="object-cover"
            />
            <button
              onClick={handleFavorite}
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-lg transition-transform hover:scale-110 active:scale-95"
            >
              <Icon
                icon={isFavorite ? "solar:heart-bold" : "solar:heart-linear"}
                className={`h-6 w-6 ${isFavorite ? "text-red-500" : "text-foreground"}`}
              />
            </button>
          </div>

          {/* Details Section */}
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="secondary" className="text-sm">
                  {food.foodCategory || "Uncategorized"}
                </Badge>
                {food.discountPercent > 0 && (
                  <Badge variant="destructive" className="text-sm">
                    {food.discountPercent}% OFF
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{displayName}</h1>
            </div>

            {/* Rating and Meta Info */}
            <div className="flex flex-wrap items-center gap-4 pb-4 border-b">
              {displayRating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        icon="solar:star-bold"
                        className={`h-4 w-4 ${i < Math.round(displayRating) ? "text-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{displayRating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({food.orders || 0} orders)</span>
                </div>
              )}
              {food.preparationTime && (
                <div className="flex items-center gap-2 text-sm">
                  <Icon icon="solar:clock-circle-linear" className="h-4 w-4" />
                  <span>{food.preparationTime} min</span>
                </div>
              )}
            </div>

            {/* Description */}
            {food.description && (
              <p className="text-muted-foreground leading-relaxed">{food.description}</p>
            )}

            {/* Tags and Info */}
            <div className="space-y-3">
              {food.tags && food.tags.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {food.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Origin and Type Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  {food.food_origin && (
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:map-point-linear" className="h-4 w-4" />
                      <span>{food.food_origin}</span>
                    </div>
                  )}
                  {food.made_by && (
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:home-linear" className="h-4 w-4" />
                      <span>{food.made_by}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Dietary Info */}
            {(food.isVeg || food.isSpicy || food.isGlutenFree) && (
              <div className="flex flex-wrap gap-2">
                {food.isVeg && (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
                    <Icon icon="solar:leaf-linear" className="mr-1 h-3 w-3" />
                    Vegetarian
                  </Badge>
                )}
                {food.isSpicy && (
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200">
                    <Icon icon="solar:fire-linear" className="mr-1 h-3 w-3" />
                    Spicy
                  </Badge>
                )}
                {food.isGlutenFree && (
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                    <Icon icon="solar:leaf-linear" className="mr-1 h-3 w-3" />
                    Gluten Free
                  </Badge>
                )}
              </div>
            )}

            {/* Stock Info */}
            {food.quantity && (
              <div className="text-sm">
                <span className={food.quantity > 0 ? "text-green-600 dark:text-green-400" : "text-red-600"}>
                  {food.quantity > 0 ? `${food.quantity} in stock` : "Out of stock"}
                </span>
              </div>
            )}

            {/* Price and Actions */}
            <div className="space-y-4 pt-4 border-t">
              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold">৳{food.price.toFixed(2)}</span>
                {food.discountPercent > 0 && (
                  <span className="text-lg text-muted-foreground line-through">
                    ৳{(food.price / (1 - food.discountPercent / 100)).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-lg border bg-background">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(qty - 1)}
                    disabled={qty <= 1}
                  >
                    <Icon icon="solar:minus-linear" className="h-4 w-4" />
                  </Button>
                  <div className="w-16 text-center font-semibold text-lg">{qty}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(qty + 1)}
                    disabled={qty >= maxQuantity}
                  >
                    <Icon icon="solar:add-circle-linear" className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Max: {maxQuantity}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={food.quantity <= 0}
                  className="text-white"
                >
                  <Icon icon="solar:bag-3-linear" className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleFavorite}
                >
                  <Icon
                    icon={isFavorite ? "solar:heart-bold" : "solar:heart-linear"}
                    className={isFavorite ? "text-red-500" : ""}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-muted p-8 text-center">
          <Icon icon="solar:sad-smile-linear" className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-lg font-semibold text-muted-foreground">Dish not found</p>
          <p className="text-sm text-muted-foreground mt-1">This food item is no longer available.</p>
        </div>
      )}
    </CustomSuspense>
  );
}
