"use client";

import { useGetMyProfileQuery } from "@/redux/featureApi/profileApi";
import type {
  ProfileOverview,
  ProfileRecommendation,
  ProfileStats,
  ProfileUser,
} from "../types";

type ApiEnvelope = {
  success?: boolean;
  message?: string;
  data?: Partial<ProfileOverview>;
};

const EMPTY_STATS: ProfileStats = {
  blogsCount: 0,
  approvedBlogsCount: 0,
  pendingBlogsCount: 0,
  savedCount: 0,
  ordersCount: 0,
  commentsCount: 0,
  totalUpvotesReceived: 0,
};

// Normalises the server envelope into a guaranteed shape so consumers
// never have to optional-chain `data?.data?.user?.name` themselves.
export function useMyProfile() {
  const { data, isLoading, isFetching, error, refetch } = useGetMyProfileQuery();

  const root = (data as ApiEnvelope | undefined)?.data ?? {};
  const user = (root.user ?? { _id: "" }) as ProfileUser;
  const stats = { ...EMPTY_STATS, ...(root.stats ?? {}) } as ProfileStats;
  const highlights = root.highlights ?? {};
  const recommendations = (root.recommendations ?? []) as ProfileRecommendation[];

  return {
    user,
    stats,
    highlights,
    recommendations,
    isLoading,
    isFetching,
    error,
    refetch,
  };
}
