/**
 * Cache-patching primitives for the food list cache.
 *
 * Singleton-driven — call from any try-block after the API resolves.
 */
import foodApi from "@/redux/featureApi/foodApi";
import { store } from "@/redux/store";
import type { FoodCacheRow } from "./types";

const forEachListCache = (
  patch: (draft: { data: FoodCacheRow[]; meta?: any }) => void,
) => {
  const state = store.getState();
  const argsList = foodApi.util.selectCachedArgsForQuery(
    state,
    "getAllFoods",
  );
  argsList.forEach((args) => {
    store.dispatch(
      foodApi.util.updateQueryData("getAllFoods", args, (draft: any) => {
        if (!draft) return;
        patch(draft);
      }),
    );
  });
};

export const insertFoodAtTop = (row: FoodCacheRow) => {
  forEachListCache((draft) => {
    if (!Array.isArray(draft.data)) draft.data = [];
    draft.data = [row, ...draft.data.filter((r) => r._id !== row._id)];
    if (draft.meta?.total !== undefined) draft.meta.total += 1;
  });
};

export const replaceFoodById = (row: FoodCacheRow) => {
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

export const removeFoodById = (id: string) => {
  forEachListCache((draft) => {
    if (!Array.isArray(draft.data)) return;
    draft.data = draft.data.filter((r) => r._id !== id);
    if (draft.meta?.total) {
      draft.meta.total = Math.max(0, draft.meta.total - 1);
    }
  });
};
