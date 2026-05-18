"use client";

import { Icon } from "@iconify/react";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";

type FeaturedRestaurant = {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: string;
  deliveryTime: string;
  priceRange: string;
  category: string;
};

type DailyDeal = {
  id: number;
  name: string;
  subtitle: string;
  badge: string;
  image: string;
  tags: string[];
};

interface PromoDetailsModalProps {
  type: "restaurant" | "deal";
  data: FeaturedRestaurant | DailyDeal;
}

export function PromoDetailsModal({ type, data }: PromoDetailsModalProps) {
  return (
    <div className="space-y-4 bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-primary/10 dark:via-background dark:to-primary/10 rounded-2xl">
      {type === "restaurant" ? (
        <>
          <BaseImage
            src={(data as FeaturedRestaurant).image}
            alt={(data as FeaturedRestaurant).name}
            className="w-full h-64 object-cover rounded-xl"
          />

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {(data as FeaturedRestaurant).name}
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Icon icon="solar:star-bold" className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-foreground">
                  {(data as FeaturedRestaurant).rating}
                </span>
              </div>
              <span className="text-muted-foreground">
                ({(data as FeaturedRestaurant).reviews} reviews)
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Delivery Time</p>
              <p className="font-semibold text-foreground">
                {(data as FeaturedRestaurant).deliveryTime}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Price Range</p>
              <p className="font-semibold text-foreground">
                {(data as FeaturedRestaurant).priceRange}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-semibold text-foreground">
                {(data as FeaturedRestaurant).category}
              </p>
            </div>
          </div>
          <button className="w-full py-3 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-opacity">
            Order Now
          </button>
        </>
      ) : (
        <>
          <BaseImage
            src={(data as DailyDeal).image}
            alt={(data as DailyDeal).name}
            className="w-full h-64 object-cover rounded-xl"
          />
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {(data as DailyDeal).name}
            </h2>
            <p className="text-muted-foreground mt-2">
              {(data as DailyDeal).subtitle}
            </p>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Valid codes:</p>
              <div className="flex gap-2 flex-wrap">
                {(data as DailyDeal).tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/10 dark:bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <p className="text-sm text-muted-foreground mb-3">
              Get this amazing deal now! Limited time offer.
            </p>
            <button className="w-full py-3 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition-opacity">
              Claim Deal
            </button>
          </div>
        </>
      )}
    </div>
  );
}
