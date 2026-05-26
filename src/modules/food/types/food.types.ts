export interface FoodItem {
  _id: string;
  foodName: string;
  name?: string;
  description?: string;
  price: number;
  foodImage?: string;
  image?: string;
  rating?: number;
  averageRating?: number;
  foodCategory?: string;
  category?: string;
  ingredients?: string[];
  available?: boolean;
  discount?: number;
  discountPercent?: number;
  isVeg?: boolean;
  tags?: string[];
  preparationTime?: number;
  orders?: number;
  status?: string;
  quantity?: number;
  made_by?: string;
  food_origin?: string;
  reviews?: Array<{
    customer_name: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

export type FoodSortValue =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "fastest";

export interface FoodFilterState {
  search: string;
  category: string;
  cuisine: string;
  sort: FoodSortValue;
  page: number;
  limit: number;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  maxPrepTime: number | null;
  isVeg: boolean;
  isSpicy: boolean;
  isGlutenFree: boolean;
  inStock: boolean;
  hasDiscount: boolean;
  bestseller: boolean;
}

export interface FoodFilterOptions {
  categories: string[];
  cuisines: string[];
  tags: string[];
  price: { min: number; max: number };
  dietary: string[];
  availability: string[];
}


export interface TReview {
    customer_name: string;
    rating: number;
    comment: string;
    date: string;
  }
