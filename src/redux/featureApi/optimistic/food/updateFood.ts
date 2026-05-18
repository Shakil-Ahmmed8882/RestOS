import { replaceFoodById } from "./cachePatch";
import { normalizeFood, type FoodCacheRow } from "./types";

export function applyUpdateFoodToCache(
  apiResponse: unknown,
): FoodCacheRow | null {
  const row = normalizeFood(apiResponse);
  if (!row) return null;
  replaceFoodById(row);
  return row;
}
