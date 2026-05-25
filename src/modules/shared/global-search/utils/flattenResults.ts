import type {
  TBlogResult,
  TFlattenedRow,
  TFoodCategoryResult,
  TFoodResult,
  TSearchGroup,
} from "../types";

const isPopulated = (group: TSearchGroup | undefined) =>
  Boolean(group && group.source !== null && Array.isArray(group.data));

export const flattenSearchResults = (
  groups: TSearchGroup[] | undefined,
): TFlattenedRow[] => {
  if (!groups || groups.length === 0) return [];

  const rows: TFlattenedRow[] = [];

  // Per the docs, server contract is fixed order: blogs, foods, foodCategories
  const blogs = groups[0];
  const foods = groups[1];
  const cats = groups[2];

  if (isPopulated(blogs)) {
    (blogs.data as TBlogResult[]).forEach((b) => {
      rows.push({
        key: `blog:${b._id}`,
        source: "blogs",
        id: b._id,
        title: b.title ?? "Untitled blog",
        subtitle: b.category ?? b.author?.name,
        image: b.image,
        href: `/blog/${b._id}`,
      });
    });
  }

  if (isPopulated(foods)) {
    (foods.data as TFoodResult[]).forEach((f) => {
      const title = f.foodName ?? f.name ?? "Untitled food";
      rows.push({
        key: `food:${f._id}`,
        source: "foods",
        id: f._id,
        title,
        subtitle: f.foodCategory ?? f.description,
        image: f.foodImage ?? f.image,
        href: `/food-details/${f._id}`,
      });
    });
  }

  if (isPopulated(cats)) {
    (cats.data as TFoodCategoryResult[]).forEach((c) => {
      const title = c.name ?? c.categoryName ?? "Category";
      rows.push({
        key: `category:${c._id}`,
        source: "foodCategories",
        id: c._id,
        title,
        subtitle: "Food category",
        image: c.image,
        href: `/food?foodCategory=${encodeURIComponent(title)}`,
      });
    });
  }

  return rows;
};

export const groupCount = (groups: TSearchGroup[] | undefined) => {
  if (!groups) return { blogs: 0, foods: 0, foodCategories: 0 };
  return {
    blogs: groups[0]?.source === "blogs" ? groups[0].data.length : 0,
    foods: groups[1]?.source === "foods" ? groups[1].data.length : 0,
    foodCategories:
      groups[2]?.source === "foodCategories" ? groups[2].data.length : 0,
  };
};
