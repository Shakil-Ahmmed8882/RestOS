import saveApi from "@/redux/featureApi/saveApi";
import { store } from "@/redux/store";
import type { SaveType } from "@/redux/featureApi/saveApi";

export const setIsSavedInCache = (
  type: SaveType,
  itemId: string,
  isSaved: boolean,
) => {
  store.dispatch(
    saveApi.util.updateQueryData(
      "isItemSaved",
      { type, itemId },
      (draft) => {
        if (!draft) return;
        draft.data = { isSaved, type, itemId };
      },
    ),
  );
};

export const adjustSaveCounts = (type: SaveType, delta: number) => {
  store.dispatch(
    saveApi.util.updateQueryData("getSaveCounts", undefined, (draft) => {
      if (!draft?.data) return;
      const next = Math.max(0, (draft.data[type] ?? 0) + delta);
      const total = Math.max(0, (draft.data.total ?? 0) + delta);
      draft.data = { ...draft.data, [type]: next, total } as typeof draft.data;
    }),
  );
};

export const removeSaveRowByItem = (type: SaveType, itemId: string) => {
  const state = store.getState();
  const argsList = saveApi.util.selectCachedArgsForQuery(state, "getMySaves");
  argsList.forEach((args) => {
    store.dispatch(
      saveApi.util.updateQueryData("getMySaves", args, (draft) => {
        if (!draft?.data || !Array.isArray(draft.data)) return;
        const before = draft.data.length;
        draft.data = draft.data.filter(
          (row) => !(row?.type === type && row?.itemId === itemId),
        );
        const removed = before - draft.data.length;
        if (removed > 0 && draft.meta?.total !== undefined) {
          draft.meta.total = Math.max(0, draft.meta.total - removed);
        }
      }),
    );
  });
};
