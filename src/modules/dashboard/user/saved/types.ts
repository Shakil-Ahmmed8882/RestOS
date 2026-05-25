import type {
  SaveRow,
  SaveType,
  SavedBlogResource,
  SavedFoodResource,
  SavesMeta,
} from "@/redux/featureApi/saveApi";

export type SavedTabKey = SaveType; // "blog" | "food"

export type { SaveRow, SaveType, SavedBlogResource, SavedFoodResource, SavesMeta };

export const isBlogResource = (
  r: SaveRow["resource"],
): r is SavedBlogResource =>
  !!r && typeof (r as SavedBlogResource).title === "string";

export const isFoodResource = (
  r: SaveRow["resource"],
): r is SavedFoodResource =>
  !!r && typeof (r as SavedFoodResource).foodName === "string";
