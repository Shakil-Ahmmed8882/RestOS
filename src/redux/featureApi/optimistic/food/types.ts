export type FoodCacheRow = {
  _id: string;
  foodName?: string;
  name?: string;
  foodImage?: string;
  image?: string;
  foodCategory?: string;
  category?: string;
  price?: number;
  quantity?: number;
  orders?: number;
  preparationTime?: number;
  averageRating?: number;
  description?: string;
  made_by?: string;
  food_origin?: string;
  createdAt?: string;
  updatedAt?: string;
};

const isObject = (v: unknown): v is Record<string, any> =>
  Boolean(v) && typeof v === "object";

/**
 * Normalise the various envelope shapes the food API returns:
 *  - create: `{ data: { createdFood: [{...}] } }`
 *  - update: `{ data: { updatedFoodData: {...}, img: "..." } }`
 *  - delete: `{ data: { deletedFood: {...} } }`
 *  - plain : `{ data: {...} }`
 */
export function normalizeFood(input: unknown): FoodCacheRow | null {
  if (!isObject(input)) return null;
  const data = isObject(input.data) ? input.data : input;

  if (Array.isArray((data as any).createdFood)) {
    return toRow((data as any).createdFood[0]);
  }
  if (isObject((data as any).updatedFoodData)) {
    return toRow((data as any).updatedFoodData);
  }
  if (isObject((data as any).deletedFood)) {
    return toRow((data as any).deletedFood);
  }
  return toRow(data);
}

function toRow(raw: any): FoodCacheRow | null {
  if (!raw?._id) return null;
  return {
    _id: String(raw._id),
    foodName: raw.foodName ?? raw.name,
    name: raw.name,
    foodImage: raw.foodImage ?? raw.image,
    image: raw.image,
    foodCategory: raw.foodCategory ?? raw.category,
    category: raw.category,
    price: typeof raw.price === "string" ? Number(raw.price) : raw.price,
    quantity:
      typeof raw.quantity === "string" ? Number(raw.quantity) : raw.quantity,
    orders: raw.orders,
    preparationTime: raw.preparationTime,
    averageRating: raw.averageRating,
    description: raw.description,
    made_by: raw.made_by,
    food_origin: raw.food_origin,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}
