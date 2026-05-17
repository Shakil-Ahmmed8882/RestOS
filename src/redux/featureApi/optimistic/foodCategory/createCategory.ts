/**
 * Post-success optimistic update for category creation.
 *
 * Usage:
 *   const response = await createCategory(fd).unwrap();
 *   const row = applyCreateCategoryToCache(response);
 */
import { insertCategoryAtTop } from "./cachePatch";
import { normalizeCategory, type CategoryCacheRow } from "./types";

export function applyCreateCategoryToCache(
  apiResponse: unknown,
): CategoryCacheRow | null {
  const row = normalizeCategory(apiResponse);
  if (!row) return null;
  insertCategoryAtTop(row);
  return row;
}
