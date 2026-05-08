export interface FoodItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  rating?: number;
  category?: string;
  ingredients?: string[];
  available?: boolean;
  discount?: number;
}

export interface FoodFilterState {
  search: string;
  category: string;
  sort: "price-asc" | "price-desc" | "rating" | "newest";
  page: number;
  limit: number;
}
