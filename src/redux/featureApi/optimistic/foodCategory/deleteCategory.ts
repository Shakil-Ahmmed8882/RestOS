/**
 * Post-success optimistic update for category deletion.
 *
 * Usage:
 *   await deleteCategory(id).unwrap();
 *   applyDeleteCategoryToCache(id);
 */
import { removeCategoryById } from "./cachePatch";

export function applyDeleteCategoryToCache(categoryId: string) {
  removeCategoryById(categoryId);
}
