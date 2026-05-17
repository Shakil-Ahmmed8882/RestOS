/**
 * Post-success optimistic update for category edit.
 *
 * Usage:
 *   const response = await updateCategory({ id, data }).unwrap();
 *   const row = applyUpdateCategoryToCache(response);
 */
import { replaceCategoryById } from "./cachePatch";
import { normalizeCategory, type CategoryCacheRow } from "./types";

export function applyUpdateCategoryToCache(
  apiResponse: unknown,
): CategoryCacheRow | null {
  const row = normalizeCategory(apiResponse);
  if (!row) return null;
  replaceCategoryById(row);
  return row;
}
