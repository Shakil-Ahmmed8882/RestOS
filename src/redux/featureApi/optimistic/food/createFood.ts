import { insertFoodAtTop } from "./cachePatch";
import { normalizeFood, type FoodCacheRow } from "./types";

export function applyCreateFoodToCache(
  apiResponse: unknown,
): FoodCacheRow | null {
  const row = normalizeFood(apiResponse);
  if (!row) return null;
  insertFoodAtTop(row);
  return row;
}
