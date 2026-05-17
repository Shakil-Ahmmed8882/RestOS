import { removeFoodById } from "./cachePatch";

export function applyDeleteFoodToCache(foodId: string) {
  removeFoodById(foodId);
}
