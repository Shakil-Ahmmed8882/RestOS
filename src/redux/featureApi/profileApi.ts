import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

type QueryArg = { name: string; value: string }[] | undefined;

export type ProfileTab = "blogs" | "saved" | "orders" | "comments";

type TabContentArgs = {
  tab: ProfileTab;
  page?: number;
  limit?: number;
  status?: string;
  userId?: string;
};

type PreferenceField =
  | "cuisinePreferences"
  | "favoriteRestaurants"
  | "dietaryRestrictions"
  | "preferredMealTimes"
  | "paymentMethods";

type PreferencePayload = {
  field: PreferenceField;
  action: "add" | "remove" | "replace";
  values: string[];
};

type UpdateProfileArg = FormData | Record<string, unknown>;

const profileApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // ── Legacy compatibility ──
    getSingleUser: builder.query<unknown, void>({
      query: () => ({ url: "/users/single-user", method: "GET" }),
      providesTags: [API_CACHE_TAGS.USER_PROFILE],
    }),
    createUser: builder.mutation<unknown, Record<string, unknown>>({
      query: (data) => ({ url: "/users", method: "POST", body: data }),
      invalidatesTags: [API_CACHE_TAGS.USER_PROFILE, API_CACHE_TAGS.USER_LIST],
    }),
    updateUserProfile: builder.mutation<unknown, { id: string; data: Record<string, unknown> }>({
      query: ({ id, data }) => ({ url: `/users/${id}`, method: "PATCH", body: data }),
      invalidatesTags: [API_CACHE_TAGS.USER_PROFILE],
    }),
    deleteUserProfile: builder.mutation<unknown, string>({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
      invalidatesTags: [API_CACHE_TAGS.USER_PROFILE, API_CACHE_TAGS.USER_LIST],
    }),

    // ── /profile/me endpoints ─────────────────────────────────────────
    getMyProfile: builder.query<unknown, void>({
      query: () => ({ url: "/profile/me", method: "GET" }),
      providesTags: [API_CACHE_TAGS.USER_PROFILE],
    }),
    getMyStats: builder.query<unknown, void>({
      query: () => ({ url: "/profile/me/stats", method: "GET" }),
      providesTags: [API_CACHE_TAGS.USER_PROFILE],
    }),
    getMyTabContent: builder.query<unknown, TabContentArgs>({
      query: ({ tab, page = 1, limit = 12, status }) => {
        const params = new URLSearchParams();
        params.append("page", String(page));
        params.append("limit", String(limit));
        if (status) params.append("status", status);
        return { url: `/profile/me/content/${tab}`, method: "GET", params };
      },
      providesTags: [API_CACHE_TAGS.USER_ACTIVITY],
    }),
    updateMyProfile: builder.mutation<unknown, UpdateProfileArg>({
      query: (body) => ({ url: "/profile/me", method: "PATCH", body }),
      invalidatesTags: [API_CACHE_TAGS.USER_PROFILE, API_CACHE_TAGS.AUTH_ME],
    }),
    updateMyPreferences: builder.mutation<unknown, PreferencePayload>({
      query: (body) => ({ url: "/profile/me/preferences", method: "PATCH", body }),
      invalidatesTags: [API_CACHE_TAGS.USER_PROFILE],
    }),

    // ── /profile/:userId — public-ish read of another user ─────────────
    getUserProfileById: builder.query<unknown, string>({
      query: (userId) => ({ url: `/profile/${userId}`, method: "GET" }),
      providesTags: [API_CACHE_TAGS.USER_PROFILE],
    }),
    getUserStatsById: builder.query<unknown, string>({
      query: (userId) => ({ url: `/profile/${userId}/stats`, method: "GET" }),
      providesTags: [API_CACHE_TAGS.USER_PROFILE],
    }),
    getUserTabContent: builder.query<unknown, TabContentArgs & { userId: string }>({
      query: ({ userId, tab, page = 1, limit = 12, status }) => {
        const params = new URLSearchParams();
        params.append("page", String(page));
        params.append("limit", String(limit));
        if (status) params.append("status", status);
        return { url: `/profile/${userId}/content/${tab}`, method: "GET", params };
      },
      providesTags: [API_CACHE_TAGS.USER_ACTIVITY],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useCreateUserMutation,
  useUpdateUserProfileMutation,
  useDeleteUserProfileMutation,
  useGetMyProfileQuery,
  useGetMyStatsQuery,
  useGetMyTabContentQuery,
  useUpdateMyProfileMutation,
  useUpdateMyPreferencesMutation,
  useGetUserProfileByIdQuery,
  useGetUserStatsByIdQuery,
  useGetUserTabContentQuery,
} = profileApi;
export default profileApi;
