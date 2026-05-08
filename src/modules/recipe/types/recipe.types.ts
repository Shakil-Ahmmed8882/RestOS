export interface Recipe {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  ingredients?: string[];
  steps?: string[];
  author?: { name: string; photo?: string | null };
  createdAt?: string;
}
