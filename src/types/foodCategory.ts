export interface FoodItem {
    _id: string ;
    name: string;
    category: string;
    description: string;
    image: string;
    isNew?: boolean;
  }
  
  export interface FoodsCategoryResponse {
    data: FoodItem[];
  }