export type TSearchSource = "blogs" | "foods" | "foodCategories";

export type TBlogResult = {
  _id: string;
  title: string;
  category?: string;
  image?: string;
  author?: { name?: string; user?: unknown };
};

export type TFoodResult = {
  _id: string;
  foodName?: string;
  name?: string;
  foodCategory?: string;
  foodImage?: string;
  image?: string;
  price?: number;
  description?: string;
};

export type TFoodCategoryResult = {
  _id: string;
  name?: string;
  categoryName?: string;
  image?: string;
};

export type TSearchGroup =
  | { source: "blogs" | null; data: TBlogResult[] }
  | { source: "foods" | null; data: TFoodResult[] }
  | { source: "foodCategories" | null; data: TFoodCategoryResult[] };

export type TFlattenedRow = {
  key: string;
  source: TSearchSource;
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  href: string;
};

export type TRecentSearch = {
  term: string;
  at: number;
};
