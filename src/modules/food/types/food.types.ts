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

export interface FoodFilterState {
  search: string;
  category: string;
  sort: "price-asc" | "price-desc" | "rating" | "newest" | "fastest" | "distance";
  page: number;
  limit: number;
  minRating?: number | null;
  isVegetarian?: boolean;
}


export interface TReview {
    customer_name: string;
    rating: number;
    comment: string;
    date: string;
  }
