export interface FoodItem {
  _id: string;
  name?: string;
  foodName?: string;
  price: number;
  image?: string;
  foodImage?: string;
  category?: string;
  foodCategory?: string;
  description?: string;
  isAvailable?: boolean;
  status?: string;
  rating?: number;
  averageRating?: number;
  reviewCount?: number;
  orders?: number;
  orderCount?: number;
  quantity?: number;
  made_by?: string;
  food_origin?: string;
  tags?: string[];
  cuisine?: string;
  isVeg?: boolean;
  isSpicy?: boolean;
  isGlutenFree?: boolean;
  preparationTime?: number;
  createdAt?: string;
  updatedAt?: string;
  discountPercent?: number;
  popularity?: number;
  bestseller?: boolean;
}

export interface FoodReview {
  _id: string;
  foodId: string;
  userId: string;
  customer_name?: string;
  rating: number;
  comment?: string;
  date?: string;
  createdAt?: string;
}

export interface FoodDetailResponse {
  food: FoodItem & {
    reviews?: FoodReview[];
  };
  relatedFoods?: FoodItem[];
  message?: string;
}

export interface CreateFoodInput {
  name: string;
  description?: string;
  price: number;
  category: string;
  isAvailable?: boolean;
  file?: File;
}

export interface UpdateFoodInput {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  isAvailable?: boolean;
  file?: File;
}

export interface FoodFilters {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort?: string;
}
