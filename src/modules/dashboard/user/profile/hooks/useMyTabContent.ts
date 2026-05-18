"use client";

import { useGetMyTabContentQuery } from "@/redux/featureApi/profileApi";
import type { ProfileTabKey, ProfileTabMeta } from "../types";

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data?: { items?: T[]; meta?: ProfileTabMeta };
};

type Args = {
  tab: ProfileTabKey;
  page?: number;
  limit?: number;
  status?: string;
};

export function useMyTabContent<T = unknown>(args: Args) {
  const { tab, page = 1, limit = 12, status } = args;
  const { data, isLoading, isFetching, error, refetch } = useGetMyTabContentQuery({
    tab,
    page,
    limit,
    status,
  });

  const envelope = data as ApiEnvelope<T> | undefined;
  const items = (envelope?.data?.items ?? []) as T[];
  const meta: ProfileTabMeta = envelope?.data?.meta ?? { page, limit, total: 0 };

  return { items, meta, isLoading, isFetching, error, refetch };
}
