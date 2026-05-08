"use client";

import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const FEATURED_RESTAURANTS = [
  {
    id: 1,
    name: "Golden Pizza Hub",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=280&fit=crop",
    rating: 4.8,
    reviews: "1000+",
    deliveryTime: "20-35 min",
    priceRange: "৳৳",
    category: "Pizza",
    badge: "Featured",
  },
  {
    id: 2,
    name: "Crave Fire",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=280&fit=crop",
    rating: 4.5,
    reviews: "58",
    deliveryTime: "45-65 min",
    priceRange: "৳৳",
    category: "Fast Food",
    badge: "Featured",
  },
  {
    id: 3,
    name: "Fuchka Factory",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=280&fit=crop",
    rating: 4.5,
    reviews: "1000+",
    deliveryTime: "35-55 min",
    priceRange: "৳৳",
    category: "Chatpot & Fuchka",
    badge: "Featured",
  },
  {
    id: 4,
    name: "G.O.A.T",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&h=280&fit=crop",
    rating: 4.9,
    reviews: "500+",
    deliveryTime: "15-30 min",
    priceRange: "৳৳৳",
    category: "Snacks",
    badge: "Featured",
  },
];

const CUISINES = [
  { id: 1, name: "Jeshi", icon: "🥒", bgColor: "from-orange-50 to-orange-100" },
  { id: 2, name: "Cakes", icon: "🍰", bgColor: "from-red-50 to-red-100" },
  { id: 3, name: "Fast Food", icon: "🍟", bgColor: "from-yellow-50 to-yellow-100" },
  { id: 4, name: "Rice Dishes", icon: "🍚", bgColor: "from-orange-50 to-orange-100" },
  { id: 5, name: "Cafe", icon: "☕", bgColor: "from-blue-50 to-blue-100" },
  { id: 6, name: "Khichuri", icon: "🍲", bgColor: "from-green-50 to-green-100" },
  { id: 7, name: "Snacks", icon: "🥐", bgColor: "from-orange-50 to-orange-100" },
  { id: 8, name: "Pasta", icon: "🍝", bgColor: "from-red-50 to-red-100" },
];

const DAILY_DEALS = [
  {
    id: 1,
    name: "Flat 50% off",
    subtitle: "your 1st order",
    badge: "50%",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=200&fit=crop",
    tags: ["Free delivery"],
    color: "from-pink-500 to-pink-600",
  },
  {
    id: 2,
    name: "Tk. 175 off",
    subtitle: "Moms day special",
    badge: "TK.175",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=200&fit=crop",
    tags: ["DEALNAO"],
    color: "from-pink-500 to-pink-600",
  },
  {
    id: 3,
    name: "Tk. 150 off",
    subtitle: "on minimum order",
    badge: "TK.150",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=200&fit=crop",
    tags: ["DEALNAO"],
    color: "from-pink-500 to-pink-600",
  },
  {
    id: 4,
    name: "Tk. 120 off",
    subtitle: "Weekend special",
    badge: "TK.120",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&h=200&fit=crop",
    tags: ["Limited time"],
    color: "from-pink-500 to-pink-600",
  },
];

export function FoodPromoSection() {
  const [featuredScroll, setFeaturedScroll] = useState(0);
  const [cuisineScroll, setCuisineScroll] = useState(0);
  const [dealsScroll, setDealsScroll] = useState(0);
  const featuredRef = useRef<HTMLDivElement>(null);
  const cuisineRef = useRef<HTMLDivElement>(null);
  const dealsRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (!ref.current) return;
    const scrollAmount = 300;
    if (direction === "left") {
      ref.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8 bg-background py-6">
      {/* Get 25% Off Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-100 to-pink-50 p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div className="z-10">
              <h2 className="text-2xl font-bold text-gray-900">Get 25% off</h2>
              <p className="text-sm text-gray-600">Min. order Tk 250</p>
            </div>
            <div className="absolute right-0 top-0 -z-0 text-6xl opacity-20">🎁</div>
          </div>

          {/* Featured Restaurants Carousel */}
          <div className="mt-6 relative">
            <div
              ref={featuredRef}
              className="flex gap-4 overflow-x-auto scrollbar-hidden scroll-smooth pb-2"
            >
              {FEATURED_RESTAURANTS.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="flex-shrink-0 w-56 group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gray-200 h-32">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="mt-2">
                    <p className="font-semibold text-sm text-gray-900 line-clamp-1">
                      {restaurant.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Icon icon="solar:star-bold" className="h-3.5 w-3.5 text-orange-500" />
                      <span className="text-xs font-semibold text-gray-900">
                        {restaurant.rating}
                      </span>
                      <span className="text-xs text-gray-500">({restaurant.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
                      <span>{restaurant.deliveryTime}</span>
                      <span>•</span>
                      <span>{restaurant.priceRange}</span>
                      <span>•</span>
                      <span>{restaurant.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => scroll(featuredRef, "left")}
              className="absolute -left-4 top-1/3 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Scroll left"
            >
              <Icon icon="solar:arrow-left-linear" className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={() => scroll(featuredRef, "right")}
              className="absolute -right-4 top-1/3 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Scroll right"
            >
              <Icon icon="solar:arrow-right-linear" className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Cuisines Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cuisines</h2>

          <div className="relative">
            <div
              ref={cuisineRef}
              className="flex gap-4 overflow-x-auto scrollbar-hidden scroll-smooth pb-2"
            >
              {CUISINES.map((cuisine) => (
                <button
                  key={cuisine.id}
                  className={`flex-shrink-0 w-28 flex flex-col items-center justify-center gap-2 rounded-2xl p-4 bg-gradient-to-br ${cuisine.bgColor} hover:shadow-lg transition-all active:scale-95`}
                >
                  <span className="text-4xl">{cuisine.icon}</span>
                  <span className="text-sm font-semibold text-gray-900 text-center">
                    {cuisine.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => scroll(cuisineRef, "left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Scroll left"
            >
              <Icon icon="solar:arrow-left-linear" className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={() => scroll(cuisineRef, "right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Scroll right"
            >
              <Icon icon="solar:arrow-right-linear" className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Your Daily Deals Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your daily deals</h2>

          <div className="relative">
            <div
              ref={dealsRef}
              className="flex gap-4 overflow-x-auto scrollbar-hidden scroll-smooth pb-2"
            >
              {DAILY_DEALS.map((deal) => (
                <div
                  key={deal.id}
                  className="flex-shrink-0 w-72 group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Dark Overlay with Text */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${deal.color} opacity-80 flex flex-col items-start justify-end p-4`}>
                      <div className="text-white">
                        <h3 className="text-xl font-bold">{deal.name}</h3>
                        <p className="text-sm opacity-90">{deal.subtitle}</p>
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-3 right-3 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {deal.badge}
                    </div>
                  </div>

                  {/* Footer with Tags */}
                  <div className="p-3 flex gap-2">
                    {deal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => scroll(dealsRef, "left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Scroll left"
            >
              <Icon icon="solar:arrow-left-linear" className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={() => scroll(dealsRef, "right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Scroll right"
            >
              <Icon icon="solar:arrow-right-linear" className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
