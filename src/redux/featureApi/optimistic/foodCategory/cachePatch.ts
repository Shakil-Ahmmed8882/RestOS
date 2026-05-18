/**
 * Generic cache-patching primitives for the food category list cache.
 *
 * Pulls the singleton store directly. Call these in the try-block after
 * the mutation resolves — pure post-success patches, no rollback.
 */
import foodCategoryApi from "@/redux/featureApi/foodCategoryApi";
import { store } from "@/redux/store";
import type { CategoryCacheRow } from "./types";

const forEachListCache = (
  patch: (draft: { data: CategoryCacheRow[]; meta?: any }) => void,
) => {
  const state = store.getState();
  const argsList = foodCategoryApi.util.selectCachedArgsForQuery(
    state,
    "getAllFoodsCategories",
  );
  argsList.forEach((args) => {
    store.dispatch(
      foodCategoryApi.util.updateQueryData(
        "getAllFoodsCategories",
        args,
        (draft: any) => {
          if (!draft) return;
          patch(draft);
        },
      ),
    );
  });
};

export const insertCategoryAtTop = (row: CategoryCacheRow) => {
  forEachListCache((draft) => {
    if (!Array.isArray(draft.data)) draft.data = [];
    draft.data = [row, ...draft.data.filter((r) => r._id !== row._id)];
    if (draft.meta?.total !== undefined) draft.meta.total += 1;
  });
};

export const replaceCategoryById = (row: CategoryCacheRow) => {
  forEachListCache((draft) => {
    if (!Array.isArray(draft.data)) return;
    const idx = draft.data.findIndex((r) => r._id === row._id);
    if (idx === -1) {
      draft.data.unshift(row);
    } else {
      draft.data[idx] = { ...draft.data[idx], ...row };
    }
  });
};

export const removeCategoryById = (id: string) => {
  forEachListCache((draft) => {
    if (!Array.isArray(draft.data)) return;
    draft.data = draft.data.filter((r) => r._id !== id);
    if (draft.meta?.total) {
      draft.meta.total = Math.max(0, draft.meta.total - 1);
    }
  });
};
