import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";
import { store } from "@/redux/store";

export type SaveType = "blog" | "food";

export type SavedBlogResource = {
  _id: string;
  title: string;
  image: string;
  category: string;
  status: "pending" | "approved" | "test-approved";
  upvotes: number;
  commentsCount: number;
};

export type SavedFoodResource = {
  _id: string;
  foodName: string;
  foodImage: string;
  foodCategory: string;
  price: number;
  discountPercent: number;
  status: string;
};

export type SaveRow = {
  _id: string;
  type: SaveType;
  itemId: string;
  name: string;
  savedAt: string;
  createdAt: string;
  updatedAt: string;
  resource: SavedBlogResource | SavedFoodResource | null;
  resourceDeleted: boolean;
};

export type SavesMeta = { page: number; limit: number; total: number; totalPage: number };

export type SavesListResponse = {
  success: boolean;
  message: string;
  meta: SavesMeta;
  data: SaveRow[];
};

export type SavesCountsResponse = {
  success: boolean;
  message: string;
  data: { blog: number; food: number; total: number };
};

export type IsSavedResponse = {
  success: boolean;
  data: { isSaved: boolean; type: SaveType; itemId: string };
};

export type SavesQuery = {
  type?: SaveType;
  searchTerm?: string;
  page?: number;
  limit?: number;
  sort?: string;
};

const buildParams = (q: SavesQuery | undefined) => {
  const params = new URLSearchParams();
  if (!q) return params;
  Object.entries(q).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    params.set(k, String(v));
  });
  return params;
};

const saveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMySaves: builder.query<SavesListResponse, SavesQuery | void>({
      query: (q) => ({ url: "/saves", method: "GET", params: buildParams(q ?? undefined) }),
      providesTags: [API_CACHE_TAGS.BLOG_SAVED, API_CACHE_TAGS.SAVE_ITEM],
    }),
    getSaveCounts: builder.query<SavesCountsResponse, void>({
      query: () => ({ url: "/saves/counts", method: "GET" }),
      providesTags: [API_CACHE_TAGS.SAVE_ITEM],
    }),
    isItemSaved: builder.query<IsSavedResponse, { type: SaveType; itemId: string }>({
      query: ({ type, itemId }) => ({
        url: `/saves/${type}/${itemId}/is-saved`,
        method: "GET",
      }),
      providesTags: [API_CACHE_TAGS.SAVE_ITEM],
    }),
    saveItem: builder.mutation<unknown, { type: SaveType; itemId: string }>({
      query: ({ type, itemId }) => ({
        url: `/saves/${type}/${itemId}`,
        method: "POST",
      }),
      async onQueryStarted({ type, itemId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          saveApi.util.updateQueryData(
            "isItemSaved",
            { type, itemId },
            (draft) => {
              if (!draft) return;
              draft.data = { isSaved: true, type, itemId };
            },
          ),
        );
        const countsPatch = dispatch(
          saveApi.util.updateQueryData("getSaveCounts", undefined, (draft) => {
            if (!draft?.data) return;
            draft.data = {
              ...draft.data,
              [type]: (draft.data[type] ?? 0) + 1,
              total: (draft.data.total ?? 0) + 1,
            } as typeof draft.data;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
          countsPatch.undo();
        }
      },
      invalidatesTags: [API_CACHE_TAGS.BLOG_SAVED],
    }),
    unsaveItem: builder.mutation<unknown, { type: SaveType; itemId: string }>({
      query: ({ type, itemId }) => ({
        url: `/saves/${type}/${itemId}`,
        method: "DELETE",
      }),
      async onQueryStarted({ type, itemId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          saveApi.util.updateQueryData(
            "isItemSaved",
            { type, itemId },
            (draft) => {
              if (!draft) return;
              draft.data = { isSaved: false, type, itemId };
            },
          ),
        );
        const countsPatch = dispatch(
          saveApi.util.updateQueryData("getSaveCounts", undefined, (draft) => {
            if (!draft?.data) return;
            draft.data = {
              ...draft.data,
              [type]: Math.max(0, (draft.data[type] ?? 0) - 1),
              total: Math.max(0, (draft.data.total ?? 0) - 1),
            } as typeof draft.data;
          }),
        );
        const listPatches: { undo: () => void }[] = [];
        const argsList = saveApi.util.selectCachedArgsForQuery(
          store.getState(),
          "getMySaves",
        );
        argsList.forEach((args) => {
          listPatches.push(
            dispatch(
              saveApi.util.updateQueryData("getMySaves", args, (draft) => {
                if (!draft?.data) return;
                const before = draft.data.length;
                draft.data = draft.data.filter(
                  (row) => !(row?.type === type && row?.itemId === itemId),
                );
                const removed = before - draft.data.length;
                if (removed > 0 && draft.meta?.total !== undefined) {
                  draft.meta.total = Math.max(0, draft.meta.total - removed);
                }
              }),
            ),
          );
        });
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
          countsPatch.undo();
          listPatches.forEach((p) => p.undo());
        }
      },
      invalidatesTags: [API_CACHE_TAGS.BLOG_SAVED],
    }),
  }),
});

export const {
  useGetMySavesQuery,
  useGetSaveCountsQuery,
  useIsItemSavedQuery,
  useSaveItemMutation,
  useUnsaveItemMutation,
} = saveApi;
export default saveApi;
