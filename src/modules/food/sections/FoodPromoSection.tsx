

"use client";

import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useFoodFilter } from "@/modules/food/providers/FoodFilterProvider";
import { BaseImage } from "@/components/rest-os-ui/images/BaseImage";
import { MultipageModal } from "@/components/rest-os-ui/modal/multipage-modal/MultipageModal";
import { PromoDetailsModal } from "@/modules/food/components/PromoDetailsModal";

const FEATURED_RESTAURANTS = [
  {
    id: 1,
    name: "Golden Pizza Hub",
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=280&fit=crop",
    rating: 4.8,
    reviews: "1000+",
    deliveryTime: "20-35 min",
    priceRange: "৳৳",
    category: "Pizza",
  },
  {
    id: 2,
    name: "Crave Fire",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=280&fit=crop",
    rating: 4.5,
    reviews: "58",
    deliveryTime: "45-65 min",
    priceRange: "৳৳",
    category: "Fast Food",
  },
  {
    id: 3,
    name: "Fuchka Factory",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=280&fit=crop",
    rating: 4.5,
    reviews: "1000+",
    deliveryTime: "35-55 min",
    priceRange: "৳৳",
    category: "Chatpot & Fuchka",
  },
  {
    id: 4,
    name: "G.O.A.T",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&h=280&fit=crop",
    rating: 4.9,
    reviews: "500+",
    deliveryTime: "15-30 min",
    priceRange: "৳৳৳",
    category: "Snacks",
  },
  {
    id: 5,
    name: "Spice Valley",
    image:
      "https://images.unsplash.com/photo-1596040243734-c3c3f8d6b2e8?w=400&h=280&fit=crop",
    rating: 4.7,
    reviews: "850+",
    deliveryTime: "25-40 min",
    priceRange: "৳৳",
    category: "Indian",
  },
  {
    id: 6,
    name: "Pita Palace",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=280&fit=crop",
    rating: 4.6,
    reviews: "720+",
    deliveryTime: "30-45 min",
    priceRange: "৳৳",
    category: "Middle Eastern",
  },
  {
    id: 7,
    name: "Sushi Paradise",
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=280&fit=crop",
    rating: 4.9,
    reviews: "950+",
    deliveryTime: "35-50 min",
    priceRange: "৳৳৳",
    category: "Japanese",
  },
  {
    id: 8,
    name: "Burger Bliss",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=280&fit=crop",
    rating: 4.4,
    reviews: "650+",
    deliveryTime: "15-25 min",
    priceRange: "৳",
    category: "Burgers",
  },
];

const CUISINES = [
  {
    id: 1,
    name: "Jeshi",
    icon: "🥒",
    bgColor:
      "from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900",
  },
  {
    id: 2,
    name: "Cakes",
    icon: "🍰",
    bgColor: "from-red-50 to-red-100 dark:from-red-950 dark:to-red-900",
  },
  {
    id: 3,
    name: "Fast Food",
    icon: "🍟",
    bgColor:
      "from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900",
  },
  {
    id: 4,
    name: "Rice Dishes",
    icon: "🍚",
    bgColor:
      "from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900",
  },
  {
    id: 5,
    name: "Cafe",
    icon: "☕",
    bgColor: "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
  },
  {
    id: 6,
    name: "Khichuri",
    icon: "🍲",
    bgColor: "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900",
  },
  {
    id: 7,
    name: "Snacks",
    icon: "🥐",
    bgColor:
      "from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900",
  },
  {
    id: 8,
    name: "Pasta",
    icon: "🍝",
    bgColor: "from-red-50 to-red-100 dark:from-red-950 dark:to-red-900",
  },
  {
    id: 9,
    name: "Biryani",
    icon: "🍛",
    bgColor: "from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900",
  },
  {
    id: 10,
    name: "Noodles",
    icon: "🍜",
    bgColor:
      "from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900",
  },
];

const DAILY_DEALS = [
  {
    id: 1,
    name: "Flat 50% off",
    subtitle: "your 1st order",
    badge: "50%",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=200&fit=crop",
    tags: ["Free delivery"],
  },
  {
    id: 2,
    name: "Tk. 175 off",
    subtitle: "Moms day special",
    badge: "TK.175",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=200&fit=crop",
    tags: ["DEALNAO"],
  },
  {
    id: 3,
    name: "Tk. 150 off",
    subtitle: "on minimum order",
    badge: "TK.150",
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=200&fit=crop",
    tags: ["DEALNAO"],
  },
  {
    id: 4,
    name: "Tk. 120 off",
    subtitle: "Weekend special",
    badge: "TK.120",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561404?w=400&h=200&fit=crop",
    tags: ["Limited time"],
  },
  {
    id: 5,
    name: "Tk. 100 off",
    subtitle: "on Coffee orders",
    badge: "TK.100",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=200&fit=crop",
    tags: ["CAFEDEAL"],
  },
  {
    id: 6,
    name: "Buy 1 Get 1",
    subtitle: "on selected items",
    badge: "B1G1",
    image:
      "https://images.unsplash.com/photo-1596040243734-c3c3f8d6b2e8?w=400&h=200&fit=crop",
    tags: ["SPECIAL"],
  },
];

export function FoodPromoSection() {
  const { filters } = useFoodFilter();
  const featuredRef = useRef<HTMLDivElement>(null);
  const cuisineRef = useRef<HTMLDivElement>(null);
  const dealsRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    type: "restaurant" | "deal";
    data: (typeof FEATURED_RESTAURANTS)[0] | (typeof DAILY_DEALS)[0];
  } | null>(null);

  const hasActiveFilters =
    filters.search || filters.category !== "all" || filters.sort !== "newest";

  if (hasActiveFilters) {
    return null;
  }

  const handleRestaurantClick = (restaurant: (typeof FEATURED_RESTAURANTS)[0]) => {
    setSelectedItem({ type: "restaurant", data: restaurant });
    setModalOpen(true);
  };

  const handleDealClick = (deal: (typeof DAILY_DEALS)[0]) => {
    setSelectedItem({ type: "deal", data: deal });
    setModalOpen(true);
  };

  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: "left" | "right",
  ) => {
    if (!ref.current) return;
    const scrollAmount = 300;
    if (direction === "left") {
      ref.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8 bg-background pb-6 w-full">
      {/* Get 25% Off Banner */}
      <div className="w-full ">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/40 to-primary/10 dark:from-primary/30 dark:to-primary/20 p-6 md:p-8 border border-primary/30 dark:border-primary/40">
          <div className="flex items-center justify-between">
            <div className="z-10">
              <h2 className="text-2xl font-bold text-foreground">
                Get 25% off
              </h2>
              <p className="text-sm text-muted-foreground">Min. order Tk 250</p>
            </div>
            <div className="absolute right-0 top-0 -z-0 text-6xl opacity-30">
              🎁
            </div>
          </div>

          {/* Featured Restaurants Carousel */}
          <div className="mt-6 relative">
            
            <div
              ref={featuredRef}
              className="flex gap-4 overflow-x-hidden scrollbar-thin scroll-smooth pb-2"
            >
              {FEATURED_RESTAURANTS.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="flex-shrink-0 w-56 group cursor-pointer"
                  onClick={() => handleRestaurantClick(restaurant)}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-muted h-32">

                     <BaseImage
                                            src={restaurant.image}
                      alt={restaurant.name}
                      className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    <div className=" absolute inset-0 bg-gradient-to-t from-primary/60  to-transparent dark:from-[black] dark:via-black/60 dark:to-transparent"/>
                  </div>
                
                </div>
              ))}
            </div>

            
            <button
              onClick={() => scroll(featuredRef, "left")}
              className="absolute -left-4 top-1/3 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card dark:bg-card shadow-lg hover:shadow-xl transition-shadow dark:hover:shadow-primary/50"
              aria-label="Scroll left"
            >
              <Icon
                icon="solar:arrow-left-linear"
                className="h-5 w-5 text-primary"
              />
            </button>
            <button
              onClick={() => scroll(featuredRef, "right")}
              className="absolute -right-4 top-1/3 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card dark:bg-card shadow-lg hover:shadow-xl transition-shadow dark:hover:shadow-primary/50"
              aria-label="Scroll right"
            >
              <Icon
                icon="solar:arrow-right-linear"
                className="h-5 w-5 text-primary"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Cuisines Section */}
      <div className="w-full ">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Cuisines</h2>

          <div className="relative">
            <div
              ref={cuisineRef}
              className="flex gap-4 overflow-x-hidden scrollbar-thin scroll-smooth pb-2"
            >
              {CUISINES.map((cuisine) => (
                <button
                  key={cuisine.id}
                  className={`flex-shrink-0 w-28 flex flex-col items-center justify-center gap-2 rounded-2xl p-4 bg-gradient-to-br ${cuisine.bgColor} hover:shadow-lg transition-all active:scale-95`}
                >
                  <span className="text-4xl">{cuisine.icon}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 text-center">
                    {cuisine.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => scroll(cuisineRef, "left")}
              className="bg-white absolute -left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card dark:bg-card shadow-lg hover:shadow-xl transition-shadow dark:hover:shadow-primary/50"
              aria-label="Scroll left"
            >
              <Icon
                icon="solar:arrow-left-linear"
                className="h-5 w-5 text-primary"
              />
            </button>
            <button
              onClick={() => scroll(cuisineRef, "right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card dark:bg-card shadow-lg hover:shadow-xl transition-shadow dark:hover:shadow-primary/50"
              aria-label="Scroll right"
            >
              <Icon
                icon="solar:arrow-right-linear"
                className="h-5 w-5 text-primary"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Your Daily Deals Section */}
      <div className="w-full ">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Your daily deals
          </h2>

          <div className="relative">
            <div
              ref={dealsRef}
              className="flex gap-4 overflow-x-hidden scrollbar-thin scroll-smooth pb-2"
            >
              {DAILY_DEALS.map((deal) => (
                <div
                  key={deal.id}
                  className="flex-shrink-0 w-72 group cursor-pointer rounded-2xl overflow-hidden bg-card dark:bg-card shadow-md hover:shadow-lg transition-shadow dark:hover:shadow-primary/50"
                  onClick={() => handleDealClick(deal)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <BaseImage
                      src={deal.image}
                      alt={deal.name}
                      className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className=" absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-primary/10 dark:via-black/60 dark:to-transparent"/>

                    {/* Gradient Overlay - White for light theme, Black for dark theme */}
                    <div className="absolute bottom-0 left-0 right-0 h-full  flex flex-col items-start justify-end p-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary">{deal.name}</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{deal.subtitle}</p>
                      </div>
                    </div>

                    {/* Badge - White background with primary text */}
                    <div className="absolute top-3 right-3 bg-white text-primary px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {deal.badge}
                    </div>
                  </div>

                  {/* Footer with Tags */}
                  <div className="p-3 flex gap-2">
                    {deal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-primary/10 dark:bg-primary/20 text-primary px-2.5 py-0.5 rounded-full text-xs font-semibold"
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
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card dark:bg-card shadow-lg hover:shadow-xl transition-shadow dark:hover:shadow-primary/50"
              aria-label="Scroll left"
            >
              <Icon
                icon="solar:arrow-left-linear"
                className="h-5 w-5 text-primary"
              />
            </button>
            <button
              onClick={() => scroll(dealsRef, "right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card dark:bg-card shadow-lg hover:shadow-xl transition-shadow dark:hover:shadow-primary/50"
              aria-label="Scroll right"
            >
              <Icon
                icon="solar:arrow-right-linear"
                className="h-5 w-5 text-primary"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for restaurant/deal details */}
      <MultipageModal open={modalOpen} onOpenChange={setModalOpen} initialPageId="details">
        <MultipageModal.Page id="details" backTitle="Back">
          {selectedItem && (
            <PromoDetailsModal type={selectedItem.type} data={selectedItem.data} />
          )}
        </MultipageModal.Page>
      </MultipageModal>
    </div>
  );
}
